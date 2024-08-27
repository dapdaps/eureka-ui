import styled from "styled-components";

export const StyledDapp = styled.div`
  width: 405px;
  height: 312px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #202329;
  background: #101115;
  overflow: hidden;
`
export const StyledDappTop = styled.div`
  width: 405px;
  height: 146px;
  background: #1E1F25;
  padding: 20px;
`
export const StyledDappType = styled.div<{ color: string }>`
  padding: 1px;
  color: ${({ color }) => color};
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  border-radius: 30px;
  background: ${({ color }) => color};
  opacity: 0.5;
`
export const StyledDappTypeFont = styled.div`
  padding: 6px 12px;
  background: #1E1F25;
  border-radius: 30px;
`
export const StyledDappBottom = styled.div`
  padding: 0 20px 14px;
`
export const StyledDappReward = styled.div`
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 6px;

  border-radius: 34px;
  background: #21222B;

`