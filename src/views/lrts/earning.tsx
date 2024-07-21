import { createColumnHelper } from '@tanstack/react-table';
import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';

import MyTable from '@/views/lrts/components/react-table';

import { Body, Container, Desc, Title } from './styles/earning.style';

interface IProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const Earning: FC<IProps> = (props) => {
  type DataType = {
    protocols: string;
    network: string;
    assets: string;
    tvl: string;
    points: string;
  };
  const columnHelper = createColumnHelper<DataType>();

  const columns = [
    columnHelper.accessor('protocols', {
      header: () => <span>Protocols</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('network', {
      header: () => <span>Network</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('assets', {
      header: () => <span>Assets</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('tvl', {
      header: () => <span>TVL</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('points', {
      header: () => <span>Points</span>,
      cell: (info) => info.getValue(),
    }),
  ];
  return (
    <Container>
      <Body>
        <Title>L2 Earning</Title>
        <Desc>Explore rewards and DeFi opportunities with your LRTs.</Desc>
        <MyTable data={[]} emptyTips="No protocols connected yet, stay tuned..." columns={columns} />
      </Body>
    </Container>
  );
};

export default memo(Earning);
