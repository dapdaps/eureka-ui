import { memo, useMemo, useState, useEffect } from 'react';

import chainsConfig, { PathToId } from '@/config/all-in-one/chains';
import useReport from '@/views/Landing/hooks/useReport';

import { ListItem } from './components';

import { StyledContainer, Banner, Title, Desc, Wrap, H1 } from './styles';
import useNetworks from './hooks/useNetworks';

const List = ({ path }: any) => {
  const { loading, networkList } = useNetworks();

  return (
    <StyledContainer>
      <Banner>
        <Title>
          Explore <span className="highlight">15+ L2</span> Networks
        </Title>
        <Desc>
          Discover the most popular Ethereum roll-ups and EVMs across the market. Also, <br />
          explore related blockchains including Layer-1s, sidechains, and testnets.
        </Desc>
      </Banner>
      <Wrap>
        <H1>L2 Networks</H1>
        {networkList.map((item: any) => (
          <ListItem dataSource={item} />
        ))}

        <H1>L1 Networks</H1>
      </Wrap>
    </StyledContainer>
  );
};

export default memo(List);
