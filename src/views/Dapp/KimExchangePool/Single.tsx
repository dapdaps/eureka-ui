import { useState } from 'react';

import PageBack from '@/components/PageBack';
import KimExchangePool from '@/views/KimExchangePool';
import AddLiquidity from '@/views/KimExchangePool/AddLiquidity';
import Detail from '@/views/KimExchangePool/Detail';
import IncreaseLiquidity from '@/views/KimExchangePool/IncreaseLiquidity';
import RemoveLiquidity from '@/views/KimExchangePool/RemoveLiquidity';
import { LiquidityContext } from '@/views/Pool/context';
import { ActionType } from '@/views/Pool/Pools';

import { StyledPoolBack } from './styles';

const KimExchangePoolSingle = (props: any) => {
  const { dapp, chainId, currentChain, localConfig, chains } = props;

  const [poolPage, setPoolPage] = useState<PageType>(PageType.Pools);
  const [poolData, setPoolData] = useState<Record<string, any>>();

  const handleAction = (type: ActionType, position?: any) => {
    if (type === ActionType.Add) {
      setPoolPage(PageType.Add);
    }
    if (type === ActionType.Position) {
      const _poolData: Record<string, any> = {};

      if (position.poolVersion === 'V3') {
        _poolData.id = position.data.tokenId;
      } else {
        _poolData.id = position.poolAddress;
        _poolData.fee = position.fee;
      }
      setPoolData(_poolData);
      setPoolPage(PageType.Detail);
    }
  };

  const handleBack = () => {
    setPoolPage(PageType.Pools);
    setPoolData({});
  };

  return (
    <LiquidityContext.Provider
      value={{
        dapp,
        ...localConfig,
        chainId,
        chains,
        currentChain,
        tokenId: poolData?.id,
        token0: poolData?.token0,
        token1: poolData?.token1,
        tab: poolData?.tab,
      }}
    >
      {
        [PageType.Detail].includes(poolPage) && (
          <StyledPoolBack>
            <PageBack onBack={handleBack} />
          </StyledPoolBack>
        )
      }
      {
        poolPage === PageType.Detail && (
          <Detail />
        )
      }
      {
        poolPage === PageType.Add && (
          <AddLiquidity />
        )
      }
      {
        poolPage === PageType.Pools && (
          <KimExchangePool />
        )
      }
      {
        poolPage === PageType.Remove && (
          <RemoveLiquidity />
        )
      }
      {
        poolPage === PageType.Increase && (
          <IncreaseLiquidity />
        )
      }
    </LiquidityContext.Provider>
  );
};

export default KimExchangePoolSingle;

enum PageType {
  Pools = 'pools',
  Detail = 'detail',
  Add = 'add',
  Remove = 'remove',
  Increase = 'increase',
}
