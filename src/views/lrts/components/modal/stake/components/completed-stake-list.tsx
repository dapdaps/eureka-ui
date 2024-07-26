
import useAccount from '@/hooks/useAccount';


import Loading from '@/components/Icons/Loading';
import { balanceFormated } from '@/utils/balance';
import { useEffect } from 'react';
import useQueryActionList from '../hooks/useQueryActionList';
import { StyledLoadingWrapper, StyledRecord, StyledRecordList, StyledRecordText } from '../styles';
export default function CompletedStakeList({ gem, dapp, inToken, outToken }: any) {
  const { provider, account } = useAccount();
  const { loading, actionList, queryActionList } = useQueryActionList()

  const handleQueryActionList = function () {
    queryActionList({
      account,
      action_tokens: JSON.stringify([outToken.symbol, inToken.symbol])
    })
  }
  const handleQuerySymbol = function (action_tokens: string) {
    let _symobl = ""
    try {
      _symobl = JSON.parse(action_tokens)[1]
    } catch (error) {
      _symobl = ""
    }
    return _symobl
  }
  useEffect(() => {
    handleQueryActionList()
  }, [])
  return (
    <StyledRecordList>
      {loading ? (
        <StyledLoadingWrapper>
          <Loading size={20} />
        </StyledLoadingWrapper>
      ) : actionList?.length ? (
        actionList.map((action: any, i: number) => (
          <StyledRecord key={i}>
            <StyledRecordText>
              {balanceFormated(action.action_amount, 3)} {handleQuerySymbol(action.action_tokens)}
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
