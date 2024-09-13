import { styled } from 'styled-components';

import Loading from '@/components/Icons/Loading';

const PrimaryButton = styled.button<{ loading?: boolean; disabled?: boolean; width?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  color: var(--agg-secondary-color, #000);
  background: ${(props) =>
    props.loading || props.disabled
      ? 'var(--agg-disabled-color,rgba(255,255,255,0.5))'
      : 'var(--agg-primary-color,#EAEBEF)'};
  border-radius: 28px;
  height: 40px;
  width: ${(props) => (props.width ? props.width + 'px' : '100%')};
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;
  &:disabled {
    cursor: not-allowed;
  }
`;

const Button = (props: any) => {
  const { children, loading, config, disabled, width, theme, ...properties } = props;

  return (
    <PrimaryButton disabled={loading || disabled} style={theme ? theme : {}} {...properties}>
      {loading ? <Loading /> : children}
    </PrimaryButton>
  );
};

export default Button;
