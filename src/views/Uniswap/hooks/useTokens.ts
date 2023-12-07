import { useTokensStore } from '@/stores/tokens';
import { useHistoryTokensStore } from '@/stores/historyTokens';

export default function useTokens() {
  const tokenStore: any = useTokensStore();
  const historyTokensStore: any = useHistoryTokensStore();

  const importToken = (token: { address: string }) => {
    historyTokensStore.addImportToken(token);
  };

  return {
    tokens: { ...tokenStore.tokens, ...historyTokensStore.importTokens },
    stableTokens: tokenStore.stableTokens,
    importToken,
    addHistoryToken: historyTokensStore.addHistoryToken,
  };
}
