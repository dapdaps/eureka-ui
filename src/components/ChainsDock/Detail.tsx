import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

import type { NetworkBalance } from '@/components/ChainsDock/index';
import { ArrowLineIcon } from '@/components/Icons/ArrowLineIcon';
import { IdToPath, SupportedChains } from '@/config/all-in-one/chains';
import { StyledFlex } from '@/styled/styles';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';

const OffsetLeft = 17;

const ChainsDockDetail = (props: Props) => {
  const { children, network, onBridgeShow, loading } = props;

  const triggerRef = useRef<any>();

  const [visible, setVisible] = useState(false);
  const [realVisible, setRealVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const { run: closeDetail, cancel: cancelCloseDetail } = useDebounceFn(
    () => {
      setVisible(false);
      setRealVisible(false);
    },
    {
      wait: 150
    }
  );

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
      {visible &&
        createPortal(
          <Detail
            x={x}
            y={y}
            network={network}
            loading={loading}
            setVisible={setVisible}
            onBridgeShow={onBridgeShow}
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
          />,
          document.body
        )}
    </>
  );
};

const Detail = (props: DetailProps) => {
  const { onLoaded, x, y, visible, network, setVisible, cancelCloseDetail, closeDetail, loading } = props;

  const { id, logo, name, chain_id } = network;
  const router = useRouter();

  const isSupported = SupportedChains.some((support) => support.chainId === chain_id);

  const balanceRef = useRef<any>(null);

  const handleNetworkDetailPre = () => {
    if (!id) return;
    router.prefetch(`/networks/${IdToPath[id]}`);
  };
  const handleNetworkDetail = () => {
    if (!id) return;
    router.push(`/networks/${IdToPath[id]}`);
  };

  const handleSuperBridge = (direction: 'in' | 'out') => {
    const { onBridgeShow } = props;
    console.log(4444, onBridgeShow);
    // console.log(direction);
    if (onBridgeShow) {
      // const fromChainId = direction === 'in' ? 1 : chain_id
      // const toChainId = direction === 'in' ? chain_id : 1
      onBridgeShow(chain_id, 1, direction);
    }
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
          visibility: visible ? 'visible' : 'hidden'
        }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { type: 'spring', stiffness: 200, damping: 15, duration: 1 }
        }}
        exit={{
          opacity: 0,
          x: OffsetLeft
        }}
        initial={{
          opacity: 0,
          x: OffsetLeft
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
        <StyledFlex
          justifyContent="space-between"
          gap="10px"
          style={{ marginBottom: '20px', position: 'relative', padding: '0 20px' }}
        >
          <StyledFlex flexDirection="column" alignItems="center">
            <StyledSummaryTitle
              className={!loading ? 'show-dot' : ''}
              $isUsd={!loading && network?.balance && Big(network.balance).toNumber() > 0}
            >
              In Wallet
            </StyledSummaryTitle>
            {loading ? (
              <Skeleton height={30} width={100} />
            ) : (
              <StyledSummaryValue>
                {formateValueWithThousandSeparatorAndFont(network?.balance, 2, true, {
                  prefix: '$',
                  isZeroPrecision: true
                })}
              </StyledSummaryValue>
            )}
          </StyledFlex>
          <StyledFlex flexDirection="column">
            <StyledSummaryTitle>DeFi</StyledSummaryTitle>
            {isSupported ? (
              loading ? (
                <Skeleton height={30} width={100} />
              ) : (
                formateValueWithThousandSeparatorAndFont(network?.totalUsd ?? 0, 2, true, {
                  prefix: '$',
                  isZeroPrecision: true
                })
              )
            ) : (
              <StyledComingSoon>Coming soon...</StyledComingSoon>
            )}
          </StyledFlex>
        </StyledFlex>
        <StyledFoot>
          <StyledButton onClick={() => handleSuperBridge('in')}>Bridge in</StyledButton>
          <StyledButton onClick={() => handleSuperBridge('out')}>Bridge out</StyledButton>
          {isSupported && <StyledLink href="/portfolio">Manage Assets</StyledLink>}
        </StyledFoot>
      </StyledDetail>
    </AnimatePresence>
  );
};

export default ChainsDockDetail;

interface Props {
  children: any;
  network: NetworkBalance;
  onBridgeShow?(fromChainId: number, toChainId: number, direction: string): void;
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
  onBridgeShow?(fromChainId: number, toChainId: number, direction: string): void;
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
  background: #1f2229;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
  padding: 3px 3px 20px 3px;
  color: #fff;
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
  border: 1px solid #1f2229;
  cursor: pointer;

  &:hover {
    border-color: #333648;
    background: #18191e;
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
  background: #2b2f38;
  display: block;
  color: #fff;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: #333648;
    background: #18191e;
  }
`;
const StyledLink = styled(Link)`
  color: #25d8ff;
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
const StyledSummaryTitle = styled.div<{ $isUsd?: boolean }>`
  color: #979abe;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  column-gap: 6px;

  &.show-dot::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    flex-shrink: 0;
    background-color: ${({ $isUsd }) => ($isUsd ? '#68CF56' : '#4C506B')};
    border-radius: 50%;
  }
`;
const StyledSummaryValue = styled.div<{ $blur?: boolean }>`
  text-align: center;
  font-size: 20px;
  font-weight: 600;

  filter: ${({ $blur }) => ($blur ? 'blur(5px)' : 'unset')};
  opacity: ${({ $blur }) => ($blur ? 0.5 : 1)};
`;
const StyledComingSoon = styled.div`
  color: #979abe;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
`;
