import { StyledContainer } from "@/styled/styles";
import useUserFavorites from "../../hooks/useUserFavorites";
import Dapps from "../Dapps";
import Features from "../Features";
export default function FavoriteApps() {
  const { userFavorites } = useUserFavorites()
  console.log('====userFavorites', userFavorites)
  return (
    <StyledContainer>
      <Features />
      <Dapps />
    </StyledContainer>
  )
}