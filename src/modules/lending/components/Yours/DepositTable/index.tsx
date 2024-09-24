import LendingYoursTable from '@/modules/lending/components/Yours/Table';

const LendingDepositTable = (props: Props) => {
  const { data, loading, onButtonClick } = props;

  return (
    <LendingYoursTable
      columns={[
        {
          type: 'name',
          width: '27%',
          name: 'Deposit Asset'
        },
        { type: 'apy', width: '23%', name: 'APY' },
        { type: 'collateral', width: '15%', name: 'Collateral' },
        {
          type: 'total',
          key: 'balance',
          width: '20%',
          name: 'Balance'
        },
        { type: 'button', width: '15%' }
      ]}
      data={data}
      buttons={[
        {
          text: 'Withdraw',
          loading: loading
        }
      ]}
      type="deposit"
      onButtonClick={onButtonClick}
      emptyTips="You supplied assets will appear here"
    />
  );
};

export default LendingDepositTable;

export interface Props {
  data: any;
  loading?: boolean;

  onButtonClick?(address: string, text?: string): void;
}
