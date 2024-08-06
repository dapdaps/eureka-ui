import { StyledContainer } from "@/styled/styles";
import Dapps from "../Dapps";
import Features from "../Features";
import Empty from "../Empty";
export default function FavoriteApps() {
  return (
    <StyledContainer>
      <Features />
      <Dapps />
      {/* <Empty
        title='You don’t have any favorites'
        tips='Your favorite features, dApps will be displayed here'
        btnTxt='Explore now'
        onClick={() => {
          console.log('111')
        }}
      /> */}
    </StyledContainer>
  )
}