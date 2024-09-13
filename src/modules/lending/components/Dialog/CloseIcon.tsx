import styled from 'styled-components';

const StyledCloseIcon = styled.div`
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    transform: scale(1.3);
  }
`;

const CloseIcon = (props: Props) => {
  const { size = 18, onClose } = props;

  return (
    <StyledCloseIcon
      style={{ width: size * 1.5, height: size * 1.5 }}
      onClick={() => {
        onClose?.();
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.5 5L5.5 15M5.5 5L15.5 15"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </StyledCloseIcon>
  );
};

export default CloseIcon;

interface Props {
  size?: number;

  onClose?(): void;
}
