import styled from 'styled-components';

const HelpIcon = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-color: #8e8e8e;
  color: #fff;
  text-align: center;
  font-size: ${({ size }) => size * 0.61111}px;
  line-height: ${({ size }) => size}px;
`;

export default HelpIcon;
