import { useEffect, useState } from 'react';

import Loading from '@/components/Icons/Loading';
import { balanceFormated } from '@/utils/balance';

import { StyledLoadingWrapper, StyledRecord, StyledRecordList, StyledRecordText } from '../styles';

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

export default function StakeList({ requests, requestsLoading, claiming, claim, sx }: any) {
  return (
    <StyledRecordList style={sx}>
      {requestsLoading ? (
        <StyledLoadingWrapper>
          <Loading size={20} />
        </StyledLoadingWrapper>
      ) : requests?.length ? (
        requests.map((request: any, i: number) => (
          <StyledRecord key={i}>
            <StyledRecordText>
              {balanceFormated(request.amount, 3)} {request.token1.symbol}
            </StyledRecordText>
            {request.status === 'In Progress' ? (
              <StyledRecordText style={{ opacity: 0.3 }}>In Progress</StyledRecordText>
            ) : (
              <ClaimButton claiming={claiming} claim={claim} request={request} />
            )}
          </StyledRecord>
        ))
      ) : (
        <StyledLoadingWrapper>
          <StyledRecordText>No Data.</StyledRecordText>
        </StyledLoadingWrapper>
      )}
    </StyledRecordList>
  );
}
