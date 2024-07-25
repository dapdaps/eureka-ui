import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
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
  }, [chainId]);
  const dataSource = useMemo(() => [
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
  ], [
    renzoRequests.requests,
    eigenpieRequests.requests,
    etherFiRequests.requests,
    fraxRequests.requests,
    inceptionRequests.requests,
    karakRequests.requests,
    lidoRequests.requests,
    mantleRequests.requests,
    kelpDaoRequests.requests,
    restakeFinanceRequests.requests,
  ]);
  console.log('unstake-list--', dataSource);

  return (
    <>
      <THead>
        <div>Amount</div>
        {/* <div>Date</div> */}
        <div>Status</div>
      </THead>
      {dataSource?.map((item: any, index: number) => (
        <List key={index}>
          <Item>
            {balanceFormated(item?.amount, 3)} {item?.token1?.symbol}
          </Item>
          {/* <div></div> */}
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
      ))}
    </>
  );
};

export default memo(UnstakeTable);
