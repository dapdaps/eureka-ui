import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import { getTransaction, saveAllTransaction } from '@/components/BridgeX/Utils'
import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import { addressFormated, balanceFormated, percentFormated, timeDurationFormated } from '@/utils/balance';

const Container = styled.div`
  padding: 16px;
  border-top: 1px solid rgba(55, 58, 83, 1);
`;

const Summary = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 8px;
    background-color: rgba(55, 58, 83, 0.5);
    height: 46px;
    padding: 0 20px;
    cursor: pointer;
    .icon1 {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .middle-title {
        color: rgba(151, 154, 190, 1);
    }
    .bridge-enter {
        display: flex;
        align-items: center;
        gap: 10px;
        color: rgba(235, 244, 121, 1);
        font-size: 16px;
        font-weight: bold;
        svg {
            margin-top: -2px;
        }
    }
`

const DetailWapper = styled.div`
    .detail-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .dt-title {
            font-size: 16px;
            font-weight: 600;
            line-height: 19.2px;
            color: rgba(151, 154, 190, 1);
        }
        .dt-view {
            border: 1px solid rgba(235, 244, 121, 1);
            border-radius: 24px;
            height: 26px;
            padding: 0 10px;
            color: rgba(235, 244, 121, 1);
            cursor: pointer;
        }
    }
`

const Sep = styled.div`
    height: 10px;
`

const Arrow = () => {
    return <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.8536 4.35355C12.0488 4.15829 12.0488 3.84171 11.8536 3.64645L8.67157 0.464466C8.47631 0.269204 8.15973 0.269204 7.96447 0.464466C7.7692 0.659728 7.7692 0.976311 7.96447 1.17157L10.7929 4L7.96447 6.82843C7.7692 7.02369 7.7692 7.34027 7.96447 7.53553C8.15973 7.7308 8.47631 7.7308 8.67157 7.53553L11.8536 4.35355ZM0 4.5H11.5V3.5H0V4.5Z" fill="white" />
    </svg>

}

const TransactionItem = styled.div`
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 8px;
    background-color: rgba(55, 58, 83, 0.5);
    margin-top: 16px;
    padding: 16px;
    .transaction-line {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        .part {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #fff;
        }
        .hash-copy {
            cursor: pointer;
        }
        &:not(:first-child) {
            margin-top: 5px;
        }
        .token-chain-img {
            position: relative;
            .token-img {
                width: 23px;
                height: 23px;
                border-radius: 100%;
            }
            .chain-img {
                position: absolute;
                right: 0;
                bottom: 0;
                width: 10px;
                height: 10px;
            }
        }
    }
`

function Transaction({ tx }: any) {
    const { success, fail } = useToast()

    return <TransactionItem>
        <div className="transaction-line">
            <div className="part">
                <div className="hash">
                    {addressFormated(tx.hash)}
                </div>
                <div className="hash-copy" onClick={async () => {
                    try {
                        await navigator.clipboard.writeText(tx.hash)
                        success({
                            title: 'Copy Success'
                        })
                    } catch (e) {
                        fail({
                            title: 'Copy Fail'
                        })
                    }
                }}>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.19232 5.38462C4.19232 4.55619 4.86389 3.88462 5.69232 3.88462H11.0769C11.9054 3.88462 12.5769 4.55619 12.5769 5.38462V11C12.5769 11.8284 11.9054 12.5 11.0769 12.5H5.69232C4.86389 12.5 4.19232 11.8284 4.19232 11V5.38462ZM5.69232 4.88462C5.41618 4.88462 5.19232 5.10847 5.19232 5.38462V11C5.19232 11.2761 5.41618 11.5 5.69232 11.5H11.0769C11.3531 11.5 11.5769 11.2761 11.5769 11V5.38462C11.5769 5.10847 11.3531 4.88462 11.0769 4.88462H5.69232Z" fill="#979ABE" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 2C0.5 1.17157 1.17157 0.5 2 0.5H7.38462C8.21304 0.5 8.88461 1.17157 8.88461 2V3.11538H7.88462V2C7.88462 1.72386 7.66076 1.5 7.38462 1.5H2C1.72386 1.5 1.5 1.72386 1.5 2V7.61539C1.5 7.89153 1.72386 8.11539 2 8.11539H2.84615V9.11539H2C1.17157 9.11539 0.5 8.44381 0.5 7.61539V2Z" fill="#979ABE" />
                    </svg>
                </div>
                <div className="hash-copy" onClick={() => {
                    window.open(`${tx.link}/tx/${tx.hash}`)
                }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 12C0.5 12.8284 1.17157 13.5 2 13.5L8.8 13.5C9.62843 13.5 10.3 12.8284 10.3 12L10.3 9.15L9.3 9.15L9.3 12C9.3 12.2761 9.07614 12.5 8.8 12.5L2 12.5C1.72386 12.5 1.5 12.2761 1.5 12L1.5 5.2C1.5 4.92386 1.72386 4.7 2 4.7L4.85 4.7L4.85 3.7L2 3.7C1.17157 3.7 0.499999 4.37157 0.499999 5.2L0.5 12Z" fill="#979ABE" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 7.50001L11.5 3.00001C11.5 2.72387 11.2762 2.50001 11 2.50001H6.50001C6.22387 2.50001 6.00001 2.72387 6.00001 3.00001C6.00001 3.27615 6.22387 3.50001 6.50001 3.50001H9.79291L5.04647 8.24645C4.85121 8.44171 4.85121 8.75829 5.04647 8.95355C5.24173 9.14881 5.55832 9.14881 5.75358 8.95355L10.5 4.20712L10.5 7.50001C10.5 7.77615 10.7239 8.00001 11 8.00001C11.2762 8.00001 11.5 7.77615 11.5 7.50001Z" fill="#979ABE" />
                    </svg>
                </div>
            </div>
            <div className="part">{timeDurationFormated(tx.time)}</div>
        </div>
        <div className="transaction-line">
            <div className="part" style={{ gap: '5px' }}>
                <div>{balanceFormated(tx.fromAmount)}</div>
                <div className="token-chain-img">
                    <img src={tx.fromTokenLogo} className="token-img" />
                    <img src={tx.fromChainLogo} className="chain-img" />
                </div>
                <div>{tx.fromTokenSymbol}</div>
                <Arrow />
                <div>{balanceFormated(tx.toAmout)}</div>
                <div className="token-chain-img">
                    <img src={tx.toTokenLogo} className="token-img" />
                    <img src={tx.toChainLogo} className="chain-img" />
                </div>
                <div>{tx.toTokenSymbol}</div>
            </div>
            <div className="part">
                <Loading size={20} />
            </div>
        </div>
    </TransactionItem>
}

export default function Transactions() {
    const { account, chainId, provider } = useAccount();
    const [sum, setSum] = useState(0)
    const [transactionList, setTransactionList] = useState<any>([])
    const [showDetail, setShowDetail] = useState(false)
    const router = useRouter();
    const [updater, setUpdater] = useState(Date.now())

    useEffect(() => {
        if (account) {
            getTransaction().then(transactionList => {
                setSum(transactionList?.length || 0)
                const _transactionList = transactionList.filter((item: any) => item.status !== 2)
                setTransactionList(_transactionList)
                if (_transactionList?.length > 0) {
                    setShowDetail(true)
                } else {
                    setShowDetail(false)
                }
            })
        }

    }, [account, updater])

    useEffect(() => {
        const inter = setInterval(() => {
            setUpdater(Date.now())
        }, 30000)

        return () => {
            clearInterval(inter)
        }
    }, [])

    return <Container>
        <Summary onClick={() => {
            router.push('/super-bridge')
        }}>
            <div className="bridge-enter">
                <svg width="25" height="17" viewBox="0 0 25 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M24.9383 17C24.3112 11.9467 18.9817 8 12.5 8C6.01836 8 0.688923 11.9467 0.0617676 17H4.21067C5.06961 12.992 8.45483 10 12.5 10C16.5453 10 19.9305 12.992 20.7894 17H24.9383Z" fill="#EBF479" />
                    <path d="M13.3985 1.56096C13.2307 1.21769 12.8821 1 12.5 1C12.1179 1 11.7693 1.21769 11.6015 1.56096L10.0782 4.67842L6.62553 6.07276C6.2475 6.22543 6 6.5923 6 7C6 7.4077 6.2475 7.77457 6.62553 7.92724L10.0782 9.32158L11.6015 12.439C11.7693 12.7823 12.1179 13 12.5 13C12.8821 13 13.2307 12.7823 13.3985 12.439L14.9218 9.32158L18.3745 7.92724C18.7525 7.77457 19 7.4077 19 7C19 6.5923 18.7525 6.22543 18.3745 6.07276L14.9218 4.67842L13.3985 1.56096Z" fill="#EBF479" stroke="#2F3145" stroke-width="2" stroke-linejoin="round" />
                </svg>
                <div>Super Bridge</div>
            </div>
            <div >
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 11L5 6L1 1" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
                </svg>
            </div>
        </Summary>
        <Sep />
        {
            showDetail
                ? <DetailWapper>
                    <div className="detail-top">
                        <div className="dt-title">{transactionList.length || 0} Pending Transactions</div>
                        <div className="dt-view" onClick={() => {
                            router.push('/super-bridge/transaction')
                        }}>View All</div>
                    </div>
                    {
                        transactionList.map((tx: any) => {
                            return <Transaction key={tx.hash} tx={tx} />
                        })
                    }
                </DetailWapper>
                : null
        }
        <Sep />
        <Summary onClick={() => {
            // setShowDetail(true)
            router.push('/super-bridge/transaction')
        }}>
            <div className="icon1">
                <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="1" y="1.92857" width="16" height="17.1429" rx="3" stroke="#979ABE" stroke-width="2" />
                    <path d="M5.57153 7.64286H12.4287" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
                    <path d="M5.57153 12.2143H10.143" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
                </svg>
                <div className="middle-title">
                    {sum || 0} History Transactions
                </div>
            </div>
            <div >
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 11L5 6L1 1" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
                </svg>
            </div>
        </Summary>


    </Container>
}
