import styled from "styled-components";

export const StyledProgressBar = styled.div<{ $width?: string | undefined; $height?: string | undefined; }>`
  width: ${({ $width }) => $width ? $width : '307px'};
  height: ${({ $height }) => $height ? $height : '10px'};
  padding: 2px 3px;
  border-radius: 5px;
  background: #222430;
`
export const StyledInnerProgressBar = styled.div<{ $percent?: number }>`
  width: ${({ $percent }) => ($percent || 0) + '%'};
  height: 100%;
  border-radius: 3px;
  background: #EBF479;
`
export const StyledAchievedContainer = styled.div`
  border-radius: 16px;
  border-color: rgba(87, 219, 100, 0.5);
  border-width: 2px;
  border-style: solid;
  transform: translateX(26px);
`
export const StyledAchieved = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 119px;
  height: 27px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid #57DB64;
  background: rgba(32, 34, 47, 0.80);
`