import { StyledContainer, StyledFlex, StyledFont } from '@/styled/styles';
import DappCard from '@/views/AllDapps/components/DappCard';
import RectangleNumber from '../RectangleNumber';
// import Empty from '@/components/Empty';
export default function Dapps() {

  const dapp = {
    "id": 204,
    "name": "Connext Bridge",
    "description": "Connext is a modular protocol for securely passing funds and data between chains.",
    "route": "bridge-x/connext",
    "logo": "https://s3.amazonaws.com/dapdap.prod/images/connext.png",
    "favorite": 0,
    "default_chain_id": 1,
    "priority": 1,
    "tbd_token": "Y",
    "recommend": false,
    "recommend_icon": "",
    "category_ids": [
      1
    ],
    "network_ids": [
      2,
      4,
      6,
      8,
      10,
      11,
      12,
      13,
      16,
      19
    ],
    "tag": "connext bridge",
    "native_currency": "{\"name\":\"\",\"symbol\":\"\",\"decimals\":1,\"logo\":\"\"}",
    "theme": "{\"swap_color\":\"\"}",
    "status": 0,
    "recommend_priority": 0,
    "dapp_network": [
      {
        "dapp_id": 204,
        "network_id": 2,
        "chain_id": 42161,
        "dapp_src": "dapdapbos.near/widget/Bridge.Index"
      },
      {
        "dapp_id": 204,
        "network_id": 4,
        "chain_id": 59144,
        "dapp_src": "dapdapbos.near/widget/Bridge.Index"
      },
      {
        "dapp_id": 204,
        "network_id": 6,
        "chain_id": 8453,
        "dapp_src": "dapdapbos.near/widget/Bridge.Index"
      },
      {
        "dapp_id": 204,
        "network_id": 8,
        "chain_id": 1088,
        "dapp_src": "dapdapbos.near/widget/Bridge.Index"
      },
      {
        "dapp_id": 204,
        "network_id": 10,
        "chain_id": 137,
        "dapp_src": "dapdapbos.near/widget/Bridge.Index"
      },
      {
        "dapp_id": 204,
        "network_id": 11,
        "chain_id": 100,
        "dapp_src": "dapdapbos.near/widget/Bridge.Index"
      },
      {
        "dapp_id": 204,
        "network_id": 12,
        "chain_id": 56,
        "dapp_src": "dapdapbos.near/widget/Bridge.Index"
      },
      {
        "dapp_id": 204,
        "network_id": 13,
        "chain_id": 10,
        "dapp_src": "dapdapbos.near/widget/Bridge.Index"
      },
      {
        "dapp_id": 204,
        "network_id": 16,
        "chain_id": 1,
        "dapp_src": "dapdapbos.near/widget/Bridge.Index"
      },
      {
        "dapp_id": 204,
        "network_id": 19,
        "chain_id": 34443,
        "dapp_src": "dapdapbos.near/widget/Bridge.Index"
      }
    ]
  }
  return (
    <StyledContainer style={{ marginTop: 80 }}>
      <StyledFlex gap='6px' style={{ paddingLeft: 16, marginBottom: 20 }}>
        <StyledFont color='#FFF' fontSize='20px' fontWeight='600'>dApps</StyledFont>
        <RectangleNumber quantity={9} />
      </StyledFlex>
      <StyledFlex gap="16px" style={{ flexWrap: 'wrap' }}>
        <DappCard
          name={dapp.name}
          logo={dapp.logo}
          description={dapp.description}
          categories={dapp.categories}
          networks={dapp.networks}
          // onClick={() => onDappCardClick(dapp)}
          badges={[
            { icon: '/images/alldapps/icon-exchange.svg', iconSize: 17, value: '$23.56k' },
            { icon: '/images/alldapps/icon-fire.svg', iconSize: 17, value: '1,235' },
            { icon: '/images/alldapps/icon-mode.svg', iconSize: 24 },
            { icon: '/images/alldapps/icon-dapdap-point.svg', iconSize: 24 },
          ]}
        />
        {/* <StyledDapp>
          <StyledDappTop>
            <StyledFlex justifyContent='space-between'>
              <StyledDappType color='#ADFFB5'>
                <StyledDappTypeFont>Lending</StyledDappTypeFont>
              </StyledDappType>
              <StyledFlex gap='4px'>
                <StyledSvg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="20" y="20" width="20" height="20" rx="6" transform="rotate(180 20 20)" fill="#0038FF" />
                    <path d="M9.98791 17C13.861 17 17 13.8665 17 10C17 6.13345 13.861 3 9.98791 3C6.31328 3 3.29901 5.82036 3 9.41073H12.2693V10.588H3C3.29901 14.1796 6.31328 17 9.98791 17Z" fill="white" />
                  </svg>
                </StyledSvg>
              </StyledFlex>
            </StyledFlex>
          </StyledDappTop>
          <StyledDappBottom>
            <StyledFlex gap='20px' alignItems='flex-end' style={{ marginTop: -30 }}>
              <StyledSvg>
                <svg xmlns="http://www.w3.org/2000/svg" width="78" height="78" viewBox="0 0 78 78" fill="none">
                  <rect x="1.5" y="1.5" width="75" height="75" rx="17.5" fill="#9896FF" />
                  <rect x="1.5" y="1.5" width="75" height="75" rx="17.5" stroke="#202329" stroke-width="3" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M16 41.411C15.997 28.483 26.284 18 38.973 18C51.66 18 61.948 28.483 61.946 41.411H56.077C56.077 31.723 48.48 23.868 38.973 23.868C29.466 23.868 21.869 31.723 21.869 41.411H16ZM32.8739 41.9649C34.1134 41.9649 35.3022 41.4725 36.1786 40.5961C37.0551 39.7196 37.5474 38.5309 37.5474 37.2914C37.5474 36.0519 37.0551 34.8632 36.1786 33.9868C35.3022 33.1103 34.1134 32.6179 32.8739 32.6179C31.6345 32.6179 30.4457 33.1103 29.5693 33.9868C28.6928 34.8632 28.2004 36.0519 28.2004 37.2914C28.2004 38.5309 28.6928 39.7196 29.5693 40.5961C30.4457 41.4725 31.6345 41.9649 32.8739 41.9649ZM45.0879 41.9649C46.3274 41.9649 47.5161 41.4725 48.3926 40.5961C49.2691 39.7196 49.7614 38.5309 49.7614 37.2914C49.7614 36.0519 49.2691 34.8632 48.3926 33.9868C47.5161 33.1103 46.3274 32.6179 45.0879 32.6179C43.8484 32.6179 42.6597 33.1103 41.7833 33.9868C40.9068 34.8632 40.4144 36.0519 40.4144 37.2914C40.4144 38.5309 40.9068 39.7196 41.7833 40.5961C42.6597 41.4725 43.8484 41.9649 45.0879 41.9649Z" fill="white" />
                </svg>
              </StyledSvg>
              <StyledFont color='#FFF' fontSize='20px' fontWeight='700' style={{ marginBottom: 8 }}>AAVE V3</StyledFont>
            </StyledFlex>

            <StyledFont color='#979ABE' fontSize='14px' lineHeight='120%' lineClamp={2} className='ellipsis' style={{ marginTop: 14, marginBottom: 25 }}>
              Aave is a decentralized non-custodial liquidity protocol where users can participate as depositors ...
            </StyledFont>

            <StyledFlex gap='6px'>
              <StyledDappReward>
                <StyledSvg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <path d="M8.5 0C3.8063 0 0 3.8063 0 8.5C0 13.1937 3.8063 17 8.5 17C13.1937 17 17 13.1937 17 8.5C17 3.8063 13.1962 0 8.5 0ZM13.5201 11.2183C13.5002 11.2467 13.4758 11.2717 13.4479 11.2922L9.928 13.8958C9.8791 13.9317 9.82123 13.9534 9.76078 13.9584C9.70033 13.9635 9.63966 13.9517 9.58547 13.9245C9.53129 13.8972 9.4857 13.8555 9.45374 13.8039C9.42178 13.7524 9.40471 13.693 9.4044 13.6323V11.9561H6.528C4.4778 11.968 3.366 10.9539 3.1875 8.91565C3.366 9.10265 4.14375 10.2017 6.528 10.2017C8.1158 10.2017 9.0763 10.1847 9.4044 10.1481V8.53995C9.40441 8.47979 9.42096 8.42079 9.45224 8.3694C9.48352 8.31802 9.52833 8.27622 9.58176 8.24858C9.6352 8.22094 9.6952 8.20853 9.75522 8.21269C9.81523 8.21686 9.87295 8.23744 9.92205 8.2722L13.4402 10.7576C13.5119 10.8081 13.5606 10.885 13.5756 10.9714C13.5905 11.0578 13.5706 11.1466 13.5201 11.2183ZM10.4737 6.79405C8.8859 6.79405 7.92625 6.8119 7.59815 6.8476V8.4558C7.59841 8.51617 7.582 8.57544 7.55074 8.62709C7.51948 8.67874 7.47458 8.72076 7.42097 8.74853C7.36737 8.7763 7.30714 8.78874 7.24692 8.78448C7.18669 8.78022 7.12882 8.75943 7.07965 8.7244L3.5615 6.239C3.51882 6.20925 3.48384 6.16976 3.45947 6.1238C3.4351 6.07783 3.42205 6.02672 3.42138 5.9747C3.42072 5.92268 3.43247 5.87125 3.45565 5.82467C3.47884 5.7781 3.51279 5.73773 3.5547 5.7069L7.07285 3.10335C7.12175 3.06745 7.17962 3.04578 7.24007 3.04072C7.30052 3.03566 7.36119 3.04742 7.41538 3.07469C7.46956 3.10195 7.51515 3.14368 7.54711 3.19524C7.57906 3.2468 7.59614 3.30619 7.59645 3.36685V5.04305H10.4729C12.5231 5.03115 13.6349 6.0452 13.8134 8.0835C13.6349 7.8931 12.8571 6.7932 10.4746 6.7932L10.4737 6.79405Z" fill="#00D1FF" />
                  </svg>
                </StyledSvg>
                <StyledFont color='#FFF' fontSize='14px' fontWeight='500' lineHeight='100%'>$1.3M</StyledFont>
              </StyledDappReward>
            </StyledFlex>
          </StyledDappBottom>
        </StyledDapp> */}
      </StyledFlex>
    </StyledContainer>
  )
}