import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import Image from 'next/image';
import type { CSSProperties, FC, ReactNode } from 'react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ethereum } from '@/config/tokens/ethereum';
import useAccount from '@/hooks/useAccount';
import { useLrtDataStore } from '@/stores/lrts';
import { ellipsHash } from '@/utils/account';
import { unifyNumber } from '@/utils/format-number';
import MyTable from '@/views/lrts/components/react-table';
import useActionList from '@/views/lrts/hooks/useActionList';

interface IProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}
const StyledToken = styled.span`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ActionTypeMap = new Map([
  ['stake', 'Stake'],
  ['restake', 'ReStake'],
  ['unstake', 'UnStake'],
  ['mint', 'Mint'],
  ['redeem', 'Redeem'],
  ['claim', 'Claim'],
]);

const History: FC<IProps> = (props) => {
  type DataType = {
    action: string;
    sent: string;
    recive: string;
    hash: string;
    date: string;
  };
  const { chainId, account } = useAccount();

  const [pageIndex, setPageIndex] = useState(1);
  const { loading, actionList, count } = useActionList({ account, source: 'lrts', page: pageIndex });

  const tokens = Object.values(ethereum);

  const defaultData: DataType[] = [];
  const [data, setData] = useState(() => [...defaultData]);
  useEffect(() => {
    if (!actionList || !actionList?.data?.length) return;

    const _data = actionList.data
      .map((item: any) => {
        try {
          const extraData = JSON.parse(item.extra_data);
          const { action, fromTokenSymbol, fromTokenAmount, toTokenSymol, toTokenAmount, token0, token1 } = extraData;

          return {
            action,
            date: item.timestamp,
            hash: item.tx_id,
            sent: {
              fromTokenSymbol: action === 'claim' ? token0 : fromTokenSymbol,
              fromTokenAmount: action === 'claim' ? item.action_amount : fromTokenAmount,
            },
            recive: {
              toTokenSymol: action === 'claim' ? token1 : toTokenSymol,
              toTokenAmount,
            },
          };
        } catch (error) {
          console.log('catch-extra-data-error--', error);
        }
      })
      .filter((item: any) => item);

    setData(_data);
  }, [actionList]);

  const pageSize = 10;
  const columnHelper = createColumnHelper<DataType>();
  const columns = [
    columnHelper.accessor('action', {
      cell: (info) => ActionTypeMap.get(info.getValue()),
    }),
    columnHelper.accessor((row) => row.sent, {
      id: 'sent',
      cell: (info: any) => {
        const { fromTokenSymbol, fromTokenAmount } = info.getValue();

        const fromToken = tokens.find((token: any) => token?.symbol === fromTokenSymbol);

        return (
          <StyledToken>
            {fromToken ? <Image src={fromToken.icon || ''} width={30} height={30} alt="" /> : null}
            {`${fromTokenSymbol} ${unifyNumber(fromTokenAmount)}`}
          </StyledToken>
        );
      },
      header: () => <span>Sent</span>,
    }),
    columnHelper.accessor('recive', {
      id: 'recive',
      header: () => 'Receive',
      cell: (info: any) => {
        const { toTokenSymol, toTokenAmount } = info.getValue();

        const toToken = tokens.find((token: any) => token?.symbol === toTokenSymol);
        return (
          <StyledToken>
            {toToken ? <Image src={toToken.icon || ''} width={30} height={30} alt="" /> : null}
            {`${toTokenSymol} ${unifyNumber(toTokenAmount)}`}
          </StyledToken>
        );
      },
    }),
    columnHelper.accessor('hash', {
      id: 'hash',
      header: () => <span>Hash</span>,
      cell: (info) => ellipsHash(info.getValue()),
    }),
    columnHelper.accessor('date', {
      header: 'Date',
      cell(info) {
        return format(Number(info.getValue()) * 1000, 'MMM d, yyyy HH : mm a');
      },
    }),
  ];

  return (
    <MyTable
      data={data}
      pagination={{
        current: pageIndex,
        total: count,
        pageSize,
        // total: Math.ceil(count / pageSize),
        onChange: setPageIndex,
      }}
      columns={columns}
      emptyTips="No transaction records found..."
    />
  );
};

export default History;
