import useToast from '@/hooks/useToast';
import { useBosLoaderStore } from '@/stores/bos-loader';
import { useVmStore } from '@/stores/vm';
import useAddAction from '@/hooks/useAddAction';
import dynamic from 'next/dynamic';

const VmInitializer = dynamic(() => import('@/components/vm/VmInitializer'), {
  ssr: false,
});

type Props = {
  src: string;
  props?: Record<string, unknown>;
};

export function VmComponent(props: Props) {
  const { EthersProvider, ethersContext, Widget } = useVmStore();
  const redirectMapStore = useBosLoaderStore();
  const toast = useToast();
  const { addAction } = useAddAction('quick_onboarding');

  return (
    <>
      <VmInitializer />
      {
        !EthersProvider || !redirectMapStore.hasResolved ? (
          <div />
        ) : (
          <EthersProvider value={ethersContext}>
            <Widget
              config={{
                redirectMap: redirectMapStore.redirectMap,
              }}
              src={props.src}
              props={{ toast, addAction, ...props.props }}
            />
          </EthersProvider>
        )
      }
    </>
  );
}
