import Big from 'big.js';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import { balanceFormated, percentFormated } from '@/utils/balance';
import { formateTxDate } from '@/utils/date';

import { getTransaction, saveTransaction, updateTransaction } from '../Utils';
import { ArrowDown, ArrowUp } from './Arrows';

const TransactionWapper = styled.div`
  width: 478px;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid rgba(55, 58, 83, 1);
  background: #262836;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding: 5px 0;
  }
  .list {
    flex: 1;
    .tx-line {
      &:not(:last-child) {
        border-bottom: 1px solid #343838;
      }
    }
    .claim-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
    }
  }
  .fresh {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .chain-token-status {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    padding-top: 20px;
    .chain-token {
      display: flex;
      align-items: center;
      gap: 10px;
      img {
        height: 22px;
      }
    }
    .btn {
      cursor: pointer;
      background-color: #ebf479;
      color: #000;
      width: 90px;
      height: 32px;
      line-height: 16px;
      text-align: center;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .complete {
      color: #979abe;
    }
    .proccessing {
      color: #00d1ff;
    }
  }
  .time {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding-bottom: 20px;
    margin-top: 10px;

    .format-time-link {
      display: flex;
      align-items: center;
      gap: 10px;
      a {
        color: #64b5ff;
      }
    }
  }
`;

const RefreshText = styled.div`
  text-decoration: underline;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ArrowIcon = styled.div`
  transform: rotate(180deg);
  cursor: pointer;
`;

const Arrow = () => (
  <div>
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 6L13.7273 6M13.7273 6L8.87869 11.0002M13.7273 6L8.87869 1"
        stroke="#979ABE"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  </div>
);

export default function Transaction({ updater, storageKey, getStatus, tool, account }: any) {
  const [isFold, setIsFold] = useState(true);
  const [isLoadingTx, setIsLoadingTx] = useState<any>({});
  const [proccessSum, setProccessSum] = useState(0);
  const [transactionList, setTransactionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { chainId, provider } = useAccount();

  async function refreshTransactionList() {
    if (!account) {
      return;
    }

    setIsLoading(true);
    const transactionList = await getTransaction(tool);
    // const pendingList = transactionList.filter((item: any) => item.status === 3)
    const pendingList = transactionList;
    pendingList.forEach((item: any) => {
      getStatus(
        {
          hash: item.hash,
          chainId: item.fromChainId,
          address: item.fromAddress,
          fromChainId: item.fromChainId,
          toChainId: item.toChainId,
          tool: item.tool
        },
        item.bridgeType || item.tool,
        provider?.getSigner()
      )
        .then((isComplate: any) => {
          if (typeof isComplate === 'boolean' && isComplate) {
            item.status = 2;
            updateTransaction(item);
          } else if (typeof isComplate === 'object' && isComplate) {
            if (isComplate.isSuccess) {
              item.status = 2;
              updateTransaction(item);
            } else if (isComplate.execute) {
              item.text = isComplate.status;
              item.execute = isComplate.execute;
            }
          } else {
            item.status = 3;
          }
        })
        .catch((err: any) => {
          item.status = 3;
        });
    });

    transactionList.sort((a: any, b: any) => b.time - a.time);
    setTransactionList(transactionList);
    setIsLoading(false);
    setProccessSum(pendingList?.length || 0);
  }

  useEffect(() => {
    refreshTransactionList();
  }, [updater]);

  return (
    <TransactionWapper>
      <div className="header">
        <div className="title">
          <span>Transaction History</span>
          <span> {proccessSum} Processing</span>
        </div>
        <div className="fresh">
          <RefreshText
            onClick={() => {
              refreshTransactionList();
            }}
          >
            {isLoading && <Loading size={16} />}
            Refresh
          </RefreshText>
          <ArrowIcon
            onClick={() => {
              setIsFold(!isFold);
            }}
          >
            {isFold ? <ArrowDown /> : <ArrowUp />}
          </ArrowIcon>
        </div>
      </div>
      {isFold ? (
        <div className="list">
          {(transactionList || []).map((tx: any) => {
            return (
              <div className="tx-line" key={tx.hash}>
                <div className="chain-token-status">
                  <div className="chain-token">
                    <img src={tx.fromChainLogo} />
                    <Arrow />
                    <img src={tx.toChainLogo} />
                    <img src={tx.fromTokenLogo} />
                    <div>
                      {balanceFormated(tx.fromAmount)} {tx.fromTokenSymbol}
                    </div>
                    <Arrow />
                    <img src={tx.toTokenLogo} />
                    <div>
                      {balanceFormated(tx.toAmout)} {tx.toToenSymbol}
                    </div>
                  </div>
                  <div>
                    {tx.status === 2 && <div className="complete">Complete</div>}
                    {tx.status === 3 && <div className="processing">Processing</div>}
                  </div>
                </div>
                <div className="time">
                  <div className="format-time-link">
                    <div className="format-time">{formateTxDate(tx.time)}</div>
                    <a target="_blank" className="tx-link" href={`${tx.link}/tx/${tx.hash}`}>
                      Tx
                    </a>
                  </div>
                  {tx.status === 3 ? <div>~{tx.duration} min</div> : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </TransactionWapper>
  );
}
