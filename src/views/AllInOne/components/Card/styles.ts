import styled from 'styled-components';

export const StyledCard = styled.div`
  border: 1px solid #373A53;
  border-radius: 16px;
  padding: 28px 24px 0 24px;
  transition: all .3s ease;
  min-width: 300px;
  min-height: 250px;
  background: #16181D;
  position: relative;
  overflow: hidden;

  .card-active-bg {
    position: absolute;
    z-index: 0;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: all 0.6s ease;
  }

  &:hover {
    transform: scale(1.04);

    .card-active-bg {
      opacity: 1;
    }

    .arrow-top-right {
      transform: scale(1.5);

      path {
        stroke: #ffffff;
      }
    }
  }
`;

export const StyledTitle = styled.div`
  font-size: 26px;
  font-weight: 700;
  line-height: 31px;
  white-space: nowrap;
  cursor: default;
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 1em;
  }
  div {
    font-size: 0.654em;
    color: #979ABE;
    line-height: 17px;
  }
`;

export const StyledContent = styled.div`
  margin-top: 20px;
`;
