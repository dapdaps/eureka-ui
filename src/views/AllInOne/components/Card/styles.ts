import styled from 'styled-components';

export const StyledCard = styled.div`background: #16181D;
  border: 1px solid #373A53;
  border-radius: 16px;
  padding: 28px 24px 0 24px;
  transition: all .2s ease;

  &:hover {
      transform: scale(1.04);
      .card-arrow {
          transform: scale(1.5);
          path {
              stroke: #fff;
          }
      }
  }
`;

export const StyledTitle = styled.div`
  font-size: 26px;
  font-weight: bolder;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
`;
