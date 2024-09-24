import Big from 'big.js';
import { memo, useEffect } from 'react';
import { styled } from 'styled-components';

import { useMultiState } from '@/modules/hooks';

import CardsViews from '../Cards';
import CardEmpty from '../Cards/CardEmpty';
import CardList from '../Cards/CardList';
import CardsTable from '../Cards/CardsTable';
import { useIsolateStore } from '../hooks/useIsolateStore';
import BorrowModal from '../Modal/Borrow';
import LoopModal from '../Modal/Loop';
import SupplyModal from '../Modal/Supply';
import PrimaryButton from '../PrimaryButton';
import TokenWrapper from '../TokenWrapper';
import { formatRate, unifyNumber } from '../utils';
import formatNumber from '../utils/formatNumber';

const CenterRow = styled.div`
  /* text-align: center; */
`;

const CenterItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const ItemPrimary = styled.div`
  font-size: 16px;

  &.apy {
    color: rgb(34, 160, 107);
  }
`;
const ItemSub = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: rgb(162, 166, 149);
  &.radio {
    display: flex;
    gap: 3px;
    align-items: center;
    color: rgb(178, 232, 16);
  }
`;

const IconMouth = styled.img`
  width: 14px;
  height: 14px;
`;

const Markets = (props: any) => {
  const {
    dexConfig,
    assetsToSupply,
    showSupplyModal,
    setShowSupplyModal,
    healthFactor,
    theme,
    yourTotalSupply,
    from,
    config
  } = props;

  const { data: hasIsolateData, set: setIsolateStore } = useIsolateStore();

  const [state, updateState] = useMultiState<any>({
    data: undefined,
    showBorrowModal: false,
    showLoopModal: false
  });

  const SupplyButton = ({ data }: any) => {
    return (
      <PrimaryButton
        config={config}
        theme={theme}
        onClick={() => {
          updateState({ data });
          setShowSupplyModal(true);
        }}
      >
        Supply
      </PrimaryButton>
    );
  };

  const LoopButton = ({ data }: any) => {
    const disabled = !data.balanceInUSD || Number(data.balanceInUSD) === 0;

    return (
      <PrimaryButton
        config={config}
        theme={theme}
        disabled={disabled}
        onClick={() => {
          updateState({ data, showLoopModal: true });
        }}
      >
        Loop
      </PrimaryButton>
    );
  };

  const BorrowButton = ({ data }: any) => {
    let disabled;
    if (dexConfig.name === 'Seamless Protocol') {
      const { totalDebtsUSD, borrowCapUSD } = data;
      const isFull = Big(totalDebtsUSD || 0).gte(Big(borrowCapUSD || 0));

      disabled = isNaN(Number(yourTotalSupply)) || !Number(yourTotalSupply) || isFull;
    } else {
      disabled = isNaN(Number(yourTotalSupply)) || !Number(yourTotalSupply);
    }
    if (!data.supportBorrow) {
      disabled = true;
    }
    return (
      <PrimaryButton
        config={config}
        theme={theme}
        disabled={disabled}
        onClick={() => {
          updateState({ data, showBorrowModal: true });
        }}
      >
        Borrow
      </PrimaryButton>
    );
  };

  const isIsolate = hasIsolateData.some((item: any) => item.isIsolated && !!item.isCollateraled);

  const assetsToSupplyWithStable = assetsToSupply?.filter((item: any) => item.isStableForIsolated);

  useEffect(() => {
    return () => {
      setIsolateStore({ data: [] });
    };
  }, []);

  let headers;
  let tableData;
  if (['ZeroLend', 'AAVE V3', 'Seamless Protocol', 'C14'].includes(dexConfig.name)) {
    headers = [
      'Asset',
      'Wallet Balance',
      'Supply APY',
      'Available to borrow',
      'Borrow APY',
      // "Can be Collateral",
      ''
    ];
    if (!assetsToSupply) return null;
    tableData = (isIsolate ? assetsToSupplyWithStable : assetsToSupply).map((row: any, index: number) => [
      <TokenWrapper key={`token-${index}`}>
        <img width={64} height={64} src={row.icon} alt={row.symbol} />
        <CenterItem>
          <div className="token-title">{row.symbol}</div>
        </CenterItem>
      </TokenWrapper>,
      <div key={`balance-${index}`}>
        <div>{unifyNumber(row.balance)}</div>
        <div>${unifyNumber(row.balanceInUSD)}</div>
      </div>,
      <div key={`supply-apy-${index}`}>
        <div>{row.supplyAPY ? `${unifyNumber(Number(row.supplyAPY) * 100)} %` : ''}</div>
        <div>
          {dexConfig.rewardToken && Number(row.supplyRewardApy)
            ? `${unifyNumber(Number(row.supplyRewardApy) * 100)} %`
            : ''}
        </div>
      </div>,
      <div key={`available-borrows-${index}`}>
        <CenterRow>{unifyNumber(row.availableBorrows)}</CenterRow>
        <CenterRow>${unifyNumber(row.availableBorrowsUSD)}</CenterRow>
      </div>,
      <div key={`borrow-apy-${index}`}>
        <div>{row.borrowAPY ? `${unifyNumber(Number(row.borrowAPY) * 100)} %` : ''}</div>
        <div>
          {dexConfig.rewardToken && row.borrowRewardApy ? `${unifyNumber(Number(row.borrowRewardApy) * 100)} %` : ''}
        </div>
      </div>,
      <div key={`buttons-${index}`} style={{ display: 'flex', gap: 10, width: '100%' }}>
        <SupplyButton data={row} />
        <BorrowButton data={row} />
      </div>
    ]);
  }

  if (['Pac Finance'].includes(dexConfig.name)) {
    headers = [
      'Assets',
      'Your Balance',
      // "Estimated Blast Points",
      'Supply APY',
      'Borrow APY',
      'Pool Liquidity',
      // "Can be Collateral",
      ''
    ];
    if (!assetsToSupply) return null;
    tableData = (isIsolate ? assetsToSupplyWithStable : assetsToSupply).map((row: any, index: number) => [
      <TokenWrapper key={`token-${index}`}>
        <img width={64} height={64} src={row.icon} alt={row.symbol} />
        <CenterItem>
          <ItemPrimary style={{ fontWeight: 700 }}>{row.symbol}</ItemPrimary>
          <ItemSub>LTV: {Big(row.LTV).times(100).toFixed()}%</ItemSub>
        </CenterItem>
      </TokenWrapper>,
      <CenterItem key={`balance-${index}`}>
        <ItemPrimary>{unifyNumber(row.balance)}</ItemPrimary>
        <ItemSub>${unifyNumber(row.balanceInUSD)}</ItemSub>
      </CenterItem>,
      <CenterItem key={`apy-${index}`}>
        <ItemPrimary className="apy">{`${unifyNumber(
          (Number(row.supplyAPY) + Number(row.NATIVE_YIELD || 0)) * 100
        )} %`}</ItemPrimary>
        <ItemSub className="radio">
          <IconMouth src="https://ipfs.near.social/ipfs/bafkreiffqyfmusnew73zt6slkeoryvevuw7ojcgvfdirgf3oqdsll5yyga" />
          {Number(row.EXTRA_RADIO) * 100}%
        </ItemSub>
      </CenterItem>,
      <CenterItem key={`borrow-apy-${index}`}>
        <ItemPrimary className="apy">
          {row.borrowAPY ? `${unifyNumber(Number(row.borrowAPY) * 100)} %` : ''}
        </ItemPrimary>
      </CenterItem>,
      <CenterItem key={`total-supply-${index}`}>
        <ItemPrimary>{formatNumber(row.totalSupply)}</ItemPrimary>
        <ItemSub>{formatRate(row.utilized)} utilized</ItemSub>
      </CenterItem>,
      <div key={`buttons-${index}`} style={{ display: 'flex', gap: 10 }}>
        <SupplyButton data={row} />
        {row.supportBorrow ? (
          <BorrowButton
            data={{
              ...row
            }}
          />
        ) : (
          <div style={{ width: '100%' }}></div>
        )}

        {row.supportLoop ? <LoopButton data={row} /> : <div style={{ width: '100%' }}></div>}
      </div>
    ]);
  }

  return (
    <>
      <CardsViews
        body={
          !assetsToSupply || assetsToSupply.length === 0 ? (
            <CardEmpty>Nothing supplied yet</CardEmpty>
          ) : from === 'layer' ? (
            <CardList headers={headers} data={tableData} />
          ) : (
            <CardsTable headers={headers} data={tableData} noDivider={true} />
          )
        }
      />
      {showSupplyModal && (
        <SupplyModal
          data={{
            ...state.data,
            healthFactor
          }}
          onRequestClose={() => setShowSupplyModal(false)}
          {...props}
        />
      )}
      {state.showBorrowModal && (
        <BorrowModal
          data={{
            ...state.data,
            healthFactor
          }}
          onRequestClose={() => updateState({ showBorrowModal: false })}
          {...props}
        />
      )}
      {state.showLoopModal && (
        <LoopModal
          data={{
            ...state.data,
            healthFactor
          }}
          onRequestClose={() => updateState({ showLoopModal: false })}
          {...props}
        />
      )}
    </>
  );
};

export default memo(Markets);
