import { StyledHeader } from '@/modules/lending/CompoundV3/TableHeader/styles';

const CompoundV3TableHeader = (props: Props) => {
  const { columns } = props;

  return (
    <StyledHeader>
      {columns.map((column: any) => (
        <div key={column.key} style={{ width: column.width }}>
          {column.label}
        </div>
      ))}
    </StyledHeader>
  );
};

export default CompoundV3TableHeader;

export interface Props {
  columns: any;
}
