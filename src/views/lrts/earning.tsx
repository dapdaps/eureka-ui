import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';

import { CustomTable, Tabs } from './components';
import { Body, Container, Desc, Title } from './styles/earning.style';

interface IProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const Earning: FC<IProps> = (props) => {
  const [state, setState] = useState<number>(0);

  useEffect(() => {}, []);

  return (
    <Container>
      <Body>
        <Title>L2 Earning</Title>
        <Desc>Explore rewards and DeFi opportunities with your LRTs.</Desc>
        <CustomTable
          dataSource={[
            {
              action: 'Stake',
              sent: '0.1 stETH',
              receive: '0.1 ETH',
              hash: 'SDLGSLDBGLB',
              date: 'Jul 4, 2024 5:39 PM',
              key: 1,
            },
            {
              action: 'UnStake',
              sent: '0.1 stETH',
              receive: '0.1 ETH',
              hash: 'SDLGSLDBGLB',
              date: 'Jul 4, 2024 5:39 PM',
              key: 2,
            },
          ]}
          columns={[
            { title: 'Action', dataIndex: 'action', key: 1 },
            { title: 'Sent', dataIndex: 'sent', key: 2 },
            { title: 'Receive', dataIndex: 'receive', key: 3 },
            { title: 'Hash', dataIndex: 'hash', key: 4 },
            { title: 'Date', dataIndex: 'date', key: 5 },
          ]}
        />
      </Body>
    </Container>
  );
};

export default memo(Earning);
