import Banner from '@/views/Campaign/RubicHoldstation/sections/Banner';
import Holdstation from '@/views/Campaign/RubicHoldstation/sections/Holdstation';
import Leaderboard from '@/views/Campaign/RubicHoldstation/sections/Leaderboard';
import Medal from '@/views/Campaign/RubicHoldstation/sections/Medal';
import Rubic from '@/views/Campaign/RubicHoldstation/sections/Rubic';
import Tickets from '@/views/Campaign/RubicHoldstation/sections/Tickets';
import { StyledContainer } from '@/views/Campaign/RubicHoldstation/styles';

const RubicHoldstation = (props: Props) => {
  const {} = props;

  return (
    <StyledContainer>
      <Banner />
      <Tickets />
      <Rubic />
      <Holdstation />
      <Leaderboard />
      <Medal />
    </StyledContainer>
  );
};

export default RubicHoldstation;

interface Props {}
