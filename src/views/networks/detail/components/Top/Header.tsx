import Image from 'next/image';
import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';

import { formatIntegerThousandsSeparator } from '@/utils/format-number';
import AddMetaMask from '@/views/ChainDetail/components/AddMetaMask';
import ValuePercent from '@/views/networks/list/components/value-percent';

import {
  StyledChainName,
  StyledHeaderWrapper,
  StyledInfo,
  StyledStat,
  StyledStatItem,
  StyledTitleWrapper,
} from './styles';

const Header = (props: { chain: any; loading?: boolean; }) => {
  const { chain, loading } = props;

  const {
    logo,
    name,
    trading_volume,
    trading_volume_change_percent,
    total_execution,
    participants,
    participants_change_percent,
    chainId,
  } = chain;

  return (
    <StyledHeaderWrapper>
      <StyledTitleWrapper>
        {
          !loading ? (
            <Image src={logo} alt="" width={100} height={100} />
          ) : (
            <Skeleton width="100px" height="100px" borderRadius="16px" containerClassName="skeleton" />
          )
        }
        <StyledInfo>
          <StyledChainName>
            {
              loading ? (
                <Skeleton
                  width="140px"
                  height="50px"
                  borderRadius="16px"
                  containerClassName="skeleton"
                />
              ) : name
            }
          </StyledChainName>
          {
            loading ? (
              <Skeleton
                width="140px"
                height="32px"
                borderRadius="16px"
                containerClassName="skeleton"
              />
            ) : (
              <AddMetaMask
                chainId={chainId}
                bp="100121-001"
              />
            )
          }
          {/*<NativeCurrency isTag tbdToken={tbd_token} nativeCurrency={native_currency} onClick={onNativeClick}/>*/}
        </StyledInfo>
      </StyledTitleWrapper>
      <StyledStat>
        {
          loading ? [224, 76, 37].map((width) => (
            <Skeleton
              key={width}
              width={`${width}px`}
              height="56px"
              borderRadius="16px"
              containerClassName="skeleton"
            />
          )) : (
            <>
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
            </>
          )
        }
      </StyledStat>
    </StyledHeaderWrapper>
  );
};

export default memo(Header);
