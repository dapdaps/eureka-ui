import { useAddLiquidityStore } from '@/stores/addLiquidity';

export default function useAddLiquidity() {
  const liquidityStore: any = useAddLiquidityStore();

  const onCleanAll = () => {
    liquidityStore.setFee();
    liquidityStore.setToken0(null);
    liquidityStore.setToken1(null);
  };
  const onSelectToken = (token: any, type: number) => {
    if (type === 0) {
      liquidityStore.setToken0(token);
      if (token.address === liquidityStore.getToken1()?.address) {
        liquidityStore.setToken1(null);
      }
    } else {
      liquidityStore.setToken1(token);
      if (token.address === liquidityStore.getToken0()?.address) {
        liquidityStore.setToken0(null);
      }
    }
  };
  const onSelectFee = (fee: number) => {
    liquidityStore.setFee(fee);
  };
  const onExchangeTokens = () => {
    const [_token1, _token0] = [liquidityStore.getToken0(), liquidityStore.getToken1()];
    liquidityStore.setToken0(_token0);
    liquidityStore.setToken1(_token1);
  };

  return {
    token0: liquidityStore.getToken0(),
    token1: liquidityStore.getToken1(),
    fee: liquidityStore.getFee(),
    onCleanAll,
    onSelectToken,
    onSelectFee,
    onExchangeTokens,
  };
}
