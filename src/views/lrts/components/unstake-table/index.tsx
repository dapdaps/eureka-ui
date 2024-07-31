import Image from 'next/image';
import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import { ethereum } from '@/config/tokens/ethereum';
import useAccount from '@/hooks/useAccount';
import { balanceFormated } from '@/utils/balance';

import useUnstakeRequests from './hooks/useUnstakeRequests';

// const requireContext = require?.context('@/views/lrts/components/modal/stake/hooks', false, /useRenzoRequests\.ts$/);
// requireContext.keys().forEach((key: any) => {
//   const component = requireContext(key);
// });

interface IProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const THead = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  div {
    padding: 16px 10px;
    color: #828282;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;
const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 4px;
  border: 1px solid #3f3f3f;
  color: white;
  background: rgba(50, 50, 50, 0.6);
  backdrop-filter: blur(10px);
  margin-bottom: 8px;
  &:hover {
    background-color: #272727;
  }
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  height: 72px;
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const StyledRecordText = styled.div`
  display: flex;
  width: 118px;
  height: 44px;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: Orbitron;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-radius: 2px;
  border: 1px solid #fff;

  &.click {
    cursor: pointer;

    transition: 0.5s;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.6;
    }
  }
`;

const ClaimButton = ({
  // claiming,
  claim,
  request,
}: any) => {
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(claiming);
  // }, [claiming]);

  return loading ? (
    <Loading />
  ) : (
    <StyledRecordText
      className="click"
      onClick={() => {
        claim(request, setLoading);
      }}
    >
      Claim
    </StyledRecordText>
  );
};

const tokens = Object.values(ethereum);


const UnstakeTable: FC<IProps> = () => {
  const { chainId, account } = useAccount();
  const [updater, setUpdater] = useState(0);
  const allHooks = useUnstakeRequests(() => setUpdater((n) => n + 1));

  const sortedRequests = useMemo(() => {
    const allRequests = allHooks.flatMap(({ requests, claim }) => 
      requests.map(request => ({ ...request, claim }))
    );
    return allRequests.sort((a, b) => (a.status === 'Claimable' ? -1 : 1));
  }, [allHooks]);


  useEffect(() => {
    allHooks.forEach((item: any) => {
      item.queryRequests();
    });
  }, [chainId, account, updater]);

  return (
    <>
      <THead>
        <div>Amount</div>
        <div>Status</div>
      </THead>
      {sortedRequests.map((item, index) => {
        const { token0, token1, status } = item;
        const fromToken = tokens.find((token: any) => token?.symbol === token0?.symbol);
        const toToken = tokens.find((token: any) => token?.symbol === token1?.symbol);

        return (
          <List key={index}>
            <Item>
              {fromToken && <Image src={fromToken.icon || ''} width={30} height={30} alt="" />}
              <span>{balanceFormated(item?.amount, 3)}</span>
              {token0?.symbol}
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M1 1L5 5L1 9" stroke="white" stroke-linecap="round" />
              </svg>
              {toToken && <Image src={toToken.icon || ''} width={30} height={30} alt="" />}
              {token1?.symbol}
            </Item>
            <Item>
              {status === 'In Progress' ? (
                'In Progress'
              ) : (
                <ClaimButton
                  claim={item.claim}
                  request={item}
                />
              )}
            </Item>
          </List>
        );
      })}
    </>
  );
};

export default memo(UnstakeTable);
