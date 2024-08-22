import Big from 'big.js';
import { animate } from 'framer-motion';
import { memo, useEffect, useRef } from 'react';

const Counter = (props: { from: number; to: number; duration?: number; formatter?(value: number): any }) => {
  const { from, to, duration = 2, formatter } = props;

  const nodeRef = useRef<any>();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration,
      onUpdate(value: number) {
        if (typeof formatter === 'function') {
          node.textContent = formatter(value);
          return;
        }
        node.textContent = Big(value || 0).toFixed(0, 0);
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return (
    <span ref={nodeRef} />
  );
};

export default memo(Counter);
