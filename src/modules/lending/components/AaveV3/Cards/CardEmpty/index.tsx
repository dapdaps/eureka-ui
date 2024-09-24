import { styled } from 'styled-components';

const StyledCardEmpty = styled.div`
  min-height: 220px;
  font-size: 14px;
  display: grid;
  place-content: center;
`;

export const Divider = styled.hr`
  width: 100%;
  border: 0;
  height: 1px;
  background: var(--agg-border-color, #fff);
  border-radius: 9999px;
`;

const CardEmpty = (props: any) => {
  return (
    <>
      <Divider />
      <StyledCardEmpty>{props.children}</StyledCardEmpty>
    </>
  );
};

export default CardEmpty;
