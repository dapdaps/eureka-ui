import { memo } from 'react';

import { StyledContainer } from './styles';

const Button = ({ children, ...rest }: any) => {
  return <StyledContainer {...rest}>{children}</StyledContainer>;
};

export default memo(Button);
