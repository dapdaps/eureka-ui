import { styled } from 'styled-components';

const StyledTokenWrapper = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 10px;
  }

  .token-title {
    font-size: 24px;
    font-weight: bold;
  }

  .token-chain {
    font-size: 16px;
    font-weight: 500;
    color: #6f6f6f;
  }

  @media (min-width: 640px) {
    img {
      width: 26px;
      height: 26px;
    }
    .token-title {
      font-size: 20px;
      font-weight: bold;
    }
  }
`;

const TokenWrapper = (props: any) => {
  return <StyledTokenWrapper>{props.children}</StyledTokenWrapper>;
};

export default TokenWrapper;
