import { Desc, StyledContainer, Title } from './styles';

export default function Pilcrow({ title, desc }: any) {
  return (
    <StyledContainer>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
      <svg xmlns="http://www.w3.org/2000/svg" width="38" height="33" viewBox="0 0 38 33" fill="none">
        <path
          d="M15.5722 30.3003C17.1266 32.8849 20.8734 32.8849 22.4278 30.3003L37.0052 6.06153C38.6086 3.3955 36.6884 0 33.5774 0H4.42265C1.31163 0 -0.608558 3.3955 0.994807 6.06153L15.5722 30.3003Z"
          fill="#EBF479"
        />
      </svg>
    </StyledContainer>
  );
}
