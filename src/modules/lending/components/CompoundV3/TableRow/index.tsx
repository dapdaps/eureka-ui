import Big from 'big.js';

import CompoundV3Asset from '@/modules/lending/components/CompoundV3/Asset';
import {
  StyledAssetIcon,
  StyledAssets,
  StyledExpand,
  StyledRow,
  StyledRowHeader,
  StyledRowItem
} from '@/modules/lending/components/CompoundV3/TableRow/styles';
import CompoundV3UsdPrice from '@/modules/lending/components/CompoundV3/UsdPrice';
import CompoundV3Utilization from '@/modules/lending/components/CompoundV3/Utilization';

const CompoundV3TableRow = (props: Props) => {
  const { columns, data, curChain, onClickRow } = props;

  return (
    <StyledRow
      onClick={() => {
        onClickRow(data);
      }}
    >
      <StyledRowHeader>
        {columns.map((column: any) => (
          <StyledRowItem key={column.key} style={{ width: column.width }}>
            {column.key === 'asset' && (
              <CompoundV3Asset icon={data.baseToken.icon} symbol={data.baseToken.symbol} curChain={curChain} />
            )}
            {column.key === 'utilization' && <CompoundV3Utilization value={Big(data.utilization).toFixed(2)} />}
            {column.key === 'earnApr' && (
              <>
                {Big(data.supplyApr || 0)
                  .add(data.supplyCompRewardApr || 0)
                  .mul(100)
                  .toFixed(2)}{' '}
                %
              </>
            )}
            {column.key === 'borrowApr' && (
              <>
                {Big(data.borrowApr || 0)
                  .minus(data.borrowCompRewardApr || 0)
                  .mul(100)
                  .toFixed(2)}
                %
              </>
            )}
            {column.type === 'price' && <CompoundV3UsdPrice price={data[column.key]} />}
            {column.key === 'collateralAssets' && (
              <StyledAssets>
                <div>{data.collateralAssets.length}</div>
                {data.collateralAssets?.map((asset: any, i: number) => (
                  <StyledAssetIcon
                    src={asset.icon}
                    key={asset.address}
                    style={{ marginLeft: i > 0 ? '-6px' : '0px' }}
                  />
                ))}
              </StyledAssets>
            )}
            {column.key === 'handler' && (
              <StyledExpand>
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path
                    d="M5.94103 7.02391C5.5407 7.52432 4.77961 7.52432 4.37929 7.02391L0.459914 2.1247C-0.0638966 1.46993 0.402276 0.499999 1.24078 0.499999L9.07953 0.5C9.91804 0.5 10.3842 1.46993 9.8604 2.12469L5.94103 7.02391Z"
                    fill="#979ABE"
                  />
                </svg>
              </StyledExpand>
            )}
          </StyledRowItem>
        ))}
      </StyledRowHeader>
    </StyledRow>
  );
};

export default CompoundV3TableRow;

export interface Props {
  columns: any;
  data: any;
  curChain: any;
  onClickRow: any;
}
