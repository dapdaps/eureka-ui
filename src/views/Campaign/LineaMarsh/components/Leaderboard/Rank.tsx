import Icon1st from '@public/svg/campaign/linea-marsh/rank1.svg';
import Icon2nd from '@public/svg/campaign/linea-marsh/rank2.svg';
import Icon3rd from '@public/svg/campaign/linea-marsh/rank3.svg';

import { StyledFlex } from '@/styled/styles';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';

const LeaderboardRank = (props: Props) => {
  const { rank } = props;
  const iconMap: any = {
    1: <Icon1st />,
    2: <Icon2nd />,
    3: <Icon3rd />
  };

  return (
    <StyledFlex
      alignItems="center"
      justifyContent="center"
      style={{
        width: '33px',
        height: '33px',
        fontSize: '26px',
        color: '#000',
        textAlign: 'left',
        fontFamily: 'Jersey'
      }}
    >
      {iconMap[rank] || formateValueWithThousandSeparatorAndFont(rank, 0, true)}
    </StyledFlex>
  );
};

export default LeaderboardRank;

interface Props {
  rank: number;
}
