import LendingTableButton from '@/views/AllInOne/components/Lending/LendingTableButton';

import LendingAsset from '../LendingAsset';
import LendingSwitch from '../LendingSwitch';
import LendingTotal from '../LendingTotal';
import {
  Body,
  Buttons,
  Cell,
  Column,
  Empty,
  Header,
  NormalCell,
  RewardApy,
  RewardApyItem,
  RewardIcon,
  Row,
  RowCols,
  RowHeader,
  Table,
  Total,
  TotalValue
} from './styles';

interface IColumn {
  type: string;
  name?: string;
  width?: string;
  key?: string;
}

interface IProps {
  columns?: IColumn[];
  data: any;
  buttons: any;
  totalReverse: any;
  emptyTips: any;
  type: any;
  classname?: string;

  onButtonClick?(row: any, button?: string): void;
}

const LendingDepositTable = (props: Partial<IProps>) => {
  const { columns = [], data, buttons, totalReverse, emptyTips, type, onButtonClick, classname = '' } = props;

  const renderTotal = (record: any, key: any, isSpecialKey?: any) => {
    return (
      <div className={`${isSpecialKey && 'special-total'}`}>
        <Total>
          <LendingTotal
            total={totalReverse ? record[key] : record[`${key}_value`]}
            digit={2}
            unit={totalReverse ? '' : '$'}
          />
        </Total>
        <TotalValue>
          <LendingTotal
            total={totalReverse ? record[`${key}_value`] : record[key]}
            digit={2}
            unit={totalReverse ? '$' : ''}
          />
        </TotalValue>
      </div>
    );
  };
  const renderAssetName = (market: any) => {
    return (
      <RowHeader>
        <LendingAsset icon={market.icon} symbol={market.symbol} dappIcon={market.dappIcon} dappName={market.dappName} />
      </RowHeader>
    );
  };
  const renderMarketName = (market: any) => {
    return (
      <RowHeader>
        <LendingAsset icon={market.dappIcon} symbol={market.dappName} />
      </RowHeader>
    );
  };

  const renderCollateral = (record: any) => {
    return (
      <LendingSwitch
        active={record.isCollateral === undefined ? true : record.isCollateral}
        onChange={() => {
          if (record.isCollateral === undefined) return;
          onButtonClick?.(record.address, record.isCollateral ? 'Disable as Collateral' : 'Enable as Collateral');
        }}
      />
    );
  };
  const renderApy = (record: any) => {
    return (
      <>
        <div className="apy">{record.apy}</div>
        {record.distributionApy &&
          record.distributionApy
            .filter((reward: any) => {
              const apy = (type === 'deposit' ? reward.supply : reward.borrow).slice(0, -1);
              return !!Number(apy);
            })
            .map((reward: any, index: number) => {
              return (
                <RewardApyItem key={index}>
                  {reward.icon ? <RewardIcon src={reward.icon} /> : null}
                  <RewardApy>{type === 'deposit' ? reward.supply : reward.borrow} APR</RewardApy>
                </RewardApyItem>
              );
            })}
      </>
    );
  };

  return (
    <Table className={classname}>
      <Header className="table-head">
        {columns?.map((column) => (
          <Column key={'column' + (column.key || column.type)} style={{ width: column.width }}>
            {column.name}
          </Column>
        ))}
      </Header>
      <Body>
        {data?.map((record: any, idx: number) => {
          return (
            <Row key={`${type}${idx}`}>
              <RowCols>
                {columns?.map((column: any) => (
                  <Cell
                    key={column.key || column.type}
                    style={{
                      width: column.width,
                      justifyContent: column.type === 'button' ? 'center' : 'left'
                    }}
                  >
                    {column.type === 'name' && renderAssetName(record)}
                    {column.type === 'market' && renderMarketName(record)}
                    {column.type === 'button' && (
                      <Buttons>
                        {buttons?.map((button: any, idx: number) => (
                          <LendingTableButton
                            key={idx}
                            text={button.text}
                            loading={typeof button.loading === 'function' ? button.loading(record) : button.loading}
                            onClick={() => {
                              const _loading =
                                typeof button.loading === 'function' ? button.loading(record) : button.loading;
                              if (_loading) return;
                              if (button.text === 'Claim') {
                                onButtonClick?.(record);
                              } else {
                                onButtonClick?.(record.address, button.text);
                              }
                            }}
                          />
                        ))}
                      </Buttons>
                    )}
                    {!['name', 'market', 'button'].includes(column.type) && (
                      <NormalCell>
                        <div className="row-value">
                          {column.type === 'total' && renderTotal(record, column.key)}
                          {column.type === 'apy' && renderApy(record)}
                          {column.type === 'collateral' && renderCollateral(record)}
                          {!['total', 'apy', 'collateral'].includes(column.type) && record[column.key]}
                        </div>
                      </NormalCell>
                    )}
                  </Cell>
                ))}
              </RowCols>
            </Row>
          );
        })}
        {(data?.length === 0 || !data) && <Empty>{emptyTips}</Empty>}
      </Body>
    </Table>
  );
};

export default LendingDepositTable;
