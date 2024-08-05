import { StyledContainer, StyledFlex, StyledFont, StyledSvg } from '@/styled/styles'
import RectangleNumber from '../RectangleNumber'
import {
  StyledFeature,
  StyledIntroImage,
  StyledIntroImageContainer,
  StyledMasker
} from './styles'
export default function Features() {
  return (
    <StyledContainer style={{ marginTop: 30 }}>
      <StyledFlex gap='6px' style={{ paddingLeft: 16, marginBottom: 20 }}>
        <StyledFont color='#FFF' fontSize='20px' fontWeight='600'>Features</StyledFont>
        <RectangleNumber quantity={2} />
      </StyledFlex>
      <StyledFlex gap="28px" style={{ flexWrap: 'wrap' }}>
        <StyledFeature>
          <StyledContainer
            style={{
              paddingRight: 28,
              paddingLeft: 28
            }}
          >
            <StyledFlex
              justifyContent='space-between'
              style={{ paddingTop: 22, paddingBottom: 13, }}
            >
              <StyledFlex gap='16px'>
                <StyledSvg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <rect width="36" height="36" rx="8" fill="#A55FFF" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3849 6.4136C17.3468 5.86083 18.5298 5.86083 19.4917 6.4136L27.2275 10.8595C28.195 11.4155 28.7915 12.4463 28.7915 13.5623V22.4357C28.7915 23.5517 28.195 24.5825 27.2275 25.1386L19.4917 29.5844C18.5298 30.1372 17.3467 30.1372 16.3849 29.5844L8.64914 25.1386C7.68199 24.5828 7.08508 23.5533 7.08508 22.4369V13.5598C7.08508 12.4428 7.68246 11.415 8.64914 10.8595L16.3849 6.4136ZM8.70152 21.9027V22.4369C8.70152 22.9738 8.98833 23.4692 9.45458 23.7371L17.1904 28.183C17.6535 28.4491 18.2231 28.4491 18.6862 28.183L26.422 23.7371C26.8879 23.4694 27.1751 22.9731 27.1751 22.4357V17.8889C26.4649 18.4849 25.5649 18.8622 24.5663 18.8622H11.3103C10.6023 18.8622 9.96184 19.2117 9.47763 19.794C8.98835 20.3825 8.70152 21.1633 8.70152 21.9027ZM27.1751 14.5352C27.1751 15.9004 25.9695 17.2458 24.5663 17.2458H11.3103C10.2813 17.2458 9.38951 17.6593 8.70152 18.2756V13.5598C8.70152 13.0234 8.98787 12.5292 9.45458 12.2609L17.1904 7.81507C17.6535 7.54892 18.2231 7.54892 18.6862 7.81507L26.422 12.2609C26.8879 12.5287 27.1751 13.025 27.1751 13.5623V14.5352ZM13.6706 13.2063L13.6706 15.8042L12.0542 15.8042L12.0542 12.9754C12.0542 12.2102 12.6745 11.5899 13.4397 11.5899H15.7489C16.5141 11.5899 17.1344 12.2102 17.1344 12.9754L17.1344 15.8042L15.518 15.8042L15.518 13.2063H13.6706ZM20.7136 13.2063L20.7136 15.8042L19.0972 15.8042L19.0972 12.9754C19.0972 12.2102 19.7175 11.5899 20.4827 11.5899H22.7919C23.5571 11.5899 24.1774 12.2102 24.1774 12.9754L24.1774 15.8042L22.561 15.8042L22.561 13.2063H20.7136ZM13.6706 20.3081L13.6706 22.9059H15.518L15.518 20.3081L17.1344 20.3081L17.1344 23.1368C17.1344 23.902 16.5141 24.5224 15.7489 24.5224H13.4397C12.6745 24.5224 12.0542 23.902 12.0542 23.1368L12.0542 20.3081L13.6706 20.3081ZM20.7136 20.3081L20.7136 22.9059H22.561L22.561 20.3081L24.1774 20.3081L24.1774 23.1368C24.1774 23.902 23.5571 24.5224 22.7919 24.5224H20.4827C19.7175 24.5224 19.0972 23.902 19.0972 23.1368L19.0972 20.3081L20.7136 20.3081Z" fill="white" />
                  </svg>
                </StyledSvg>
                <StyledFont color='#FFF' fontSize='26px' fontWeight='700'>Polygon zkEVM Trade</StyledFont>
              </StyledFlex>
              <StyledFlex>
                <StyledSvg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M1 15L15 1M15 1H1M15 1V15" stroke="#979ABE" stroke-width="1.5" />
                  </svg>
                </StyledSvg>
              </StyledFlex>
            </StyledFlex>
            <StyledFont color='#979ABE' fontSize='14px'>Efficiently from/to any assets on Polygon zkEVM.</StyledFont>
          </StyledContainer>
          <StyledIntroImageContainer>
            <StyledIntroImage />
            <StyledMasker />
          </StyledIntroImageContainer>
        </StyledFeature>
      </StyledFlex>
    </StyledContainer>
  )
}