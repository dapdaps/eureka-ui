import { memo } from 'react';
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
import ValuePercent from '@/views/networks/list/components/value-percent';
import { formatIntegerThousandsSeparator } from '@/utils/format-number';

const Header = ({ chain }: any) => {

  let {
    logo,
    name,
    bgColor,
    tbd_token,
    native_currency,
    trading_volume,
    trading_volume_change_percent,
    total_execution,
    participants,
    participants_change_percent,
  } = chain;

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
          <NativeCurrency isTag tbdToken={tbd_token} nativeCurrency={native_currency} onClick={onNativeClick}/>
        </StyledInfo>
      </StyledTitleWrapper>
      <StyledStat>
        <StyledStatItem>
          <span className="key">Trading Volume on DapDap</span>
          <ValuePercent percent={trading_volume_change_percent} className="tvl-value">
            ${formatIntegerThousandsSeparator(trading_volume, 1)}
          </ValuePercent>
        </StyledStatItem>
        <StyledStatItem>
          <span className="key">Total txns</span>
          <ValuePercent className="tvl-value">
            {formatIntegerThousandsSeparator(total_execution, 0)}
          </ValuePercent>
        </StyledStatItem>
        <StyledStatItem>
          <span className="key">User</span>
          <ValuePercent percent={participants_change_percent} className="tvl-value">
            {formatIntegerThousandsSeparator(participants, 0)}
          </ValuePercent>
        </StyledStatItem>
      </StyledStat>
    </StyledHeaderWrapper>
  );
};

export default memo(Header);
