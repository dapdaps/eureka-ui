import { useRouter } from 'next/router';

import { IdToPath } from '@/config/all-in-one/chains';
import useDappOpen from '@/hooks/useDappOpen';
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
  loaded: boolean;
  airdropList: any[]
}
export default function Airdrops({ loaded, airdropList }: PropsType) {
  const router = useRouter()
  const { open } = useDappOpen();
  const handleClickAirdrop = function (airdrop: any) {
    console.log('=airdrop', airdrop)
    if (airdrop?.category === "network") {
      router.push(`/networks/${IdToPath[airdrop?.network?.id]}`)
    } else {
      open({ dapp: airdrop?.dapp, from: "alldapps" });
    }
  }
  return !loaded ? (
    <StyledContainer style={{ marginTop: 81 }}>
      <StyledFlex gap='6px' style={{ paddingLeft: 16, marginBottom: 20 }}>
        <StyledFont color='#FFF' fontSize='20px' fontWeight='600'>Following Potential Airdrops</StyledFont>
        <RectangleNumber quantity={airdropList?.length} />
      </StyledFlex>
      <AirdropLoading />
    </StyledContainer>
  ) : loaded && airdropList && airdropList.length > 0 ? (
    <StyledContainer style={{ marginTop: 81 }}>
      <StyledFlex gap='6px' style={{ paddingLeft: 16, marginBottom: 20 }}>
        <StyledFont color='#FFF' fontSize='20px' fontWeight='600'>Following Potential Airdrops</StyledFont>
        <RectangleNumber quantity={airdropList?.length} />
      </StyledFlex>
      <StyledFlex gap='16px'>
        {
          airdropList.map((airdrop, index) => (
            <StyledAirdropCard
              key={index}
              onClick={() => {
                handleClickAirdrop(airdrop)
              }}
            >
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
              <StyledContainer>
                <StyledFlex gap='11px' alignItems='flex-end' style={{ marginBottom: 8 }}>
                  <StyledFont color='#FFF' fontSize='14px' lineHeight='150%'>Estimated date</StyledFont>
                  <StyledFont color='#FFF' fontWeight='500' lineHeight='150%'>{airdrop?.estimated_date}</StyledFont>
                </StyledFlex>
                <ProgressBar quantity={airdrop?.completed_count} total={airdrop?.total_quest} />
              </StyledContainer>
            </StyledAirdropCard>
          ))
        }
      </StyledFlex>
    </StyledContainer>
  ) : (
    <></>
  )

}