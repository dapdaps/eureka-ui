import { useState } from 'react';

import PageBack from '@/components/PageBack';
import AddLiquidity from '@/views/Pool/AddLiquidity';
import { LiquidityContext } from '@/views/Pool/context';
import Detail from '@/views/Pool/Detail';
import { ActionType } from '@/views/Pool/Pools';
import Pools from '@/views/Pool/Pools';

import { StyledPoolBack } from './styles';

const PoolDappSingle = (props: any) => {
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
        id: poolData?.id,
        fee: poolData?.fee
      }}
    >
      {[PageType.Detail].includes(poolPage) && (
        <StyledPoolBack>
          <PageBack onBack={handleBack} />
        </StyledPoolBack>
      )}
      {poolPage === PageType.Detail && <Detail isHideBack onClose={handleBack} />}
      {poolPage === PageType.Add && <AddLiquidity isHideBack from="modal" onClose={handleBack} />}
      {poolPage === PageType.Pools && <Pools onAction={handleAction} />}
    </LiquidityContext.Provider>
  );
};

export default PoolDappSingle;

enum PageType {
  Pools = 'pools',
  Detail = 'detail',
  Add = 'add'
}
