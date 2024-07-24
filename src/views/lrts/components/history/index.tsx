import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import type { CSSProperties, FC, ReactNode } from 'react';
import React, { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
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

  const defaultData: DataType[] = [];
  const [data, setData] = useState(() => [...defaultData]);
  useEffect(() => {
    if (!actionList || !actionList?.data?.length) return;

    const _data = actionList.data
      .map((item: any) => {
        try {
          const extraData = JSON.parse(item.extra_data);
          const { action, fromTokenSymbol, fromTokenAmount, toTokenSymol, toTokenAmount } = extraData;
          return {
            action,
            date: item.timestamp,
            hash: item.tx_id,
            sent: {
              fromTokenSymbol,
              fromTokenAmount,
            },
            recive: {
              toTokenSymol,
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

        return `${fromTokenSymbol} ${unifyNumber(fromTokenAmount)}`;
      },
      header: () => <span>Sent</span>,
    }),
    columnHelper.accessor('recive', {
      id: 'recive',
      header: () => 'Receive',
      cell: (info: any) => {
        const { toTokenSymol, toTokenAmount } = info.getValue();

        return `${toTokenSymol} ${unifyNumber(toTokenAmount)}`;
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
