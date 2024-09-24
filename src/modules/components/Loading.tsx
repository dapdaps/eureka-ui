import { styled } from 'styled-components';

import Loading from '@/components/Icons/Loading';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 46px;
`;

const ModuleLoading = (props: Props) => {
  const { size, style, className } = props;

  return (
    <StyledContainer style={style} className={className}>
      <Loading size={size} />
    </StyledContainer>
  );
};

export default ModuleLoading;

interface Props {
  size?: number;
  style?: React.CSSProperties;
  className?: string;
}
