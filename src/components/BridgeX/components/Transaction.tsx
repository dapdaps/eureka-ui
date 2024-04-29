import { useEffect, useState } from 'react'
import styled from 'styled-components';
import Big from 'big.js'

import Loading from '@/components/Icons/Loading';

import { ArrowDown, ArrowUp } from './Arrows'

import { 
    getBalance,
    addressFormated,
    balanceFormated,
    getTransaction,
    saveTransaction,
    saveAllTransaction
 } from '../Utils'

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
        background-color: #EBF479;
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
      color: #979ABE;
    }
    .proccessing {
      color: #00D1FF;
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
        color: #64B5FF;
      }
    }
  }
`

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


// const {
//     getTransaction,
//     saveTransaction,
//     saveAllTransaction,
//     balanceFormated,
// } = VM.require('dapdapbos.near/widget/Bridge.Utils');

export default function Transaction(
    { updater, storageKey, getStatus, tool, account }: any
) {
    const [isFold, setIsFold] = useState(true)
    const [isLoadingTx, setIsLoadingTx] = useState<any>({})
    const [proccessSum, setProccessSum] = useState(0)
    const [transactionList, setTransactionList] = useState([])
    const [isLoading, setIsLoading] = useState(false)


    function refreshTransactionList() {
        
        setIsLoading(true)

        const transactionObj = getTransaction(storageKey)

        const transactionList: any = []
        let proccessSum = 0

        // console.log('transactionObj: ', transactionObj)

        const pList = transactionObj.transactionList.map((item: any) => {
            if (item.status === 2) {
                transactionList.push(item)
                return
            }
            return getStatus({
                hash: item.hash,
                chainId: item.fromChainId,
                address: account,
                fromChainId: item.fromChainId,
                toChainId: item.toChainId,
            }, tool).then((isComplate: boolean) => {
                if (isComplate) {
                    item.status = 2
                } else {
                    proccessSum++
                    item.status = 3
                }

                transactionList.push(item)
            }).catch((err: any) => {
                transactionList.push(item)
            })
        })

        Promise.all(pList).then(() => {
            // console.log('transactionObj.transactionList: ', transactionList.length, transactionList)
            if (transactionList.length > 0) {
                saveAllTransaction(storageKey, transactionList)
            }
            // saveAllTransaction(storageKey, transactionList)
            const isFold = proccessSum > 0
            setTransactionList(transactionList)
            setIsLoading(false)
            setProccessSum(proccessSum)
            setIsFold(isFold)

            
        }).catch(err => {
            if (transactionList.length > 0) {
                saveAllTransaction(storageKey, transactionList)
            }
            // saveAllTransaction(storageKey, transactionList)
            const isFold = proccessSum > 0

            setTransactionList(transactionList)
            setIsLoading(false)
            setProccessSum(proccessSum)
            setIsFold(isFold)
        })
    }

    useEffect(() => {
        refreshTransactionList()
    }, [updater])

    return <TransactionWapper>
        <div className="header">
            <div className="title">
                <span>Transaction History</span>
                <span>{proccessSum} Processing</span>
            </div>
            <div className="fresh">
                <RefreshText onClick={() => {
                    refreshTransactionList()
                }}>
                    {isLoading && (
                        <Loading size={16}/>
                    )}
                    Refresh
                </RefreshText>
                <ArrowIcon onClick={() => {
                    setIsFold(!isFold)
                }}>
                    <ArrowDown />
                </ArrowIcon>
            </div>
        </div>
        {
            isFold ? <div className="list">
                {
                    (transactionList || []).map((tx: any) => {
                        return <div className="tx-line" key={tx.hash}>
                            <div className="chain-token-status">
                                <div className="chain-token">
                                    <img src={tx.fromChainLogo} />
                                    {/* <Widget src="bluebiu.near/widget/Base.Bridge.SwapRightIcon" /> */}
                                    <img src={tx.toChainLogo} />
                                    <img src={tx.fromTokenLogo} />
                                    <div>{balanceFormated(tx.fromAmount)} {tx.fromTokenSymbol}</div>
                                    {/* <Widget src="bluebiu.near/widget/Base.Bridge.SwapRightIcon" /> */}
                                    <img src={tx.toTokenLogo} />
                                    <div>{balanceFormated(tx.toAmout)} {tx.toToenSymbol}</div>
                                </div>
                                <div>
                                    {
                                        tx.status === 1 && <div className="btn" onClick={() => {
                                            if (isLoadingTx[tx.hash]) {
                                                return
                                            }
                                            // handleClaim(tx.claim_info, tx.hash)

                                        }}>
                                            {isLoadingTx[tx.hash] && (
                                                <Loading size={16}/>
                                            )}
                                            Claim
                                        </div>
                                    }
                                    {
                                        tx.status === 2 && <div className="complete">Complete</div>
                                    }
                                    {
                                        tx.status === 3 && <div className="processing">Processing</div>
                                    }
                                </div>
                            </div>
                            <div className="time">
                                <div className="format-time-link">
                                    <div className="format-time">
                                        { tx.time }
                                    </div>
                                    <a target="_blank" className="tx-link" href={`${tx.link}/tx/${tx.hash}`}>Tx</a>
                                </div>
                                {
                                    tx.status === 3 ? <div>~{tx.duration} min</div> : null
                                }
                            </div>
                        </div>
                    })
                }
            </div> : null
        }

    </TransactionWapper>
}