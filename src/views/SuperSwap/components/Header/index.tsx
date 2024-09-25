import Tooltip from '@/components/TitleTooltip';

import Slippage from '../InputCard/Slippage';
import { StyledActions } from '../InputCard/styles';
import ChainSelector from './ChainSelector';
import { StyledContainer, StyledTitle } from './styles';

export default function Header({ onLoadChain }: any) {
  return (
    <>
      <StyledContainer>
        <StyledTitle>
          <svg xmlns="http://www.w3.org/2000/svg" width="27" height="25" viewBox="0 0 27 25" fill="none">
            <path
              d="M10.9699 11.6003C10.5721 11.6003 10.1906 11.7583 9.90931 12.0396L2.9866 18.9609C2.04151 19.9058 2.71072 21.5217 4.04715 21.5217L15.1964 21.5217C15.5941 21.5217 15.9756 21.3637 16.2569 21.0824L23.1796 14.1611C24.1247 13.2162 23.4555 11.6003 22.1191 11.6003L10.9699 11.6003Z"
              fill="#EBF479"
              stroke="#16181D"
            />
            <path
              d="M10.9699 2.99436C10.5721 2.99436 10.1906 3.15236 9.90931 3.4336L2.9866 10.355C2.04151 11.2999 2.71072 12.9157 4.04715 12.9157L15.1964 12.9157C15.5941 12.9157 15.9756 12.7577 16.2569 12.4765L23.1796 5.55513C24.1247 4.61022 23.4555 2.99436 22.1191 2.99436L10.9699 2.99436Z"
              fill="#EBF479"
              stroke="#16181D"
            />
          </svg>
          <div>Super Swap</div>
          <Tooltip content="Super Swap aggregates 75+ DEXes for best-in-class rates, providing one-click access to deep liquidity pools. Each swap on DapDap helps to earn you medals, turning your trades into achievements! Enjoy smart pathfinding for complex token pairs and gas-optimized transactions across chains. Wap smarter, not harder." />
        </StyledTitle>
        <StyledActions>
          <Slippage />
        </StyledActions>
      </StyledContainer>
      <ChainSelector onLoadChain={onLoadChain} />
    </>
  );
}
