import { memo, useMemo } from 'react';

import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import lendingConfig from '@/config/lending/networks';
import swapConfig from '@/config/swap/networks';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import { usePriceStore } from '@/stores/price';
import { multicall } from '@/utils/multicall';

const Liquidity = (props: Props) => {
  const { chain, menu } = props;

  const { account, chainId } = useAccount();
  const { addAction } = useAddAction('all-in-one');
  const prices = usePriceStore((store) => store.price);

  const menuConfig: any = useMemo(() => {
    if (!chain || !menu.tab) return {};
    if (menu.tab === 'Trade') return swapConfig[chain?.chainId] || {};
    if (menu.tab === 'Lending') return lendingConfig[chain?.chainId] || {};
    return {};
  }, [chain, menu]);

  return (
    <div>
      <ComponentWrapperPage
        src={menu.path}
        componentProps={{
          addAction,
          multicall,
          chainId: chain.chainId,
          currentChainId: chainId,
          ...menuConfig,
          prices,
          account,
          onReset: () => {
          },
        }}
      />
    </div>
  );
};

export default memo(Liquidity);

interface Props {
  chain: any;
  menu: any;
}
