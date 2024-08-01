import { memo, useMemo } from 'react';
import AddMetaMask from '../AddMetaMask';
import Actions from './Actions';
import {
  StyledHeaderWrapper,
  StyledTitleWrapper,
  StyledChainLogoWrapper,
  StyledChainLogo,
  StyledChainName,
  StyledStat,
  StyledStatItem,
  StyledInfo,
} from './styles';

import NativeCurrency from '../NativeCurrency';

const Header = ({ logo, name, chainId, bgColor, path, id, deepdive, tbd_token, nativeCurrency }: any) => {

  const onNativeClick = () => {}

  return (
    <StyledHeaderWrapper>
      <StyledTitleWrapper>
        <StyledChainLogoWrapper style={{ backgroundColor: bgColor }}>
          <StyledChainLogo src={logo} />
        </StyledChainLogoWrapper>
        <StyledInfo>
          <StyledChainName>{name}</StyledChainName>
          {/* <AddMetaMask chainId={chainId} bp="100121-001" /> */}
          <NativeCurrency isTag tbdToken={tbd_token} nativeCurrency={nativeCurrency} onClick={onNativeClick}/>
        </StyledInfo>
      </StyledTitleWrapper>
      {/* <Actions path={path} id={id} deepdive={deepdive} /> */}
      <StyledStat>
        <StyledStatItem>
          <span className="key">Trading Volume on DapDap</span>
          <span className="value">$164.1m</span>
        </StyledStatItem>
        <StyledStatItem>
          <span className="key">Total txns</span>
          <span className="value">64.1k</span>
        </StyledStatItem>
        <StyledStatItem>
          <span className="key">User</span>
          <span className="value">16.2k</span>
        </StyledStatItem>
      </StyledStat>
    </StyledHeaderWrapper>
  );
};

export default memo(Header);
