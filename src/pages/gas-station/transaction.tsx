import { useSetChain } from '@web3-onboard/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { Chain } from '@/types';
import type { NextPageWithLayout } from '@/utils/types';
import Transaction from '@/views/GasStation/Transaction';

const Container = styled.div`
  padding-top: 80px;
`;

const Bridge: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <Container>
      <Transaction />
    </Container>
  )
};

Bridge.getInitialProps = async () => ({});

Bridge.getLayout = useDefaultLayout;

export default Bridge;
