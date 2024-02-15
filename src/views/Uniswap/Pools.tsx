import { useRouter } from 'next/router';
import { memo, useState, useMemo } from 'react';
import styled from 'styled-components';
import Loading from '@/components/Icons/Loading';
import Big from 'big.js';
import Panel from './components/Panel';
import PositionItem from './components/PositionItem';
import PoolConnectButton from './components/PoolConnectButton';

import usePositions from './hooks/usePositions';
import useAccount from '@/hooks/useAccount';

import config from '@/config/uniswap';

const StyledContainer = styled.div`
  width: 854px;
  position: relative;
  height: calc(100vh - 96px);

  @media (max-width: 768px) {
    width: calc(100vw - 16px);
  }
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
`;
const Label = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #101010;
`;
const Positions = styled.div`
  max-height: calc(100vh - 232px);
  overflow-y: auto;
  padding-bottom: 10px;
`;
const PositionButton = styled.button`
  width: 130px;
  height: 35px;
  border-radius: 12px;
  border: none;
  background-color: #101010;
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
`;
const StyledPanel = styled(Panel)`
  min-height: 380px;
  margin-top: 10px;
`;
const PanelHeader = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(199, 191, 182, 0.5);
  align-items: center;
  @media (max-width: 768px) {
    padding: 18px 15px 15px;
  }
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #101010;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
const CloseBtn = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #ff684b;
  cursor: pointer;
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;
const Empty = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 400;
  color: #101010;
  align-items: center;
  justify-content: center;
  padding-top: 85px;
  .desc {
    margin-top: 23px;
  }
`;
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 232px;
  color: #101010;
`;
const PowerBy = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: 0em;
  text-align: center;
  padding-top: 10px;
  color: #8e8e8e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  .view-code {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
  .view-code-icon {
    width: 15px;
    height: 15px;
  }
  .view-code-text {
    text-decoration: underline;
  }
`;
const Pools = () => {
  const router = useRouter();
  const { chainId, account } = useAccount();
  const [userHideClosedPositions, setUserHideClosedPositions] = useState<boolean>(false);
  const { positions, loading } = usePositions();
  const [openPositions, closedPositions] = positions?.reduce(
    (acc: any[], p: any) => {
      acc[new Big(p.liquidity || 0).eq(0) ? 1 : 0].push(p);
      return acc;
    },
    [[], []],
  ) ?? [[], []];
  const userSelectedPositionSet = useMemo(
    () => [...openPositions, ...(userHideClosedPositions ? [] : closedPositions)],
    [closedPositions, openPositions, userHideClosedPositions],
  );
  return (
    <StyledContainer>
      <StyledHeader>
        <Label>Pools</Label>
        <PositionButton
          onClick={() => {
            router.push('/uniswap/pools-add-liquidity');
          }}
        >
          + New position
        </PositionButton>
      </StyledHeader>
      <StyledPanel style={{ maxHeight: 'calc(100% - 92px)', overflow: 'hidden' }}>
        {chainId === config.chainId && account && (
          <PanelHeader>
            <Title>Your positions ({userSelectedPositionSet.length})</Title>
            {positions.length > 0 && (
              <CloseBtn
                onClick={() => {
                  setUserHideClosedPositions(!userHideClosedPositions);
                }}
              >
                {!userHideClosedPositions ? 'Hide' : 'Show'} closed positions
              </CloseBtn>
            )}
          </PanelHeader>
        )}
        {loading ? (
          <LoadingWrapper>
            <Loading size={30} />
          </LoadingWrapper>
        ) : userSelectedPositionSet.length > 0 ? (
          <Positions>
            {userSelectedPositionSet.map((position) => (
              <PositionItem
                key={position.tokenId}
                {...position}
                onClick={() => {
                  router.push('/uniswap/pools-detail-liquidity?id=' + position.tokenId);
                }}
              />
            ))}
          </Positions>
        ) : (
          <Empty>
            {(!account || (!positions.length && chainId === config.chainId)) && (
              <svg xmlns="http://www.w3.org/2000/svg" width="42" height="34" viewBox="0 0 42 34" fill="none">
                <path
                  d="M1 17L8.08994 3.65422C8.95763 2.02092 10.656 1 12.5055 1H29.4945C31.344 1 33.0424 2.02093 33.9101 3.65422L41 17M1 17V29C1 31.2091 2.79086 33 5 33H37C39.2091 33 41 31.2091 41 29V17M1 17H13L17 23H25L28.5 17H41"
                  stroke="#101010"
                  stroke-width="2"
                  stroke-linejoin="round"
                />
              </svg>
            )}
            {chainId !== config.chainId && account && (
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path
                  d="M19.6038 7.5C21.5283 4.16667 26.3396 4.16667 28.2641 7.5L39.9988 27.8252C41.9233 31.1586 39.5177 35.3252 35.6687 35.3252H12.1992C8.35017 35.3252 5.94454 31.1586 7.86904 27.8252L19.6038 7.5Z"
                  stroke="#101010"
                  stroke-width="2"
                />
                <rect x="22.1224" y="14.4924" width="3.6231" height="10.8693" rx="1.81155" fill="#101010" />
                <rect x="22.1224" y="27.1731" width="3.6231" height="3.6231" rx="1.81155" fill="#101010" />
              </svg>
            )}
            <div className="desc">
              {chainId === config.chainId || !chainId
                ? 'Your active V3 liquidity positions will appear here.'
                : 'Your connected network is unsupported.'}
            </div>
            <PoolConnectButton />
          </Empty>
        )}
      </StyledPanel>
      <PowerBy>
        <div
          className="view-code"
          onClick={() => {
            window.open(
              'https://near.org/near/widget/ComponentDetailsPage?src=dapdapbos.near/widget/Linea.Uniswap.Swap.Dex&tab=source',
              '_blank',
            );
          }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2_166)">
              <path
                d="M5.33524 7.50357C5.33522 7.66313 5.39812 7.81627 5.51028 7.92977C5.62244 8.04326 5.77482 8.10797 5.93438 8.10984H9.27247C9.43232 8.10984 9.58562 8.04634 9.69865 7.93331C9.81168 7.82028 9.87518 7.66698 9.87518 7.50713C9.87518 7.34728 9.81168 7.19398 9.69865 7.08095C9.58562 6.96792 9.43232 6.90442 9.27247 6.90442H5.93438C5.77605 6.90627 5.62473 6.96999 5.51277 7.08195C5.40081 7.19392 5.33709 7.34524 5.33524 7.50357ZM2.33951 7.93866C2.39518 7.99451 2.46132 8.03883 2.53415 8.06907C2.60697 8.09931 2.68505 8.11488 2.76391 8.11488C2.84276 8.11488 2.92084 8.09931 2.99367 8.06907C3.0665 8.03883 3.13264 7.99451 3.1883 7.93866L5.53495 5.58488C5.59081 5.52922 5.63512 5.46307 5.66536 5.39025C5.6956 5.31742 5.71117 5.23934 5.71117 5.16048C5.71117 5.08163 5.6956 5.00355 5.66536 4.93072C5.63512 4.85789 5.59081 4.79175 5.53495 4.73609L3.1883 2.35378C3.13257 2.29758 3.06631 2.25291 2.99332 2.22231C2.92032 2.19172 2.84201 2.1758 2.76286 2.17547C2.68372 2.17514 2.60528 2.1904 2.53203 2.22038C2.45878 2.25036 2.39215 2.29448 2.33595 2.35021C2.27975 2.40595 2.23508 2.4722 2.20448 2.5452C2.17389 2.6182 2.15797 2.6965 2.15764 2.77565C2.15697 2.9355 2.21983 3.08907 2.33238 3.20257L4.2796 5.14979L2.33238 7.08274C2.27545 7.13852 2.23021 7.20511 2.19934 7.27859C2.16846 7.35208 2.15255 7.43099 2.15255 7.5107C2.15255 7.59041 2.16846 7.66932 2.19934 7.7428C2.23021 7.81629 2.27545 7.88287 2.33238 7.93866H2.33951ZM13.7946 13.7946H1.20542V1.20542H13.7946V13.7946ZM13.7946 0H1.20542C0.885723 0 0.57912 0.126999 0.35306 0.35306C0.126999 0.57912 0 0.885723 0 1.20542L0 13.7946C0.00560989 14.1106 0.135082 14.4117 0.360537 14.6331C0.585992 14.8546 0.889396 14.9787 1.20542 14.9786H13.7946C14.1069 14.9731 14.4049 14.8466 14.6257 14.6257C14.8466 14.4049 14.9731 14.1069 14.9786 13.7946V1.20542C14.9787 0.889396 14.8546 0.585992 14.6331 0.360537C14.4117 0.135082 14.1106 0.00560989 13.7946 0Z"
                fill="#8E8E8E"
              />
            </g>
            <defs>
              <clipPath id="clip0_2_166">
                <rect width="15" height="15" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div className="view-code-text">View Code</div>
        </div>
        <div>Powered by DapDap & NEAR</div>
      </PowerBy>
    </StyledContainer>
  );
};

export default memo(Pools);
