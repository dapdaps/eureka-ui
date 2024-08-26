import { useDebounce } from 'ahooks';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import useAccount from '@/hooks/useAccount';
import { balanceFormated, addressFormated } from '@/utils/balance';
import useToast from '@/hooks/useToast';
import { formateTxDate } from '@/utils/date';

import { useTransction } from '@/views/SuperBridge/hooks/useGasTokenHooks'

const Container = styled.div`
    background-color: rgba(38, 40, 54, 1);
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 16px;
    position: absolute;
    width: 1234px;
    left: 50%;
    transform: translateX(-50%);
    top: 80px;
    z-index: 11;
    bottom: 80px;
`

const Header = styled.div`
    position: relative;
    border-bottom: 1px solid rgba(55, 58, 83, 1);
    .back {
        cursor: pointer;
        position: absolute;
        font-size: 14px;
        font-weight: 400;
        line-height: 16.8px;
        color: rgba(151, 154, 190, 1);
        display: flex;
        align-items: center;
        gap: 10px;
        top: 40px;
        left: 65px;
    }
    .trans-title {
        font-size: 26px;
        font-weight: 700;
        line-height: 31.2px;
        color: #fff;
        text-align: center;
        padding-top: 50px;
    }
    .trans-input-wapper {
        width: 480px;
        height: 44px;
        border-radius: 8px;
        padding: 0 10px;
        border: 1px solid rgba(55, 58, 83, 1);
        /* margin: 20px auto; */
        display: flex;
        align-items: center;
        background-color: rgba(27, 30, 39, 1);
        gap: 10px;
        input {
            color: #fff;
            flex: 1;
        }
    }
    .trans-top-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 95px 0 30px;
        margin-top: 20px;
    }
    .trans-tabs {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
        .trans-tab {
            width: 244px;
            text-align: center;
            padding: 17px 0;
            border-bottom: 3px solid rgba(235, 244, 121, 0);
            &.active {
                border-bottom: 3px solid rgba(235, 244, 121, 1);
            }
        }
    }
`

const Content = styled.div`
    overflow: auto;
    padding: 0 66px;
    height: calc(100% - 170px);
    overflow: auto;
    table  {
        width: 100%;
        margin-top: 20px;
        thead {
            th {
                font-size: 14px;
                font-weight: 400;
                line-height: 16.8px;
                color: rgba(124, 127, 150, 1);
                padding: 10px 0;
            }
        }
        tbody {
            td {
                vertical-align: top;
                border-bottom: 1px solid rgba(52, 56, 56, 1);
                padding: 10px 0;
                .flex-line {
                    display: flex;
                    gap: 10px;
                    align-items: center;
                    .hash {
                        font-size: 16px;
                        color: #fff;
                    }
                    &.second {
                        margin-top: 5px;
                        font-size: 14px;
                        font-weight: 400;
                        line-height: 16.8px;
                        color: rgba(124, 127, 150, 1);
                    }
                    .icon {
                        width: 22px;
                        height: 22px;
                        border-radius: 22px;
                    }
                    .trans-chain-name {
                        color: #fff;
                        font-size: 16px;
                        font-weight: 400;
                        line-height: 19.2px;
                    }
                    .amount {
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 16.8px;
                        color: rgba(255, 255, 255, 1);
                    }
                }
                .status-2 {
                    color: rgba(51, 197, 244, 1);
                }
                .status-3 {
                    color: rgba(111, 190, 62, 1);
                }
                .j-end {
                    /* justify-content: end; */
                }
                .hash-copy {
                    cursor: pointer;
                }
            }
        }
    }
`

const Arrow = () => {
    return <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.8536 4.35355C12.0488 4.15829 12.0488 3.84171 11.8536 3.64645L8.67157 0.464466C8.47631 0.269204 8.15973 0.269204 7.96447 0.464466C7.7692 0.659728 7.7692 0.976311 7.96447 1.17157L10.7929 4L7.96447 6.82843C7.7692 7.02369 7.7692 7.34027 7.96447 7.53553C8.15973 7.7308 8.47631 7.7308 8.67157 7.53553L11.8536 4.35355ZM0 4.5H11.5V3.5H0V4.5Z" fill="white" />
    </svg>

}

interface Porps {
    onClose: () => void;
    transactionList: any[];
    addressOrHash?: string;
    initTabIndex?: number;
}

export default function TransactionPanel(
    { initTabIndex, onClose, transactionList, addressOrHash }: Porps
) {
    const { success, fail } = useToast()
    const [filterTransactionList, setFilterTransactionList] = useState(transactionList)
    const [value, setValue] = useState('')
    const [tabIndex, setTabIndex] = useState(initTabIndex)
    const { account, chainId, provider } = useAccount();
    const { transactionList: gasTransactionList } = useTransction(account as string)
    const [filterGasTransactionList, setFilterGasTransactionList] = useState(gasTransactionList)
    const inputValue = useDebounce(value, { wait: 500 });

    useEffect(() => {
        if (inputValue && transactionList) {
            const filterTransactionList = transactionList.filter(item => {
                if (item.hash.indexOf(inputValue) > -1) {
                    return true
                }

                if (item.fromAddress.indexOf(inputValue) > -1) {
                    return true
                }

                if (item.toAddress.indexOf(inputValue) > -1) {
                    return true
                }

                return false
            })

            setFilterTransactionList(filterTransactionList)
        } else {
            setFilterTransactionList(transactionList)
        }

        if (inputValue && gasTransactionList) {
            const filterTransactionList = gasTransactionList.filter(item => {
                if (item.order_hash.indexOf(inputValue) > -1) {
                    return true
                }

                if (item.src_address.indexOf(inputValue) > -1) {
                    return true
                }

                return false
            })

            setFilterGasTransactionList(filterTransactionList)
        } else {
            setFilterGasTransactionList(gasTransactionList)
        }

    }, [inputValue, transactionList, gasTransactionList])

    useEffect(() => {
        if (addressOrHash) {
            setValue(addressOrHash)
        }
    }, [addressOrHash])


    return <Container>
        <Header>
            <div className="back" onClick={onClose}>
                <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 1L1 4L4 7" stroke="#979ABE" stroke-linecap="round" />
                </svg>
                Back
            </div>
            <div className="trans-title">My Transactions</div>
            <div className='trans-top-wrapper'>
                <div className="trans-tabs">
                    <div
                        className={`trans-tab ${tabIndex === 1 ? 'active' : ''}`}
                        onClick={() => { setTabIndex(1) }}>Bridge Transactions</div>
                    <div
                        className={`trans-tab ${tabIndex === 2 ? 'active' : ''}`}
                        onClick={() => { setTabIndex(2) }}>Gas Token Transactions</div>
                </div>
                <div className="trans-input-wapper">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8.73312" cy="8.73311" r="6.01829" transform="rotate(16.6277 8.73312 8.73311)" stroke="#979ABE" stroke-width="2" />
                        <rect x="15.5457" y="13.514" width="6.141" height="2.63186" rx="1.31593" transform="rotate(46.6277 15.5457 13.514)" fill="#979ABE" />
                    </svg>
                    <input value={value} onChange={e => {
                        setValue(e.target.value)
                    }} placeholder="Search by address or tx hash" />
                </div>
            </div>
        </Header>
        <Content>
            {
                tabIndex === 1 ? <table>
                    <thead>
                        <tr>
                            <th>Tx Hash</th>
                            <th>Bridge Direction</th>
                            <th>Send</th>
                            <th></th>
                            <th>Receive</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterTransactionList.length === 0 ? <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: 40, color: '#fff' }}>No found.</td>
                            </tr> : null
                        }
                        {
                            filterTransactionList?.map(tx => {
                                return <tr key={tx.hash}>
                                    <td>
                                        <div className="flex-line">
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
                                        <div className="flex-line second">
                                            {formateTxDate(tx.time)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex-line">
                                            <img src={tx.fromChainLogo} className="icon" />
                                            <div className="trans-chain-name">{tx.fromChainName}</div>
                                            <div>
                                                <Arrow />
                                            </div>
                                            <img src={tx.toChainLogo} className="icon" />
                                            <div className="trans-chain-name">{tx.toChainName}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex-line">
                                            <img src={tx.fromTokenLogo} className="icon" />
                                            <div className="amount">{balanceFormated(tx.fromAmount)} {tx.fromTokenSymbol}</div>
                                        </div>
                                        <div className="flex-line second">
                                            <div>{addressFormated(tx.fromAddress)}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <Arrow />
                                    </td>
                                    <td>
                                        <div className="flex-line">
                                            <img src={tx.toTokenLogo} className="icon" />
                                            <div className="amount">{balanceFormated(tx.toAmout)} {tx.toTokenSymbol}</div>
                                        </div>
                                        <div className="flex-line second">
                                            <div>{addressFormated(tx.toAddress)}</div>
                                        </div>
                                    </td>
                                    <td>
                                        {
                                            tx.status === 2 && <div className="flex-line j-end status-2">Complete</div>
                                        }
                                        {
                                            tx.status === 3 && <div className="flex-line j-end status-3">Processing</div>
                                        }
                                        <div className="flex-line j-end second">~{tx.duration}min</div>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table> : <table>
                    <thead>
                        <tr>
                            <th>Tx Hash</th>
                            <th>Bridge Direction</th>
                            <th>Send</th>
                            <th></th>
                            <th>Receive</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterGasTransactionList.length === 0 ? <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: 40, color: '#fff' }}>No found.</td>
                            </tr> : null
                        }
                        {
                            filterGasTransactionList?.map(tx => {
                                return <tr key={tx.order_hash}>
                                    <td>
                                        <div className="flex-line">
                                            <div className="hash">
                                                {addressFormated(tx.order_hash)}
                                            </div>
                                            <div className="hash-copy" onClick={async () => {
                                                try {
                                                    await navigator.clipboard.writeText(tx.order_hash)
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
                                                window.open(`${tx.link}/tx/${tx.order_hash}`)
                                            }}>
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 12C0.5 12.8284 1.17157 13.5 2 13.5L8.8 13.5C9.62843 13.5 10.3 12.8284 10.3 12L10.3 9.15L9.3 9.15L9.3 12C9.3 12.2761 9.07614 12.5 8.8 12.5L2 12.5C1.72386 12.5 1.5 12.2761 1.5 12L1.5 5.2C1.5 4.92386 1.72386 4.7 2 4.7L4.85 4.7L4.85 3.7L2 3.7C1.17157 3.7 0.499999 4.37157 0.499999 5.2L0.5 12Z" fill="#979ABE" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 7.50001L11.5 3.00001C11.5 2.72387 11.2762 2.50001 11 2.50001H6.50001C6.22387 2.50001 6.00001 2.72387 6.00001 3.00001C6.00001 3.27615 6.22387 3.50001 6.50001 3.50001H9.79291L5.04647 8.24645C4.85121 8.44171 4.85121 8.75829 5.04647 8.95355C5.24173 9.14881 5.55832 9.14881 5.75358 8.95355L10.5 4.20712L10.5 7.50001C10.5 7.77615 10.7239 8.00001 11 8.00001C11.2762 8.00001 11.5 7.77615 11.5 7.50001Z" fill="#979ABE" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="flex-line second">
                                            {formateTxDate(tx.timestamp)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex-line">
                                            <img src={tx.fromChainLogo} className="icon" />
                                            <div className="trans-chain-name">{tx.src_chain_name}</div>
                                            <div>
                                                <Arrow />
                                            </div>
                                            <img src={tx.toChainLogo} className="icon" />
                                            <div className="trans-chain-name">{tx.dst_chain_name}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex-line">
                                            <img src={tx.fromTokenLogo} className="icon" />
                                            <div className="amount">{balanceFormated(tx.src_amount)} {tx.fromTokenSymbol}</div>
                                        </div>
                                        <div className="flex-line second">
                                            <div>{addressFormated(tx.src_address)}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <Arrow />
                                    </td>
                                    <td>
                                        <div className="flex-line">
                                            <img src={tx.toTokenLogo} className="icon" />
                                            <div className="amount">{balanceFormated(tx.dst_amount)} {tx.toTokenSymbol}</div>
                                        </div>
                                        <div className="flex-line second">
                                            <div>{addressFormated(tx.dst_address)}</div>
                                        </div>
                                    </td>
                                    <td>
                                        {
                                            tx.order_status === 'finished' && <div className="flex-line j-end status-2">Complete</div>
                                        }
                                        {
                                            tx.order_status !== 'finished' && <div className="flex-line j-end status-3">Processing</div>
                                        }
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            }

        </Content>
    </Container>
}