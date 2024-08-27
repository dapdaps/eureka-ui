import { useRouter } from "next/router";

import { StyledContainer } from "@/styled/styles";

import type { FavoriteType } from "../../types";
import Dapps from "../Dapps";
import Empty from "../Empty";
import Features from "../Features";

type PropsType = {
  loaded: boolean;
  userFavorites: FavoriteType | null
}
export default function FavoriteApps({
  loaded,
  userFavorites
}: PropsType) {
  const router = useRouter()
  return (!loaded || (userFavorites?.total ?? 0) > 0) ? (
    <StyledContainer>
      <Features features={userFavorites?.features ?? []} loaded={loaded} />
      <Dapps loaded={loaded} dapps={userFavorites?.dapps ?? []} />
    </StyledContainer>
  ) : (
    <Empty
      type={0}
      title="You don’t have any favorites"
      tips="Your favorite features, dApps will be displayed here"
      btnTxt="Explore now"
      onClick={() => {
        router.push("/")
      }}
    />
  )
}