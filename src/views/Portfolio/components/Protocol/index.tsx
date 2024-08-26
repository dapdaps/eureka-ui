import Big from 'big.js';
import { AnimatePresence } from 'framer-motion';
import { uniqBy } from 'lodash';
import React, { memo, useMemo, useState } from 'react';

import { container } from '@/components/animation';
import Loading from '@/components/Icons/Loading';
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

const Protocol = (props: Props) => {
  const {
    dapps,
    loading,
    dappsByChain,
    totalWorth,
    worthList,
    worthLoading,
    worthIncrease,
    tvls,
    tvlsLoading,
  } = props;

  const [currentChain, setCurrentChain] = useState<any>();

  const chainList = useMemo<any[]>(() => {
    if (!dappsByChain) return [];
    const _networks = dappsByChain.map((it: any) => {
      return {
        chain_id: it.chainId,
        usd: Big(it.totalUsdValue || 0).toNumber(),
        name: it.name,
        bgColor: it.selectBgColor,
        icon: it.logo,
      };
    });
    return uniqBy(_networks, 'chain_id');
  }, [dappsByChain]);

  const dappListMerged = useMemo<any[]>(() => {
    const mergedList: any = [];
    if (!dapps) return mergedList;
    dapps.forEach((it: any) => {
      const item = {
        ...it,
        id: it.name,
        name: it.show_name,
        usd: Big(it.totalUsd || 0).toNumber(),
        category: it.type,
        icon: it.dappLogo,
        chainIcon: it.chainLogo,
        assets: it.assets || [],
      };
      const existedIdx = mergedList.findIndex((_it: any) => _it.id === item.id);
      if (existedIdx > -1) {
        mergedList[existedIdx].usd = Big(mergedList[existedIdx].usd).plus(item.usd).toNumber();
      } else {
        mergedList.push(item);
      }
    });
    return mergedList;
  }, [dapps]);

  const renderDappDistribution = () => {
    const handleClick = (dapp: any) => {
      const detailTargetId = `portfolioProtocolDetail-${dapp.chain_id}-${dapp.type}-${dapp.name}`;
      const detailTarget = document.getElementById(detailTargetId);
      if (!detailTarget) return;
      detailTarget.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    };
    if (loading) {
      return (
        <StyledLoadingWrapper $h="100px">
          <Loading size={22} />
        </StyledLoadingWrapper>
      );
    }
    if (currentChain && currentChain.dappList.length) {
      return (
        <StyledFlex
          justifyContent="flex-start"
          alignItems="stretch"
          gap="10px"
          style={{ flexWrap: 'wrap' }}
          key="porfolio-protocol-dapp-list-chain"
        >
          <AnimatePresence mode="popLayout">
            {
              currentChain.dappList.map((dapp: any) => (
                <DAppCard
                  key={dapp.id}
                  dapp={dapp}
                  onClick={() => handleClick(dapp)}
                />
              ))
            }
          </AnimatePresence>
        </StyledFlex>
      );
    }
    if (dapps.length) {
      return (
        <StyledFlex
          justifyContent="flex-start"
          alignItems="stretch"
          gap="10px"
          style={{ flexWrap: 'wrap' }}
          key="porfolio-protocol-dapp-list-all"
        >
          {
            dapps.map((dapp: any) => (
              <DAppCard
                key={dapp.id}
                dapp={dapp}
                onClick={() => handleClick(dapp)}
              />
            ))
          }
        </StyledFlex>
      );
    }
    return (
      <NoDataLayout />
    );
  };

  const renderDetail = () => {
    if (loading) {
      return (
        <StyledLoadingWrapper $h="100px">
          <Loading size={22} />
        </StyledLoadingWrapper>
      );
    }
    if (currentChain && currentChain.dappList.length) {
      return (
        <div key="porfolio-protocol-dapp-list-detail-chain">
          {
            currentChain.dappList.map((dapp: any) => (
              <DetailCard key={dapp.name} dapp={dapp} style={{ marginBottom: 20 }} />
            ))
          }
        </div>
      );
    }
    if (dapps.length) {
      return (
        <div key="porfolio-protocol-dapp-list-detail-all">
          {
            dapps.map((dapp: any) => (
              <DetailCard key={dapp.name} dapp={dapp} style={{ marginBottom: 20 }} />
            ))
          }
        </div>
      );
    }
    return (
      <NoDataLayout />
    );
  };

  return (
    <AnimatePresence mode="wait">
      <StyledContainer {...container}>
        <StyledFlex justifyContent="space-between" alignItems="stretch" gap="16px" style={{ flexWrap: 'wrap' }}>
          <ChartComponent
            totalWorth={totalWorth}
            list={worthList}
            loading={worthLoading}
            increase={worthIncrease}
          />
          <Distribution
            chainData={chainList}
            dAppData={dappListMerged}
          />
        </StyledFlex>
        <StyledFlex
          justifyContent="space-between"
          alignItems="stretch"
          gap="10px"
          style={{ flexWrap: 'wrap', marginTop: 16 }}
        >
          {
            tvls.map((cate) => (
              <Category
                key={cate.key}
                title={cate.label}
                icon={cate.icon}
                usd={cate.usd}
                tradingVolume={cate.tradingVolume}
                executions={cate.executions}
                loading={tvlsLoading}
              />
            ))
          }
        </StyledFlex>
        <Title title="Chain Distribution" style={{ marginTop: 50 }}>
          <StyledFlex justifyContent="flex-start" alignItems="stretch" gap="12px" style={{ flexWrap: 'wrap' }}>
            {
              !loading && dappsByChain.length && dappsByChain.map((chain: any) => (
                <ChainCard
                  key={chain.chainId}
                  chain={chain}
                  onClick={() => {
                    if (chain.chainId === currentChain?.chainId) {
                      setCurrentChain(null);
                      return;
                    }
                    setCurrentChain(chain);
                  }}
                />
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
            !loading && !dappsByChain.length && (
              <NoDataLayout />
            )
          }
        </Title>
        <Title title="dApp Distribution" style={{ marginTop: 50 }}>
          {renderDappDistribution()}
        </Title>
        <Title title="Detail" style={{ marginTop: 50 }}>
          {renderDetail()}
        </Title>
      </StyledContainer>
    </AnimatePresence>
  );
};

export default memo(Protocol);

export interface Props {
  dapps: any;
  dappsByChain: any;
  loading?: boolean;
  totalWorth: Big.Big;
  worthList: any[];
  worthLoading: boolean;
  worthIncrease: any;
  tvls: any[];
  tvlsLoading: boolean;
}
