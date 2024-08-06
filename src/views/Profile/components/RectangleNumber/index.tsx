import styled from "styled-components"

const StyledRectangleNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #FFF;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`
export default function RectangleNumber({ quantity }: { quantity: number }) {
  return (
    <StyledRectangleNumber>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="26" viewBox="0 0 32 26" fill="none">
        <path d="M0 6C0 2.68629 2.68629 0 6 0H26C29.3137 0 32 2.68629 32 6V20C32 23.3137 29.3137 26 26 26H6C2.68629 26 0 23.3137 0 20V6Z" fill="#222430" />
      </svg>
      <span>{quantity}</span>
    </StyledRectangleNumber>
  )
}