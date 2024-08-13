import { memo } from 'react';
import {
  StyledContainer,
  StyledHead,
  StyledLogo,
  StyledLogoText,
  StyledX,
  StyledName,
  StyledDesc,
  StyledInner,
  StyledConnectButton,
  StyledXContainer,
  StyledRect,
  StyledBg,
  StyledLight,
  StyledAperture,
  StyledMedals,
  StyledMedal,
  StyledLogoContainer,
  StyledContent,
  StyledRectBg
} from '@/views/marketing/invite/styles';
import { useConnectWallet } from '@web3-onboard/react';

const Invite = (props: Props) => {
  const {
    logo,
    name,
    logoSize = {
      width: 60,
      height: 60,
    },
    medals = [],
    isMobile
  } = props;

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const onConnectWallet = () => {
      connect();
  }

  console.log(wallet);

  return (
    <StyledContainer className={ isMobile ? 'mobile-invite' : 'invite' }>
      <StyledInner>
        <StyledHead>
          <StyledLogoContainer className='logo-container'>
            <StyledLogo className='logo' src='/images/marketing/dapdap-logo.png' alt="logo" width={70} height={74} />
            <StyledLogoText src='/images/marketing/dapdap.png' alt="logo text" />
          </StyledLogoContainer>
          <StyledXContainer>
            <StyledX>X</StyledX>
            <StyledContent>
              <StyledDesc>
                <p>Unlock the exclusive {name} Pioneer Badge by connecting your wallet through this page! </p>
                <p>If you connect with {name} for the first time:</p>
                <p>10% Gems Bonus: You will receive an additional 10% Gems on all future Gem acquisitions.</p>
                <p>Monthly Settlement: This bonus will be calculated and credited on the first day of each month.</p>
                <p>Don't miss out on maximizing your rewards!</p>
              </StyledDesc>
              {
                medals?.length > 0 && (
                  <StyledMedals>
                    {
                      medals.map((medal, index) => (<StyledMedal $url={medal}/>))
                    }
                  </StyledMedals>
                )
              }
              {

                !wallet && (<StyledConnectButton onClick={onConnectWallet}>
                  Connect Your Wallet
                </StyledConnectButton>)
              }
            </StyledContent>
            <StyledBg>
              <StyledRectBg>
                <StyledRect></StyledRect>
              </StyledRectBg>

              <StyledLight></StyledLight>
              <StyledAperture></StyledAperture>
            </StyledBg>
          </StyledXContainer>
          <StyledLogoContainer className='logo-container'>
            <StyledLogo src={logo} alt={name} width={logoSize.width} height={logoSize.height} />
            <StyledName className='dapp-name'>{name}</StyledName>
          </StyledLogoContainer>
        </StyledHead>
      </StyledInner>
    </StyledContainer>
  );
};

export default memo(Invite);

interface Props {
  logo: string;
  name: string;
  isMobile?: boolean;
  logoSize?: {
    width: number;
    height: number;
  },
  medals?: string[];
}
