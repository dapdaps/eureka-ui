import dynamic from 'next/dynamic';
import { memo } from 'react';

import { Spinner } from '@/components/lib/Spinner';
import Gamma from '@/modules/liquidity/Gamma';

import { MetaTags } from '../MetaTags';
type Props = {
  componentProps?: Record<string, unknown>;
  src: string;
  meta?: {
    title: string;
    description: string;
  };
};
export default memo(function DynamicComponentWrapper(props: Props) {
  console.log('====props.src', props.src);
  const DynamicComponent = dynamic(() => import(props.src), {
    ssr: false,
    loading: () => {
      return <>Loading~~</>;
    }
  });
  console.log('====DynamicComponent', DynamicComponent);
  return (
    <>
      {props.meta && <MetaTags {...props.meta} />}
      {!props?.componentProps?.provider ? <Spinner /> : <DynamicComponent {...props?.componentProps} />}
    </>
  );
});
