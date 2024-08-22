import { useMemo } from 'react';
import styled from 'styled-components';

import Airdrops from '../Airdrops';
import Empty from '../Empty';
import Medals from '../Medals';
import Odyssey from '../Odyssey';
const StyledContainer = styled.div`
  
`
export default function InProgress({
  compassLoaded,
  compassList,
  airdropLoaded,
  airdropList,
  medalLoaded,
  userMedalList
}: any) {
  const isHave = useMemo(() => {
    return compassList?.length + airdropList?.length + userMedalList?.length > 0 || !(compassLoaded && airdropLoaded && medalLoaded)
  }, [compassLoaded, compassList, airdropLoaded, airdropList, medalLoaded, userMedalList])
  return isHave ? (
    <StyledContainer>
      <Odyssey loaded={compassLoaded} compassList={compassList} />
      <Airdrops loaded={airdropLoaded} airdropList={airdropList} />
      <Medals loaded={medalLoaded} medalList={userMedalList} />
    </StyledContainer>
  ) : (
    <Empty
      type={0}
      title='You don’t have any actions in progress'
      tips='All the Odyssey, airdrop actions, bridging trasactions, and medals which you are in progress will be displayed here'
      btnTxt='Start your journey'
      onClick={() => {
        console.log('111')
      }}
    />
  )
}