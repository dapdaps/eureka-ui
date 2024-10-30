import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { useEffect, useMemo, useState } from 'react';

import multicallConfig from '@/config/contract/multicall';
import wethConfig from '@/config/contract/weth';
import MendiFinanceConfig from '@/config/lending/dapps/mendi-finance';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';
import MendiFinanceData from '@/modules/lending/datas/MendiFinance';
import MendiFinanceHandler from '@/modules/lending/handlers/MendiFinance';
import { usePriceStore } from '@/stores/price';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import { multicall } from '@/utils/multicall';
import LendingButton from '@/views/Campaign/LineaLiquid/components/LendingButton';
import ModalFoot from '@/views/Campaign/LineaLiquid/components/ModalFoot';
import SwitchTabs from '@/views/Campaign/LineaLiquid/components/SwitchTabs';
import TokenCapsule from '@/views/Campaign/LineaLiquid/components/TokenCapsule';
import TokenInput from '@/views/Campaign/LineaLiquid/components/TokenInput';

import { StyledAction, StyledContainer, StyledSummary, StyledTokenList } from './styles';

const { basic, networks } = MendiFinanceConfig;

// Linea
const CHAIN_ID = 59144;

const TABS = [
  { value: 'Deposit', label: 'Supply' },
  { value: 'Borrow', label: 'Borrow' }
];

const MendiFinanceNetworkConfig = networks[CHAIN_ID];

const MendiFinanceMarketsSymbols = ['meWETH', 'meUSDT', 'meUSDC'];
const MendiFinanceMarkets: any = {};
Object.values(MendiFinanceNetworkConfig.markets).forEach((market) => {
  if (!MendiFinanceMarketsSymbols.includes(market.symbol)) return;
  MendiFinanceMarkets[market.address] = market;
});
const MendiFinanceMarketsList = Object.values(MendiFinanceMarkets);

const Mendi = (props: Props) => {
  const { onClose } = props;

  const toast = useToast();
  const { addAction } = useAddAction('dapp');
  const { account, chainId, provider } = useAccount();
  const prices = usePriceStore((store) => store.price);

  const [currentTab, setCurrentTab] = useState(TABS[0].value);
  const [tokenList, setTokenList] = useState<any>(MendiFinanceMarketsList);
  const [currentToken, setCurrentToken] = useState<any>(MendiFinanceMarketsList[0]);
  const [amount, setAmount] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [txData, setTxData] = useState<any>();
  const [isMax, setIsMax] = useState(false);
  const [data, setData] = useState<any>({});
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [currentBorrowLimit, setCurrentBorrowLimit] = useState<string>('');

  const currentTabItem = useMemo(() => {
    return TABS.find((it) => it.value === currentTab);
  }, [currentTab]);

  const getBorrowLimit = (_data: any = {}) => {
    const { totalCollateralUsd, userTotalBorrowUsd } = _data;
    if (!totalCollateralUsd || !userTotalBorrowUsd) return Big(0);
    return Big(totalCollateralUsd || 0)?.minus(userTotalBorrowUsd || 0);
  };

  const borrowLimit = useMemo(() => {
    return getBorrowLimit(data);
  }, [data]);

  const borrowLimitUsed = useMemo(() => {
    const { totalCollateralUsd, userTotalBorrowUsd } = data;
    if (!totalCollateralUsd || !userTotalBorrowUsd || Big(totalCollateralUsd).eq(0) || Big(userTotalBorrowUsd).eq(0))
      return '0.00';
    return Big(userTotalBorrowUsd).div(totalCollateralUsd).times(100).toFixed(2);
  }, [data]);

  const { run: debouncedGetTrade, cancel: cancelGetTrade } = useDebounceFn(
    () => {
      setLoading(true);
    },
    { wait: 500 }
  );

  const handleCurrentTab = (_currentTab: string) => {
    setCurrentTab(_currentTab);
    setAmount('');
  };

  const handleCurrentToken = (address: string) => {
    const curr = tokenList.find((it: any) => it.address === address);
    setCurrentToken(curr);
    setAmount('');
  };

  const formatTokenList = (_data: any = {}) => {
    const _borrowLimit = getBorrowLimit(_data);
    return MendiFinanceMarketsList.map((market: any) => {
      const curr = _data.markets ? _data.markets[market.address] : {};
      // Supply
      const obj = {
        ...market,
        ...curr,
        apy: curr?.supplyApy ?? '0.00%',
        balance: curr?.userUnderlyingBalance ?? '0',
        netApy: curr?.distributionApy
          ? Big(curr?.loanToValue || 0)
              .plus(curr?.distributionApy[0]?.supply.replace(/%$/, '') || 0)
              .toFixed(2)
          : '0'
      };
      // Borrow
      if (currentTab === TABS[1].value) {
        const balance = Big(_borrowLimit).div(Big(curr?.underlyingPrice || 1).eq(0) ? 1 : curr?.underlyingPrice || 1);
        obj.apy = curr?.borrowApy ?? '0.00%';
        obj.balance = balance.toString();
        obj.netApy = curr?.distributionApy
          ? Big(curr?.loanToValue || 0)
              .plus(curr?.distributionApy[0]?.borrow.replace(/%$/, '') || 0)
              .toFixed(2)
          : '0';
      }
      return obj;
    });
  };

  useEffect(() => {
    if (!amount || Big(amount).lte(0)) {
      setDisabled(true);
      setCurrentBorrowLimit('');
      return;
    }
    if (Big(amount).gt(currentToken?.balance || 0)) {
      setDisabled(true);
      setCurrentBorrowLimit('');
      return;
    }
    setDisabled(false);
    // calc current borrow limit
    const value = Big(
      Big(amount)
        .mul(currentToken?.underlyingPrice || 1)
        .toFixed(20, 0)
    );
    let _borrowLimit = '';
    if (currentTab === TABS[0].value) {
      _borrowLimit = Big(borrowLimit || 0)
        .plus(value.mul(currentToken?.loanToValue / 100))
        .toString();
    }
    if (currentTab === TABS[1].value) {
      _borrowLimit = Big(borrowLimit || 0)
        .minus(value || 0)
        .toString();
    }
    setCurrentBorrowLimit(_borrowLimit);
  }, [amount, currentToken, currentTab, borrowLimit]);

  useEffect(() => {
    if (chainId !== CHAIN_ID) return;
    setDataLoading(true);
  }, [chainId, currentTab]);

  return (
    <StyledContainer>
      <SwitchTabs tabs={TABS} current={currentTab} onChange={handleCurrentTab} />
      <StyledTokenList>
        {tokenList.map((market: any) => (
          <TokenCapsule
            key={market.address}
            address={market.address}
            selected={currentToken?.address}
            symbol={market.underlyingToken.symbol}
            icon={market.underlyingToken.icon}
            apy={market.apy}
            onClick={handleCurrentToken}
          />
        ))}
      </StyledTokenList>
      <TokenInput
        style={{
          marginTop: 21
        }}
        amount={amount}
        balance={currentToken?.balance}
        setIsMax={setIsMax}
        setLoading={setLoading}
        debouncedGetTrade={debouncedGetTrade}
        cancelGetTrade={cancelGetTrade}
        onAmountChange={(_amount) => {
          setAmount(_amount);
        }}
        token={currentToken?.underlyingToken ?? {}}
        price={currentToken?.underlyingPrice}
        rule="1 ticket $25"
        disabled={dataLoading}
        currentTab={currentTab}
      />
      <StyledSummary>
        {currentTab === TABS[0].value && (
          <li className="item">
            <span className="label">Collateral Factor</span>
            <span className="value">{Big(currentToken?.loanToValue || 0).toFixed(2)}%</span>
          </li>
        )}
        <li className="item">
          <span className="label">Net {currentTabItem?.label} APY</span>
          <span className="value">{currentToken?.netApy || '0.00'}%</span>
        </li>
        <li className="item">
          <span className="label">Your Borrow Limit</span>
          <span className="value borrow-limit">
            {formateValueWithThousandSeparatorAndFont(borrowLimit, 2, true, { prefix: '$' })}
            {currentBorrowLimit && (
              <>
                <span>-</span>
                {formateValueWithThousandSeparatorAndFont(currentBorrowLimit, 2, true, { prefix: '$' })}
              </>
            )}
          </span>
        </li>
        <li className="item">
          <span className="label">Borrow Limit Used</span>
          <span className="value success">{borrowLimitUsed}%</span>
        </li>
      </StyledSummary>
      <StyledAction>
        <LendingButton
          disabled={disabled || dataLoading || loading}
          loading={loading || dataLoading}
          actionText={currentTab}
          amount={amount}
          data={{ ...currentToken, config: { ...basic, ...MendiFinanceNetworkConfig } }}
          chainId={chainId as number}
          CHAIN_ID={CHAIN_ID}
          toast={toast}
          addAction={(param: any) => {
            addAction(param);
            onClose(true);
          }}
          unsignedTx={txData?.unsignedTx}
          gas={txData?.gas}
          account={account as string}
          onSuccess={() => {
            setDataLoading(true);
          }}
          onApprovedSuccess={() => {
            setLoading(true);
          }}
          onLoad={() => {}}
        />
      </StyledAction>
      <ModalFoot href="/dapp/mendi-finance?tab=yours">Mendi finance</ModalFoot>
      <MendiFinanceData
        provider={provider}
        update={dataLoading}
        account={account}
        multicallAddress={multicallConfig[CHAIN_ID]}
        wethAddress={wethConfig[CHAIN_ID]}
        multicall={multicall}
        prices={prices}
        chainId={chainId}
        isChainSupported={chainId === CHAIN_ID}
        {...basic}
        {...MendiFinanceNetworkConfig}
        onLoad={(data: any) => {
          console.log('%cMendiFinance DATA onLoad: %o', 'background: #FF885B; color:#fff;', data);
          if (data.markets) {
            try {
              const _data = Object.values(data.markets);
              _data.forEach((d: any) => {
                const curr =
                  Object.values(MendiFinanceNetworkConfig.markets).find((m: any) => m.address === d.address) || {};
                d.localConfig = {
                  ...basic,
                  ...MendiFinanceNetworkConfig,
                  currentMarket: curr
                };
              });
            } catch (err: any) {
              console.log(err);
            }
          }
          setDataLoading(false);
          setData(data);
          const _tokenList = formatTokenList(data || {});
          setTokenList(_tokenList);
          setCurrentToken(_tokenList[0]);
        }}
      />
      <MendiFinanceHandler
        provider={provider}
        account={account}
        update={loading}
        chainId={chainId}
        data={{
          actionText: currentTab,
          ...currentToken,
          config: {
            ...basic,
            ...MendiFinanceNetworkConfig
          }
        }}
        amount={amount}
        onLoad={(_data: any) => {
          console.log('%cMendiFinanceHandler DATA onLoad: %o', 'background: #6439FF; color:#fff;', _data);
          setTxData(_data);
          setLoading(false);
        }}
      />
    </StyledContainer>
  );
};

export default Mendi;

interface Props {
  onClose: (isFresh?: boolean) => void;
}
