import styled from "styled-components";
import SwiperList from "./components/Swiper";
import ToggleTab from "./components/Tabs";


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
    .compass {
        width: var(--var-container-width);
    }
    .odyssey {
        padding: 55px 0;
        display: flex;
        width: var(--var-container-width);
        margin: 0 auto;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            .all-odyssey-text {
                width: 194px;
                height: 32px;
            }
            .tab {
                width: 192px;
                height: 36px;
            }
        }
        .odyssey-list {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px; 
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
                    <div className="compass">
                        <SwiperList />
                    </div>
                </div>
                <div className="odyssey">
                        <div className="header">
                            <img className="all-odyssey-text" src="/images/odyssey/all-odyssey-text.png" alt="text" />
                            <ToggleTab />
                        </div>
                        <div className="odyssey-list">
  
                        </div>
                    </div>
            </StyledWrapper>
        </>
    )
}

export default OdysseyList;