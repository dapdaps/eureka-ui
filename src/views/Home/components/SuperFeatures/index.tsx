import styled from "styled-components";

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
            .logo {
                width: 150px;
                height: 150px;
            }
            .desc {
                .desc-img {
                    width: 204px;
                    height: 45px;
                    margin: 20px 0 15px 0;
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

const SuperFeatures = () => {
    return <StyleFeatures>
        <div className="title">Super <span>Features</span></div>
        <div className="subTitle">DapDap engages users in 5-10 mins in Super features by helping users to jump in crypto world more effectively.</div>
        <div className="engages">
            <div className="section">
                <img className="logo" src="/images/home/logo-bridge.png" alt="bridge" />
                <div className="desc">
                    <img className="desc-img" src="/images/home/group-bridge.png" alt="" />
                    <div className="tips">Transfer assets between Ethereum and EVM L2s super easily.</div>
                </div>
            </div>
            <div className="section">
                <img className="logo" src="/images/home/logo-swap.png" alt="swap" />
                <div className="desc">
                    <img  className="desc-img" src="/images/home/group-swap.png" alt="" />
                    <div className="tips">Transfer assets between Ethereum and EVM L2s super easily.</div>
                </div>
            </div>
        </div>
        <div className="platform">
            <div className="head">
                <span className="title">Platform <span>Stats</span></span>
                <span className="time">15 July, 2024 | Monday 10 : 26 AM</span>
            </div>
            <div className="modules">
                <div className="item">
                    <div className="name">Participants</div>
                    <div className="value">142.70K</div>
                </div>
                <div className="item">
                    <div className="name">Participants</div>
                    <div className="value">142.70K</div>
                </div>
                <div className="item">
                    <div className="name">Participants</div>
                    <div className="value">142.70K</div>
                </div>
            </div>
        </div>
    </StyleFeatures>
}

export default SuperFeatures;