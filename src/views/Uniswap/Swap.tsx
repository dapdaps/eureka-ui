import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import styled from 'styled-components';
import config from '@/config/uniswap';
import { useLayoutStore } from '@/stores/layout';
import { useSettingsStore } from '@/stores/settings';
import useTokens from './hooks/useTokens';
import useToast from '@/hooks/useToast';
import { useTransactionsStore } from '@/stores/transactions';
import useRequestModal from '@/hooks/useRequestModal';
import useAccount from '@/hooks/useAccount';
import { useDebounce } from 'usehooks-ts';
import { useSetChain } from '@web3-onboard/react';

const StyledContainer = styled.div`
  position: relative;
  @media (max-width: 768px) {
    padding-top: 20px;
  }
`;

export default function Swap() {
  const setLayoutStore = useLayoutStore((store) => store.set);
  const settingStore: any = useSettingsStore();
  const { tokens, stableTokens, importToken } = useTokens();
  const { openRequestModal } = useRequestModal();
  const toast = useToast();
  const addTransaction = useTransactionsStore((store: any) => store.addTransaction);
  const { account } = useAccount();
  const debounceAccount = useDebounce(account, 1000);
  const [{ settingChain }, setChain] = useSetChain();
  return (
    <StyledContainer>
      <ComponentWrapperPage
        componentProps={{
          ...config,
          tokens,
          stableTokens,
          slippage: settingStore.getSlippage(),
          account: debounceAccount,
          onOpenBridge: () => {
            setLayoutStore({
              showAccountSider: true,
              defaultTab: 'bridge',
            });
          },
          onOpenCode: () => {
            window.open(
              'https://near.org/near/widget/ComponentDetailsPage?src=dapdapbos.near/widget/Base.Uniswap.Swap.Dex&tab=source',
              '_blank',
            );
          },
          onImportToken: (token: any) => {
            importToken(token);
          },
          onSetSlippage: (slippage: number) => {
            settingStore.setSlippage(slippage);
          },
          onSwitchChain: setChain,
          switchingChain: settingChain,
          openRequestModal,
          toast,
          addTransaction,
        }}
        src={'dapdapbos.near/widget/Base.Uniswap.Swap.Dex'}
      />
    </StyledContainer>
  );
}
