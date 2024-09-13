import { styled } from "styled-components";

const FlexBetweenContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;



const FlexBetween = (props: any) => {
  return (
    <FlexBetweenContainer>{props.children}</FlexBetweenContainer>
  );
};

export default FlexBetween;