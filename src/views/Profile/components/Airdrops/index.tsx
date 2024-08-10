import { StyledFlex, StyledFont } from '@/styled/styles';
import AirdropLoading from '../../Loading/AirdropLoading';
import ProgressBar from '../ProgressBar';
import RectangleNumber from '../RectangleNumber';
import {
  StyledAirdropCard,
  StyledCategories,
  StyledCategory,
  StyledChainImage,
  StyledContainer,
  StyledNetworkImage
} from './styles';
type PropsType = {
  loading: boolean;
  airdropList: any[]
}
export default function Airdrops({ loading, airdropList }: PropsType) {
  return (
    <StyledContainer style={{ marginTop: 81 }}>
      <StyledFlex gap='6px' style={{ paddingLeft: 16, marginBottom: 20 }}>
        <StyledFont color='#FFF' fontSize='20px' fontWeight='600'>Following Potential Airdrops</StyledFont>
        <RectangleNumber quantity={airdropList?.length} />
      </StyledFlex>
      {
        loading ? (
          <AirdropLoading />
        ) : airdropList && airdropList.length > 0 ? (
          <StyledFlex gap='16px'>
            {
              airdropList.map((airdrop, index) => (
                <StyledAirdropCard key={index}>
                  <StyledFlex gap='20px' alignItems='flex-start'>
                    <StyledNetworkImage src={airdrop?.category === "network" ? airdrop?.network?.logo : airdrop?.dapp?.logo} />
                    <StyledFlex flexDirection='column' gap='10px' alignItems='flex-start' style={{ flex: 1 }}>
                      <StyledFlex justifyContent='space-between' style={{ width: '100%' }}>
                        <StyledFont color='#FFF' fontSize='20px' fontWeight='700'>{airdrop?.category === "network" ? airdrop?.network?.name : airdrop?.dapp?.name}</StyledFont>
                        {
                          airdrop?.category === 'network' ? (
                            <StyledFont color='#ACFCED' fontSize='12px' fontWeight='500' style={{ textTransform: 'uppercase' }}>Chain</StyledFont>
                          ) : (
                            <StyledCategories>
                              {
                                airdrop?.dapp?.categories.map((category: any) => {
                                  return (
                                    <StyledCategory key={category?.key} colorRgb={category?.colorRgb}>{category?.label}</StyledCategory>
                                  )
                                })
                              }
                            </StyledCategories>
                          )
                        }
                      </StyledFlex>
                      {
                        airdrop?.category === "dapp" && (
                          <StyledFlex gap='4px' style={{ flexWrap: 'wrap' }}>
                            {
                              airdrop?.dapp?.networks.map((network: any, index: number) => (
                                <StyledChainImage key={index} src={network.icon} />
                              ))
                            }
                          </StyledFlex>
                        )
                      }
                    </StyledFlex>

                  </StyledFlex>
                  <StyledFlex gap='11px' alignItems='flex-end' style={{ marginTop: 20, marginBottom: 12 }}>
                    <StyledFont color='#FFF' fontSize='14px' lineHeight='150%'>Estimated date</StyledFont>
                    <StyledFont color='#FFF' fontWeight='500' lineHeight='150%'>{airdrop?.estimated_date}</StyledFont>
                  </StyledFlex>
                  <ProgressBar quantity={airdrop?.completed_count} total={airdrop?.total_quest} />
                </StyledAirdropCard>
              ))
            }
          </StyledFlex>
        ) : (
          <></>
        )
      }

      {/* <StyledFlex gap='16px'>
        <StyledAirdropCard>
          <StyledFlex gap='20px' alignItems='flex-start'>
            <StyledSvg>
              <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 72 72" fill="none">
                <rect width="72" height="72" rx="16" fill="url(#paint0_linear_16706_21451)" />
                <path d="M31.1888 35.6716V29.7305L26.9348 27.0829C26.53 26.8309 26.0257 26.8246 25.6151 27.0663L14.8332 33.4141C14.4235 33.6553 14.1703 34.1064 14.1703 34.5951V47.7816C14.1703 48.2703 14.4235 48.7214 14.8332 48.9626L25.6377 55.3237C26.0362 55.5583 26.5238 55.5598 26.9236 55.3276L37.8831 48.9612C38.2965 48.7211 38.5526 48.2679 38.5526 47.7764V25.8942C38.5526 25.6435 38.6858 25.4131 38.8991 25.2951L45.6012 21.5873C45.7976 21.4786 46.0338 21.481 46.2282 21.5935L52.6173 25.2926C52.8244 25.4125 52.9528 25.6394 52.9528 25.8855V33.915C52.9528 34.1611 52.8244 34.388 52.6173 34.5079L46.2282 38.207C46.0338 38.3195 45.7976 38.3219 45.6012 38.2132L41.0071 35.6716V41.443L45.2582 43.9418C45.6654 44.1812 46.1648 44.1768 46.5681 43.9304L57.2173 37.4235C57.6168 37.1794 57.862 36.7344 57.862 36.2534V23.3682C57.862 22.8922 57.6217 22.4509 57.2287 22.2052L46.5787 15.5465C46.1701 15.291 45.6599 15.2864 45.247 15.5343L34.1329 22.2089C33.7287 22.4517 33.4797 22.8995 33.4797 23.3841V45.2915C33.4797 45.5357 33.3533 45.7612 33.1485 45.8818L26.6067 49.7375C26.4042 49.8569 26.1557 49.8556 25.9544 49.7341L19.5687 45.883C19.3671 45.7614 19.2431 45.5378 19.2431 45.296V37.4202C19.2431 37.1784 19.3671 36.9548 19.5687 36.8332L25.9548 32.9818C26.1559 32.8605 26.4041 32.8591 26.6065 32.9781L31.1888 35.6716Z" fill="white" />
                <defs>
                  <linearGradient id="paint0_linear_16706_21451" x1="5.90429" y1="3.54257" x2="68.4897" y2="67.8993" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#9E2AC7" />
                    <stop offset="1" stop-color="#803DE0" />
                  </linearGradient>
                </defs>
              </svg>
            </StyledSvg>
            <StyledFlex flexDirection='column' alignItems='flex-start' style={{ flex: 1 }}>
              <StyledFlex justifyContent='space-between' style={{ width: '100%' }}>
                <StyledFont color='#FFF' fontSize='20px' fontWeight='700'>Polygon zkEVM</StyledFont>
                <StyledFont color='#ACFCED' fontSize='12px' fontWeight='500' style={{ textTransform: 'uppercase' }}>Chain</StyledFont>
              </StyledFlex>
              <StyledFlex gap='4px' style={{ flexWrap: 'wrap' }}>
                <StyledSvg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="20" y="20" width="20" height="20" rx="6" transform="rotate(180 20 20)" fill="#FDFE03" />
                    <path d="M4.52874 5L2 6.9186H14.7011L14.0115 8.95349H8.89655L8.43678 10.5233H13.5517L12.7471 13.0814H5.62069L7.11494 8.48837L5.44828 7.2093L2.97701 15H12.1149L14.5287 13.8372L15.3908 11.1628L13.7816 9.94186L16.1954 8.72093L17 6.22093L15.3333 5H4.52874Z" fill="black" />
                  </svg>
                </StyledSvg>
              </StyledFlex>
            </StyledFlex>

          </StyledFlex>
          <StyledFlex gap='11px' alignItems='flex-end' style={{ marginTop: 20, marginBottom: 12 }}>
            <StyledFont color='#FFF' fontSize='14px' lineHeight='150%'>Estimated date</StyledFont>
            <StyledFont color='#FFF' fontWeight='500' lineHeight='150%'>Dec 2024</StyledFont>
          </StyledFlex>
          <ProgressBar quantity={1} total={3} />
        </StyledAirdropCard>
      </StyledFlex> */}
    </StyledContainer>
  )

}