import { useSetChain } from '@web3-onboard/react';
import { motion } from 'framer-motion';
import { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { overlay } from '@/components/animation';
import { chains } from '@/config/bridge';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import Loading from '@/components/Icons/Loading';
import useSortChains from '@/hooks/useSortChains';
import IconEmptyNetwork from '@public/images/chains/empty-network.svg';

const StyledContainer = styled.div<{ $mt?: number; $showName?: number }>`
  width: ${({ $showName }) => ($showName ? '204px' : '56px')};
  height: 34px;
  margin: 0 auto;
  //border: 1px solid #373a53;
  border-radius: 8px;
  //background-color: rgba(55, 58, 83, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  box-sizing: border-box;
  padding: 0 5px;
  margin-top: ${({ $mt }) => $mt + 'px'};
  cursor: pointer;
  
  &.empty-chain {
    &:hover {
      background: #18191E;
    }
  }
  
  &.has-chain {
    background: #18191E;
  }

`;
const StyledChain = styled.div`
  display: flex;
  gap: 10px;
  color: #fff;
  cursor: pointer;
  align-items: center;
  line-height: 34px;
`;
const ChainLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 8px;
`;
const ChainName = styled.div`
  font-size: 14px;
  font-weight: 400;
`;
const ArrowIconWrapper = styled.div`
  color: #979abe;
  cursor: pointer;
`;
const ChainList = styled.div<{ display?: number }>`
  width: 204px;
  border-radius: 12px;
  position: absolute;
  top: 34px;
  right: -50px;
  box-sizing: border-box;
  display: ${({ display }) => (display ? 'block' : 'none')};
  z-index: 200;
  padding: 12px 0;
  border: 1px solid #333648;
  background: #1F2229;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.25);
`;
const ChainItem = styled(StyledChain)<{ active?: number }>`
  padding: 2px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    background-color: rgba(24, 26, 39, 0.3);
  }
  ${({ active }) => active && 'background-color: rgba(24, 26, 39, 0.3);pointer-events: none;'}
`;
const EmptyChainLogo = styled.div`
  padding-left: 6px;
  position: relative;
`;
const EmptyChainTips = styled(motion.div)`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 44px;
  left: -178px;
  top: -4px;
  z-index: 30;
  .bg {
    position: absolute;
    left: 0px;
    top: 0px;
  }
  .text {
    position: relative;
    z-index: 10;
    color: #979abe;
    font-size: 12px;
    font-weight: 400;
    line-height: normal;
    width: 147px;
  }
`;
const LogoName = styled(StyledChain)``;

const Chain = ({
  mt,
  showName = true,
  showChains,
  setShowChains,
  bp,
}: {
  mt?: number;
  showName?: boolean;
  showChains?: boolean;
  setShowChains?: (show: boolean) => void;
  bp?: string;
}) => {

  const { sortedChains } = useSortChains();
  const [{ connectedChain, settingChain }, setChain] = useSetChain();
  const currentChain: any = useMemo(
    () => (connectedChain?.id ? chains[Number(connectedChain?.id)] : null),
    [connectedChain?.id],
  );
  const [showList, setShowList] = useState(false);
  const [showEmptyChainTips, setShowEmptyChainTips] = useState(false);

  useEffect(() => {
    const hideList = () => {
      showName ? setShowChains?.(false) : setShowList(false);
    };
    document.addEventListener('click', hideList);
    return () => {
      document.removeEventListener('click', hideList);
    };
  }, []);

  return (
    <StyledContainer
      $mt={mt}
      className={`${!showName && showEmptyChainTips ? 'empty-chain' : ''} ${showName ? Number(showChains || 0) : Number(showList || 0) ? 'has-chain' : ''}`}
      $showName={showName ? 1 : 0}
      onClick={(ev) => {
        ev.stopPropagation();
        showName ? setShowChains?.(!showChains) : setShowList(!showList);
      }}
    >
      <StyledChain>
        {currentChain && !settingChain && <ChainLogo src={currentChain.icon} />}
        {!currentChain && !settingChain && (
          <EmptyChainLogo
            onMouseEnter={() => {
              !showName && setShowEmptyChainTips(true);
            }}
            onMouseLeave={() => {
              !showName && setShowEmptyChainTips(false);
            }}
          >
            <IconEmptyNetwork />
            {showEmptyChainTips && (
              <EmptyChainTips className="tips" {...overlay}>
                <svg
                  className="bg"
                  xmlns="http://www.w3.org/2000/svg"
                  width="170"
                  height="44"
                  viewBox="0 0 170 44"
                  fill="none"
                >
                  <path
                    d="M0.5 8C0.5 3.85786 3.85786 0.5 8 0.5H155C159.142 0.5 162.5 3.85787 162.5 8V14.5858C162.5 14.9836 162.658 15.3651 162.939 15.6464L163.293 15.2929L162.939 15.6464L168.939 21.6464C169.135 21.8417 169.135 22.1583 168.939 22.3536L162.939 28.3536L163.293 28.7071L162.939 28.3536C162.658 28.6349 162.5 29.0164 162.5 29.4142V36C162.5 40.1421 159.142 43.5 155 43.5H8C3.85787 43.5 0.5 40.1421 0.5 36V8Z"
                    fill="#1C1F26"
                    stroke="#272938"
                  />
                </svg>
                <div className="text">Your wallet&apos;s current network is unsupported.</div>
              </EmptyChainTips>
            )}
          </EmptyChainLogo>
        )}
        {settingChain && <Loading />}
        {showName && (
          <ChainName>{settingChain ? 'Request' : currentChain ? currentChain.chainName : 'Select Network'}</ChainName>
        )}
      </StyledChain>
      <ArrowIconWrapper>
        <ArrowIcon size={11} />
      </ArrowIconWrapper>
      <ChainList display={showName ? Number(showChains || 0) : Number(showList || 0)}>
        {sortedChains.map((chain) => (
          <ChainItem
            key={chain.chainId}
            onClick={() => {
              setChain({ chainId: `0x${chain.chainId.toString(16)}` });
            }}
            active={chain.chainId === currentChain?.chainId ? 1 : 0}
            data-bp={bp}
          >
            <LogoName>
              <ChainLogo src={chain.icon} />
              <ChainName>{chain.chainName}</ChainName>
            </LogoName>
            <div>
              {chain.chainId === currentChain?.chainId && (
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 4.11111L5.28571 8L13 1" stroke="#EBF479" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </div>
          </ChainItem>
        ))}
      </ChainList>
    </StyledContainer>
  );
};

export default memo(Chain);
