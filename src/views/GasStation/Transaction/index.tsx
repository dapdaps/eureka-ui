import { useRouter } from 'next/router';
import { useCallback, useEffect,useRef, useState } from 'react';
import styled from 'styled-components';

import useCopy from '@/hooks/useCopy'
import useAccount from '@/hooks/useAccount';

import type { Chain, Token } from '@/types';
import { addressFormated,balanceFormated, percentFormated } from '@/utils/balance';
import { formateTxDate } from '@/utils/date';
import { useTransction } from '@/views/SuperBridge/hooks/useGasTokenHooks'

const Container = styled.div`
    width: 1104px;
    margin: 80px auto;
`

const Header = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    .title {
        font-size: 20px;
        font-weight: 700;
        line-height: 23.66px;
        text-align: left;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    .back {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 0;
        color: rgba(151, 154, 190, 1);
        font-size: 14px;
        font-weight: 500;
        line-height: 16.56px;
        display: flex;
        align-items: center;
        gap: 10px;
    }
`

const Content = styled.div`
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 16px;
    background-color: rgba(38, 40, 54, 1);
    height: 670px;
    margin-top: 20px;
    padding-top: 20px;
    table {
        width: 100%;
        thead {
            font-size: 14px;
            font-weight: 500;
            line-height: 16.56px;
            color: rgba(151, 154, 190, 1);
            tr {
                border-bottom: 1px solid rgba(55, 58, 83, 1);
                height: 60px;
                line-height: 60px;
                th {
                    padding-left: 20px;
                }
            }
        }
        tbody {
            border-bottom: 1px solid rgba(55, 58, 83, 1);
            height: 60px;
            line-height: 60px;
            color: #fff;
            font-size: 14px;
            font-weight: 500;
            td {
                padding-left: 20px;
                &.success {
                    color: rgba(102, 196, 87, 1);
                }
                &.pending {
                    color: rgba(51, 197, 244, 1);
                }
            }
            .mul-ele {
                display: flex;
                gap: 10px;
                align-items: center;
            }
        }
    }
`

const Copy = ({ onClick }: any) => {
    return <div onClick={onClick} style={{ cursor: 'pointer' }}><svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.55263 0H9.07895C9.32323 3.27158e-09 9.5575 0.0970392 9.73023 0.26977C9.90296 0.442501 10 0.676774 10 0.921053V6.44737C10 6.69165 9.90296 6.92592 9.73023 7.09865C9.5575 7.27138 9.32323 7.36842 9.07895 7.36842H3.55263C3.30835 7.36842 3.07408 7.27138 2.90135 7.09865C2.72862 6.92592 2.63158 6.69165 2.63158 6.44737V0.921053C2.63158 0.676774 2.72862 0.442501 2.90135 0.26977C3.07408 0.0970392 3.30835 0 3.55263 0ZM3.55263 0.789474C3.51773 0.789474 3.48427 0.803337 3.45959 0.828012C3.43492 0.852688 3.42105 0.886156 3.42105 0.921053V6.44737C3.42105 6.46465 3.42446 6.48176 3.43107 6.49772C3.43768 6.51369 3.44737 6.52819 3.45959 6.54041C3.47181 6.55263 3.48632 6.56232 3.50228 6.56893C3.51824 6.57554 3.53535 6.57895 3.55263 6.57895H9.07895C9.11384 6.57895 9.14731 6.56508 9.17199 6.54041C9.19666 6.51573 9.21053 6.48226 9.21053 6.44737V0.921053C9.21053 0.886156 9.19666 0.852688 9.17199 0.828012C9.14731 0.803337 9.11384 0.789474 9.07895 0.789474H3.55263ZM6.57895 8.1579C6.57895 8.0532 6.62054 7.9528 6.69456 7.87877C6.76859 7.80475 6.86899 7.76316 6.97368 7.76316C7.07837 7.76316 7.17878 7.80475 7.25281 7.87877C7.32683 7.9528 7.36842 8.0532 7.36842 8.1579V9.07895C7.36842 9.32323 7.27138 9.5575 7.09865 9.73023C6.92592 9.90296 6.69165 10 6.44737 10H0.921053C0.676774 10 0.442501 9.90296 0.26977 9.73023C0.0970392 9.5575 3.27158e-09 9.32323 0 9.07895V3.55263C0 3.30835 0.0970392 3.07408 0.26977 2.90135C0.442501 2.72862 0.676774 2.63158 0.921053 2.63158H1.84211C1.9468 2.63158 2.0472 2.67317 2.12123 2.7472C2.19525 2.82122 2.23684 2.92163 2.23684 3.02632C2.23684 3.13101 2.19525 3.23141 2.12123 3.30544C2.0472 3.37946 1.9468 3.42105 1.84211 3.42105H0.921053C0.886156 3.42105 0.852688 3.43492 0.828012 3.45959C0.803337 3.48427 0.789474 3.51773 0.789474 3.55263V9.07895C0.789474 9.11384 0.803337 9.14731 0.828012 9.17199C0.852688 9.19666 0.886156 9.21053 0.921053 9.21053H6.44737C6.48226 9.21053 6.51573 9.19666 6.54041 9.17199C6.56508 9.14731 6.57895 9.11384 6.57895 9.07895V8.1579Z" fill="#979ABE"/>
    </svg>
    </div>
}

interface Props {

}

export default function Transaction({

}: Props) {
    const { account, chainId, provider } = useAccount();
    const { transactionList } = useTransction(account as string)
    const { copy } = useCopy()
    const router = useRouter()

    return <Container>
        <Header>
            <div className="back" onClick={() => {
                router.back()
            }}>
                <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 1L2 6.49992L7.5 12" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
                </svg>
                <span>Back</span>
            </div>
            <div className='title'>
                ⛽
                <span>Gas Station</span>
            </div>
        </Header>
        <Content>
            <table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Amount</th>
                        <th>Tx Hash</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        transactionList.map(item => {
                            return <tr key={item.order_hash}>
                                {
                                    item.order_status !== 'finished' && <td className="pending">Pending</td>
                                }
                                {
                                    item.order_status === 'finished' && <td className="success">Success</td>
                                }
                                
                                <td>
                                    <div className="mul-ele">
                                        <img className="chain-icon" src={item.fromChainLogo} />
                                        <div>{ item.src_chain_name } </div>
                                        <div className="mul-ele">
                                            { addressFormated(item.src_address) }
                                            <Copy onClick={() => { copy(item.src_address) }}/>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="mul-ele">
                                        <img className="chain-icon"  src={item.toChainLogo} />
                                        <div>{ item.dst_chain_name } </div>
                                        <div className="mul-ele">
                                            { addressFormated(item.dst_address) }
                                            <Copy onClick={() => { copy(item.dst_address) }}/>
                                        </div>
                                    </div>
                                </td>
                                <td>{ balanceFormated(item.src_amount) } { item.fromTokenSymbol }</td>
                                <td>
                                    <div className="mul-ele">
                                        { addressFormated(item.order_hash) }
                                        <Copy onClick={() => { copy(item.order_hash) }}/>
                                    </div></td>
                                <td>{ formateTxDate(item.time) }</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </Content>
    </Container>
}