import { ActionType } from '@/views/AllInOne/components/Lending/LendingDialog/Action';

import LendingRewardsTable from '../LendingRewardsTable';
import LendingTable from '../LendingTable';
import LendingTotal from '../LendingTotal';
import useYoursData from './hooks/useYoursData';
import { Label, Title, TitleItem, Value, Yours, YoursTableWrapper } from './styles';

interface IProps {
  markets: any;
  dapps: any;
  toast: any;
  currentDapp: string;
  dappsConfig: any;
  onSuccess: any;
  account: any;
  tabConfig: any;
  addAction: any;
  chainId: any;
  updateBalance?: number;

  onButtonClick?(row: any, button?: string): void;
}

const YoursComponents = (props: IProps) => {
  const {
    markets,
    dapps,
    toast,
    currentDapp,
    account,
    tabConfig,
    addAction,
    chainId,
    onSuccess,
    updateBalance,
    onButtonClick
  } = props;

  const { userTotalSupplyUsd, userTotalBorrowUsd, userBorrowLimit, supplies, borrows, rewards, netApy } = useYoursData(
    currentDapp,
    dapps,
    markets
  );

  return (
    <>
      <Yours>
        <YoursTableWrapper>
          <Title>
            <TitleItem>
              <Label className="yours-table-title">Supply</Label>
              <Value className="supply-color">
                <LendingTotal total={userTotalSupplyUsd} digit={2} unit={'$'} />
              </Value>
            </TitleItem>
            <TitleItem>
              <Label>Net APY</Label>
              <Value>{currentDapp === 'All' ? '-' : netApy}%</Value>
            </TitleItem>
          </Title>
          <LendingTable
            columns={[
              {
                type: 'name',
                width: '20%',
                name: 'Asset'
              },
              {
                type: 'market',
                width: '20%',
                name: 'Market'
              },
              { type: 'apy', width: '15%', name: 'APY' },
              { type: 'collateral', width: '15%', name: 'Collateral' },
              {
                type: 'total',
                key: 'balance',
                width: '20%',
                name: 'Balance'
              },
              { type: 'arrow', width: '10%' }
            ]}
            type={'deposit'}
            data={supplies || []}
            emptyTips={'You supplied assets will appear here'}
            markets={markets}
            dapps={dapps}
            tabConfig={tabConfig}
            addAction={addAction}
            onButtonClick={onButtonClick}
            toast={toast}
            account={account}
            chainId={chainId}
            onSuccess={onSuccess}
            tabs={[ActionType.Withdraw]}
            updateBalance={updateBalance}
          />
        </YoursTableWrapper>
        <YoursTableWrapper>
          <Title>
            <TitleItem>
              <Label className="yours-table-title">Borrow</Label>
              <Value className="borrow-color">
                <LendingTotal total={userTotalBorrowUsd} digit={2} unit={'$'} />
              </Value>
            </TitleItem>
            <TitleItem>
              <Label>Your Borrow Limit</Label>
              <Value>{userBorrowLimit}%</Value>
            </TitleItem>
          </Title>
          <LendingTable
            columns={[
              {
                type: 'name',
                width: '20%',
                name: 'Asset'
              },
              {
                type: 'market',
                width: '20%',
                name: 'Market'
              },
              { type: 'apy', width: '15%', name: 'APY' },
              {
                type: 'total',
                key: 'borrowed',
                width: '20%',
                name: 'Borrowed'
              },
              { type: 'arrow', width: '10%' }
            ]}
            type={'borrow'}
            data={borrows || []}
            emptyTips={'You borrowed assets will appear here'}
            markets={markets}
            dapps={dapps}
            tabConfig={tabConfig}
            addAction={addAction}
            toast={toast}
            account={account}
            chainId={chainId}
            onSuccess={onSuccess}
            tabs={[ActionType.Repay]}
            updateBalance={updateBalance}
          />
        </YoursTableWrapper>
      </Yours>
      <LendingRewardsTable
        data={rewards || []}
        dapps={props.dappsConfig}
        onSuccess={props.onSuccess}
        supplies={supplies}
        toast={toast}
        account={account}
      />
    </>
  );
};

export default YoursComponents;
