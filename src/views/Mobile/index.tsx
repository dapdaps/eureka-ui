import styled from 'styled-components';

import chainCofig from '@/config/all-in-one/chains';
import {
  StyledContainer,
  StyledFlex,
  StyledFont,
  StyledSvg
} from "@/styled/styles";
const StyledSubTitle = styled.div`
`
const StyledSquareButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid #4B4A4A;
  background: rgba(33, 35, 42, 0.90);
  backdrop-filter: blur(5px);
`
const StyledIntroduction = styled.div`
  /* position: absolute; */
  /* height: 137px; */
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 23px 20px;
  border-radius: 20px 20px 0 0;
  border: 1px solid #4B4A4A;
  background: rgba(33, 35, 42, 0.90);
  backdrop-filter: blur(5px);
  z-index: 999;
`
const StyledFooterLogo = styled.img`
  width: 91px;
  height: 91px;
`
const StyledTitleBg = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -21px;
  z-index: 9;
  img {
    width: 100%;
  }
`
const StyledCover = styled.div`
  display: flex;
  justify-content: center;
  gap: 106px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
`
const StyledChainListContainer = styled.div`
  
  &.down {
    /* transform: translateY(-100%); */
    animation: translateDown 5s linear infinite;
  }
  &.up {
    animation: translateUp 5s linear infinite;
  }
  @keyframes translateDown {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(-50%);
    }
  }
  @keyframes translateUp {
    0% {
      transform: translate(0);
    }
    100% {
      transform: translateY(-50%);
    }
  }
`
const StyledChainList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 68px;
  opacity: 0.1;
`
const StyledChain = styled.img`
  width: 82px;
`

const Index = function () {
  const characters = ["👩🏻‍💻", "🧑🏻‍💻", "🧑🏽‍💻", "🧑🏼‍💻", "👩🏾‍💻", "🧑🏿‍💻", "👩🏼‍💻"]
  const characterIndex = Math.floor(Math.random() * characters.length)
  const chains = Object.values(chainCofig);
  return (
    <StyledContainer
      style={{
        position: "relative",
        overflow: "hidden",
        height: "100dvh"
      }}
    >
      <StyledCover>
        <StyledChainListContainer className="down">
          {
            new Array(2).fill("").map((key, parentIndex) => (
              <StyledChainList key={parentIndex}>
                {
                  chains.map((chain, index) => {
                    return (
                      <StyledChain key={index} src={chain.bgIcon || chain.icon} />
                    )
                  })
                }
              </StyledChainList>
            ))
          }
        </StyledChainListContainer>
        <StyledChainListContainer className="up">
          {
            new Array(2).fill("").map((key, parentIndex) => (
              <StyledChainList key={parentIndex}>
                {
                  chains.map((chain, index) => {
                    return (
                      <StyledChain key={index} src={chain.bgIcon || chain.icon} />
                    )
                  })
                }
              </StyledChainList>
            ))
          }
        </StyledChainListContainer>
      </StyledCover>

      <StyledContainer style={{
        position: "relative",
        zIndex: 999
      }}>
        <StyledSvg style={{
          margin: "40px auto 20px",
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="233" height="62" viewBox="0 0 233 62" fill="none">
            <path d="M3.69881 30.1711C2.68298 25.7375 7.47144 14.365 7.47144 14.365L33.1206 12.6604C38.0813 11.3311 43.1804 14.2751 44.5097 19.2359L55.3559 37.1101C53.6123 45.828 52.1675 50.7706 47.2067 52.0998L21.2095 59.5928C16.2488 60.9221 11.1497 57.9781 9.82044 53.0173L3.69881 30.1711Z" fill="#EBF479" />
            <path d="M6.9185 20.5125C5.54956 15.4036 8.58144 10.1522 13.6904 8.78328L37.2189 2.47882C42.3279 1.10989 47.5792 4.14176 48.9482 9.25071L55.2526 32.7793C56.6216 37.8882 53.5897 43.1396 48.4808 44.5085L24.9522 50.813C19.8433 52.1819 14.5919 49.15 13.223 44.0411L6.9185 20.5125Z" fill="black" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M37.8386 4.79147L14.3101 11.0959C10.4783 12.1226 8.20444 16.0611 9.23114 19.8929L15.5356 43.4214C16.5623 47.2531 20.5008 49.527 24.3325 48.5003L47.8611 42.1959C51.6928 41.1692 53.9667 37.2306 52.94 33.3989L46.6355 9.87038C45.6088 6.03867 41.6703 3.76476 37.8386 4.79147ZM13.6904 8.78328C8.58144 10.1522 5.54956 15.4036 6.9185 20.5125L13.223 44.0411C14.5919 49.15 19.8433 52.1819 24.9522 50.813L48.4808 44.5085C53.5897 43.1396 56.6216 37.8882 55.2526 32.7793L48.9482 9.25071C47.5792 4.14176 42.3279 1.10989 37.2189 2.47882L13.6904 8.78328Z" fill="#EBF479" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M29.0089 15.3297L21.8341 17.2522C21.3006 17.3951 20.984 17.9434 21.127 18.4769L22.2998 22.8539C22.4427 23.3874 22.9911 23.704 23.5246 23.5611L30.1247 21.7925C32.2206 21.2309 34.375 22.4748 34.9366 24.5707C35.4982 26.6667 34.2544 28.8211 32.1585 29.3827L25.5583 31.1512C25.0249 31.2941 24.7083 31.8425 24.8512 32.3759L26.0532 36.8617C26.1961 37.3952 26.7445 37.7118 27.2779 37.5688L34.4527 35.6463C40.063 34.1431 43.3924 28.3764 41.8891 22.7661C40.3858 17.1558 34.6192 13.8264 29.0089 15.3297Z" fill="#EBF479" />
            <path d="M73.2671 13.4966H84.5759C87.2991 13.4966 89.7071 14.0387 91.7999 15.1229C93.918 16.2072 95.5569 17.7201 96.7168 19.6616C97.9019 21.6031 98.4944 23.822 98.4944 26.3183C98.4944 28.9406 97.9145 31.2478 96.7546 33.2397C95.62 35.2317 93.9936 36.7824 91.8756 37.8918C89.7827 38.9761 87.3495 39.5182 84.5759 39.5182H73.2671V13.4966ZM84.1977 32.7102C86.0888 32.7102 87.526 32.1177 88.5094 30.9326C89.518 29.7223 90.0223 28.159 90.0223 26.2426C90.0223 24.4272 89.5306 22.9899 88.5472 21.9309C87.5891 20.8467 86.1392 20.3046 84.1977 20.3046H81.6258V32.7102H84.1977Z" fill="#EBF479" />
            <path d="M109.942 39.8208C108.303 39.8208 106.765 39.3921 105.328 38.5348C103.916 37.6523 102.781 36.4672 101.924 34.9795C101.067 33.4667 100.638 31.7899 100.638 29.9492C100.638 28.1337 101.067 26.4948 101.924 25.0323C102.781 23.5447 103.928 22.3848 105.366 21.5527C106.803 20.7206 108.328 20.3046 109.942 20.3046C111.253 20.3046 112.464 20.6702 113.573 21.4014C114.708 22.1326 115.565 23.2295 116.145 24.6919V20.3046H124.088V39.5182H116.145V36.0007C114.884 38.5474 112.817 39.8208 109.942 39.8208ZM112.401 33.8449C113.409 33.8449 114.266 33.4919 114.972 32.7859C115.704 32.0546 116.095 31.1973 116.145 30.214V29.9114C116.095 28.9028 115.691 28.0455 114.935 27.3395C114.203 26.6335 113.359 26.2805 112.401 26.2805C111.342 26.2805 110.434 26.6587 109.677 27.4151C108.946 28.1463 108.581 29.0289 108.581 30.0627C108.581 31.1217 108.959 32.0168 109.715 32.748C110.472 33.4793 111.367 33.8449 112.401 33.8449Z" fill="#EBF479" />
            <path d="M127.919 20.8341H135.899V24.1246C137.109 21.5779 139.164 20.3046 142.064 20.3046C143.753 20.3046 145.304 20.7332 146.716 21.5905C148.153 22.4226 149.275 23.5825 150.082 25.0701C150.914 26.5578 151.33 28.222 151.33 30.0627C151.33 31.9033 150.902 33.5675 150.045 35.0552C149.212 36.5429 148.078 37.7153 146.641 38.5726C145.228 39.4047 143.716 39.8208 142.102 39.8208C139.227 39.8208 137.16 38.5474 135.899 36.0007V44.4351L127.919 45.948V20.8341ZM139.681 33.8449C140.715 33.8449 141.598 33.4667 142.329 32.7102C143.06 31.9538 143.426 31.0713 143.426 30.0627C143.426 29.0036 143.047 28.1085 142.291 27.3773C141.56 26.6461 140.69 26.2805 139.681 26.2805C138.647 26.2805 137.765 26.6461 137.034 27.3773C136.302 28.0833 135.937 28.928 135.937 29.9114V30.0627C135.937 31.1217 136.302 32.0168 137.034 32.748C137.79 33.4793 138.673 33.8449 139.681 33.8449Z" fill="#EBF479" />
            <path d="M154.562 13.4966H165.871C168.594 13.4966 171.002 14.0387 173.095 15.1229C175.213 16.2072 176.852 17.7201 178.012 19.6616C179.197 21.6031 179.79 23.822 179.79 26.3183C179.79 28.9406 179.21 31.2478 178.05 33.2397C176.915 35.2317 175.289 36.7824 173.171 37.8918C171.078 38.9761 168.645 39.5182 165.871 39.5182H154.562V13.4966ZM165.493 32.7102C167.384 32.7102 168.821 32.1177 169.805 30.9326C170.813 29.7223 171.318 28.159 171.318 26.2426C171.318 24.4272 170.826 22.9899 169.843 21.9309C168.884 20.8467 167.435 20.3046 165.493 20.3046H162.921V32.7102H165.493Z" fill="#EBF479" />
            <path d="M191.238 39.8208C189.599 39.8208 188.06 39.3921 186.623 38.5348C185.211 37.6523 184.077 36.4672 183.219 34.9795C182.362 33.4667 181.933 31.7899 181.933 29.9492C181.933 28.1337 182.362 26.4948 183.219 25.0323C184.077 23.5447 185.224 22.3848 186.661 21.5527C188.098 20.7206 189.624 20.3046 191.238 20.3046C192.549 20.3046 193.759 20.6702 194.868 21.4014C196.003 22.1326 196.86 23.2295 197.44 24.6919V20.3046H205.383V39.5182H197.44V36.0007C196.18 38.5474 194.112 39.8208 191.238 39.8208ZM193.696 33.8449C194.705 33.8449 195.562 33.4919 196.268 32.7859C196.999 32.0546 197.39 31.1973 197.44 30.214V29.9114C197.39 28.9028 196.986 28.0455 196.23 27.3395C195.499 26.6335 194.654 26.2805 193.696 26.2805C192.637 26.2805 191.729 26.6587 190.973 27.4151C190.242 28.1463 189.876 29.0289 189.876 30.0627C189.876 31.1217 190.254 32.0168 191.011 32.748C191.767 33.4793 192.662 33.8449 193.696 33.8449Z" fill="#EBF479" />
            <path d="M209.214 20.8341H217.194V24.1246C218.405 21.5779 220.46 20.3046 223.359 20.3046C225.049 20.3046 226.6 20.7332 228.012 21.5905C229.449 22.4226 230.571 23.5825 231.378 25.0701C232.21 26.5578 232.626 28.222 232.626 30.0627C232.626 31.9033 232.197 33.5675 231.34 35.0552C230.508 36.5429 229.373 37.7153 227.936 38.5726C226.524 39.4047 225.011 39.8208 223.397 39.8208C220.523 39.8208 218.455 38.5474 217.194 36.0007V44.4351L209.214 45.948V20.8341ZM220.977 33.8449C222.01 33.8449 222.893 33.4667 223.624 32.7102C224.355 31.9538 224.721 31.0713 224.721 30.0627C224.721 29.0036 224.343 28.1085 223.586 27.3773C222.855 26.6461 221.985 26.2805 220.977 26.2805C219.943 26.2805 219.06 26.6461 218.329 27.3773C217.598 28.0833 217.232 28.928 217.232 29.9114V30.0627C217.232 31.1217 217.598 32.0168 218.329 32.748C219.086 33.4793 219.968 33.8449 220.977 33.8449Z" fill="#EBF479" />
          </svg>
        </StyledSvg>
        <StyledContainer style={{ position: "relative" }}>
          <StyledFlex
            flexDirection="column"
            style={{
              position: "relative",
              zIndex: 99
            }}
          >
            <StyledFont color="#FFF" fontSize="36px" fontWeight="700" lineHeight="130%">Your Universal</StyledFont>
            <StyledFont color="#FFF" fontSize="36px" fontWeight="700" lineHeight="130%">Gateway into</StyledFont>
            <StyledFont fontSize="36px" fontWeight="700" lineHeight="130%">Ethereum L2s</StyledFont>
          </StyledFlex>
          <StyledTitleBg>
            <img src="/images/mobile/title_bg.png" alt="title_bg" />
          </StyledTitleBg>
        </StyledContainer>
        <StyledFlex
          justifyContent="center"
          flexDirection='column'
          style={{
            marginTop: 30,
            marginBottom: 20
          }}
        >
          <StyledFont
            color="#FFF"
            fontSize="20px"
            style={{
              width: 353,
              textAlign: "center"
            }}
          >Mobile is under construction, coming soon! </StyledFont>
          <StyledFont
            color="#FFF"
            fontSize="20px"
            style={{
              width: 353,
              textAlign: "center"
            }}
          >Explore DapDap via desktop for the full experience.</StyledFont>
        </StyledFlex>

        <StyledFlex
          justifyContent="center"
        >
          <StyledFont fontSize="60px" lineHeight="60px">{characters[characterIndex]}</StyledFont>
        </StyledFlex>
        <StyledContainer style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0
        }}>

          <StyledFlex
            justifyContent="center"
            gap="35px"
            style={{
              marginBottom: 24
            }}
          >
            <StyledSquareButton onClick={() => {
              window.open("https://twitter.com/DapDapMeUp", '_self');
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M7.1428 5.08177L11.6108 0H10.5524L6.6712 4.41152L3.5736 0H0L4.6852 6.67164L0 12H1.0584L5.1544 7.34028L8.4264 12H12M1.4404 0.780949H3.0664L10.5516 11.2574H8.9252"
                  fill="url(#paint0_linear_4989_162)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4989_162"
                    x1="6"
                    y1="0"
                    x2="6"
                    y2="13.2381"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#979ABE" />
                    <stop offset="1" stopColor="#979ABE" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>
            </StyledSquareButton>
            <StyledSquareButton onClick={() => {
              window.open("https://discord.gg/x5USArxKVH", '_self');
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path
                  d="M8 0.491013C4.81493 0.491013 2.58063 1.69243 2.58063 1.69243C3.80475 0.731297 5.94397 0.177601 5.94397 0.177601L5.74193 0C3.73344 0.0313412 1.9151 1.25365 1.9151 1.25365C-0.129049 5.00415 0.00168121 8.24275 0.00168121 8.24275C1.66552 10.1337 4.13751 9.99786 4.13751 9.99786L4.98132 9.05762C3.49575 8.77555 2.55686 7.61592 2.55686 7.61592C2.55686 7.61592 4.79116 8.95315 8 8.95315C11.2088 8.95315 13.4431 7.61592 13.4431 7.61592C13.4431 7.61592 12.5043 8.77555 11.0187 9.05762L11.8625 9.99786C11.8625 9.99786 14.3345 10.1337 15.9983 8.24275C15.9983 8.24275 16.129 5.00415 14.0849 1.25365C14.0849 1.25365 12.2666 0.0313412 10.2581 0L10.056 0.177601C10.056 0.177601 12.1953 0.731297 13.4194 1.69243C13.4194 1.69243 11.1851 0.491013 8 0.491013ZM5.53989 4.45046C6.31239 4.45046 6.94227 5.04594 6.93039 5.77724C6.93039 6.49809 6.31239 7.10402 5.53989 7.10402C4.77928 7.10402 4.16128 6.49809 4.16128 5.77724C4.16128 5.04594 4.76739 4.45046 5.53989 4.45046ZM10.4958 4.45046C11.2683 4.45046 11.8863 5.04594 11.8863 5.77724C11.8863 6.49809 11.2683 7.10402 10.4958 7.10402C9.73515 7.10402 9.11715 6.49809 9.11715 5.77724C9.11715 5.04594 9.72326 4.45046 10.4958 4.45046Z"
                  fill="url(#paint0_linear_4989_163)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4989_163"
                    x1="8"
                    y1="0"
                    x2="8"
                    y2="11.0317"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#979ABE" />
                    <stop offset="1" stopColor="#979ABE" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>
            </StyledSquareButton>
            <StyledSquareButton onClick={() => {
              window.open("https://t.me/DapDapDiscussion", '_self');
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="12" viewBox="0 0 15 12" fill="none">
                <path
                  d="M5.643 11.274L5.87603 7.91777L12.2677 2.42717C12.5506 2.1812 12.2094 2.06219 11.8349 2.27642L3.94523 7.02912L0.533028 5.99764C-0.199346 5.79929 -0.207669 5.31529 0.699476 4.96617L13.9904 0.0785899C14.5979 -0.183245 15.1805 0.221409 14.9475 1.11006L12.6838 11.274C12.5257 11.996 12.0679 12.1706 11.4354 11.8374L7.98993 9.40943L6.33376 10.9408C6.14235 11.1233 5.98422 11.274 5.643 11.274Z"
                  fill="url(#paint0_linear_4989_164)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_4989_164"
                    x1="7.5"
                    y1="0"
                    x2="7.5"
                    y2="13.2381"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#979ABE" />
                    <stop offset="1" stopColor="#979ABE" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>
            </StyledSquareButton>
            <StyledSquareButton onClick={() => {
              window.open("https://dapdap.mirror.xyz/-_KglFeVLqHvP6uDS-HeR59WuYGbjB2j8VrYBWnEyf0", '_self');
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="23" viewBox="0 0 18 23" fill="none">
                <path d="M1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9V21C17 21.5523 16.5523 22 16 22H2C1.44772 22 1 21.5523 1 21V9Z" fill="url(#paint0_linear_11730_1674)" stroke="url(#paint1_linear_11730_1674)" stroke-width="1.5" />
                <defs>
                  <linearGradient id="paint0_linear_11730_1674" x1="9" y1="1" x2="9" y2="24.1667" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#979ABE" stop-opacity="0.3" />
                    <stop offset="1" stop-color="#979ABE" />
                  </linearGradient>
                  <linearGradient id="paint1_linear_11730_1674" x1="9" y1="1" x2="9" y2="22" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#979ABE" />
                    <stop offset="1" stop-color="#464758" />
                  </linearGradient>
                </defs>
              </svg>
            </StyledSquareButton>
            <StyledSquareButton onClick={() => {
              window.open("https://docs.dapdap.net", '_self');
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
                <path d="M10.1053 11.5183C11.2536 12.2094 11.8278 12.555 12.5167 12.555C13.2057 12.555 13.7799 12.2094 14.9282 11.5183L22.2775 7.25655C22.622 7.02618 22.8517 6.68063 22.8517 6.33508C22.8517 5.98953 22.622 5.5288 22.2775 5.29843L14.8134 1.03665C13.6651 0.34555 13.0909 0 12.4019 0C11.7129 0 11.1388 0.34555 9.99043 1.03665L3.67464 4.72251C3.67464 4.72251 3.55981 4.72251 3.55981 4.8377C1.37799 6.10471 -2.69139e-08 8.52356 0 11.0576V11.288C0 13.822 1.37799 16.1257 3.55981 17.5079L3.67464 17.623L7.69378 19.9267C9.99043 21.3089 11.2536 22 12.5167 22C13.7799 22 14.9282 21.3089 17.3397 19.9267L21.5885 17.5079C22.7368 16.8168 23.311 16.4712 23.6555 15.8953C24 15.3194 24 14.6283 24 13.2461V10.5969C24 10.2513 23.7703 9.90576 23.4258 9.6754C23.0813 9.44503 22.7368 9.44503 22.3923 9.6754L13.6651 14.7435C13.0909 15.089 12.7464 15.2042 12.5167 15.2042C12.1722 15.2042 11.9426 15.089 11.3684 14.7435L5.51196 11.288C5.05263 11.0576 4.9378 11.0576 4.82297 10.9424C4.5933 10.9424 4.2488 11.0576 4.13397 11.288V12.3246C4.13397 12.555 4.36364 12.7853 4.47847 13.0157C4.5933 13.2461 4.70813 13.2461 4.9378 13.4764L11.2536 17.1623C11.8278 17.5079 12.1722 17.623 12.4019 17.623C12.7464 17.623 12.9761 17.5079 13.5502 17.1623L21.244 12.6702C21.4737 12.555 21.5885 12.4398 21.5885 12.555C21.7034 12.555 21.7033 12.6702 21.7033 12.9005V14.0524C21.7033 14.3979 21.7034 14.5131 21.5885 14.7435C21.4737 14.8586 21.3589 14.9738 21.0144 15.089L14.6986 18.7749C13.5502 19.466 12.9761 19.8115 12.2871 19.8115C11.5981 19.8115 11.0239 19.466 9.8756 18.7749L3.90431 15.3194C2.75598 14.6283 2.06699 13.2461 2.06699 11.7487V10.5969C2.06699 9.79058 2.52632 9.09948 3.21531 8.63874C3.78947 8.29319 4.5933 8.29319 5.16746 8.63874L10.1053 11.5183Z" fill="url(#paint0_linear_11704_1669)" />
                <defs>
                  <linearGradient id="paint0_linear_11704_1669" x1="12" y1="0" x2="12" y2="24.2698" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#979ABE" />
                    <stop offset="1" stop-color="#979ABE" stop-opacity="0.5" />
                  </linearGradient>
                </defs>
              </svg>
            </StyledSquareButton>
          </StyledFlex>
          <StyledIntroduction onClick={() => {
            window.open("https://docs.dapdap.net", '_self');
          }}>
            <StyledFooterLogo src="/images/mobile/footer_logo.png" alt="footer_logo" />
            <StyledFlex flexDirection="column" alignItems="flex-start" gap="7px">
              <StyledFont color="#FFF" fontSize="20px" fontWeight="700">👊Introduction</StyledFont>
              <StyledFont color="#D2D2D2" style={{
                width: 250
              }}>DapDap introduces itself as a universal gateway designed to streamline Web3 navigation...</StyledFont>
            </StyledFlex>
          </StyledIntroduction>
        </StyledContainer>
      </StyledContainer>
    </StyledContainer >
  )
}
export default Index