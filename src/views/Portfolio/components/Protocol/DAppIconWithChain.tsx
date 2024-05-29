import { styled } from 'styled-components';

import { DefaultIcon } from '@/views/Portfolio/config';

export const StyledContainer = styled.div<{ src: string, size?: string | number }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  flex-shrink: 0;
  border-radius: 16px;
  background: ${({ src }) => `url("${src}") no-repeat center / contain`};
  position: relative;
`;

export const StyledChain = styled.div<{ src: string }>`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  border: 2px solid #272835;
  background: ${({ src }) => `#272835 url("${src}") no-repeat center / 12px`};
  position: absolute;
  z-index: 1;
  right: -2px;
  bottom: -2px;
`;

const DAppIconWithChain = (props: any) => {
  const { icon, chaonIcon, style, size = '32px' } = props;

  return (
    <StyledContainer style={style} src={icon || DefaultIcon} size={size}>
      <StyledChain src={chaonIcon || DefaultIcon}></StyledChain>
    </StyledContainer>
  );
};

export default DAppIconWithChain;
