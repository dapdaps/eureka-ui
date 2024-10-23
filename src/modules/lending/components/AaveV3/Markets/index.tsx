import Big from 'big.js';
import { memo, useEffect } from 'react';

import { useMultiState } from '@/modules/hooks';

import CardsViews from '../Cards';
import CardEmpty from '../Cards/CardEmpty';
import CardList from '../Cards/CardList';
import { useIsolateStore } from '../hooks/useIsolateStore';
import BorrowModal from '../Modal/Borrow';
import LoopModal from '../Modal/Loop';
import SupplyModal from '../Modal/Supply';
import { formatRate, unifyNumber } from '../utils';
import formatNumber from '../utils/formatNumber';

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

  const isIsolate = hasIsolateData.some((item: any) => item.isIsolated && !!item.isCollateraled);

  const assetsToSupplyWithStable = assetsToSupply?.filter((item: any) => item.isStableForIsolated);

  useEffect(() => {
    return () => {
      setIsolateStore({ data: [] });
    };
  }, []);

  const ActionButton = ({ label, onClick, disabled = false }: any) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-2xl text-sm font-medium transition-colors min-w-[80px]
        ${
          disabled
            ? 'bg-[rgba(255,255,255,0.5)] text-black cursor-not-allowed'
            : 'bg-[#EAEBEF] text-black hover:opacity-80'
        }`}
    >
      {label}
    </button>
  );

  const TableRow = ({ children, variant = 'default' }: any) => (
    <div
      className={`grid gap-4 mb-4 p-4 border border-[#373a53] h-[84px] rounded-2xl bg-[#262836] items-center
      ${variant === 'pac' ? 'grid-cols-[2fr_1.5fr_1fr_1fr_1.5fr_2fr]' : 'grid-cols-6'}`}
    >
      {children}
    </div>
  );

  const ValueDisplay = ({ primary, secondary, className = '' }: any) => (
    <div className={`flex flex-col ${className}`}>
      <span className="text-white text-base">{primary}</span>
      {secondary && <span className="text-gray-400 text-sm">{secondary}</span>}
    </div>
  );

  const ApyDisplay = ({ value, extraRadio, nativeYield }: any) => (
    <div className="flex flex-col">
      <span className="text-[#22A06B] text-base">{value}</span>
      {extraRadio && (
        <div className="flex items-center gap-1 text-[#B2E810] text-sm">
          <img src="/assets/images/extra-radio.svg" alt="extra" className="w-3.5 h-3.5" />
          <span>{Number(extraRadio) * 100}%</span>
        </div>
      )}
    </div>
  );

  let headers;
  let tableData;

  if (['ZeroLend', 'AAVE V3', 'Seamless Protocol', 'C14'].includes(dexConfig.name)) {
    headers = ['Asset', 'Wallet Balance', 'Supply APY', 'Available to borrow', 'Borrow APY', ''];

    if (!assetsToSupply) return null;

    const renderRows = (isIsolate ? assetsToSupplyWithStable : assetsToSupply).map((row: any) => (
      <TableRow key={row.symbol}>
        <div className="flex items-center gap-3">
          <img className="w-8 h-8 rounded-full" src={row.icon} alt={row.symbol} />
          <span className="font-medium text-white">{row.symbol}</span>
        </div>

        <ValueDisplay primary={unifyNumber(row.balance)} secondary={`$${unifyNumber(row.balanceInUSD)}`} />

        <ValueDisplay
          primary={row.supplyAPY ? `${unifyNumber(Number(row.supplyAPY) * 100)}%` : '-'}
          secondary={
            dexConfig.rewardToken && Number(row.supplyRewardApy)
              ? `${unifyNumber(Number(row.supplyRewardApy) * 100)}%`
              : null
          }
        />

        <ValueDisplay
          primary={unifyNumber(row.availableBorrows)}
          secondary={`$${unifyNumber(row.availableBorrowsUSD)}`}
        />

        <ValueDisplay
          primary={row.borrowAPY ? `${unifyNumber(Number(row.borrowAPY) * 100)}%` : '-'}
          secondary={
            dexConfig.rewardToken && row.borrowRewardApy ? `${unifyNumber(Number(row.borrowRewardApy) * 100)}%` : null
          }
        />

        <div className="flex gap-2">
          <ActionButton
            label="Supply"
            disabled={isIsolate && dexConfig.name === 'AAVE V3' && row.symbol === 'm.USDT'}
            onClick={() => {
              updateState({ data: row });
              setShowSupplyModal(true);
            }}
          />
          <ActionButton
            label="Borrow"
            disabled={!row.supportBorrow || isNaN(Number(yourTotalSupply)) || !Number(yourTotalSupply)}
            onClick={() => updateState({ data: row, showBorrowModal: true })}
          />
        </div>
      </TableRow>
    ));

    tableData = <div className="space-y-4">{renderRows}</div>;
  }

  if (['Pac Finance'].includes(dexConfig.name)) {
    headers = ['Assets', 'Your Balance', 'Supply APY', 'Borrow APY', 'Pool Liquidity', ''];

    if (!assetsToSupply) return null;

    const renderRows = (isIsolate ? assetsToSupplyWithStable : assetsToSupply).map((row: any) => (
      <TableRow key={row.symbol} variant="pac">
        <div className="flex items-center gap-3">
          <img className="w-8 h-8 rounded-full" src={row.icon} alt={row.symbol} />
          <div className="flex flex-col">
            <span className="font-bold text-white">{row.symbol}</span>
            <span className="text-gray-400 text-sm">LTV: {Big(row.LTV).times(100).toFixed()}%</span>
          </div>
        </div>

        <ValueDisplay primary={unifyNumber(row.balance)} secondary={`$${unifyNumber(row.balanceInUSD)}`} />

        <ApyDisplay
          value={`${unifyNumber((Number(row.supplyAPY) + Number(row.NATIVE_YIELD || 0)) * 100)}%`}
          extraRadio={row.EXTRA_RADIO}
        />

        <ValueDisplay
          primary={row.borrowAPY ? `${unifyNumber(Number(row.borrowAPY) * 100)}%` : '-'}
          className="text-[#22A06B]"
        />

        <ValueDisplay primary={formatNumber(row.totalSupply)} secondary={`${formatRate(row.utilized)} utilized`} />

        <div className="flex gap-2 justify-end">
          <ActionButton
            label="Supply"
            onClick={() => {
              updateState({ data: row });
              setShowSupplyModal(true);
            }}
          />
          {row.supportBorrow && (
            <ActionButton label="Borrow" onClick={() => updateState({ data: row, showBorrowModal: true })} />
          )}
          {row.supportLoop && (
            <ActionButton
              label="Loop"
              disabled={!row.balanceInUSD || Number(row.balanceInUSD) === 0}
              onClick={() => updateState({ data: row, showLoopModal: true })}
            />
          )}
        </div>
      </TableRow>
    ));

    tableData = <div className="space-y-4">{renderRows}</div>;
  }

  if (!headers || !tableData) return null;

  return (
    <>
      <CardsViews
        body={
          !assetsToSupply || assetsToSupply.length === 0 ? (
            <CardEmpty>Nothing supplied yet</CardEmpty>
          ) : from === 'layer' ? (
            <CardList headers={headers} data={tableData} />
          ) : (
            <div className="p-4">
              <div
                className={`grid gap-4 mb-4 px-4 text-gray-400 text-sm
                ${dexConfig.name === 'Pac Finance' ? 'grid-cols-[2fr_1.5fr_1fr_1fr_1.5fr_2fr]' : 'grid-cols-6'}`}
              >
                {headers.map((header, index) => (
                  <div key={index}>{header}</div>
                ))}
              </div>
              {tableData}
            </div>
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
