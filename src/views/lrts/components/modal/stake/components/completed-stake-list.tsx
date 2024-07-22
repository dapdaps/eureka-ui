
import Loading from '@/components/Icons/Loading';
import { balanceFormated } from '@/utils/balance';

import { StyledLoadingWrapper, StyledRecord, StyledRecordList, StyledRecordText } from '../styles';

import { useCompletedRequestMappingStore } from '@/stores/lrts'
import { useEffect, useState } from 'react';
export default function CompletedStakeList({ gem, dapp }: any) {

  const completedRequestMappingStore: any = useCompletedRequestMappingStore()
  const [requestsLoading, setRequestsLoading] = useState(false)
  const [requests, setRequests] = useState([])

  useEffect(() => {
    const dappName = gem ? gem?.dapp?.name : dapp?.name
    setRequestsLoading(true)
    const _completedRequest = completedRequestMappingStore.completedRequestMapping[dappName] || []
    setRequests(_completedRequest)
    setRequestsLoading(false)
  }, [])
  return (
    <StyledRecordList>
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
            <StyledRecordText style={{ opacity: 0.3 }}>completed</StyledRecordText>
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
