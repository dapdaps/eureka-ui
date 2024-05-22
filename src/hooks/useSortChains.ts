import useTokensAndChains from '@/components/Bridge/hooks/useTokensAndChains';

export default function useSortChains() {
  const { chains } = useTokensAndChains();

  const _rawChains = Object.values(chains);

  const ethIndex = _rawChains.findIndex((item) => item.chainId === 1);
  const ethChain = _rawChains.splice(ethIndex, 1);
  const sortedRawChains = _rawChains.sort((a: any, b: any) => {
    return a.chainName.localeCompare(b.chainName);
  });
  const sortedChains = [...ethChain, ...sortedRawChains];

  return { sortedChains };
}
