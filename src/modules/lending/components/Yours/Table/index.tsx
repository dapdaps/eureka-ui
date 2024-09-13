import LendingTotal from '@/modules/lending/components/Total';
import LendingYoursAsset from '@/modules/lending/components/Yours/Asset';
import LendingYoursButton from '@/modules/lending/components/Yours/Button';
import LendingSwitch from '@/modules/lending/components/Yours/Switch';

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
  RowHeader,
  Table,
  Total,
  TotalValue
} from './styles';

const LendingYoursTable = (props: Props) => {
  const {
    columns,
    data,
    buttons,
    totalReverse,
    emptyTips,
    type,
    onButtonClick
  } = props;

  const renderTotal = (record: any, key: any, isSpecialKey?: boolean) => {
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
        <LendingYoursAsset
          icon={market.icon}
          symbol={market.symbol}
          dappIcon={market.dappIcon}
          dappName={market.dappName}
        />
      </RowHeader>
    );
  };

  const renderCollateral = (record: any) => {
    return (
      <LendingSwitch
        active={record.isCollateral === undefined ? true : record.isCollateral}
        onChange={() => {
          console.log('--------', record);
          if (record.isCollateral === undefined) return;

          // if (dappName === "Valas Finance") {
          //   onButtonClick?.(record.address, record.isCollateral ? false : true);
          // } else {
          onButtonClick?.(
            record.address,
            record.isCollateral
              ? 'Disable as Collateral'
              : 'Enable as Collateral'
          );
          // }
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
              const apy = (
                type === 'deposit' ? reward.supply : reward.borrow
              ).slice(0, -1);
              return !!Number(apy);
            })
            .map((reward: any, index: number) => {
              return (
                <RewardApyItem key={index}>
                  {reward.icon ? <RewardIcon src={reward.icon} /> : null}
                  <RewardApy>
                    {type === 'deposit' ? reward.supply : reward.borrow} APR
                  </RewardApy>
                </RewardApyItem>
              );
            })}
      </>
    );
  };

  return (
    <Table>
      <Header>
        {columns?.map((column: any) => (
          <Column key={column.key || column.type} style={{ width: column.width }}>
            {column.name}
          </Column>
        ))}
      </Header>
      <Body>
        {data?.map((record: any) => (
          <Row key={record.address || Date.now() + Math.random()}>
            {columns?.map((column: any) => (
              <Cell
                key={column.key || column.type}
                style={{
                  width: column.width,
                  textAlign: column.type === 'button' ? 'right' : 'left'
                }}
              >
                {column.type === 'name' && renderAssetName(record)}
                {column.type === 'button' && (
                  <Buttons>
                    {buttons?.map((button: any, j: number) => (
                      <LendingYoursButton
                        key={j}
                        onClick={() => {
                          if (button.text === 'Claim') {
                            onButtonClick?.(record);
                          } else {
                            onButtonClick?.(record.address, button.text);
                          }
                        }}
                        text={button.text}
                        loading={typeof button.loading === 'function'
                          ? button.loading(record)
                          : button.loading}
                      />
                    ))}
                  </Buttons>
                )}
                {!['name', 'button'].includes(column.type) && (
                  <NormalCell>
                    <div className="column-name">{column.name}</div>
                    <div className="row-value">
                      {column.type === 'total' && renderTotal(record, column.key)}
                      {column.type === 'apy' && renderApy(record)}
                      {column.type === 'collateral' && renderCollateral(record)}
                      {!['total', 'apy', 'collateral'].includes(column.type) &&
                        record[column.key]}
                    </div>
                  </NormalCell>
                )}
              </Cell>
            ))}
          </Row>
        ))}
        {(data?.length === 0 || !data) && <Empty>{emptyTips}</Empty>}
      </Body>
    </Table>
  );
};

export default LendingYoursTable;

export interface Props {
  columns: any;
  data: any;
  buttons: any;
  totalReverse?: boolean;
  emptyTips?: any;
  type?: string;

  onButtonClick?(address: string, text?: string): void;
}
