import { StyledContainer } from '@/modules/lending/components/CompoundV3/List/styles';
import CompoundV3TableHeader from '@/modules/lending/components/CompoundV3/TableHeader';
import CompoundV3TableRow from '@/modules/lending/components/CompoundV3/TableRow';

const COLUMNS = [
  {
    key: 'asset',
    label: 'Asset',
    width: '28%'
  },
  {
    key: 'utilization',
    label: 'Utilization',
    width: '10%'
  },
  {
    key: 'earnApr',
    label: 'Net Earn APR',
    width: '10%'
  },
  {
    key: 'borrowApr',
    label: 'Net Borrow APR',
    width: '10%'
  },
  {
    key: 'totalEarningUsd',
    label: 'Total Earning',
    width: '10%',
    type: 'price'
  },
  {
    key: 'totalBorrowUsd',
    label: 'Total Borrowing',
    width: '10%',
    type: 'price'
  },
  {
    key: 'totalCollateralUsd',
    label: 'Total Collateral',
    width: '10%',
    type: 'price'
  },
  {
    key: 'collateralAssets',
    label: 'Collateral Assets',
    width: '10%'
  },
  {
    key: 'handler',
    width: '2%'
  }
];

const CompoundV3List = (props: Props) => {
  const {
    onClickRow,
    curChain,
    assets
  } = props;

  return (
    <StyledContainer>
      <CompoundV3TableHeader columns={COLUMNS} />
      {assets.map((record: any) => (
        <CompoundV3TableRow
          columns={COLUMNS}
          data={record}
          curChain={curChain}
          onClickRow={onClickRow}
          key={record.address}
        />
      ))}
    </StyledContainer>
  );
};

export default CompoundV3List;

export interface Props {
  onClickRow: any;
  curChain: any;
  assets: any;
}
