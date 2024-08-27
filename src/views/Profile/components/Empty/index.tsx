import { StyledFlex, StyledFont } from "@/styled/styles"

import {
  StyledButton,
  StyledEmpty,
  StyledEmptyContainer,
  StyledLineGradientFont,
  StyledRange,
  StyledRangeContainer,
  StyledSecondRange,
  StyledTips
} from './styles'
type PropsType = {
  type: 0 | 1;
  title: string;
  tips: string;
  btnTxt: string;
  onClick?: VoidFunction;
}
export default function Empty(props: PropsType) {
  return (
    <StyledEmptyContainer>
      {
        props?.type === 0 ? (
          <StyledRangeContainer>
            <StyledFlex gap="15px">
              <StyledRange />
              <StyledRange />
            </StyledFlex>
            <StyledFlex gap="15px">
              <StyledRange />
              <StyledRange />
            </StyledFlex>
          </StyledRangeContainer>
        ) : (
          <StyledRangeContainer>
            <StyledSecondRange />
            <StyledSecondRange />
            <StyledSecondRange />
            <StyledSecondRange />
            <StyledSecondRange />
          </StyledRangeContainer>
        )
      }

      <StyledEmpty>
        <StyledLineGradientFont>{props?.title}</StyledLineGradientFont>
        <StyledTips>{props?.tips}</StyledTips>
        <StyledButton onClick={props?.onClick}>{props.btnTxt}</StyledButton>
      </StyledEmpty>
    </StyledEmptyContainer>
  )
}