import Big from 'big.js';
import { memo, useCallback, useEffect, useState } from 'react';

import LendingAction from '@/views/AllInOne/components/Lending/LendingDialog/Action';

import LendingArrowIcon from '../LendingArrowIcon'
import LendingAsset from '../LendingAsset'
import LendingTotal from '../LendingTotal';
import {
  ArrowIconWrapper,
  Item,
  Items,
  Market,
  MarketTableHeader,
  MergeItems,
  RewardApy,
  RewardApyItem,
  RewardIcon,
  Row} from './styles';

interface IProps {
    currentDapp: string;
    timestamp: any;
    markets: any;
    dapps: any;
    onButtonClick: (address: string, action: string) => void;
    tabConfig: any;
}




const LendingMarket = (props: any) => {

    const {
      currentDapp,
      markets,
      dapps,
      timestamp,
      tabConfig,
      chainId,
      account,
      addAction,
      onSuccess = () => {},
      toast
    } = props;

    const [sortKey, setSortKey] = useState('supplyApy');
    const [openKey, setOpenKey] = useState<number | undefined>(undefined);
    const [marketInfo, setMarketInfo] = useState<any[]>();
    const [params, setParams] = useState<any>();

    const initialTimestamp = localStorage.getItem("prevMarketTimestampMarket") || "";
    const [prevMarketTimestamp, setPrevMarketTimestamp] = useState(initialTimestamp);

    const formateData = useCallback((key: string) => {
        
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

    const onExpand = (idx: number, addr: string) => {
      setOpenKey(idx === openKey ? undefined : idx);
      const market = markets[addr];
      const dapp = dapps[market.dapp];
      const dappConfig = tabConfig.dapps[market.dapp];
      setParams({
        data: {
          ...dapp,
          ...market,
          config: { ...dappConfig, wethAddress: tabConfig?.wethAddress },
          addAction,
          toast
        },
        account,
        chainId,
        addAction,
        toast
      });
    }

  useEffect(() => {
    setOpenKey(undefined);
  }, [currentDapp]);

    return (
        <Market>
            <MarketTableHeader>
              <MergeItems className="merge-asset">
                <Item className="asset w_40">Asset</Item>
                <Item className="asset w_60">Market</Item>
              </MergeItems>
            <MergeItems className="supply">
                <Item className="head_apy w_50">Deposit</Item>
                <Item className="head_apy w_50">
                Deposit APY
                {/*<ArrowIconWrapper*/}
                {/*    className={sortKey === "supplyApy" ? "active" : ""}*/}
                {/*    onClick={() => {*/}
                {/*        setSortKey('supplyApy')*/}
                {/*        formateData("supplyApy");*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <LendingArrowIcon color='#fff' />*/}
                {/*</ArrowIconWrapper>*/}
                </Item>
            </MergeItems>
            <MergeItems className="borrow">
                <Item className="w_33 head_apy">Borrowed</Item>
                <Item className="w_33 head_apy">
                Borrow APY
                {/*<ArrowIconWrapper*/}
                {/*    className={sortKey === "borrowApy" ? "active" : ""}*/}
                {/*    onClick={() => {*/}
                {/*        setSortKey('borrowApy')*/}
                {/*        formateData("borrowApy");*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <LendingArrowIcon color='#fff' />*/}
                {/*</ArrowIconWrapper>*/}
                </Item>
                <Item className="w_33">
                  Liquidity
                {/*<ArrowIconWrapper*/}
                {/*    className={sortKey === "liquidity" ? "active" : ""}*/}
                {/*    onClick={() => {*/}
                {/*        setSortKey("liquidity");*/}
                {/*        formateData("liquidity");*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <LendingArrowIcon color='#fff' />*/}
                {/*</ArrowIconWrapper>*/}
                </Item>
              <Item className="w_15"></Item>
            </MergeItems>
            </MarketTableHeader>
            {(marketInfo || []).map((market: any, index: number) => (
            <Row key={market.address}>
              <Items onClick={() => onExpand(index, market.address)}>
                <MergeItems className="merge-asset">
                  <Item className="td asset w_40">
                    <LendingAsset
                      icon={market.icon}
                      symbol={market.symbol}
                    />
                  </Item>
                  <Item className="td asset w_60">
                    <LendingAsset
                      icon={market.dappIcon}
                      symbol={market.dappName}
                      size='small'
                    />
                  </Item>
                </MergeItems>
                <MergeItems
                className="supply"
                >
                <Item className="td head_apy">
                    <LendingTotal 
                        total={market.totalSupply}
                        digit={2}
                        unit={"$"}
                    />
                </Item>
                <Item className="td apy">
                    <div>{market.supplyApy}</div>
                    {market.distributionApy &&
                    market.distributionApy
                        .filter((reward: any) => {
                        const apy = reward.supply.slice(0, -1);
                        return !!Number(apy);
                        })
                        .map((reward: any) => (
                        <RewardApyItem key={reward.symbol}>
                          <RewardApy>{reward.supply}</RewardApy>
                          <RewardIcon src={reward.icon} />
                        </RewardApyItem>
                        ))}
                </Item>
                </MergeItems>
                <MergeItems
                className="borrow"
                // onClick={() => {
                //   console.log('spdop');
                //     onButtonClick(market.address, "Borrow");
                // }}
                >
                <Item className="td w_33 head_apy">
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
                            <RewardApy>{reward.borrow}</RewardApy>
                            <RewardIcon src={reward.icon} />
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
                  <Item className="td w_15">
                    <ArrowIconWrapper
                      className={`open ${openKey === index ? 'open-active' : ''}`}
                    >
                      <LendingArrowIcon color='#979ABE' />
                    </ArrowIconWrapper>
                  </Item>
                </MergeItems>
              </Items>
              {
                index === openKey ? <LendingAction {...params} onSuccess={onSuccess} /> : null
              }
            </Row>
            ))}

        </Market>
    );
}

export default memo(LendingMarket)