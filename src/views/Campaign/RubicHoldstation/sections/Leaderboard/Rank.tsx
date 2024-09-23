import Icon1st from '@public/images/campaign/icon-1st.svg';
import Icon2nd from '@public/images/campaign/icon-2nd.svg';
import Icon3rd from '@public/images/campaign/icon-3rd.svg';

import { StyledFlex } from '@/styled/styles';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import { StyledRankIcon } from '@/views/Campaign/RubicHoldstation/sections/Leaderboard/styles';

const LeaderboardRank = (props: Props) => {
  const { rank } = props;

  return (
    <StyledFlex alignItems="center" gap="11px">
      {rank === 1 && <Icon1st />}
      {rank === 2 && <Icon2nd />}
      {rank === 3 && <Icon3rd />}
      {![1, 2, 3].includes(rank) && <StyledRankIcon />}
      {formateValueWithThousandSeparatorAndFont(rank, 0, true)}
    </StyledFlex>
  );
};

export default LeaderboardRank;

interface Props {
  rank: number;
}
