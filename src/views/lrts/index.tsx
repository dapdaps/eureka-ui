import { useChainsStore } from '@/stores/chains';

import { StyledContainer } from './styles';

const Home = () => {
  const chains = useChainsStore((store: any) => store.chains);
  return <StyledContainer></StyledContainer>;
};

export default Home;
