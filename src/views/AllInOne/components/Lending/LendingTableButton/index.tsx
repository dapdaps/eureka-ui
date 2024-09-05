import styled from 'styled-components';

import LendingLoadingIcon from '../LendingLoadingIcon';

const Button = styled.button`
  height: 32px;
  min-width: 85px;
  text-align: center;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0 10px;
  opacity: 1;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &.withdraw {
    background: var(--withdraw-bg-hover-color);
    color: var(--withdraw-color);
  }
  &.claim {
    background: var(--claim-bg-hover-color);
    color: var(--claim-color);
  }
  &.repay {
    background: var(--repay-bg-hover-color);
    color: var(--replay-color);
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

interface IProps {
  text: string;
  loading: boolean;
  onClick: any;
}

const LendingTableButton = (props: IProps) => {
  const { text, loading, onClick } = props;

  return (
    <Button className={text.toLowerCase()} onClick={onClick}>
      {loading && <LendingLoadingIcon size={16} />}
      {text}
    </Button>
  );
};

export default LendingTableButton;
