import useAccount from '@/hooks/useAccount';
import { NoReward, RewardsTable, Title } from '@/modules/lending/components/Yours/RewardsTable/styles';
import LendingYoursTable from '@/modules/lending/components/Yours/Table';
import { useDynamicLoader, useMultiState } from '@/modules/lending/hooks';

const LendingRewardsTable = (props: Props) => {
  const { dapps, toast, account, onSuccess, supplies, chainId, dexConfig, curChain } = props;

  const { provider } = useAccount();
  const [Claim] = useDynamicLoader({ path: `/lending/claims`, name: dexConfig.loaderName });

  const [state, updateState] = useMultiState<any>({
    loading: false,
    dapp: null,
    record: null
  });

  const columns =
    Object.keys(dapps)[0] === 'Valas Finance'
      ? [
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
      ]
      : [
        {
          type: 'name',
          width: '30%',
          name: 'Reward Asset'
        },
        {
          type: 'total',
          key: 'dailyReward',
          width: '25%',
          name: 'Daily Rewards'
        },
        {
          type: 'total',
          key: 'unclaimed',
          width: '25%',
          name: 'Unclaimed'
        },
        { type: 'button', width: '20%' }
      ];

  return (
    <>
      <RewardsTable>
        <Title>Your Earns</Title>
        <LendingYoursTable
          totalReverse={true}
          columns={columns}
          emptyTips={(
            <NoReward>
              <div>You don&apos;t have unclaimed rewards</div>
              <div
                style={{
                  fontSize: '18px'
                }}
              >
                $0.00
              </div>
            </NoReward>
          )}
          data={props.data}
          buttons={[
            {
              text: 'Claim',
              loading: (record: any) => {
                return record.symbol === state.market?.symbol && state.loading;
              }
            }
          ]}
          onButtonClick={(record: any) => {
            const toastId = toast?.loading({
              title: `Claiming rewards...`
            });
            updateState({
              dapp: dapps[record.dappName],
              market: record,
              loading: true,
              toastId
            });
          }}
        />
      </RewardsTable>
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
          onSuccess={(res: any) => {
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

export default LendingRewardsTable;

export interface Props {
  data: any;
  dapps: any;
  toast: any;
  onSuccess: any;
  supplies: any;
  account: string;
  loading?: boolean;
  chainId: number;
  dexConfig: any;
  curChain: any;

  onButtonClick?(address: string, text?: string): void;
}
