import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import PageBack from '@/components/PageBack';
import { IAction, useUrlPatchStore } from '@/stores/urlPatch';
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
  const [poolType, setPoolType] = useState<string>('V3');

  const searchParams = useSearchParams();
  const setUrlPatchState = useUrlPatchStore((state) => state.set);

  useEffect(() => {
    const action = searchParams.get('action');
    if (action === IAction.ZerolendAddToV2) {
      setUrlPatchState({ currentAction: IAction.ZerolendAddToV2 });
      setPoolType('V2');
      setPoolPage(PageType.Add);
    }
  }, [searchParams, setUrlPatchState]);

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
      {poolPage === PageType.Add && <AddLiquidity type={poolType} isHideBack from="modal" onClose={handleBack} />}
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
