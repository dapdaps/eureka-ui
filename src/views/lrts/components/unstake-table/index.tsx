import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import useAccount from '@/hooks/useAccount';
import { balanceFormated } from '@/utils/balance';
import { CustomTable, PolygonBtn } from '@/views/lrts/components';
// unstake list hooks
import useEigenpieRequests from '@/views/lrts/components/modal/stake/hooks/useEigenpieRequests';
import useFraxRequests from '@/views/lrts/components/modal/stake/hooks/useFraxRequests';
import useInceptionRequests from '@/views/lrts/components/modal/stake/hooks/useInceptionRequests';
import useKarakRequests from '@/views/lrts/components/modal/stake/hooks/useKarakRequests';
import useLidoRequest from '@/views/lrts/components/modal/stake/hooks/useLidoRequest';
import useMantleRequest from '@/views/lrts/components/modal/stake/hooks/useMantleRequest';
import useRenzoRequests from '@/views/lrts/components/modal/stake/hooks/useRenzoRequests';
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

const StyledRecordText = styled.div`
  color: #fff;
  font-family: Orbitron;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &.click {
    cursor: pointer;
    text-decoration: underline;
    transition: 0.5s;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.6;
    }
  }
`;

const ClaimButton = ({ claiming, claim, request }: any) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(claiming);
  }, [claiming]);

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
  const [dataSource, setDataSource] = useState<any>([]);
  const { chainId, account } = useAccount();

  // const { requests, loading: requestsLoading, queryRequests, claim } = useRenzoRequests();

  const renzoRequests = useRenzoRequests();
  const eigenpieRequests = useEigenpieRequests();
  const fraxRequests = useFraxRequests();
  const inceptionRequests = useInceptionRequests();
  const karakRequests = useKarakRequests();
  const lidoRequest = useLidoRequest();
  const mantleRequest = useMantleRequest();

  useEffect(() => {
    renzoRequests.queryRequests();
    eigenpieRequests.queryRequests();
    fraxRequests.queryRequests();
    inceptionRequests.queryRequests();
    karakRequests.queryRequests();
    lidoRequest.queryRequests();
    mantleRequest.queryRequests();
  }, []);

  return (
    <>
      <CustomTable
        dataSource={renzoRequests.requests}
        emptyTips="No Unstake records found..."
        columns={[
          {
            title: 'Amount',
            dataIndex: 'amount',
            key: 1,
            render: ({ amount, symbol }: any) => {
              return `${balanceFormated(amount, 3)} ${symbol}`;
            },
          },
          { title: 'Date', dataIndex: 'startTime', key: 2 },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 3,
            render: (request: any) => {
              return request.status === 'In Progress' ? (
                'In Progress'
              ) : (
                <ClaimButton
                  // claiming={claiming}
                  claim={renzoRequests.claim}
                  request={request}
                />
              );
            },
          },
        ]}
      />
      <CustomTable
        hideHeader
        dataSource={eigenpieRequests.requests}
        emptyTips="No Unstake records found..."
        columns={[
          {
            title: 'Amount',
            dataIndex: 'amount',
            key: 1,
            render: ({ amount, symbol }: any) => {
              return `${balanceFormated(amount, 3)} ${symbol}`;
            },
          },
          { title: 'Date', dataIndex: 'startTime', key: 2 },
          {
            title: 'Status',
            dataIndex: 'status',
            key: 3,
            render: (request: any) => {
              return request.status === 'In Progress' ? (
                'In Progress'
              ) : (
                <ClaimButton
                  // claiming={claiming}
                  claim={eigenpieRequests.claim}
                  request={request}
                />
              );
            },
          },
        ]}
      />
    </>
  );
};

export default memo(UnstakeTable);
