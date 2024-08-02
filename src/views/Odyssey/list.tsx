import styled from "styled-components";

const StyledWrapper = styled.div`
    --var-container-width: 1244px;
    .section {
        background-image: url('/images/odyssey/odyssey-list-bg.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        height: 745px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column wrap;
        gap: 116px;
        .head {
            .slogen {
                width: 350px;
                height: 50px;
                margin-bottom: 20px;
            }
            .title {
                color: #979ABE;
                font-size: 20px;
                line-height: 30px;
            }
        }
    }
`

const OdysseyList = () => {
    return (
        <>
            <StyledWrapper>
                <div className="section">
                    <div className="head">
                        <img className="slogen" src="/images/odyssey/welcome/logo.png" alt="logo"></img>
                        <div className="title">Exclusive Seasonal Lootbox Experiences</div>
                    </div>
                </div>
            </StyledWrapper>
        </>
    )
}

export default OdysseyList;