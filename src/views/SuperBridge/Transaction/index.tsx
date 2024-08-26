import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { execute, getAllToken, getBridgeMsg, getChainScan, getIcon, getQuote, getStatus,init } from 'super-bridge-sdk';

import { getTransaction, saveTransaction, updateTransaction } from '@/components/BridgeX/Utils';
import useAccount from '@/hooks/useAccount';

import { ArrowRight } from '../Arrow';
import PublicTitle from '../PublicTitle';
import TransactionPanel from './TransactionPanel';
import { useTransction } from '@/views/SuperBridge/hooks/useGasTokenHooks'

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
    const [tabIndex, setTabIndex] = useState(1);
    const { account, chainId, provider } = useAccount();
    const router = useRouter();
    const { transactionList: gasTransactionList } = useTransction(account as string);

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

    return <Container>
        <PublicTitle title="My transactions" subTitle='Check real time transaction status and claim your tokens.' />
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
                setTabIndex(1);
                setSearchValueValue(value);
                setTransactionModalShow(true)
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

        <StatusWapper style={{ marginTop: 10 }}>
            <SingleStatus onClick={() => { setTabIndex(2); setSearchValueValue(value); setTransactionModalShow(true) }}>
                <AmountWapper>
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.820513 12.8333V0.777778C0.820513 0.571498 0.906959 0.373668 1.06084 0.227806C1.21471 0.0819443 1.42341 0 1.64103 0H9.02564C9.24325 4.83468e-09 9.45195 0.0819443 9.60583 0.227806C9.75971 0.373668 9.84615 0.571498 9.84615 0.777778V7H11.4872C11.9224 7 12.3398 7.16389 12.6476 7.45561C12.9553 7.74733 13.1282 8.143 13.1282 8.55556V12.0556C13.1282 12.2618 13.2147 12.4596 13.3686 12.6055C13.5224 12.7513 13.7311 12.8332 13.9487 12.8332C14.1663 12.8332 14.375 12.7513 14.5289 12.6055C14.6827 12.4596 14.7692 12.2618 14.7692 12.0556V6.22222H13.1282C12.9106 6.22222 12.7019 6.14028 12.548 5.99442C12.3941 5.84855 12.3077 5.65072 12.3077 5.44444V2.65533L11.4142 1.80833C11.3533 1.7507 11.3052 1.68214 11.2726 1.60668C11.24 1.53121 11.2237 1.45035 11.2244 1.36881C11.2252 1.28728 11.2431 1.2067 11.2771 1.1318C11.3111 1.05689 11.3604 0.98916 11.4224 0.932555C11.5493 0.816508 11.719 0.752112 11.8953 0.75313C12.0716 0.754147 12.2406 0.820497 12.3659 0.938L15.7596 4.11678C15.8359 4.18891 15.8964 4.27462 15.9377 4.36899C15.9789 4.46335 16.0001 4.56452 16 4.66667V12.0556C16 13.3443 15.1056 14 13.9487 14C12.7918 14 11.8974 13.3443 11.8974 12.0556V8.55556C11.8974 8.45242 11.8542 8.3535 11.7773 8.28057C11.7003 8.20764 11.596 8.16667 11.4872 8.16667H9.84615V12.8333H10.0513C10.2145 12.8333 10.371 12.8948 10.4864 13.0042C10.6018 13.1136 10.6667 13.262 10.6667 13.4167C10.6667 13.5714 10.6018 13.7197 10.4864 13.8291C10.371 13.9385 10.2145 14 10.0513 14H0.615385C0.452174 14 0.295649 13.9385 0.180242 13.8291C0.064835 13.7197 0 13.5714 0 13.4167C0 13.262 0.064835 13.1136 0.180242 13.0042C0.295649 12.8948 0.452174 12.8333 0.615385 12.8333H0.820513ZM2.05128 1.55556V5.83333C2.05128 5.8844 2.06189 5.93497 2.08251 5.98215C2.10313 6.02934 2.13335 6.07221 2.17144 6.10832C2.20954 6.14443 2.25477 6.17308 2.30454 6.19262C2.35431 6.21216 2.40766 6.22222 2.46154 6.22222H8.20513C8.31394 6.22222 8.41829 6.18125 8.49522 6.10832C8.57216 6.03539 8.61538 5.93647 8.61538 5.83333V1.55556C8.61538 1.50449 8.60477 1.45392 8.58416 1.40673C8.56354 1.35955 8.53332 1.31668 8.49522 1.28057C8.45713 1.24446 8.4119 1.21581 8.36213 1.19627C8.31235 1.17673 8.259 1.16667 8.20513 1.16667H2.46154C2.40766 1.16667 2.35431 1.17673 2.30454 1.19627C2.25477 1.21581 2.20954 1.24446 2.17144 1.28057C2.13335 1.31668 2.10313 1.35955 2.08251 1.40673C2.06189 1.45392 2.05128 1.50449 2.05128 1.55556Z" fill="#979ABE" />
                    </svg>
                    {gasTransactionList.length}
                    &nbsp;Gas transaction history
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
                    setTabIndex(1);
                    setSearchValueValue(value);
                    setTransactionModalShow(true);
                    setValue('');
                }
              }}
            />
        </InputWapper>

      {transactionModalShow && (
        <TransactionPanel
          initTabIndex={tabIndex}
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
