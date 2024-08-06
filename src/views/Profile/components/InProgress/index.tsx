import styled from 'styled-components';
import useAirdropList from '../../hooks/useAirdropList';
import useCompassList from '../../hooks/useCompassList';
import Airdrops from '../Airdrops';
import Medals from '../Medals';
import Odyssey from '../Odyssey';
const StyledContainer = styled.div`
  
`
export default function InProgress() {

  const { loading: compassLoading, compassList, } = useCompassList()
  const { loading: airdropLoading, airdropList } = useAirdropList()
  return (
    <StyledContainer>
      <Odyssey
        loading={compassLoading}
        compassList={compassList}
      />
      <Airdrops
        loading={airdropLoading}
        airdropList={airdropList}
      />
      <Medals />
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