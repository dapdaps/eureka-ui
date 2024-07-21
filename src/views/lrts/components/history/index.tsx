import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import type { CSSProperties, FC, ReactNode } from 'react';
import React, { useEffect } from 'react';

import useAccount from '@/hooks/useAccount';
import { ellipsHash } from '@/utils/account';
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

  const { loading, actionList } = useActionList({ account, source: 'lrts' });

  const defaultData: DataType[] = [];
  const [data, setData] = React.useState(() => [...defaultData]);
  useEffect(() => {
    if (!actionList || !actionList?.data?.length) return;

    const _data = actionList.data.map((item: any) => {
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
    });

    setData(_data);
  }, [actionList]);

  const columnHelper = createColumnHelper<DataType>();
  const columns = [
    columnHelper.accessor('action', {
      cell: (info) => ActionTypeMap.get(info.getValue()),
    }),
    columnHelper.accessor((row) => row.sent, {
      id: 'sent',
      cell: (info: any) => {
        const { fromTokenSymbol, fromTokenAmount } = info.getValue();

        return `${fromTokenSymbol} ${fromTokenAmount}`;
      },
      header: () => <span>Sent</span>,
    }),
    columnHelper.accessor('recive', {
      id: 'recive',
      header: () => 'Receive',
      cell: (info: any) => {
        const { toTokenSymol, toTokenAmount } = info.getValue();

        return `${toTokenSymol} ${toTokenAmount}`;
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
  console.log('data--', data);

  return <MyTable data={data} columns={columns} emptyTips="No transaction records found..." />;
};

export default History;
