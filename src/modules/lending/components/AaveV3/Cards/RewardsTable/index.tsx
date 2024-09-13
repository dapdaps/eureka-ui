import Big from 'big.js';
import { styled } from 'styled-components';

import { useDynamicLoader, useMultiState } from '@/modules/lending/hooks';

import PrimaryButton from '../../PrimaryButton';
import CardsTable from '../CardsTable';

const StyledRewardsTable = styled.div`
  color: var(--agg-primary-color, #fff);
  background-color: var(--agg-secondary-color, rgba(53, 55, 73, 0.2));
  border: 1px solid var(--agg-border-color, rgba(53, 55, 73, 0.2));
  margin-top: 20px;
  border-radius: 12px;
`;
const Title = styled.div`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 400;
  color: var(--agg-primary-color, #fff);
`;

const NoReward = styled.div`
  margin: 0 auto;
  padding-bottom: 28px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

const TokenAsset = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const TokenIcon = styled.img`
  width: 28px;
`;
const TokenAmount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const columns = [
  {
    type: 'name',
    width: '30%',
    name: 'Reward Asset'
  },
  {
    type: 'total',
    key: 'unclaimed',
    width: '25%',
    name: 'Rewards'
  },
  { type: 'button', width: '20%' }
];

const RewardsTable = (props: any) => {
  const {
    data,
    dapps,
    toast,
    account,
    onSuccess,
    markets,
    rewardAddress,
    config,
    prices,
    theme,
    unifyNumber,
    dexConfig,
    provider,
    supplies,
    chainId
  } = props;

  const [state, updateState] = useMultiState<any>({
    loading: false,
    dapp: null,
    record: null,
    curIndex: -1
  });

  const [Claim] = useDynamicLoader({ path: `/lending/claims`, name: dexConfig.loaderName });

  function formatValue(value: any, digits?: any) {
    if (Number(value) === 0) return '0';
    return Big(value || 0).lt(0.01) ? '< 0.01' : `${Number(value).toFixed(digits || 2)}`;
  }
  const seamTokens = ['OG Points', 'SEAM', 'esSEAM'];

  function renderUSD(symbol: any, amount: any) {
    if (symbol === 'earlyZERO') {
      return unifyNumber(Big(0.00025055).times(Big(amount)).toFixed());
    }
    // seamless
    if (seamTokens.includes(symbol)) {
      return unifyNumber(
        Big(prices['SEAM'] || 0)
          .times(Big(amount))
          .toFixed()
      );
    }
    if (!prices[symbol]) return null;

    return unifyNumber(Big(prices[symbol]).times(Big(amount)).toFixed());
  }

  return (
    <>
      <StyledRewardsTable>
        <Title>Your Rewards</Title>

        {data && data.length && data.find((item: any) => item.unclaimed) ? (
          <CardsTable
            headers={['Reward Asset', 'Unclaimed', '']}
            noDivider
            data={data.map((row: any, index: any) => {
              return [
                <TokenAsset key={index}>
                  {row.icon ? <TokenIcon src={row.icon} /> : null}
                  {`${row.symbol}`}
                </TokenAsset>,
                <TokenAmount key={index}>
                  <span>{row.unclaimed ? formatValue(row.unclaimed) : '-'}</span>
                  <span>${renderUSD(row.symbol, row.unclaimed)}</span>
                </TokenAmount>,
                <div key={index} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <PrimaryButton
                    config={config}
                    theme={theme}
                    disabled={!Number(row.unclaimed)}
                    width={80}
                    loading={state.loading && index === state.curIndex}
                    onClick={() => {
                      const toastId = toast?.loading({
                        title: `Claiming rewards...`
                      });
                      updateState({
                        dapp: dapps,
                        loading: true,
                        toastId,
                        curIndex: index
                      });
                    }}
                  >
                    Claim
                  </PrimaryButton>
                </div>
              ];
            })}
          />
        ) : (
          <NoReward>
            <div>You don't have unclaimed rewards</div>
            <div
              style={{
                fontSize: '18px'
              }}
            >
              $0.00
            </div>
          </NoReward>
        )}
      </StyledRewardsTable>
      {state.dapp && Claim && (
        <Claim
          provider={provider}
          supplies={supplies}
          loading={state.loading}
          market={state.market}
          dapp={state.dapp}
          record={state.market}
          account={account}
          chainId={chainId}
          onSuccess={() => {
            toast?.dismiss(state.toastId);
            updateState({ loading: false });
            toast?.success({ title: 'Claimed successfully!' });
            onSuccess?.(state.dapp.name);
          }}
          onError={(err: any) => {
            toast?.dismiss(state.toastId);
            updateState({ loading: false });
            toast?.fail({
              title: err?.message?.includes('user rejected transaction')
                ? 'User rejected transaction'
                : ` Claim failed!`,
              chainId
            });
          }}
        />
      )}
    </>
  );
};

export default RewardsTable;
