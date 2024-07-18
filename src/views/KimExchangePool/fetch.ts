const SUBGRAPH = 'https://api.goldsky.com/api/public/project_clmqdcfcs3f6d2ptj3yp05ndz/subgraphs/Algebra-Kim/0.0.4/gn';

export async function fetchTvl(pools: string[]) {
  const response = await fetch(SUBGRAPH, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `query tvl($pools: [ID!]){\n pools(orderBy: id, where: {id_in: $pools}){\n  totalValueLockedUSD,\n  id\n}\n}\n`,
      variables: {
        pools,
      },
    }),
  });
  const result = await response.json();
  return result.data.pools;
}

export async function fetchApr() {
  const response = await fetch(`https://backend.kim.exchange/api/APR/pools/?network=mode`);
  const result = await response.json();
  return result;
}

export async function fetchCampaigns() {
  const response = await fetch(`https://api.merkl.xyz/v3/campaigns?chainIds=34443`);
  const result = await response.json();
  return Object.entries(result['34443']).reduce((acc, item) => {
    const [key, value] = item;
    const address = key.split('_')[1];
    return { ...acc, [address.toLowerCase()]: value };
  }, {});
}
