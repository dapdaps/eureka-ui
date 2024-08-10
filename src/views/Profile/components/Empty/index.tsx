import { StyledFlex, StyledFont } from "@/styled/styles"
import {
  StyledButton,
  StyledEmpty,
  StyledEmptyContainer,
  StyledLineGradientFont,
  StyledRange,
  StyledRangeContainer,
  StyledTips
} from './styles'
type PropsType = {
  title: string;
  tips: string;
  btnTxt: string;
  onClick?: VoidFunction;
}
export default function Empty(props: PropsType) {
  return (
    <StyledEmptyContainer>
      <StyledRangeContainer>
        <StyledFlex gap="15px">
          <StyledRange />
          <StyledRange />
        </StyledFlex>
        <StyledFlex gap="15px">
          <StyledRange />
          <StyledRange />
          <StyledRange />
        </StyledFlex>
      </StyledRangeContainer>
      <StyledEmpty>
        <StyledLineGradientFont>{props?.title}</StyledLineGradientFont>
        <StyledTips>{props?.tips}</StyledTips>
        <StyledButton onClick={props?.onClick}>{props.btnTxt}</StyledButton>
      </StyledEmpty>
    </StyledEmptyContainer>
  )
}