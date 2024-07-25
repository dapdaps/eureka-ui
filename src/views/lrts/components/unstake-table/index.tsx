import Image from 'next/image';
import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import { ethereum } from '@/config/tokens/ethereum';
import useAccount from '@/hooks/useAccount';
import { balanceFormated } from '@/utils/balance';
import { CustomTable, PolygonBtn } from '@/views/lrts/components';
// unstake list hooks
import useEigenpieRequests from '@/views/lrts/components/modal/stake/hooks/useEigenpieRequests';
import useEtherFiRequests from '@/views/lrts/components/modal/stake/hooks/useEtherFiRequests';
import useFraxRequests from '@/views/lrts/components/modal/stake/hooks/useFraxRequests';
import useInceptionRequests from '@/views/lrts/components/modal/stake/hooks/useInceptionRequests';
import useKarakRequests from '@/views/lrts/components/modal/stake/hooks/useKarakRequests';
import useKelpDaoRequests from '@/views/lrts/components/modal/stake/hooks/useKelpDaoRequests';
import useLidoRequests from '@/views/lrts/components/modal/stake/hooks/useLidoRequests';
import useMantleRequests from '@/views/lrts/components/modal/stake/hooks/useMantleRequests';
import useRenzoRequests from '@/views/lrts/components/modal/stake/hooks/useRenzoRequests';
import useRestakeFinanceRequests from '@/views/lrts/components/modal/stake/hooks/useRestakeFinanceRequests';

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

const UnstakeTable: FC<IProps> = (props) => {
  const { chainId, account } = useAccount();

  // const { requests, loading: requestsLoading, queryRequests, claim } = useRenzoRequests();

  const renzoRequests = useRenzoRequests();
  const eigenpieRequests = useEigenpieRequests();
  const kelpDaoRequests = useKelpDaoRequests();
  const etherFiRequests = useEtherFiRequests();
  const fraxRequests = useFraxRequests();
  const inceptionRequests = useInceptionRequests();
  const karakRequests = useKarakRequests();
  const lidoRequests = useLidoRequests();
  const mantleRequests = useMantleRequests();
  const restakeFinanceRequests = useRestakeFinanceRequests();

  useEffect(() => {
    renzoRequests.queryRequests();
    eigenpieRequests.queryRequests();
    etherFiRequests.queryRequests();
    fraxRequests.queryRequests();
    inceptionRequests.queryRequests();
    karakRequests.queryRequests();
    lidoRequests.queryRequests();
    mantleRequests.queryRequests();
    kelpDaoRequests.queryRequests();
    restakeFinanceRequests.queryRequests();
  }, []);
  const dataSource = [
    ...renzoRequests.requests,
    ...eigenpieRequests.requests,
    ...etherFiRequests.requests,
    ...fraxRequests.requests,
    ...inceptionRequests.requests,
    ...karakRequests.requests,
    ...lidoRequests.requests,
    ...mantleRequests.requests,
    ...kelpDaoRequests.requests,
    ...restakeFinanceRequests.requests,
  ];
  console.log('unstake-list--', dataSource);
  const tokens = Object.values(ethereum);
  return (
    <>
      <THead>
        <div>Amount</div>
        {/* <div>Date</div> */}
        <div>Status</div>
      </THead>
      {dataSource?.map((item: any, index: number) => {
        const { token0, token1 } = item;
        const fromTokenSymbol = token0?.symbol;
        const toTokenSymbol = token1?.symbol;

        const fromToken = tokens.find((token: any) => token?.symbol === fromTokenSymbol);
        const toToken = tokens.find((token: any) => token?.symbol === toTokenSymbol);
        return (
          <List key={index}>
            <Item>
              {fromToken ? <Image src={fromToken.icon || ''} width={30} height={30} alt="" /> : null}
              <span>{balanceFormated(item?.amount, 3)}</span>
              {fromTokenSymbol}
              <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                <path d="M1 1L5 5L1 9" stroke="white" stroke-linecap="round" />
              </svg>
              {toToken ? <Image src={toToken.icon || ''} width={30} height={30} alt="" /> : null}
              {toTokenSymbol}
            </Item>

            <Item>
              {item.status === 'In Progress' ? (
                'In Progress'
              ) : (
                <ClaimButton
                  // claiming={claiming}
                  claim={lidoRequests.claim}
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
