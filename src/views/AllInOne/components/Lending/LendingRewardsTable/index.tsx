import { useState } from 'react';
import styled from 'styled-components';

import { VmComponent } from '@/components/vm/VmComponent';

import LendingTable from '../LendingTable';

const RewardsTable = styled.div`
  background-color: var(--agg-secondary-color, rgba(53, 55, 73, 0.2));
  border: 1px solid var(--agg-border-color);
  margin-top: 20px;
  border-radius: 6px;
`;
const Title = styled.div`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 400;
  color: var(--agg-primary-color, #fff);
  border-bottom: 1px solid var(--agg-border-color, #292c42);
`;

const NoReward = styled.div`
  margin: 28px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
`;

interface IProps {
  dapps: any;
  toast: any;
  account?: string;
  onSuccess: any;
  supplies: any;
  data: any;
}

const LendingRewardsTable = (props: IProps) => {
  const { dapps, toast, account, onSuccess, supplies } = props;

  const [state, setState] = useState<any>({
    loading: false,
    dapp: null,
    market: null,
    toastId: null,
  });

  const columns =
    Object.keys(dapps)[0] === 'Valas Finance'
      ? [
          {
            type: 'name',
            width: '30%',
            name: 'Reward Asset',
          },
          {
            type: 'total',
            key: 'unclaimed',
            width: '25%',
            name: 'Rewards',
          },
          { type: 'button', width: '20%' },
        ]
      : [
          {
            type: 'name',
            width: '30%',
            name: 'Reward Asset',
          },
          {
            type: 'total',
            key: 'dailyReward',
            width: '25%',
            name: 'Daily Rewards',
          },
          {
            type: 'total',
            key: 'unclaimed',
            width: '25%',
            name: 'Unclaimed',
          },
          { type: 'button', width: '20%' },
        ];
  const handleButtonClick = (record: any) => {
    const toastId = toast?.loading({
      title: `Claiming rewards...`,
    });
    setState((prevState: any) => ({
      ...prevState,
      dapp: dapps[record.dappName],
      market: record,
      loading: true,
      toastId,
    }));
  };
  return (
    <>
      <RewardsTable>
        <Title>Your Earns</Title>
        <LendingTable 
            totalReverse={true}
            columns={columns}
            emptyTips={(
                <NoReward>
                    <div>{`You don't have unclaimed rewards`}</div>
                    <div style={{ fontSize: '18px' }}>$0.00</div>
                </NoReward>
            )}
            data={props.data}
            buttons={[{ text: 'Claim', loading: (record: any) => (record.symbol === state.market?.symbol && state.loading ? true : false) }]}
            onButtonClick={handleButtonClick}
        />
      </RewardsTable>
      {state.dapp && (
        <VmComponent
          src={state.dapp.handlerClaim}
          props={{
            supplies,
            loading: state.loading,
            market: state.market,
            dapp: state.dapp,
            record: state.market,
            account,
            onSuccess: () => {
              toast?.dismiss(state.toastId);
              setState((prevState: any) => ({
                ...prevState,
                loading: false,
              }));
              toast?.success({ title: 'Claimed successfully!' });
              onSuccess?.(state.dapp.name);
            },
            onError: (err: any) => {
              toast?.dismiss(state.toastId);
              setState((prevState: any) => ({
                ...prevState,
                loading: false,
              }));
              toast?.fail({
                title: err?.message?.includes('user rejected transaction')
                  ? 'User rejected transaction'
                  : `Claim failed!`,
              });
            },
          }}
        />
      )}
    </>
  );
};

export default LendingRewardsTable;
