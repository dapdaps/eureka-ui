// import BosDapp from './BosDapp';
import SwapModule from '@/modules/swap';

export default function SwapDapp(props: any) {
  const { currentChain, localConfig } = props;

  return <SwapModule {...props} />;

  // fix: there is an error when switching DApps from the global search
  if (!localConfig.networks[currentChain.chain_id]) {
    return null;
  }

  // return (
  //   <BosDapp
  //     {...props}
  //     props={{
  //       dexConfig: {
  //         ...localConfig.basic,
  //         ...localConfig.networks[currentChain.chain_id],
  //         tokens: [
  //           ...localConfig.networks[currentChain.chain_id]?.tokens,
  //           ...(importTokens[currentChain.chain_id] || []),
  //         ],
  //         theme: localConfig.theme,
  //       },
  //       onImport: addImportToken,
  //     }}
  //   />
  // );
}
