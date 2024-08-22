import { useImportTokensStore } from '@/stores/import-tokens';

import BosDapp from './BosDapp';

export default function SwapDapp(props: any) {
  const { currentChain, localConfig } = props;
  const { importTokens, addImportToken }: any = useImportTokensStore();
  return (
    <BosDapp
      {...props}
      props={{
        dexConfig: {
          ...localConfig.basic,
          ...localConfig.networks[currentChain.chain_id],
          tokens: [
            ...localConfig.networks[currentChain.chain_id]?.tokens,
            ...(importTokens[currentChain.chain_id] || []),
          ],
          theme: localConfig.theme,
        },
        onImport: addImportToken,
      }}
    />
  );
}
