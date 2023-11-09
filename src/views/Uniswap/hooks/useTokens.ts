import { useTokensStore } from '@/stores/tokens';

export default function useTokens() {
  const tokenStore: any = useTokensStore();

  const importToken = (token: { address: string }) => {
    tokenStore.addImportToken(token);
  };

  return {
    tokens: tokenStore.tokens,
    historyTokens: tokenStore.historyTokens,
    importToken,
    addHistoryToken: tokenStore.addHistoryToken,
  };
}
