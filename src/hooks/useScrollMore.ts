import { useLayoutEffect, useState } from 'react';

export default function useScrollMore(props?: Props) {
  const { gap = 50 } = props || {};

  const [viewHeight, setViewHeight] = useState<number>(650);

  useLayoutEffect(() => {
    const headerHeight = 70;
    const backHeight = 14;
    const scrollHeight = 126;
    const onResize = () => {
      const _viewHeight = window.innerHeight - headerHeight - gap - backHeight - scrollHeight;
      setViewHeight(_viewHeight <= 0 ? 650 : _viewHeight);
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return {
    viewHeight
  };
}

interface Props {
  gap?: number;
}
