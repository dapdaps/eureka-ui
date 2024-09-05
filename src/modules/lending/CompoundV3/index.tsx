import { useEffect } from 'react';

import Loading from '@/modules/components/Loading';
import CompoundV3Detail from '@/modules/lending/CompoundV3/Detail';
import CompoundV3List from '@/modules/lending/CompoundV3/List';
import { useDynamicLoader, useMultiState } from '@/modules/lending/hooks';
import type { DexProps } from '@/modules/lending/models';

import { StyledContainer } from './styles';
import useAccount from '@/hooks/useAccount';

const LendingCompoundV3 = (props: Props) => {
  const {
    dexConfig,
    wethAddress,
    multicallAddress,
    chainIdNotSupport,
    multicall,
    account,
    addAction,
    toast,
    chainId,
    curChain
  } = props;

  const { provider } = useAccount();
  const [Data] = useDynamicLoader({ path: '/lending/datas', name: dexConfig.loaderName });

  const [state, updateState] = useMultiState<any>({
    rowData: null,
    assets: []
  });

  useEffect(() => {
    updateState({
      loading: !chainIdNotSupport
    });
  }, [chainIdNotSupport]);

  const handleClickRow = (data: any) => {
    updateState({
      rowData: data
    });
  };

  return (
    <StyledContainer>
      {state.rowData && (
        <CompoundV3Detail
          data={state.rowData}
          getAccountInfo={state.getAccountInfo}
          addAction={addAction}
          toast={toast}
          chainId={chainId}
          curChain={curChain}
          dexConfig={dexConfig}
          account={account}
          onBack={() => {
            updateState({
              rowData: null
            });
          }}
          onSuccess={() => {
            updateState({
              loading: true
            });
          }}
        />
      )}
      {!state.rowData && (
        <CompoundV3List
          assets={state.assets || []}
          onClickRow={handleClickRow}
          curChain={curChain}
        />
      )}

      {state.loading && (
        <Loading />
      )}

      {
        Data && (
          <Data
            provider={provider}
            update={state.loading}
            account={account}
            wethAddress={wethAddress}
            multicallAddress={multicallAddress}
            multicall={multicall}
            chainId={chainId}
            {...dexConfig}
            onLoad={(data: any) => {
              console.log('DATA_onLoad:', data);
              updateState({
                loading: false,
                timestamp: Date.now(),
                ...data
              });
            }}
          />
        )
      }
    </StyledContainer>
  );
};

export default LendingCompoundV3;

export interface Props extends DexProps {
  chainIdNotSupport?: boolean;
}
