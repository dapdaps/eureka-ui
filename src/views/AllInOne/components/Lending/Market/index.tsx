import Big from 'big.js';
import { memo, useCallback, useEffect, useState } from 'react';

import LendingArrowIcon from '../LendingArrowIcon'
import LendingAsset from '../LendingAsset'
import LendingTotal from '../LendingTotal';
import {
    ArrowIconWrapper,
    Item,
    Market,
    MarketTableHeader,
    MergeItems,
    RewardApy,
    RewardApyItem,
    RewardIcon,
    Row,
} from './styles'

interface IProps {
    currentDapp: string;
    timestamp: any;
    markets: any;
    dapps: any;
    onButtonClick: (address: string, action: string) => void;
}


const LendingMarket = (props: IProps) => {

    const { currentDapp, markets, dapps, timestamp, onButtonClick } = props;

    const [sortKey, setSortKey] = useState('supplyApy');
    const [marketInfo, setMarketInfo] = useState<any[]>();

    const initialTimestamp = localStorage.getItem("prevMarketTimestampMarket") || "";
    const [prevMarketTimestamp, setPrevMarketTimestamp] = useState(initialTimestamp);


    const formateData = useCallback((key: string) => {
        console.log('formateData');
        
        const marketsToList = Object.values(markets);
    
        const data: any[] = marketsToList
        .filter((market: any) => currentDapp === "All" || market.dapp === currentDapp)
        .map((market: any) => {
          const dapp = dapps[market.dapp];
          return {
            icon: market.underlyingToken.icon,
            symbol: market.underlyingToken.symbol,
            dappIcon: dapp.dappIcon,
            dappName: dapp.dappName,
            totalSupply: Big(market.totalSupply).mul(market.underlyingPrice).toString(),
            supplyApy: market.supplyApy,
            totalBorrows: Big(market.totalBorrows).mul(market.underlyingPrice).toString(),
            borrowApy: market.borrowApy,
            liquidity: Big(market.liquidity).mul(market.underlyingPrice).toString(),
            address: market.address,
            distributionApy: market.distributionApy,
          };
        });
      
      const marketData = data.sort((a, b) => {
        if (["supplyApy", "borrowApy"].includes(key)) {
            return parseFloat(b[key].slice(0, -1)) - parseFloat(a[key].slice(0, -1));
        }
        return parseFloat(b[key]) - parseFloat(a[key]);
      });
      
    
        setMarketInfo(marketData)
    }, [markets, currentDapp, dapps]);

    useEffect(() => {
      if (prevMarketTimestamp !== timestamp && markets) {
        formateData(sortKey);
        localStorage.setItem("prevMarketTimestampMarket", timestamp);
        setPrevMarketTimestamp(timestamp);
      }
    }, [sortKey, formateData, markets, timestamp, prevMarketTimestamp]);

    return (
        <Market>
            <MarketTableHeader>
            <Item className="asset">Asset</Item>
            <MergeItems className="supply header-supply">
                <Item className="w_60">Deposit</Item>
                <Item className="w_40 head_apy">
                Deposit APY
                <ArrowIconWrapper
                    className={sortKey === "supplyApy" ? "active" : ""}
                    onClick={() => {
                        setSortKey('supplyApy')
                        formateData("supplyApy");
                    }}
                >
                    <LendingArrowIcon color='#fff' />
                </ArrowIconWrapper>
                </Item>
            </MergeItems>
            <MergeItems className="borrow header-borrow">
                <Item className="w_33">Borrowed</Item>
                <Item className="w_33 head_apy">
                Borrow APY
                <ArrowIconWrapper
                    className={sortKey === "borrowApy" ? "active" : ""}
                    onClick={() => {
                        setSortKey('borrowApy')
                        formateData("borrowApy");
                    }}
                >
                    <LendingArrowIcon color='#fff' />
                </ArrowIconWrapper>
                </Item>
                <Item className="w_33">
                Market Size
                <ArrowIconWrapper
                    className={sortKey === "liquidity" ? "active" : ""}
                    onClick={() => {
                        setSortKey("liquidity");
                        formateData("liquidity");
                    }}
                >
                    <LendingArrowIcon color='#fff' />
                </ArrowIconWrapper>
                </Item>
            </MergeItems>
            </MarketTableHeader>
            {(marketInfo || []).map((market: any) => (
            <Row key={market.address}>
                <Item className="td asset">
                <LendingAsset 
                    icon={market.icon}
                    symbol={market.symbol}
                    dappIcon={market.dappIcon}
                    dappName={market.dappName}
                />
                </Item>
                <MergeItems
                className="supply body-supply"
                onClick={() => {
                    onButtonClick(market.address, "Deposit");
                }}
                >
                <Item className="td w_60">
                    <LendingTotal 
                        total={market.totalSupply}
                        digit={2}
                        unit={"$"}
                    />
                </Item>
                <Item className="td w_40 apy">
                    <div>{market.supplyApy}</div>
                    {market.distributionApy &&
                    market.distributionApy
                        .filter((reward: any) => {
                        const apy = reward.supply.slice(0, -1);
                        return !!Number(apy);
                        })
                        .map((reward: any) => (
                        <RewardApyItem key={reward.symbol}>
                            <RewardIcon src={reward.icon} />
                            <RewardApy>{reward.supply}</RewardApy>
                        </RewardApyItem>
                        ))}
                </Item>
                </MergeItems>
                <MergeItems
                className="borrow body-borrow"
                onClick={() => {
                    onButtonClick(market.address, "Borrow");
                }}
                >
                <Item className="td w_33">
                    <LendingTotal 
                            total={market.totalBorrows}
                            digit={2}
                            unit={"$"}
                    />
                </Item>
                <Item className="td w_33 apy">
                    <div>{market.borrowApy}</div>
                    {market.distributionApy &&
                    market.distributionApy
                        .filter((reward: any) => {
                        const apy = reward.borrow.slice(0, -1);
                        return !!Number(apy);
                        })
                        .map((reward: any) => (
                        <RewardApyItem key={reward.symbol}>
                            <RewardIcon src={reward.icon} />
                            <RewardApy>{reward.borrow}</RewardApy>
                        </RewardApyItem>
                        ))}
                </Item>
                <Item className="td w_33">
                    <LendingTotal 
                            total={market.liquidity}
                            digit={2}
                            unit={"$"}
                    />
                </Item>
                </MergeItems>
            </Row>
            ))}
        </Market>
    );
}

export default memo(LendingMarket)