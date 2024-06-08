import { useEffect, useState } from "react";

import { useDefaultLayout } from '@/hooks/useLayout';
import styled from 'styled-components';

import Launchpad from '@/views/Launchpad';
import type { NextPageWithLayout } from '@/utils/types';


export const Page: NextPageWithLayout = () => {
  const [renzoShow, setRenzoShow] = useState(false)
  const [lidoShow, setLidoShow] = useState(false)

  return <div style={{ padding: 50, color: '#fff' }}>
    <Launchpad />
  </div>
};

Page.getLayout = useDefaultLayout;

export default Page;
