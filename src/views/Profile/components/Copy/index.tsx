import { memo, useState } from "react";
import styled from "styled-components";

import { StyledContainer, StyledFlex, StyledFont, StyledSvg } from "@/styled/styles";
import { copyText } from "@/utils/copy";

const StyledCopyTips = styled.div`
  position: absolute;
  top: -22px;
  left: -5px;
  transform: translateY(-100%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 77px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 1px solid #333648;
  background: #1F2229;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
`
export default memo(function Copy({ text }: { text: string }) {
  const [showTips, setShowTips] = useState(false);
  const handleCopy = function (text: string) {
    copyText(text, () => {
      setShowTips(true)
      setTimeout(() => {
        setShowTips(false)
      }, 1500)
    })
  }
  return (
    <StyledContainer style={{ position: 'relative' }}>
      <StyledFlex flexDirection='column' style={{ cursor: 'pointer' }} gap="5px" onClick={() => handleCopy(text)}>
        <StyledSvg>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_7090_12407)">
              <path
                d="M11.413 7.60601C11.5 8.25001 11.5 9.04201 11.5 9.90501V11.395C11.5 11.593 11.5 11.691 11.564 11.751C11.628 11.81 11.724 11.803 11.916 11.789C12.0744 11.7778 12.2325 11.7618 12.39 11.741C13.03 11.655 13.561 11.482 14.009 11.114C14.1693 10.9827 14.3163 10.836 14.448 10.676C14.836 10.203 15.006 9.63701 15.088 8.95001C15.167 8.28001 15.167 7.43401 15.167 6.36601V6.30101C15.167 5.23301 15.167 4.38601 15.087 3.71701C15.007 3.02901 14.836 2.46401 14.447 1.99101C14.317 1.83101 14.169 1.68401 14.009 1.55201C13.536 1.16401 12.97 0.994008 12.283 0.912008C11.613 0.833008 10.767 0.833008 9.69999 0.833008H9.63499C8.56699 0.833008 7.72099 0.833008 7.05099 0.913008C6.36399 0.993008 5.79799 1.16401 5.32499 1.55301C5.16499 1.68301 5.01799 1.83101 4.88699 1.99101C4.51899 2.43901 4.34699 2.97101 4.25999 3.61101C4.23999 3.75901 4.22399 3.91701 4.21199 4.08401C4.19799 4.27601 4.19099 4.37201 4.24999 4.43601C4.30999 4.50001 4.40799 4.50001 4.60599 4.50001H6.09599C6.95899 4.50001 7.74999 4.50001 8.39599 4.58701C9.10599 4.68201 9.85799 4.90701 10.476 5.52501C11.094 6.14301 11.319 6.89501 11.414 7.60501L11.413 7.60601Z"
                fill="black"
              />
              <path
                d="M5.297 5.5H6.037C6.948 5.5 7.683 5.5 8.261 5.578C8.861 5.658 9.366 5.831 9.768 6.232C10.169 6.634 10.342 7.139 10.422 7.739C10.5 8.317 10.5 9.052 10.5 9.963V10.703C10.5 11.615 10.5 12.35 10.422 12.928C10.342 13.528 10.169 14.033 9.768 14.434C9.366 14.836 8.861 15.008 8.261 15.089C7.683 15.167 6.948 15.167 6.037 15.167H5.297C4.385 15.167 3.65 15.167 3.072 15.089C2.472 15.009 1.967 14.836 1.566 14.434C1.164 14.034 0.992001 13.528 0.911 12.928C0.833 12.35 0.833 11.615 0.833 10.703V9.963C0.833 9.052 0.833 8.317 0.911 7.739C0.991 7.139 1.164 6.634 1.566 6.232C1.966 5.831 2.472 5.658 3.072 5.578C3.65 5.5 4.385 5.5 5.297 5.5Z"
                fill="black"
              />
            </g>
            <defs>
              <clipPath id="clip0_7090_12407">
                <rect width="16" height="16" fill="white" transform="matrix(-1 0 0 1 16 0)" />
              </clipPath>
            </defs>
          </svg>
        </StyledSvg>
        <StyledFont fontWeight="500">Copy Link</StyledFont>
      </StyledFlex>
      {
        showTips && (
          <StyledCopyTips>
            <StyledFont color="#979ABE" fontSize="14px">Copied!</StyledFont>
          </StyledCopyTips>
        )
      }
    </StyledContainer>
  )
})