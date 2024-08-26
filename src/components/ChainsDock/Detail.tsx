import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import { useDebounceFn } from 'ahooks';
import { NetworkBalance } from '@/components/ChainsDock/index';
import { useRouter } from 'next/router';
import { IdToPath, SupportedChains } from '@/config/all-in-one/chains';
import LazyImage from '@/components/LazyImage';
import { ArrowLineIcon } from '@/components/Icons/ArrowLineIcon';
import Link from 'next/link';
import { StyledFlex } from '@/styled/styles';
import Skeleton from 'react-loading-skeleton';

const OffsetLeft = 17;

const ChainsDockDetail = (props: Props) => {
  const { children, network, loading } = props;

  const triggerRef = useRef<any>();

  const [visible, setVisible] = useState(false);
  const [realVisible, setRealVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const { run: closeDetail, cancel: cancelCloseDetail } = useDebounceFn(() => {
    setVisible(false);
    setRealVisible(false);
  }, {
    wait: 150,
  });

  return (
    <>
      <StyledTrigger
        ref={triggerRef}
        onHoverStart={() => {
          setVisible(true);
          cancelCloseDetail();
        }}
        onHoverEnd={() => {
          closeDetail();
        }}
      >
        {children}
      </StyledTrigger>
      {
        visible && createPortal((
          <Detail
            x={x}
            y={y}
            network={network}
            loading={loading}
            setVisible={setVisible}
            cancelCloseDetail={cancelCloseDetail}
            closeDetail={closeDetail}
            onLoaded={(elTooltip) => {
              const trigger = triggerRef.current;
              const { width: triggerW, height: triggerH, x: triggerX, y: triggerY } = trigger.getBoundingClientRect();

              const { width: w, height: h } = elTooltip.getBoundingClientRect();
              let targetY = triggerY - 56;
              if (targetY < 0) {
                targetY = 10;
              }
              if (targetY + h > window.innerHeight - 70) {
                targetY = window.innerHeight - h - 70;
              }
              setY(targetY);
              setX(triggerX - w - OffsetLeft);
              setRealVisible(true);
            }}
            visible={realVisible}
          />
        ), document.body)
      }
    </>
  );
};

const Detail = (props: DetailProps) => {
  const { onLoaded, x, y, visible, network, setVisible, cancelCloseDetail, closeDetail, loading } = props;

  const { id, logo, name, chain_id } = network;
  const router = useRouter();

  const isSupported = SupportedChains.some((support) => support.chainId === chain_id);

  const balanceRef = useRef<any>(null);

  const nativeCurrency = useMemo(() => {
    try {
      return JSON.parse(network.native_currency);
    } catch (err) {
      return {};
    }
  }, [network]);

  const handleNetworkDetailPre = () => {
    if (!id) return;
    router.prefetch(`/networks/${IdToPath[id]}`);
  };
  const handleNetworkDetail = () => {
    if (!id) return;
    router.push(`/networks/${IdToPath[id]}`);
  };

  const handleSuperBridge = (direction: 'in' | 'out') => {
    console.log(direction);
  };

  useEffect(() => {
    handleNetworkDetailPre();
    if (!balanceRef.current) return;
    onLoaded(balanceRef.current);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <StyledDetail
        ref={balanceRef}
        style={{
          left: x,
          top: y,
          visibility: visible ? 'visible' : 'hidden',
        }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { type: 'spring', stiffness: 200, damping: 15, duration: 1 },
        }}
        exit={{
          opacity: 0,
          x: OffsetLeft,
        }}
        initial={{
          opacity: 0,
          x: OffsetLeft,
        }}
        onHoverStart={() => {
          setVisible(true);
          cancelCloseDetail();
        }}
        onHoverEnd={() => {
          closeDetail();
        }}
      >
        <StyledHead onClick={handleNetworkDetail}>
          <img src={logo} alt="" className="chain-logo" width={50} height={50} />
          <StyledChainInfo>
            <StyledSub>Assets on</StyledSub>
            <StyledChainName title={name}>{name}</StyledChainName>
          </StyledChainInfo>
          <StyledArrow>
            <ArrowLineIcon classname="arrow-icon" />
          </StyledArrow>
        </StyledHead>
        <StyledFlex justifyContent="space-between" gap="10px" style={{ marginBottom: '20px', position: 'relative', padding: '0 20px' }}>
          <StyledFlex flexDirection="column" alignItems="center">
            <StyledSummaryTitle>
              In Wallet
            </StyledSummaryTitle>
            {
              loading && isSupported ? (
                <Skeleton height={30} width={100} />
              ) : (
                <StyledSummaryValue $blur={!isSupported}>
                  {formateValueWithThousandSeparatorAndFont(network?.balance, 2, true, {
                    prefix: '$',
                    isZeroPrecision: true,
                  })}
                </StyledSummaryValue>
              )
            }
          </StyledFlex>
          <StyledFlex flexDirection="column">
            <StyledSummaryTitle>
              DeFi
            </StyledSummaryTitle>
            {
              loading && isSupported ? (
                <Skeleton height={30} width={100} />
              ) : (
                <StyledSummaryValue $blur={!isSupported}>
                  {formateValueWithThousandSeparatorAndFont(isSupported ? network?.totalUsd : 0, 2, true, {
                    prefix: '$',
                    isZeroPrecision: true,
                  })}
                </StyledSummaryValue>
              )
            }
          </StyledFlex>
          {
            !isSupported && (
              <StyledComingSoon>
                Coming soon...
              </StyledComingSoon>
            )
          }
        </StyledFlex>
        <StyledFoot>
          <StyledButton onClick={() => handleSuperBridge('in')}>Bridge in</StyledButton>
          <StyledButton onClick={() => handleSuperBridge('out')}>Bridge out</StyledButton>
          {
            isSupported && (
              <StyledLink href="/portfolio">Manage Assets</StyledLink>
            )
          }
        </StyledFoot>
      </StyledDetail>
    </AnimatePresence>
  );
};

export default ChainsDockDetail;

interface Props {
  children: any;
  network: NetworkBalance;
  loading: boolean;
}

interface DetailProps {
  x: number;
  y: number;
  visible: boolean;
  loading: boolean;
  network: NetworkBalance;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;

  onLoaded(balanceRef: any): void;

  cancelCloseDetail(): void;

  closeDetail(): void;
}

const StyledDetail = styled(motion.div)`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 282px;
  //height: 305px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px #333648;
  background: #1F2229;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  padding: 3px 3px 20px 3px;
  color: #FFF;
`;
const StyledTrigger = styled(motion.div)`
  cursor: pointer;
`;

const StyledHead = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
  margin-bottom: 14px;
  overflow: hidden;
  border-radius: 10px;
  padding: 12px 13px 12px 18px;
  transition: all 0.2s ease-in-out;
  border: 1px solid #1F2229;
  cursor: pointer;
  
  &:hover {
    border-color: #333648;
    background: #18191E;
  }

  .chain-logo {
    object-fit: contain;
    border-radius: 8px;
    flex-shrink: 0;
  }
`;
const StyledFoot = styled.div`
  padding: 0 17px 0 17px;
`;
const StyledChainInfo = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
`;
const StyledSub = styled.div`
  font-size: 14px;
  font-weight: 400;
`;
const StyledChainName = styled.div`
  font-size: 20px;
  font-weight: 600;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledButton = styled.button`
  margin-bottom: 16px;
  font-size: 16px;
  text-align: center;
  padding: 6px;
  border-radius: 10px;
  border: 1px solid #333648;
  background: #2B2F38;
  display: block;
  color: #fff;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #333648;
    background: #18191E;
  }

`;
const StyledLink = styled(Link)`
  color: #25D8FF;
  text-align: center;
  font-size: 14px;
  display: block;
  transition: opacity 0.2s ease;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }

  &:hover {
    opacity: 0.8;
  }
`;
const StyledArrow = styled.div`
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;
const StyledSummaryTitle = styled.div`
  color: #979ABE;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
`;
const StyledSummaryValue = styled.div<{ $blur?: boolean; }>`
  text-align: center;
  font-size: 20px;
  font-weight: 600;

  filter: ${({ $blur }) => $blur ? 'blur(5px)' : 'unset'};
  opacity: ${({ $blur }) => $blur ? 0.5 : 1};
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
