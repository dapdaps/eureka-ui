import { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import Big from 'big.js';
const StyledRange = styled.div`
  position: relative;
  border-radius: 12px;
  /* overflow: hidden; */
`
const StyledOuterTrack = styled.div`
  /* height: 5px; */
  border: 1px solid #373A53;
  background: #2E3142;
`
const StyledInnerTrack = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #E1E1E1;
  border-radius: 12px;
  cursor: pointer;
`
const StyledThumb = styled.div`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  /* transform: translate(-50%, -50%); */
  margin-top: -7.5px;
  margin-right: -7.5px;
  width: 20px;
  height: 20px;
  border: 3px solid #16181D;
  background-color: #FFF;
  border-radius: 50%;
`
const Range = function ({
  value
}: any) {
  const [width, setWidth] = useState(0)
  const [percent, setPercent] = useState(value || 0)
  const rangeRef = useRef<any>(null)
  const thumbRef = useRef<any>(null)
  useEffect(() => {
    if (rangeRef.current && thumbRef.current) {
      const rangeBoundingClientRect = rangeRef.current.getBoundingClientRect()
      const thumBoundingClientRect = thumbRef.current.getBoundingClientRect()
      setWidth(Big(rangeBoundingClientRect?.width ?? 0).times(value / 100).plus(thumBoundingClientRect?.width / 2).toNumber())
    }
  }, [percent])

  return (
    <StyledRange ref={rangeRef}>
      <StyledOuterTrack style={{ height: 5 }}>
        <StyledInnerTrack style={{
          width
        }}>
          <StyledThumb ref={thumbRef} />
        </StyledInnerTrack>
      </StyledOuterTrack>
    </StyledRange>

  )
}
export default Range