import styled from 'styled-components';
import useAirdropList from '../../hooks/useAirdropList';
import useCompassList from '../../hooks/useCompassList';
import useMedalList from '../../hooks/useUserMedalList';
import Airdrops from '../Airdrops';
import Medals from '../Medals';
import Odyssey from '../Odyssey';
const StyledContainer = styled.div`
  
`
export default function InProgress({
  compassLoading,
  compassList,
  airdropLoading,
  airdropList,
  medalLoading,
  userMedalList
}: any) {

  // const { loading: compassLoading, compassList, } = useCompassList()
  // const { loading: airdropLoading, airdropList } = useAirdropList()
  // const { loading: medalLoading, medalList } = useMedalList()
  return (
    <StyledContainer>
      <Odyssey loading={compassLoading} compassList={compassList} />
      <Airdrops loading={airdropLoading} airdropList={airdropList} />
      <Medals loading={medalLoading} medalList={userMedalList} />
    </StyledContainer>
    // <Empty
    //   title='You don’t have any actions in progress'
    //   tips='All the Odyssey, airdrop actions, bridging trasactions, and medals which you are in progress will be displayed here'
    //   btnTxt='Start your journey'
    //   onClick={() => {
    //     console.log('111')
    //   }}
    // />
  )
}