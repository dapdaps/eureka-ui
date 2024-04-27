import { useDefaultLayout } from '@/hooks/useLayout';
import styled from 'styled-components';

import StakeModalDapp from '@/views/StakeModal/index';
import type { NextPageWithLayout } from '@/utils/types';


export const Page: NextPageWithLayout = () => {
  return <StakeModalDapp stakeType='renzo'/>;
};

Page.getLayout = useDefaultLayout;

export default Page;
