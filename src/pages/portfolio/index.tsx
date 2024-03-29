import { useDefaultLayout } from '@/hooks/useLayout';
import PortfolioView from '@/views/Portfolio';

function Portfolio() {
  return <PortfolioView />;
}

Portfolio.getLayout = useDefaultLayout;

export default Portfolio;
