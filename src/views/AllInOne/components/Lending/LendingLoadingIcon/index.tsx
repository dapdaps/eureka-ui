import styled from "styled-components";

interface ILoadingProps {
  size: number;
}

const Loading = styled.div<ILoadingProps>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  line-height: ${(props) => props.size}px;
  animation: loading 1s linear infinite;
  transform-origin: center center;
  display: flex;
  margin: 0 auto;
  @keyframes loading {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

interface IProps {
    size?: number;
    style?: any;
}

const LendingLoadingIcon = (props: IProps) => {
    const size = props.size || 18;
    return (
      <Loading size={size} style={{ ...props.style }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            opacity="0.2"
            cx="9"
            cy="9"
            r="8"
            stroke="currentColor"
            stroke-width="2"
          />
          <path
            d="M1 9C1 13.4183 4.58172 17 9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </Loading>
    );
}
export default LendingLoadingIcon
