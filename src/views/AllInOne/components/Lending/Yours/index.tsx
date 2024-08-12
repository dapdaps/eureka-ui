import LendingRewardsTable from '../LendingRewardsTable';
import LendingTable from '../LendingTable';
import LendingTotal from '../LendingTotal';
import useYoursData from './hooks/useYoursData';
import { Label, Right, Title, Value, Yours, YoursTableWrapper } from './styles';

interface IProps {
  markets: any;
  dapps: any;
  toast: any;
  currentDapp: string;
  onButtonClick: any;
  dappsConfig: any;
  onSuccess: any;
  account: any
}

const YoursComponents = (props: IProps) => {
  const { markets, dapps, toast, currentDapp, account } = props;
  const { 
    userTotalSupplyUsd,
    userTotalBorrowUsd,
    userBorrowLimit,
    supplies,
    borrows,
    rewards,
    netApy,
  } = useYoursData(currentDapp, dapps, markets);

  return (
    <>
      <Yours>
        <YoursTableWrapper>
          <Title>
            <div>
              <Label className="yours-table-title">You Deposit</Label>
              <Value className="supply-color">
                <LendingTotal total={userTotalSupplyUsd} digit={2} unit={'$'} />
              </Value>
            </div>
            <Right>
              <Label>Net APY</Label>
              <Value>{currentDapp === 'All' ? '-' : netApy}%</Value>
            </Right>
          </Title>
          <LendingTable
            columns={[
              {
                type: 'name',
                width: '27%',
                name: 'Deposit Asset',
              },
              { type: 'apy', width: '23%', name: 'APY' },
              { type: 'collateral', width: '15%', name: 'Collateral' },
              {
                type: 'total',
                key: 'balance',
                width: '20%',
                name: 'Balance',
              },
              { type: 'button', width: '15%' },
            ]}
            buttons={[
              {
                text: 'Withdraw',
              },
            ]}
            type={'deposit'}
            onButtonClick={props.onButtonClick}
            data={supplies || []}
            emptyTips={'You supplied assets will appear here'}
          />
        </YoursTableWrapper>
        <YoursTableWrapper>
          <Title>
            <div>
              <Label className="yours-table-title">Borrow</Label>
              <Value className="borrow-color">
                <LendingTotal total={userTotalBorrowUsd} digit={2} unit={'$'} />
              </Value>
            </div>
            <Right>
              <Label>Your Borrow Limit</Label>
              <Value>{userBorrowLimit}%</Value>
            </Right>
          </Title>
          <LendingTable
            columns={[
                {
                    type: "name",
                    width: "30%",
                    name: "Borrowed Asset",
                  },
                  { type: "apy", width: "30%", name: "APY/Accrued" },
                  {
                    type: "total",
                    key: "borrowed",
                    width: "20%",
                    name: "Borrowed",
                  },
                  { type: "button", width: "20%" },
            ]}
            buttons={[
              {
                text: 'Repay',
              },
            ]}
            type={'borrow'}
            onButtonClick={props.onButtonClick}
            data={borrows || []}
            emptyTips={'You borrowed assets will appear here'}
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
