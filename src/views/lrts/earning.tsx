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
          dataSource={[]}
          emptyTips="No protocols connected yet, stay tuned..."
          // dataSource={[
          //   {
          //     action: 'Stake',
          //     sent: '0.1 stETH',
          //     receive: '0.1 ETH',
          //     hash: 'SDLGSLDBGLB',
          //     date: 'Jul 4, 2024 5:39 PM',
          //     key: 1,
          //   },
          // ]}
          columns={[
            { title: 'Protocols', dataIndex: 'action', key: 1 },
            { title: 'Network', dataIndex: 'sent', key: 2 },
            { title: 'Assets', dataIndex: 'receive', key: 3 },
            { title: 'TVL', dataIndex: 'hash', key: 4 },
            { title: 'Points', dataIndex: 'date', key: 5 },
            { title: '', dataIndex: 'action', key: 6 },
          ]}
        />
      </Body>
    </Container>
  );
};

export default memo(Earning);
