import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { trim } from 'lodash';
import { useEffect, useMemo } from 'react';

import LazyImage from '@/components/LazyImage';
import useAccount from '@/hooks/useAccount';
import LendingDialogButton from '@/modules/lending/components/Button';
import ExpandCard from '@/modules/lending/components/Markets/Dolomite/ExpandCard';
import { StyledHeader, StyledTab, StyledTabs } from '@/modules/lending/components/Markets/Expand/styles';
import LendingMarketDolomiteAddInfo from '@/modules/lending/components/Markets/Info/DolomiteAdd';
import type { Token } from '@/modules/lending/components/Markets/Input';
import LendingMarketInput from '@/modules/lending/components/Markets/Input';
import { useDynamicLoader, useMultiState } from '@/modules/lending/hooks';
import type { DexProps } from '@/modules/lending/models';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';

import {
  StyledAsset,
  StyledAssetIcon,
  StyledAssetItem,
  StyledAssetName,
  StyledAssetValue,
  StyledBody,
  StyledCol,
  StyledContent,
  StyledInfoWrapper,
  StyledRow
} from './styles';

const numFormatter = formateValueWithThousandSeparatorAndFont;
const Tabs = ['Add Collateral', 'Remove Collateral', 'Borrow', 'Repay'];

const DolomitePosition = (props: Props) => {
  const { position, dexConfig, addAction, toast, chainId, onSuccess, account, columns } = props;

  const { provider } = useAccount();
  const [Handler] = useDynamicLoader({ path: '/lending/handlers', name: dexConfig.loaderName });

  const [state, updateState] = useMultiState<any>({
    tab: Tabs[0],
    expand: false,
    currentToken: { underlyingToken: {} },
    amount: '',
    loading: false
  });

  const { run: setLoading } = useDebounceFn(
    () => {
      updateState({ loading: true });
    },
    { wait: 600 }
  );

  const handleClick = () => {
    updateState({ expand: !state.expand });
  };

  const handleAmountChange = (_amount: string) => {
    if (isNaN(Number(_amount))) return;
    _amount = trim(_amount);
    if (_amount.split('.')[1]?.length > 18) return;
    const isZero = Big(_amount || 0).eq(0);
    if (isZero) {
      updateState({
        amount: '0',
        buttonClickable: false,
        isBiggerThanBalance: false
      });
      return;
    }
    const params: any = { amount: _amount };
    const value = Big(Big(_amount).mul(state.currentToken.price).toFixed(20, 0));
    params.isBiggerThanBalance = Big(_amount).gt(state.currentToken.balance || 0);
    params.buttonClickable = !params.isBiggerThanBalance;
    updateState(params);

    setLoading();
  };

  const getTokenList = (_tab?: string) => {
    _tab = _tab || state.tab;
    // Add Collateral
    if (_tab === Tabs[0]) {
      return position.addCollateralTokens;
    }
    // Remove Collateral
    if (_tab === Tabs[1]) {
      return position.removeCollateralTokens;
    }
    // Borrow
    if (_tab === Tabs[2]) {
      return position.borrowTokens;
    }
    // Repay
    if (_tab === Tabs[3]) {
      return position.repayTokens;
    }
    return [];
  };

  const tokenList: any = useMemo(() => {
    return getTokenList();
  }, [position, state.tab]);

  const balance = useMemo(() => {
    return state.currentToken.balance;
  }, [state.tab, state.currentToken]);

  const isClosePosition = useMemo(() => {
    if (state.tab !== Tabs[1]) return false;
    if (Big(position.totalBorrowedUsdValue).gt(0)) return false;
    if (!state.amount) return false;
    return Big(state.amount).times(state.currentToken.price).gte(position.totalBorrowedUsdValue);
  }, [state.tab, position, state.amount, state.currentToken]);

  const isRepayAll = useMemo(() => {
    if (state.tab !== Tabs[3]) return false;
    if (!state.amount) return false;
    return Big(state.amount).gte(state.currentToken.balance);
  }, [state.tab, position, state.amount, state.currentToken]);

  useEffect(() => {
    if (!position) return;
    if (state.currentToken.symbol) {
      const currToken = tokenList.find((token: any) => token.address === state.currentToken.address);
      if (currToken) {
        updateState({ currentToken: currToken });
        return;
      }
    }
    updateState({ currentToken: tokenList[0] });
  }, [tokenList, state.currentToken]);

  useEffect(() => {
    if (!state.expand) {
      updateState({
        amount: ''
      });
    }
  }, [state.expand]);

  return (
    <>
      <ExpandCard
        expand={state.expand}
        onToggle={handleClick}
        expandHeight={400}
        arrowStyle={{
          width: '3%'
        }}
        expandStyle={{
          padding: 0
        }}
        style={{
          marginBottom: 16
        }}
        content={
          <StyledRow>
            {columns.map((column: any, index: number) => (
              <StyledCol key={index} style={{ width: column.width }}>
                {typeof column.render === 'function' ? column.render(position, column) : position[column.key]}
              </StyledCol>
            ))}
          </StyledRow>
        }
      >
        <StyledContent>
          <StyledHeader
            style={{
              paddingLeft: 0
            }}
          >
            <StyledTabs
              style={{
                justifyContent: 'center'
              }}
            >
              {Tabs.map((tab) => (
                <StyledTab
                  key={tab}
                  className={tab === state.tab ? 'active' : ''}
                  onClick={() => {
                    const _tokenList = getTokenList(tab);
                    if (!_tokenList.length) return;
                    updateState({ tab, amount: '', currentToken: _tokenList[0] });
                  }}
                >
                  {tab}
                </StyledTab>
              ))}
            </StyledTabs>
          </StyledHeader>
          <StyledBody>
            <StyledInfoWrapper>
              <LendingMarketDolomiteAddInfo
                title="Your Collateral"
                style={{
                  width: 'auto'
                }}
                contentStyle={{
                  width: 'auto'
                }}
                list={position.removeCollateralTokens.map((item: any) => ({
                  label: '',
                  value: (
                    <StyledAsset>
                      <StyledAssetItem>
                        <StyledAssetIcon>
                          <LazyImage src={item.icon} alt="" width={26} height={26} />
                        </StyledAssetIcon>
                        <StyledAssetName>
                          <div className="symbol">{item.symbol}</div>
                          <div className="name">{item.name}</div>
                        </StyledAssetName>
                      </StyledAssetItem>
                      <StyledAssetValue>
                        <div className="amount" title={item.currentPositionCollateralValue}>
                          {numFormatter(item.currentPositionCollateralValue, 4, true, { isZeroPrecision: true })}
                        </div>
                        <div className="value" title={item.currentPositionCollateralValue}>
                          {numFormatter(item.currentPositionCollateralUsd, 2, true, {
                            prefix: '$',
                            isZeroPrecision: true
                          })}
                        </div>
                      </StyledAssetValue>
                    </StyledAsset>
                  )
                }))}
              />
              <LendingMarketDolomiteAddInfo
                title="Your Borrowing"
                style={{
                  width: 'auto'
                }}
                contentStyle={{
                  width: 'auto'
                }}
                list={position.repayTokens.map((item: any) => ({
                  label: '',
                  value: (
                    <StyledAsset>
                      <StyledAssetItem>
                        <StyledAssetIcon>
                          <LazyImage src={item.icon} alt="" width={26} height={26} />
                        </StyledAssetIcon>
                        <StyledAssetName>
                          <div className="symbol">{item.symbol}</div>
                          <div className="name">{item.name}</div>
                        </StyledAssetName>
                      </StyledAssetItem>
                      <StyledAssetValue>
                        <div className="amount" title={item.currentPositionBorrowValue}>
                          {numFormatter(item.currentPositionBorrowValue, 4, true, { isZeroPrecision: true })}
                        </div>
                        <div className="value" title={item.currentPositionBorrowValue}>
                          {numFormatter(item.currentPositionBorrowUsd, 2, true, { prefix: '$', isZeroPrecision: true })}
                        </div>
                      </StyledAssetValue>
                    </StyledAsset>
                  )
                }))}
              />
            </StyledInfoWrapper>
            <div>
              <LendingMarketInput
                icon={state.currentToken.icon}
                symbol={state.currentToken.symbol}
                balance={balance}
                price={state.currentToken.price}
                decimals={state.currentToken.decimals}
                amount={state.amount}
                tokenList={tokenList}
                onChange={handleAmountChange}
                onTokenChange={(token: Token) => {
                  updateState({ currentToken: token });
                }}
              />
              <LendingDialogButton
                style={{
                  marginTop: 12
                }}
                disabled={!state.buttonClickable}
                actionText={state.tab}
                amount={state.amount}
                data={{
                  ...state.currentToken,
                  config: dexConfig
                }}
                addAction={addAction}
                toast={toast}
                chainId={chainId}
                unsignedTx={state.unsignedTx}
                isError={state.isError}
                loading={state.loading}
                gas={state.gas}
                account={account}
                onApprovedSuccess={() => {
                  setLoading();
                }}
                onSuccess={async () => {
                  onSuccess?.();
                  updateState({ amount: '' });
                }}
              />
            </div>
          </StyledBody>
        </StyledContent>
      </ExpandCard>
      {Handler && (
        <Handler
          provider={provider}
          account={account}
          update={state.loading}
          chainId={chainId}
          data={{
            actionText: state.tab,
            ...state.currentToken,
            position: position,
            config: dexConfig,
            isClosePosition,
            isRepayAll
          }}
          amount={state.amount}
          onLoad={(_data: any) => {
            console.log('%cadd position handler DATA onLoad: %o', 'background: #6439FF; color:#fff;', _data);
            updateState({
              ..._data,
              loading: false
            });
          }}
        />
      )}
    </>
  );
};

export default DolomitePosition;

interface Props extends DexProps {
  position: any;
  markets: any;
  columns: any;
}
