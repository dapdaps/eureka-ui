import styled from 'styled-components';

const Market = styled.div`
    width: 100%;
`;
const MarketTableHeader = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    gap: 4px;
    padding-left: 20px;
    height: 38px;
`;
const Item = styled.div`
    display: flex;
    gap: 6px;
    align-items: center;
    justify-content: center;
    color: #fff;
    flex-grow: 1;
    height: 100%;
    &.td {
        min-height: 52px;
    }
    &.asset {
        width: 20%;
        color: #7c7f96;
        justify-content: left;
        flex-grow: 0;
    }
    &.head_apy {
        justify-content: flex-start;
    }
    &.apy {
        flex-direction: column;
        align-items: flex-start;
        padding: 6px 0px;
    }
    &.w_60 {
        width: 60%;
    }
    &.w_40 {
        width: 40%;
    }
    &.w_33 {
        width: 33.33333333%;
    }
`;
const RewardApyItem = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;
const RewardIcon = styled.img`
    width: 14px;
    height: 14px;
`;
const RewardApy = styled.div`
    font-weight: 400;
    line-height: 14px;
    color: rgba(255, 255, 255, 0.5);
`;
const MergeItems = styled.div`
    display: flex;
    align-items: center;
    border-radius: 6px;
    height: 100%;
    &.supply {
        width: 32%;
    }
    &.header-supply {
        background-color: var(--supply-bg-color);
    }
    &.body-supply {
        cursor: pointer;
        &:hover {
            background-color: var(--supply-bg-color);
        }
    }
    &.borrow {
        width: 48%;
    }
    &.header-borrow {
        background-color: var(--borrow-bg-color);
    }
    &.body-borrow {
        cursor: pointer;
        &:hover {
            background-color: var(--borrow-bg-color);
        }
    }
`;
const ArrowIconWrapper = styled.div`
    opacity: 0.3;
    cursor: pointer;
    transform: rotate(90deg);
    &.active {
        opacity: 1;
    }
`;
const Row = styled.div`
    margin-top: 4px;
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    gap: 4px;
    background-color: rgba(53, 55, 73, 0.2);
    border-radius: 6px;
    padding-left: 20px;
`;

export {
    Market,
    MarketTableHeader,
    Item,
    RewardApyItem,
    RewardIcon,
    RewardApy,
    MergeItems,
    ArrowIconWrapper,
    Row,
};