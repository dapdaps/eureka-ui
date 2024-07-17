import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import { CustomTable, PolygonBtn } from '@/views/lrts/components';
import useActionList from '@/views/lrts/hooks/useActionList';

interface IProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const History: FC<IProps> = (props) => {
  const [dataSource, setDataSource] = useState([
    {
      action: 'Stake',
      sent: '0.1 stETH',
      receive: '0.1 ETH',
      hash: 'SDLGSLDBGLB',
      date: 'Jul 4, 2024 5:39 PM',
      key: 1,
    },
  ]);
  const { chainId, account } = useAccount();
  //   useEffect(() => {}, []);
  const { loading, actionList } = useActionList({ account, source: 'lrts' });
  console.log('actionList--', actionList);

  return (
    <CustomTable
      dataSource={dataSource}
      columns={[
        { title: 'Action', dataIndex: 'action', key: 1 },
        { title: 'Sent', dataIndex: 'sent', key: 2 },
        { title: 'Receive', dataIndex: 'receive', key: 3 },
        { title: 'Hash', dataIndex: 'hash', key: 4 },
        { title: 'Date', dataIndex: 'date', key: 5 },
      ]}
    />
  );
};

export default memo(History);
