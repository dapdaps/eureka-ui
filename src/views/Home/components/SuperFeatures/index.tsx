import styled from "styled-components";
import Link from "next/link";

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
        font-family: Montserrat;
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
        font-family: Montserrat;
        margin-bottom: 50px;
    }
    .engages {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 158px;
        a {
            &:hover {
                text-decoration: none;
            }
        }
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
                    font-family: Montserrat;
                    font-weight: 400;
                    color: #979ABE;
                }
            }
        }
    }
`;

const SuperFeatures = () => {
    return <StyleFeatures>
        <div className="title">SUPER <span>FEATURES</span></div>
        <div className="subTitle">DapDap engages users in 5-10 mins in Super features by helping users to jump in crypto world more effectively.</div>
        <div className="engages">
            <Link href='/super-bridge'>
                <div className="section bridge">
                    <img className="logo" src="/images/home/logo-bridge.png" alt="bridge" />
                    <div className="desc" >
                        <div className="desc-title">Super Bridge</div>
                        <div className="tips">Transfer assets between Ethereum and EVM L2s super easily.</div>
                    </div>
                </div>
            </Link>
            <Link href='/super-swap'>
            <div className="section">
                <img className="logo" src="/images/home/logo-swap.png" alt="swap" />
                <div className="desc">
                    <div className="desc-title">Super Swap</div>
                    <div className="tips">Effortlessly swap tokens within any blockchain with Superswap's seamless exchange solution.</div>
                </div>
            </div> 
            </Link>
        </div>
    </StyleFeatures>
}

export default SuperFeatures;