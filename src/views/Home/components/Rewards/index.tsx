import styled from "styled-components";

const StyledRecentRewards = styled.div`
    height: 646px;
    display: flex;
    flex-flow: wrap row;
    justify-content: center;
    align-items: center;
    .title {
        font-size: 42px;
        font-weight: 500;
        color: #fff;
        span {
            color: #EBF479;
            line-height: 51px;
        }
    }
`


const RecentRewards = () => {
    return (
        <StyledRecentRewards>
            <div className="title">Recent <span>Rewards</span></div>
        </StyledRecentRewards>
    )
    
}

export default RecentRewards;