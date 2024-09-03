import { useState } from 'react';

import LendingDialog from '@/views/AllInOne/components/Lending/LendingDialog';
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
  const { markets, dapps, toast, currentDapp, account, tabConfig, addAction, chainId, onSuccess } = props;

  const { userTotalSupplyUsd, userTotalBorrowUsd, userBorrowLimit, supplies, borrows, rewards, netApy } = useYoursData(
    currentDapp,
    dapps,
    markets
  );

  const [showDialog, setShowDialog] = useState(false);
  const [tableButtonClickData, setTableButtonClickData] = useState<any>(null);

  const onButtonClick = (address: string, actionText: string) => {
    const market = markets[address];
    const dapp = dapps[market.dapp];
    const dappConfig = tabConfig.dapps[market.dapp];
    setTableButtonClickData({
      ...dapp,
      ...market,
      config: { ...dappConfig, wethAddress: tabConfig?.wethAddress },
      actionText
    });
    setShowDialog(true);
  };

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
                width: '28%',
                name: 'Asset'
              },
              { type: 'apy', width: '18%', name: 'APY' },
              { type: 'collateral', width: '15%', name: 'Collateral' },
              {
                type: 'total',
                key: 'balance',
                width: '18%',
                name: 'Balance'
              },
              { type: 'button', width: '15%' }
            ]}
            buttons={[
              {
                text: 'Withdraw'
              }
            ]}
            type={'deposit'}
            data={supplies || []}
            emptyTips={'You supplied assets will appear here'}
            onButtonClick={onButtonClick}
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
                width: '30%',
                name: 'Asset'
              },
              {
                type: 'apy',
                width: '15%',
                name: 'APY'
              },
              {
                type: 'total',
                key: 'borrowed',
                width: '20%',
                name: 'Borrowed'
              },
              {
                type: 'button',
                width: '15%'
              }
            ]}
            buttons={[
              {
                text: 'Repay'
              }
            ]}
            type={'borrow'}
            data={borrows || []}
            emptyTips={'You borrowed assets will appear here'}
            onButtonClick={onButtonClick}
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
      <LendingDialog
        display={showDialog}
        data={tableButtonClickData}
        chainId={chainId}
        onClose={() => setShowDialog(false)}
        onSuccess={onSuccess}
        account={account}
        addAction={addAction}
        toast={toast}
      />
    </>
  );
};

export default YoursComponents;
