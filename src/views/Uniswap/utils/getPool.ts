import { Contract } from 'ethers';
import config from '@/config/uniswap/index';
import factoryAbi from '../abi/factoryAbi';
import poolAbi from '../abi/poolAbi';
import { multicallv3 } from '@/utils/multicall';

export async function getPoolSlot({
  token0,
  token1,
  fee,
  provider,
}: {
  token0: string;
  token1: string;
  fee: number;
  provider: any;
}) {
  const FactoryContract = new Contract(config.contracts.factoryAddress, factoryAbi, provider);
  const poolAddress = await FactoryContract.getPool(token0, token1, fee);
  const PoolContract = new Contract(poolAddress, poolAbi, provider);
  return await PoolContract.slot0();
}

export async function getPoolInfo({
  token0,
  token1,
  fee,
  provider,
}: {
  token0: string;
  token1: string;
  fee: number;
  provider: any;
}) {
  const FactoryContract = new Contract(config.contracts.factoryAddress, factoryAbi, provider);
  const poolAddress = await FactoryContract.getPool(token0, token1, fee);
  if (poolAddress === '0x0000000000000000000000000000000000000000') return {};
  const [slot0, tickSpacing, _token0, _token1, liquidity] = await multicallv3({
    abi: poolAbi,
    calls: [
      {
        address: poolAddress,
        name: 'slot0',
      },
      {
        address: poolAddress,
        name: 'tickSpacing',
      },
      {
        address: poolAddress,
        name: 'token0',
      },
      {
        address: poolAddress,
        name: 'token1',
      },
      {
        address: poolAddress,
        name: 'liquidity',
      },
    ],
    multiAddress: config.contracts.multiAddress,
    provider,
  });
  return {
    currentTick: slot0.tick,
    tickSpacing: tickSpacing[0],
    token0: _token0[0],
    token1: _token1[0],
    sqrtPriceX96: slot0.sqrtPriceX96.toString(),
    poolAddress,
    liquidity: liquidity.toString(),
  };
}
