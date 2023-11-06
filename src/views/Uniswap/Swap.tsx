import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import config from '@/config/uniswap/linea';
import { useLayoutStore } from '@/stores/layout';
import useTokens from './hooks/useTokens';

export default function Swap() {
  const setLayoutStore = useLayoutStore((store) => store.set);
  const { tokens, importToken } = useTokens();
  return (
    <>
      <ComponentWrapperPage
        componentProps={{
          ...config,
          tokens,
          onOpenBridge: () => {
            setLayoutStore({
              showAccountSider: true,
              defaultTab: 'bridge',
            });
          },
          onOpenCode: () => {
            window.open(
              'https://near.org/near/widget/ComponentDetailsPage?src=dapdapbos.near/widget/Linea.Uniswap.Swap.Dex&tab=source',
              '_blank',
            );
          },
          onImportToken: (token: any) => {
            importToken(token);
          },
        }}
        src={'dapdapbos.near/widget/Linea.Uniswap.Swap.Dex'}
      />
    </>
  );
}
