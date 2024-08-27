import React from 'react';

import Loading from '@/components/Icons/Loading';
import { StyledButton } from '@/views/bns/styles';
import type { StyledButtonType } from '@/views/bns/types';

const AllInOneButton = (props: Props) => {
  const { children, color, styles, loading, ...restProps } = props;

  return (
    <StyledButton $height="60px" style={{ color: color ?? '#fff', fontWeight: 600, ...styles }} {...restProps}>
      {loading ? <Loading /> : children}
    </StyledButton>
  );
};

interface Props extends StyledButtonType {
  children: any;
  color?: string;
  styles?: React.CSSProperties;
  loading?: boolean;
  disabled?: boolean;
  onClick: VoidFunction;
}

export default AllInOneButton;
