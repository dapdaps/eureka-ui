import { useState } from 'react';

import LendingArrowIcon from '@/views/AllInOne/components/Lending/LendingArrowIcon';
import type { ActionType } from '@/views/AllInOne/components/Lending/LendingDialog/Action';
import LendingAction from '@/views/AllInOne/components/Lending/LendingDialog/Action';
import LendingTableButton from '@/views/AllInOne/components/Lending/LendingTableButton';

import LendingAsset from '../LendingAsset';
import LendingSwitch from '../LendingSwitch';
import LendingTotal from '../LendingTotal';
import {
  ArrowIconWrapper,
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
  tabConfig: any;
  chainId: any;
  account: any;
  addAction: any;
  onSuccess: any;
  toast: any;
  markets: any;
  dapps: any;
  tabs: ActionType[];
  rowExpanded?: boolean;
  updateBalance?: number;

  onRowClick?(row: any, index: number): void;

  onButtonClick?(row: any, button?: string): void;
}

const LendingDepositTable = (props: Partial<IProps>) => {
  const {
    columns,
    data,
    buttons,
    totalReverse,
    emptyTips,
    type,
    markets,
    dapps,
    tabConfig,
    addAction,
    toast,
    account,
    chainId,
    tabs,
    updateBalance,
    rowExpanded = true,
    onRowClick,
    onButtonClick,
    onSuccess
  } = props;

  const [openKey, setOpenKey] = useState<number | undefined>(undefined);
  const [params, setParams] = useState<any>();

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
        <LendingAsset icon={market.icon} symbol={market.symbol} />
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

  const handleRowClick = (row: any, index: number) => {
    onRowClick && onRowClick(row, index);

    if (!rowExpanded) return;

    setOpenKey(index === openKey ? undefined : index);
    const market = markets[row.address];
    const dapp = dapps[market.dapp];
    const dappConfig = tabConfig.dapps[market.dapp];
    setParams({
      data: {
        ...dapp,
        ...market,
        config: { ...dappConfig, wethAddress: tabConfig?.wethAddress },
        addAction,
        toast
      },
      account,
      chainId,
      addAction,
      toast
    });
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
        {data?.map((record: any, idx: number) => {
          const market = markets[record.address];
          const dapp = dapps[market.dapp];
          const dappConfig = tabConfig.dapps[market.dapp];

          return (
            <>
              <Row key={record.address || Date.now() + Math.random()}>
                <RowCols onClick={() => handleRowClick(record, idx)}>
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
                          {buttons?.map((button: any, j: number) => (
                            <LendingTableButton
                              key={j}
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
                      {column.type === 'arrow' && (
                        <ArrowIconWrapper className={`open ${idx === openKey ? 'open-active' : ''}`}>
                          <LendingArrowIcon color="#979ABE" />
                        </ArrowIconWrapper>
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
                {idx === openKey ? (
                  <LendingAction
                    {...params}
                    data={{
                      ...dapp,
                      ...market,
                      config: { ...dappConfig, wethAddress: tabConfig?.wethAddress },
                      addAction,
                      toast
                    }}
                    onSuccess={onSuccess}
                    isHideInfo={true}
                    tabs={tabs}
                    updateBalance={updateBalance}
                  />
                ) : null}
              </Row>
            </>
          );
        })}
        {(data?.length === 0 || !data) && <Empty>{emptyTips}</Empty>}
      </Body>
    </Table>
  );
};

export default LendingDepositTable;
