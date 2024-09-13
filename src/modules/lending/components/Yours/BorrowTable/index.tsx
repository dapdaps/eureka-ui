import LendingYoursTable from '@/modules/lending/components/Yours/Table';

const LendingBorrowTable = (props: Props) => {
  const { data, loading, onButtonClick } = props;

  return (
    <LendingYoursTable
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
      data={data}
      buttons={[
        {
          text: "Repay",
          loading,
        },
      ]}
      type="borrow"
      onButtonClick={onButtonClick}
      emptyTips="You borrowed assets will appear here"
    />
  );
};

export default LendingBorrowTable;

export interface Props {
  data: any;
  loading?: boolean;

  onButtonClick?(address: string, text?: string): void;
}
