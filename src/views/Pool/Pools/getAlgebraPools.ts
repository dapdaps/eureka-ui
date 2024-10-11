import { Contract } from 'ethers';

import { multicall, multicallAddresses } from '@/utils/multicall';

import positionAlgebraAbi from '../abi/positionAlgebra';

export default async function getAlgebraPools({ contracts, chainId, account, provider }: any) {
  const PositionContractAddress = contracts[chainId].PositionManager;

  if (!PositionContractAddress) return;

  const PositionContract = new Contract(PositionContractAddress, positionAlgebraAbi, provider);
  const balanceResult = await PositionContract.balanceOf(account);
  const accountBalance = balanceResult.toNumber();

  if (!accountBalance) {
    return [];
  }
  const tokenRequests = [];
  for (let i = 0; i < accountBalance; i++) {
    tokenRequests.push({
      address: PositionContractAddress,
      name: 'tokenOfOwnerByIndex',
      params: [account, i]
    });
  }
  const tokenIdResults = await multicall({
    abi: positionAlgebraAbi,
    options: {},
    calls: tokenRequests,
    multicallAddress: multicallAddresses[chainId],
    provider
  });
  const positionRequests = tokenIdResults.map((tokenId: any) => ({
    address: PositionContractAddress,
    name: 'positions',
    params: [tokenId.toString()]
  }));
  const results = await multicall({
    abi: positionAlgebraAbi,
    calls: positionRequests,
    options: {},
    multicallAddress: multicallAddresses[chainId],
    provider
  });

  return results.map((result: any, i: number) => {
    return {
      poolVersion: 'V3',
      token0: result.token0,
      token1: result.token1,
      chainId,
      liquidity: result.liquidity,
      data: {
        tickLower: result.tickLower,
        tickUpper: result.tickUpper,
        tokenId: tokenIdResults[i].toString()
      }
    };
  });
}
