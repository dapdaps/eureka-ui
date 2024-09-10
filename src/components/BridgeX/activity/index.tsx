import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';

const rango = dynamic(() => import('./rango'), {
  ssr: false,
  loading: () => (
    <div style={{ width: 400 }}>
      <Skeleton width="350px" height="72px" borderRadius="6px" containerClassName="skeleton" />
      <Skeleton
        style={{ marginTop: 20 }}
        width="450px"
        height="220px"
        borderRadius="6px"
        containerClassName="skeleton"
      />
    </div>
  )
});

export default {
  rango
} as { [v: string]: any };
