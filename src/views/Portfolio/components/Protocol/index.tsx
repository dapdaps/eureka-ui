import Big from 'big.js';
import { AnimatePresence } from 'framer-motion';
import { uniqBy } from 'lodash';
import React, { memo, useMemo } from 'react';

import { container } from '@/components/animation';
import Loading from '@/components/Icons/Loading';
import popupsData from '@/config/all-in-one/chains';
import chains from '@/config/chains';
import { StyledFlex, StyledLoadingWrapper } from '@/styled/styles';
import { NoDataLayout } from '@/views/Portfolio/components/NoDataLayout';
import Category from '@/views/Portfolio/components/Protocol/Category';
import ChainCard from '@/views/Portfolio/components/Protocol/ChainCard';
import ChartComponent from '@/views/Portfolio/components/Protocol/Chart';
import DAppCard from '@/views/Portfolio/components/Protocol/DAppCard';
import DetailCard from '@/views/Portfolio/components/Protocol/DetailCard';
import Distribution from '@/views/Portfolio/components/Protocol/Distribution';
import { StyledContainer } from '@/views/Portfolio/components/Protocol/styles';
import Title from '@/views/Portfolio/components/Protocol/Title';
import { CategoryList } from '@/views/Portfolio/config';

const Protocol = ({ dapps, networks, chainLoading, loading }: any) => {
  const chainList = useMemo<any[]>(() => {
    if (!networks) return [];
    const _networks = networks.map((it: any) => {
      const currChain = Object.values(popupsData).find((chainConf) => chainConf.chainId === it.id);
      return {
        chain_id: it.id,
        usd: it.usd,
        name: chains[it.id]?.chainName,
        bgColor: currChain?.selectBgColor,
        icon: it.icon,
      };
    });
    return uniqBy(_networks, 'chain_id');
  }, [networks]);

  const dappList = useMemo<any[]>(() => {
    if (!dapps) return [];
    const _dapps = dapps.map((it: any) => {
      return {
        id: it.name,
        name: it.show_name,
        usd: Big(it.usd).toNumber(),
        category: it.type,
        icon: it.icon,
        chainIcon: it.chainIcon,
        assets: it.assets || [],
      };
    });
    return uniqBy(_dapps, 'id');
  }, [dapps]);

  return (
    <AnimatePresence mode="wait">
      <StyledContainer {...container}>
        <StyledFlex justifyContent="space-between" alignItems="stretch" gap="16px" style={{ flexWrap: 'wrap' }}>
          <ChartComponent />
          <Distribution chainData={chainList} dAppData={dappList} />
        </StyledFlex>
        <StyledFlex justifyContent="space-between" alignItems="stretch" gap="10px" style={{ flexWrap: 'wrap', marginTop: 16 }}>
          {
            Object.values(CategoryList).map((cate) => (
              <Category
                key={cate.key}
                title={cate.label}
                icon={cate.icon}
                usd={cate.usd}
                executions={cate.executions}
              />
            ))
          }
        </StyledFlex>
        <Title title="Chain Distribution" style={{ marginTop: 50 }}>
          <StyledFlex justifyContent="flex-start" alignItems="stretch" gap="12px" style={{ flexWrap: 'wrap' }}>
            {
              chainList.map((chain) => (
                <ChainCard key={chain.chain_id} chain={chain} />
              ))
            }
          </StyledFlex>
          {
            chainLoading && (
              <StyledLoadingWrapper $h="100px">
                <Loading size={22} />
              </StyledLoadingWrapper>
            )
          }
          {
            !chainLoading && !chainList.length && (
              <NoDataLayout />
            )
          }
        </Title>
        <Title title="dApp Distribution" style={{ marginTop: 50 }}>
          <StyledFlex justifyContent="flex-start" alignItems="stretch" gap="10px" style={{ flexWrap: 'wrap' }}>
            {
              dappList.map((dapp) => (
                <DAppCard key={dapp.id} dapp={dapp} />
              ))
            }
          </StyledFlex>
          {
            loading && (
              <StyledLoadingWrapper $h="100px">
                <Loading size={22} />
              </StyledLoadingWrapper>
            )
          }
          {
            !loading && !dappList.length && (
              <NoDataLayout />
            )
          }
        </Title>
        <Title title="Detail" style={{ marginTop: 50 }}>
          {
            dappList.map((dapp) => (
              <DetailCard key={dapp.id} dapp={dapp} style={{ marginBottom: 20 }} />
            ))
          }
          {
            loading && (
              <StyledLoadingWrapper $h="100px">
                <Loading size={22} />
              </StyledLoadingWrapper>
            )
          }
          {
            !loading && !dappList.length && (
              <NoDataLayout />
            )
          }
        </Title>
      </StyledContainer>
    </AnimatePresence>
  );
};

export default memo(Protocol);
