import UniswapLayOut from '@/views/Uniswap/Layout';
import PoolsAddLiquidity from '@/views/Uniswap/PoolsAddLiquidity';

export default function PoolsPage() {
  return (
    <UniswapLayOut>
      <PoolsAddLiquidity />
    </UniswapLayOut>
  );
}
