import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';

interface IProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const Earning: FC<IProps> = (props) => {
  const [state, setState] = useState<number>(0);

  useEffect(() => {}, []);

  return <div></div>;
};

export default memo(Earning);
