import { useEffect, useState } from "react";
import styled from 'styled-components';

import { useDefaultLayout } from '@/hooks/useLayout';
import type { NextPageWithLayout } from '@/utils/types';
import StakeModalDapp from '@/views/StakeModal/index';


export const Page: NextPageWithLayout = () => {
  const [renzoShow, setRenzoShow] = useState(false)
  const [lidoShow, setLidoShow] = useState(false)

  return <div style={{ padding: 50 }}>
    {
      renzoShow && <StakeModalDapp stakeType='renzo' onClose={() => { setRenzoShow(false) }}/>
    }
    {
      lidoShow && <StakeModalDapp stakeType='lido' onClose={() => { setLidoShow(false) }}/>
    }
    <button onClick={() => setRenzoShow(true)}>renzo</button>
    <button onClick={() => setLidoShow(true)} style={{ marginLeft: 20 }}>lido</button>
    <button onClick={() => window.location.href = './etherFi'} style={{ marginLeft: 20 }}>etherFi</button>
  </div>
  // return <StakeModalDapp stakeType='lido'/>;
};

Page.getLayout = useDefaultLayout;

export default Page;
