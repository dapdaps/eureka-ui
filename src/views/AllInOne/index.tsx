import { memo, useState } from 'react';
import styled from 'styled-components';
import { StyledFlex } from "@/styled/styles";

function isNonEmptyObject(obj) {
  return typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0;
}

const AllInOneView = (props: Props) => {
  const { currentChain } = props;

  const [currTab, setCurrTab] = useState();
  console.log(currentChain);

  const currentChainTabs = isNonEmptyObject(currentChain.menuConfig) ? Object.values(currentChain.menuConfig).filter(i => isNonEmptyObject(i)) : [];
  const ArrowIcon = () => {
    return (
      <svg width={11.5} height={4.6} viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L8.5 7.5L16 1" stroke="#979abe" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  const SelectBg: React.FC<{
    bgColor: string;
  }> = ({ bgColor }) => (
    <svg width="720" height="241" viewBox="0 0 720 241" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5" filter="url(#filter0_f_510_1870)">
        <ellipse cx="360" cy="120.5" rx="280" ry="40.5" fill={bgColor} />
      </g>
      <defs>
        <filter
          id="filter0_f_510_1870"
          x="0"
          y="0"
          width="720"
          height="241"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="40" result="effect1_foregroundBlur_510_1870" />
        </filter>
      </defs>
    </svg>
  );

  const ArrowTopRight = ({ size = 14, color = '#979ABE', classname }: { size?: number, color?: string, classname: string}) => {
    return <svg className={classname} width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 15L15 1M15 1H1M15 1V15" stroke={color} stroke-width="1.5" />
    </svg>;

  }
  const StyledLogoContainer = styled.div<{ selectBgColor: string }>`
      width: 60px;
      height: 60px;
      border-radius: 16px;
      background: ${(props) => props.selectBgColor};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16px;
  `;
  const StyledLogo = styled.div`
      width: 40px;
      height: 40px;
      overflow: hidden;
      .chain-logo {
          width: 100%;
          height: 100%;
      }
  `;
  const StyledImage = styled.img<{iconColor: string}>`
      transform: translateX(40px);
      -webkit-filter: ${props => `drop-shadow(${props.iconColor} -40px 0 0);`};
      -moz-filter: ${props => `drop-shadow(${props.iconColor} -40px 0 0);`};
      -ms-filter: ${props => `drop-shadow(${props.iconColor} -40px 0 0);`};
      filter: ${props => `drop-shadow(${props.iconColor} -40px 0 0);`};
      width: 100%;
      height: 100%;`

  const StyledTitle = styled.div`
    font-size: 26px;
      font-weight: bolder;
      line-height: 1;
      white-space: nowrap;
  `;
  const StyledHeader = styled.div`
    position: relative;
      width: 948px;
  `;

  const StyledLogoBg = styled.img`
      width: 200px;
      height: 200px;
      opacity: 0.1;
      position: absolute;
  `;
  const StyledMainHeader = styled.div`
    position: relative;
      width: 200px;
      height: 200px;
      margin: 0 auto;
  `;

  const StyledContent = styled.div`
    position: relative;
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      align-items: center;
  `;

  const StyledMainLogo = styled.div`
    position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
  `;

  const StyledShadow = styled.div`
      position: absolute;
      top: 35%;
      left: 50%;
      transform: translate(-50%, 0);
    `;

  const StyledCard = styled.div`
    //width: 360px;
    //  height: 400px;
      background: #16181D;
      border: 1px solid #373A53;
      border-radius: 16px;
      padding: 28px 24px 0 24px;
      transition: all .2s ease;
      &:hover {
          transform: scale(1.04);
          .card-arrow {
              transform: scale(1.5);
              path {
                  stroke: #fff;
              }
          }
      }
  ;
  `;
  return (
    <>
      <StyledFlex flexDirection={'column'} justifyContent={'center'}>
        <StyledHeader>
          <StyledMainHeader>
            <StyledLogoBg src={currentChain.bgIcon} />
            <StyledMainLogo>
          <StyledLogoContainer selectBgColor={currentChain.selectBgColor}>
            {
              currentChain.iconColor ?  <StyledLogo><StyledImage src={currentChain.icon} iconColor={currentChain.iconColor}/>  </StyledLogo>:
                <StyledLogo><img src={currentChain.icon} alt={currentChain.title} className={"chain-logo"}/></StyledLogo>
            }
        </StyledLogoContainer>
          <StyledFlex gap={'14px'}>
            <StyledTitle>{currentChain.title}</StyledTitle>
            <ArrowIcon />
          </StyledFlex>
            </StyledMainLogo>
          </StyledMainHeader>
          <StyledShadow><SelectBg bgColor={currentChain.selectBgColor} /></StyledShadow>
        </StyledHeader>

        <StyledContent>
          {currentChainTabs.length ? currentChainTabs.map(item => <StyledCard>
            <StyledFlex justifyContent={'space-between'}>
              <StyledTitle>{item.tab}</StyledTitle>
              <ArrowTopRight classname={'card-arrow'}/>
            </StyledFlex>

          </StyledCard>) : null }
        </StyledContent>



      </StyledFlex>
    </>
);
};

export default memo(AllInOneView);

interface Props {
  currentChain: any;
}
