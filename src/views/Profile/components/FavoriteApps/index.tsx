import { StyledContainer } from "@/styled/styles";
import Dapps from "../Dapps";
import Features from "../Features";
import { FavoriteType } from "../../types";
import Empty from "../Empty";

type PropsType = {
  loading: boolean;
  userFavorites: FavoriteType | null
}
export default function FavoriteApps({
  loading,
  userFavorites
}: PropsType) {
  return (userFavorites?.total ?? 0) > 0 ? (
    <StyledContainer>
      <Features features={userFavorites?.features ?? []} />
      <Dapps dapps={userFavorites?.dapps ?? []} />
    </StyledContainer>
  ) : (
    <Empty
      title="You don’t have any favorites"
      tips="Your favorite features, dApps will be displayed here"
      btnTxt="Explore now"
    />
  )
}