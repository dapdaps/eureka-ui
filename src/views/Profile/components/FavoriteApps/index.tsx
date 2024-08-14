import { StyledContainer } from "@/styled/styles";
import Dapps from "../Dapps";
import Features from "../Features";
import { FavoriteType } from "../../types";
import Empty from "../Empty";

type PropsType = {
  loaded: boolean;
  userFavorites: FavoriteType | null
}
export default function FavoriteApps({
  loaded,
  userFavorites
}: PropsType) {
  return (!loaded || (userFavorites?.total ?? 0) > 0) ? (
    <StyledContainer>
      <Features features={userFavorites?.features ?? []} loaded={loaded}/>
      <Dapps loaded={loaded} dapps={userFavorites?.dapps ?? []} />
    </StyledContainer>
  ) : (
    <Empty
      type={0}
      title="You don’t have any favorites"
      tips="Your favorite features, dApps will be displayed here"
      btnTxt="Explore now"
    />
  )
}