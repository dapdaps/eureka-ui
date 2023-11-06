import { Contract } from 'ethers';
import config from '@/config/uniswap/linea/index';
import factoryAbi from '../abi/factoryAbi';
import poolAbi from '../abi/poolAbi';

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
