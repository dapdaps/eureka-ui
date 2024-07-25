import { memo, useMemo } from 'react';
import AddMetaMask from '../AddMetaMask';
import Actions from './Actions';
import {
  StyledHeaderWrapper,
  StyledTitleWrapper,
  StyledChainLogoWrapper,
  StyledChainLogo,
  StyledChainName,
  StyledNative,
  StyledStat,
  StyledStatItem,
  StyledInfo,
} from './styles';

const NativeCurrency = ({ nativeCurrency }: any) => {
  const mergedCurrency = useMemo<any>(() => {
    if (!nativeCurrency) return {};
    return JSON.parse(nativeCurrency);
  }, [nativeCurrency]);
  return (
    <StyledNative>
      <div className="info">
        {mergedCurrency?.logo && <img src={mergedCurrency?.logo} alt="" className="token-img" />}
        <span>{mergedCurrency?.symbol}</span>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.258855 0.15115C-0.0385654 0.389086 -0.0867868 0.823079 0.15115 1.1205L3.25475 5L0.15115 8.8795C-0.0867864 9.17692 -0.038565 9.61091 0.258856 9.84885C0.556276 10.0868 0.990269 10.0386 1.22821 9.74115L5.02112 5L1.2282 0.258855C0.990268 -0.0385655 0.556276 -0.0867869 0.258855 0.15115Z"
          fill="#979ABE"
        />
      </svg>
    </StyledNative>
  );
};
const Header = ({ logo, name, chainId, bgColor, path, id, deepdive, tbd_token, nativeCurrency }: any) => {
  return (
    <StyledHeaderWrapper>
      <StyledTitleWrapper>
        <StyledChainLogoWrapper style={{ backgroundColor: bgColor }}>
          <StyledChainLogo src={logo} />
        </StyledChainLogoWrapper>
        <StyledInfo>
          <StyledChainName>{name}</StyledChainName>
          {/* <AddMetaMask chainId={chainId} bp="100121-001" /> */}
          <div style={{ display: 'flex' }}>
            {tbd_token === 'Y' ? 'TBD🔥' : <NativeCurrency nativeCurrency={nativeCurrency} />}
          </div>
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
