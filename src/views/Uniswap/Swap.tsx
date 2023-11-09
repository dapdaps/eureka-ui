import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import config from '@/config/uniswap/linea';
import { useLayoutStore } from '@/stores/layout';
import { useSettingsStore } from '@/stores/settings';
import useTokens from './hooks/useTokens';

export default function Swap() {
  const setLayoutStore = useLayoutStore((store) => store.set);
  const settingStore: any = useSettingsStore();
  const { tokens, historyTokens, importToken, addHistoryToken } = useTokens();
  return (
    <>
      <ComponentWrapperPage
        componentProps={{
          ...config,
          tokens,
          historyTokens,
          slippage: settingStore.getSlippage(),
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
          onAddHistoryToken: (tokens: any) => {
            addHistoryToken(tokens);
          },
          onSetSlippage: (slippage: number) => {
            settingStore.setSlippage(slippage);
          },
        }}
        src={'dapdapbos.near/widget/Linea.Uniswap.Swap.Dex'}
      />
    </>
  );
}
