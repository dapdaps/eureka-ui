import styled from "styled-components";
import { get } from '@/utils/http';
import { useEffect, useState } from 'react';
import { QUEST_PATH } from "@/config/quest";
import { formatIntegerThousandsSeparator } from "@/utils/format-number";
import { useRouter } from "next/router";

const StyleFeatures = styled.div`
    margin: 0 auto;
    width: 1248px;
    max-width: 1248px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title {
        font-weight: 500;
        font-size: 42px;
        color: #fff;
        margin-bottom: 30px;
        line-height: 34px;
        span {
            font-weight: 700;
            color: #EBF479;
        }
    }
    .subTitle {
        font-size: 20px;
        font-weight: 400;
        line-height: 24px;
        color: #979ABE;
        width: 835px;
        text-align: center;
        margin-bottom: 50px;
    }
    .engages {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 158px;
        margin-bottom: 200px;
        .section {
            display: flex;
            align-items: center;
            gap: 28px;
            &.bridge {
                &:hover {
                    cursor: pointer;
                }
            }
            .logo {
                width: 150px;
                height: 150px;
            }
            .desc {
                .desc-img {
                    width: 204px;
                    height: 45px;
                }
                .desc-title {
                    margin: 20px 0 26px 0;
                    font-family: Montserrat;
                    font-size: 26px;
                    font-weight: 700;
                    line-height: 32px;
                    text-align: left;
                    color: #fff;
                }
                .tips {
                    width: 320px;
                    text-align: left;
                    font-size: 16px;
                    font-weight: 400;
                    color: #979ABE;
                }
            }
        }
    }
    .platform {
        width: 100%;
        padding-bottom: 94px;
        .head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title {
                font-weight: 500;
                font-size: 42px;
                color: #fff;
                margin-bottom: 20px;
                line-height: 34px;
                span {
                    font-weight: 700;
                    color: #EBF479;
                }
            }
            .time {
                color: #979ABE;
                font-size: 16px;
                line-height: 20px;
                font-weight: 400;
            }
        }
        .modules {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 16px;
            .item {
                background: #18191E;
                border: 1px solid;
                border-image-source: linear-gradient(180deg, #202329 0%, #101115 100%);
                border-radius: 20px;
                height: 150px;
                padding: 30px 36px;
                .name {
                    font-size: 20px;
                    line-height: 20px;
                    display: inline-block;
                    border-bottom: 2px dotted #EBF479;
                    color: #979ABE;
                    padding-bottom: 10px;
                    margin-bottom: 10px;
                }
                .value {
                    font-weight: 700;
                    color: #fff;
                    font-size: 42px;
                    line-height: 51px;
                }
            }
        }
    }
`

interface IData {
    total_users?: number;
    total_transactions?: number;
    total_trading_volume?: number;
    updated_at?: string;
}

const SuperFeatures = () => {
    const [statData, setStatData] = useState<IData>({})
    const router = useRouter()
    const fetchStatData = () => {
        get(`${QUEST_PATH}/api/dashboard/summary`).then((res) => {
            setStatData(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchStatData()
    }, [])

    return <StyleFeatures>
        <div className="title">Super <span>Features</span></div>
        <div className="subTitle">DapDap engages users in 5-10 mins in Super features by helping users to jump in crypto world more effectively.</div>
        <div className="engages">
            <div className="section bridge" onClick={() => router.push('/super-bridge')}>
                <img className="logo" src="/images/home/logo-bridge.png" alt="bridge" />
                <div className="desc" >
                    <div className="desc-title">Super Bridge</div>
                    <div className="tips">Transfer assets between Ethereum and EVM L2s super easily.</div>
                </div>
            </div>
            <div className="section">
                <img className="logo" src="/images/home/logo-swap.png" alt="swap" />
                <div className="desc">
                    <div className="desc-title">Super Swap</div>
                    <div className="tips">Transfer assets between Ethereum and EVM L2s super easily.</div>
                </div>
            </div>
        </div>
        <div className="platform">
            <div className="head">
                <span className="title">Platform <span>Stats</span></span>
                {/* <span className="time">{formatDateString(statData.updated_at) || '-'}</span> */}
            </div>
            <div className="modules">
                <div className="item">
                    <div className="name">Participants</div>
                    <div className="value">{formatIntegerThousandsSeparator(statData.total_users)}</div>
                </div>
                <div className="item">
                    <div className="name">Transactions</div>
                    <div className="value">{formatIntegerThousandsSeparator(statData.total_transactions)}</div>
                </div>
                <div className="item">
                    <div className="name">Trading Volume</div>
                    <div className="value">{formatIntegerThousandsSeparator(statData.total_trading_volume)}</div>
                </div>
            </div>
        </div>
    </StyleFeatures>
}

export default SuperFeatures;