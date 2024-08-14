import LendingAsset from '../LendingAsset';
import LendingSwitch from '../LendingSwitch';
import LendingTableButton from '../LendingTableButton';
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
    RowHeader,
    Table,
    Total,
    TotalValue,
} from './styles'

const columns =  [
  {
    type: "name",
    width: "27%",
    name: "Deposit Asset",
  },
  { type: "apy", width: "23%", name: "APY" },
  { type: "collateral", width: "15%", name: "Collateral" },
  {
    type: "total",
    key: "balance",
    width: "20%",
    name: "Balance",
  },
  { type: "button", width: "15%" },
]

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
    onButtonClick: any;
}

const LendingDepositTable = (props: Partial<IProps>) => {
  const { columns, data, buttons, totalReverse, emptyTips, type, onButtonClick } = props;

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
        <LendingAsset 
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
            onChange = {
                () => {
                    if (record.isCollateral === undefined) return;
                    onButtonClick?.(record.address, record.isCollateral ? 'Disable as Collateral' : 'Enable as Collateral');
                  }
            }
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
            .map((reward: any, index:number) => {
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
    <Table>
      <Header>
        {columns?.map((column) => (
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
                  textAlign: column.type === 'button' ? 'right' : 'left',
                }}
              >
                {column.type === 'name' && renderAssetName(record)}
                {column.type === 'button' && (
                  <Buttons>
                    {buttons?.map((button: any, j:number) => (
                      <LendingTableButton 
                          key={j}
                          text={button.text}
                          loading={typeof button.loading === 'function' ? button.loading(record) : button.loading}
                          onClick={() => {
                              const _loading = typeof button.loading === 'function' ? button.loading(record) : button.loading;
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
                {!['name', 'button'].includes(column.type) && (
                  <NormalCell>
                    <div className="column-name">{column.name}</div>
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
          </Row>
        ))}
        {(data?.length === 0 || !data) && <Empty>{emptyTips}</Empty>}
      </Body>
    </Table>
  );
};
export default LendingDepositTable


