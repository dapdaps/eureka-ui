import type Big from 'big.js';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

import LazyImage from '@/components/LazyImage';
import Modal from '@/components/Modal';
import { IdToPath, SupportedChains } from '@/config/all-in-one/chains';
import { StyledFlex } from '@/styled/styles';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import type { GridChain } from '@/views/Home/components/GridChains/index';
import useDetail from '@/views/networks/detail/hooks/useDetail';

const GridChainDetail = (props: Props) => {
  const { network, visible, onClose, loading } = props;

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Modal
      display={visible}
      title=""
      width={492}
      onClose={handleClose}
      portal={true}
      content={(
        <Detail
          networkId={network?.id}
          chainId={network?.chainId}
          name={network?.name}
          icon={network?.icon}
          logo={network?.logo}
          walletLoading={loading}
          balance={network?.balance}
          bg={network?.bg}
          text={network?.text}
          path={network?.path}
          native_currency={network?.native_currency}
          totalUsd={network?.totalUsd}
        />
      )}
      showHeader={false}
      style={{
        overflow: 'visible',
        borderRadius: 20,
        borderColor: '#202329',
        backgroundColor: '#18191E',
        backdropFilter: 'blur(10px)',
      }}
      overlayStyle={{
        background: 'rgba(0, 0, 0, 0.50)',
        backdropFilter: 'blur(10px)',
      }}
    />
  );
};

export default GridChainDetail;

interface Props {
  network?: GridChain;
  visible?: boolean;
  loading?: boolean;

  onClose?(): void;
}

const Detail = (props: DetailProps) => {
  const {
    name,
    totalUsd,
    networkId,
    chainId,
    native_currency,
    icon,
    logo,
    walletLoading,
    balance,
    bg,
    text,
    path,
  } = props;

  const router = useRouter();

  const isSupported = useMemo(() => {
    return SupportedChains.some((support) => support.chainId === chainId);
  }, [chainId]);

  const nativeCurrency = useMemo(() => {
    try {
      if (native_currency) {
        return JSON.parse(native_currency);
      }
      return {};
    } catch (err) {
      return {};
    }
  }, [native_currency]);

  const handleNetworkDetailPre = () => {
    if (!networkId) return;
    router.prefetch(`/networks/${IdToPath[networkId]}`);
  };
  const handleNetworkDetail = () => {
    if (!networkId) return;
    router.push(`/networks/${IdToPath[networkId]}`);
  };
  const handleAllInOnePre = () => {
    router.prefetch(`/all-in-one/${path}`);
  };
  const handleAllInOne = () => {
    router.push(`/all-in-one/${path}`);
  };
  const handleSuperBridgePre = () => {
    router.prefetch(`/super-bridge?fromChainId=1&toChainId=${chainId}&fromToken=ETH&toToken=${nativeCurrency.symbol}`);
  };
  const handleSuperBridge = () => {
    router.push(`/super-bridge?fromChainId=1&toChainId=${chainId}&fromToken=ETH&toToken=${nativeCurrency.symbol}`);
  };
  const handlePortfolioPre = () => {
    router.prefetch('/portfolio');
  };
  const handlePortfolio = () => {
    router.push('/portfolio');
  };

  useEffect(() => {
    handleNetworkDetailPre();
  }, []);

  return (
    <StyledDetail>
      <StyledDetailHead $icon={icon}>
        <StyledLogo $src={logo} />
        <StyledDetailBgMask>
          <StyledTitle>
            {name}
            <StyledTitleLink $bg="/images/home/btn-arrow-right.png" onClick={handleNetworkDetail} />
          </StyledTitle>
          <StyledFlex justifyContent="space-between" alignItems="end" gap="20px" style={{ marginTop: 40, position: 'relative' }}>
            <StyledFlex flexDirection="column" alignItems="center" gap="10px">
              <StyledSummaryTitle>
                In Wallet
              </StyledSummaryTitle>
              <StyledSummaryValue $blur={!isSupported}>
                {formateValueWithThousandSeparatorAndFont(balance, 2, true, { prefix: '$', isZeroPrecision: true })}
              </StyledSummaryValue>
            </StyledFlex>
            <StyledFlex flexDirection="column" alignItems="center" gap="10px">
              <StyledSummaryTitle>
                DeFi
              </StyledSummaryTitle>
              <StyledSummaryValue $blur={!isSupported}>
                {formateValueWithThousandSeparatorAndFont(totalUsd, 2, true, {
                  prefix: '$',
                  isZeroPrecision: true,
                })}
              </StyledSummaryValue>
            </StyledFlex>
            {
              !isSupported && (
                <StyledComingSoon>
                  Coming soon...
                </StyledComingSoon>
              )
            }
          </StyledFlex>
        </StyledDetailBgMask>
      </StyledDetailHead>
      <StyledBody>
        <StyledFlex flexDirection="column" alignItems="center" gap="20px">
          <StyledButton $bg={bg} $text={text} $primary={true} onMouseEnter={handleAllInOnePre} onClick={handleAllInOne}>
            All-In-One
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
              <path
                d="M1 5.2C0.558172 5.2 0.2 5.55817 0.2 6C0.2 6.44183 0.558172 6.8 1 6.8L1 5.2ZM17.5657 6.56569C17.8781 6.25327 17.8781 5.74674 17.5657 5.43432L12.4745 0.343147C12.1621 0.0307274 11.6556 0.0307274 11.3431 0.343147C11.0307 0.655566 11.0307 1.1621 11.3431 1.47452L15.8686 6L11.3431 10.5255C11.0307 10.8379 11.0307 11.3444 11.3431 11.6569C11.6556 11.9693 12.1621 11.9693 12.4745 11.6569L17.5657 6.56569ZM1 6.8L17 6.8L17 5.2L1 5.2L1 6.8Z"
                fill={text}
              />
            </svg>
          </StyledButton>
          <StyledButton onMouseEnter={handleSuperBridgePre} onClick={handleSuperBridge}>
            Bridge Now
          </StyledButton>
          {
            isSupported && (
              <StyledButton onMouseEnter={handlePortfolioPre} onClick={handlePortfolio}>
                Manage Assets
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
                  <path
                    d="M1 5.2C0.558172 5.2 0.2 5.55817 0.2 6C0.2 6.44183 0.558172 6.8 1 6.8L1 5.2ZM17.5657 6.56569C17.8781 6.25327 17.8781 5.74674 17.5657 5.43432L12.4745 0.343147C12.1621 0.0307274 11.6556 0.0307274 11.3431 0.343147C11.0307 0.655566 11.0307 1.1621 11.3431 1.47452L15.8686 6L11.3431 10.5255C11.0307 10.8379 11.0307 11.3444 11.3431 11.6569C11.6556 11.9693 12.1621 11.9693 12.4745 11.6569L17.5657 6.56569ZM1 6.8L17 6.8L17 5.2L1 5.2L1 6.8Z"
                    fill="white"
                  />
                </svg>
              </StyledButton>
            )
          }
        </StyledFlex>
      </StyledBody>
    </StyledDetail>
  );
};

interface DetailProps {
  networkId?: number;
  chainId?: number;
  name?: string;
  icon?: string;
  logo?: string;
  walletLoading?: boolean;
  balance?: Big.Big;
  bg?: string;
  text?: string;
  path?: string;
  native_currency?: string;
  totalUsd?: Big.Big;
}

const StyledDetail = styled.div`
  font-family: Montserrat;
`;
const StyledDetailHead = styled.div<{ $icon?: string; }>`
  width: 100%;
  height: 216px;
  position: relative;
  background: ${({ $icon }) => `#000 url("${$icon}") no-repeat center 50px / 350px auto`};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  &::before {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    content: '';
    width: 100%;
    height: 216px;
    top: 0;
    left: 0;
    position: absolute;
    z-index: 1;
    background: rgba(0, 0, 0, 0.5);
  }

`;
const StyledDetailBgMask = styled.div`
  width: 100%;
  height: 100%;
  backdrop-filter: blur(10px);
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 59px 61px 24px 49px;
`;
const StyledLogo = styled.div<{ $src?: string; }>`
  position: absolute;
  z-index: 3;
  top: -42px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ $src }) => `url("${$src}") no-repeat center / contain`};
  width: 84px;
  height: 84px;
`;
const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  color: #FFF;
  text-align: center;
  font-size: 26px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%;
  text-transform: capitalize;
`;
const StyledTitleLink = styled.button<{ $bg: string; }>`
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 6px;
  background: ${({ $bg }) => `#2B2F38 url("${$bg}") no-repeat center / contain`};
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFF;

  &:hover {
    opacity: 0.8;
  }
`;
const StyledSummaryTitle = styled.div`
  color: #979ABE;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledSummaryValue = styled.div<{ $blur?: boolean; }>`
  color: #FFF;
  text-align: center;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  filter: ${({ $blur }) => $blur ? 'blur(5px)' : 'unset'};
  opacity: ${({ $blur }) => $blur ? 0.5 : 1};
`;
const StyledBody = styled.div`
  padding: 40px 30px 30px;
`;
const StyledButton = styled.button<{ $bg?: string; $text?: string; $primary?: boolean; }>`
  width: 100%;
  height: 60px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #333648;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #18191E;
  color: #FFF;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  gap: 7px;
  opacity: 0.8;
  transition: all linear 0.2s;

  ${({ $bg, $text, $primary }) => {
    if (!$primary) return {};
    return {
      background: $bg,
      borderColor: $bg,
      color: $text,
    };
  }}
  &:hover {
    opacity: 1;
  }
`;
const StyledComingSoon = styled.div`
  color: #979ABE;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  z-index: 1;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;
