import { useLayoutEffect, useState } from 'react';

export default function useScrollMore () {
  const [viewHeight, setViewHeight] = useState<number>(650);

  useLayoutEffect(() => {
    const headerHeight = 70;
    const paddingHeight = 50;
    const backHeight = 14;
    const scrollHeight = 116;
    const onResize = () => {
      const _viewHeight = window.innerHeight - headerHeight - paddingHeight - backHeight - scrollHeight;
      setViewHeight(_viewHeight <= 0 ? 650 : _viewHeight);
    };
    onResize();
    document.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('resize', onResize);
    };
  }, []);

  return {
    viewHeight,
  };
};
