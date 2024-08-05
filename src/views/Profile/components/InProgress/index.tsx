import styled from 'styled-components';
import Airdrops from '../Airdrops';
import Medals from '../Medals';
import Odyssey from '../Odyssey';
import Empty from '../Empty';
import useCompassList from '../../hooks/useCompassList';
const StyledContainer = styled.div`
  
`
export default function InProgress() {

  const { loading: compassLoading, compassList, } = useCompassList()
  return (
    <StyledContainer>
      <Odyssey
        loading={compassLoading}
        compassList={compassList}
      />
      <Airdrops />
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