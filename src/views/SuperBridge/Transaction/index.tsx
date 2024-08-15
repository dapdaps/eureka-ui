import styled from 'styled-components';
import { init, getQuote, execute, getIcon, getBridgeMsg, getAllToken, getChainScan, getStatus } from 'super-bridge-sdk';
import { useRouter } from 'next/router';

import useAccount from '@/hooks/useAccount';
import { getTransaction, saveTransaction, updateTransaction } from '@/components/BridgeX/Utils';
import PublicTitle from '../PublicTitle';
import { ArrowRight } from '../Arrow';
import TransactionPanel from './TransactionPanel';
import { useEffect, useState } from 'react';

const Container = styled.div`
  background-color: rgba(38, 40, 54, 1);
  border: 1px solid rgba(55, 58, 83, 1);
  border-radius: 16px;
  padding: 20px;
`;

const StatusWapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgba(55, 58, 83, 1);
  border-radius: 8px;
  height: 36px;
  padding: 0 10px;
`;

const SingleStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  color: #fff;
  cursor: pointer;
`;

const AmountWapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Sep = styled.div`
  border-left: 1px solid rgba(55, 58, 83, 1);
  height: 18px;
  margin: 0 15px;
`;

const InputWapper = styled.div`
  height: 44px;
  background-color: rgba(27, 30, 39, 1);
  border: 1px solid rgba(55, 58, 83, 1);
  border-radius: 8px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

const Input = styled.input`
  flex: 1;
  margin-left: 10px;
  color: #fff;
`;

interface Props {
  initModalShow?: boolean;
  updater: number;
}

export default function Transaction({ initModalShow = false, updater = 1 }: Props) {
  const [transactionModalShow, setTransactionModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [proccessSum, setProccessSum] = useState(0);
  const [value, setValue] = useState('');
  const [searchValue, setSearchValueValue] = useState('');
  const { account, chainId, provider } = useAccount();
  const router = useRouter();

  async function refreshTransactionList() {
    if (!account) {
      return;
    }

    setIsLoading(true);
    const transactionList = await getTransaction();
    const pendingList = transactionList.filter((item: any) => item.status !== 2);
    pendingList.forEach((item: any) => {
      getStatus(
        {
          hash: item.hash,
          chainId: item.fromChainId,
          address: item.fromAddress,
          fromChainId: item.fromChainId,
          toChainId: item.toChainId,
        },
        item.bridgeType || item.tool,
        provider?.getSigner(),
      )
        .then((isComplate: any) => {
          if (isComplate) {
            item.status = 2;
            updateTransaction(item);
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
    if (initModalShow) {
      setTransactionModalShow(true);
    }
  }, [initModalShow]);

  useEffect(() => {
    if (!account) {
      return;
    }
    refreshTransactionList();
    const inter = setInterval(() => {
      refreshTransactionList();
    }, 30000);

    return () => {
      clearInterval(inter);
    };
  }, [account]);

  useEffect(() => {
    if (!account) {
      return;
    }

    refreshTransactionList();
  }, [account, updater]);

  return (
    <Container>
      <PublicTitle title="My transactions" subTitle="Check real time transaction status and claim your tokens." />
      <StatusWapper>
        <SingleStatus>
          <AmountWapper>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.868 12.8004C7.65977 12.7995 8.44298 12.6366 9.16938 12.3216C9.89579 12.0066 10.55 11.5462 11.0917 10.9688C11.6335 10.3913 12.0512 9.7091 12.3193 8.96409C12.5874 8.21909 12.7001 7.42709 12.6505 6.63688C12.6008 5.84666 12.39 5.07498 12.0308 4.36936C11.6716 3.66374 11.1718 3.03913 10.5621 2.53401C9.95238 2.02889 9.24571 1.65395 8.4856 1.43229C7.72549 1.21063 6.92805 1.14695 6.1424 1.24516L5.9936 0.0547645C7.21331 -0.0987046 8.45192 0.0717428 9.58484 0.548959C10.7178 1.02617 11.705 1.79333 12.4473 2.77324C13.1896 3.75316 13.6607 4.91128 13.8133 6.1311C13.9659 7.35091 13.7946 8.5894 13.3166 9.72198C12.8385 10.8546 12.0707 11.8413 11.0902 12.5829C10.1098 13.3244 8.95133 13.7948 7.73141 13.9465C6.51149 14.0982 5.27312 13.926 4.14089 13.4471C3.53605 13.1914 2.97291 12.8529 2.46656 12.4435L1.9832 13.0643H1.9824C1.7496 13.3627 1.236 13.2035 1.1696 12.8123L0.788803 10.5803C0.777856 10.5242 0.779057 10.4664 0.792323 10.4108C0.80559 10.3552 0.830615 10.3031 0.865713 10.258C0.90081 10.2129 0.945166 10.1759 0.995792 10.1494C1.04642 10.1228 1.10214 10.1075 1.1592 10.1043L3.4176 9.9275C3.8136 9.8955 4.092 10.3547 3.86 10.6539L3.20327 11.4974C3.53468 11.7676 3.89612 12.0013 4.28148 12.1932C5.08494 12.5933 5.97042 12.8012 6.868 12.8004ZM0.1424 8.34027C0.2 8.60027 0.2616 8.84427 0.325601 9.06827L1.5272 8.72827C1.46608 8.5118 1.41139 8.29357 1.3632 8.07387C1.31833 7.86526 1.28547 7.65424 1.2648 7.44187L0.0215998 7.56187C0.0463991 7.82427 0.0872002 8.08347 0.1424 8.33787V8.34027ZM0.316 4.80427C0.139288 5.35939 0.0333843 5.93461 0.000800134 6.51627H0L1.248 6.58667C1.27461 6.10965 1.36143 5.6379 1.5064 5.18267L0.316 4.80427ZM1.9576 2.08347C1.50689 2.54127 1.12286 3.06022 0.8168 3.62507H0.8176L1.916 4.21947C2.16607 3.75786 2.47981 3.3337 2.848 2.95947L1.9576 2.08347ZM4.6448 0.392268C4.03736 0.600024 3.46193 0.891644 2.9352 1.25867L3.648 2.28347C4.07938 1.98315 4.5506 1.74458 5.048 1.57467L4.6448 0.392268ZM7.1086 2.89057C6.97357 2.75554 6.79044 2.67969 6.59948 2.67969C6.40852 2.67969 6.22539 2.75554 6.09036 2.89057C5.95534 3.0256 5.87948 3.20873 5.87948 3.39969V7.29808L8.09068 9.50848C8.1566 9.57922 8.23608 9.63596 8.3244 9.67531C8.41272 9.71467 8.50806 9.73583 8.60474 9.73753C8.70141 9.73924 8.79744 9.72145 8.88709 9.68524C8.97675 9.64903 9.05819 9.59513 9.12656 9.52676C9.19493 9.45839 9.24883 9.37695 9.28504 9.2873C9.32125 9.19765 9.33903 9.10162 9.33733 9.00494C9.33562 8.90827 9.31446 8.81293 9.27511 8.72461C9.23576 8.63629 9.17902 8.5568 9.10828 8.49088L7.31948 6.70128V3.39969C7.31948 3.20873 7.24362 3.0256 7.1086 2.89057Z"
                fill="#979ABE"
              />
            </svg>
            {proccessSum}
            &nbsp;Pending
          </AmountWapper>
        </SingleStatus>
        <Sep />
        <SingleStatus
          data-bp="1005-002"
          onClick={() => {
            setSearchValueValue(value);
            setTransactionModalShow(true);
          }}
        >
          <AmountWapper>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="14" height="15" rx="3" stroke="#979ABE" stroke-width="2" />
              <path d="M5 6H11" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
              <path d="M5 10H9" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
            </svg>
            {transactionList.length}
            &nbsp;History
          </AmountWapper>
          <div>
            <ArrowRight />
          </div>
        </SingleStatus>
      </StatusWapper>

      <InputWapper>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle
            cx="8.73312"
            cy="8.73311"
            r="6.01829"
            transform="rotate(16.6277 8.73312 8.73311)"
            stroke="#979ABE"
            stroke-width="2"
          />
          <rect
            x="15.5457"
            y="13.5139"
            width="6.141"
            height="2.63186"
            rx="1.31593"
            transform="rotate(46.6277 15.5457 13.5139)"
            fill="#979ABE"
          />
        </svg>
        <Input
          placeholder="Search by address or Tx Hash"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              setSearchValueValue(value);
              setTransactionModalShow(true);
              setValue('');
            }
          }}
        />
      </InputWapper>

      {transactionModalShow && (
        <TransactionPanel
          addressOrHash={searchValue}
          transactionList={transactionList}
          onClose={() => {
            if (initModalShow) {
              router.back();
            } else {
              setTransactionModalShow(false);
            }
          }}
        />
      )}
    </Container>
  );
}
