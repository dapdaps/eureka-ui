export default async function getThrusterPools({ account, chainId }: any) {
  if (chainId !== 81457) return [];
  const response = await fetch(
    `https://api.thruster.finance/v2/user/positions?userAddress=${account?.toLowerCase()}&chainId=81457`
  );
  const result = await response.json();
  return result?.reduce ? result.map((item: any) => ({ ...item, chainId: 81457 })) : [];
}
