import { useState } from 'react';
import Image from 'next/image';

import AddMetaMaskModal from './AddMetaMaskModal';
import InteractDAppsModal from './InteractDAppsModal';
import ArrowIcon from '@/components/Icons/ArrowIcon';

import { actionList, airdropList } from '../config';

import {
  StyledOverviewTitle,
  StyledOverviewDesc,
  StyledOverview,
  StyledTokenContainer,
  StyledTokenItem,
  StyledTokenLabel,
  StyledTokenValue,
  StyledAirdrop,
  StyledAirdropHead,
  StyledAirdropLabel,
  StyledAirdropValue,
  StyledAirdropBody,
  StyledAirdropBodyItem,
  StyledAirdropShadow,
  StyledAirdropIcon,
  StyledAirdropTitle,
  StyledAirdropArrow,
  StyledOverviewContainer,
  StyledAirdropMainTitle,
  StyledAirdropActions,
  StyledAirdropActionsText,
  StyledAirdropActionsTextPrimary,
  StyledTokenPrice,
  StyledSummaryAdd,
  StyledSummaryAddIcon,
  StyledAddText,
  StyledTokenInfo,
  StyledTokenAddress,
  StyledTokenLogo,
  StyledOverviewShadow
} from './styles';
import NativeCurrency from '@/views/networks/detail/components/NativeCurrency';
import { useSetChain } from '@web3-onboard/react';
import useAuthCheck from '@/hooks/useAuthCheck';
import hexToRgba from '@/utils/hexToRgba';

const renderIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
      <path
        d="M4.56699 0.75C4.75944 0.416667 5.24056 0.416667 5.43301 0.75L8.89711 6.75C9.08956 7.08333 8.849 7.5 8.4641 7.5H1.5359C1.151 7.5 0.910436 7.08333 1.10289 6.75L4.56699 0.75Z"
        fill="currentColor" stroke="url(#paint0_linear_16163_4093)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_16163_4093"
          x1="10.9668"
          y1="1.71698"
          x2="-1"
          y2="1.71698"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const Overview = (props: any) => {

  const { description, title, tbd_token, native_currency, logo, historyType, overviewShadow } = props;

  const isTbd = tbd_token === 'Y';

  const [{}, setChain] = useSetChain();
  const { check } = useAuthCheck({ isNeedAk: false });

  const [addMetaMaskShow, setAddMetaMaskShow] = useState<boolean>(false);
  const [interactShow, setInteractShow] = useState<boolean>(false);

  const onAction = (action: any) => {
    if (action.finished) {
      return;
    }
    setInteractShow(true);
  }

  const onAddMetaMask = () => {
    check(() => {
      setChain({ chainId: `0x${props.chain_id.toString(16)}` });
    });
  }

  const onCopy = () => {

  }

    return (
    <div>
      <StyledOverviewContainer>
        { overviewShadow?.icon && <StyledOverviewShadow src={overviewShadow.icon ?? ''} style={overviewShadow?.color ? {filter: `drop-shadow(${hexToRgba(overviewShadow?.color, 0.03)} 10000px 0)`} : {}}/> }
        <StyledOverview>
          <StyledOverviewTitle>{title}</StyledOverviewTitle>
          <StyledOverviewDesc>{description ?? ''}</StyledOverviewDesc>
          <StyledTokenContainer>
            <StyledTokenItem>
              <StyledTokenLabel>Project Token</StyledTokenLabel>
              <StyledTokenValue>
                <NativeCurrency tbdToken={tbd_token} nativeCurrency={native_currency}/>
              </StyledTokenValue>
            </StyledTokenItem>
            {
              historyType === 'chain' && (<>
                <StyledTokenItem>
                  <StyledTokenLabel>Token Price</StyledTokenLabel>
                  <StyledTokenPrice>
                    $0.02735
                    <StyledSummaryAdd>
                      <StyledSummaryAddIcon>
                        {renderIcon()}
                      </StyledSummaryAddIcon>
                      <StyledAddText>1.7%</StyledAddText>
                    </StyledSummaryAdd>
                  </StyledTokenPrice>
                </StyledTokenItem>
              </>)
            }
          </StyledTokenContainer>
          {
            historyType === 'chain' && (
              <StyledTokenContainer>
                <StyledTokenItem>
                  <StyledTokenLabel>Token Address</StyledTokenLabel>
                  <StyledTokenInfo>
                    <StyledTokenLogo url={logo}/>
                    <StyledTokenAddress>0xdfc...e3167a</StyledTokenAddress>
                    <Image src='/images/alldapps/icon-copy.svg' width={14} height={14} alt='copy' onClick={onCopy} />
                    <Image src='/images/alldapps/icon-share.svg' width={12} height={12} alt='share'/>
                    <Image src='/images/alldapps/icon-metamask.svg' width={17} height={17} alt='metamask' onClick={onAddMetaMask}/>
                  </StyledTokenInfo>
                </StyledTokenItem>
              </StyledTokenContainer>
            )
          }
        </StyledOverview>
        {
          isTbd && ( <StyledAirdrop>
            <StyledAirdropMainTitle>Airdrop 🪂</StyledAirdropMainTitle>
            <StyledAirdropHead>
              {
                airdropList.map(airdrop => (
                  <div key={airdrop.key} className="airdrop-item">
                    <StyledAirdropLabel>{airdrop.label}</StyledAirdropLabel>
                    <StyledAirdropValue>{airdrop.value}</StyledAirdropValue>
                  </div>
                ))
              }
            </StyledAirdropHead>
            <StyledAirdropBody>
              <StyledAirdropActions>
                Actions
                <StyledAirdropActionsText>
                  <StyledAirdropActionsTextPrimary>1</StyledAirdropActionsTextPrimary>
                  <span>/</span>
                  <span>{actionList.length}</span>
                </StyledAirdropActionsText>
              </StyledAirdropActions>
              {
                actionList.map((item) => (
                  <StyledAirdropBodyItem $finished={item.finished} onClick={() => onAction(item)}>
                    <div>
                      <StyledAirdropShadow className={item.finished ? 'finished' : ''}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M0 12C0 5.37258 5.37258 0 12 0H30L0 30V12Z"
                            fill={item.finished ? '#EBF479' : '#979ABE'}
                            opacity={item.finished ? 1 : 0.2}
                          />
                        </svg>
                        {
                          item.finished && (
                            <StyledAirdropIcon url="/images/alldapps/icon-checked.svg" />
                          )
                        }
                      </StyledAirdropShadow>
                      <StyledAirdropTitle>{item.label}</StyledAirdropTitle>
                    </div>
                    <StyledAirdropArrow>
                      <ArrowIcon size={11} />
                    </StyledAirdropArrow>
                  </StyledAirdropBodyItem>
                ))
              }
            </StyledAirdropBody>
          </StyledAirdrop>)
        }

      </StyledOverviewContainer>
      <AddMetaMaskModal
        display={addMetaMaskShow}
        onClose={() => setAddMetaMaskShow(false)}
        rpc={'http://zkevm-rpc.com'}
        chainId={1101}
        chainName={'Polygon zkEVM'}
        symbol={'ETH'}
        explorerUrl={'http://zkevm.polygonscan.com/'}
      />
      <InteractDAppsModal
        display={interactShow}
        onClose={() => setInteractShow(false)}
        chainName={'Polygon zkEVM'}
      />
    </div>
  );
};


export default Overview;