import styled from 'styled-components';

const StyledContainer = styled.div`
  margin-top: 20px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
`;
const HeaderActions = styled.div`
  display: flex;
  gap: 5px;
`;
const HeaderFullAction = styled.div`
  height: 30px;
  line-height: 30px;
  border: 1px solid #3d363d;
  border-radius: 8px;
  width: 70px;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
`;
const HeaderTokensAction = styled.div`
  border: 1px solid #3d363d;
  border-radius: 8px;
  padding: 3px;
  box-sizing: border-box;
  display: flex;
`;
const HeaderTokenAction = styled.div<{ active?: boolean }>`
  font-size: 12px;
  line-height: 12px;
  padding: 6px;
  border-radius: 6px;
  color: ${({ active }) => (active ? ' #fff' : '#8E8E8E')};
  cursor: pointer;
  height: 24px;
  box-sizing: border-box;
  ${({ active }) => active && 'background-color: #262626;'}
`;
const StyledPricePanel = styled.div`
  margin-top: 10px;
  border-radius: 16px;
  border: 1px solid #303030;
  padding: 10px 20px;
  box-sizing: border-box;
  height: 100px;
  display: flex;
  justify-content: space-between;
`;
const PricePanelDesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const PricePanelLabel = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #8e8e8e;
`;
const Amount = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
`;
const PricePanelActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const PricePanelAction = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid #3d363d;
  background-color: #131313;
  cursor: pointer;
`;

const PricePanel = () => {
  return (
    <StyledPricePanel>
      <PricePanelDesc>
        <PricePanelLabel>Low price</PricePanelLabel>
        <Amount>1811.5246</Amount>
        <PricePanelLabel>USDC per ETH</PricePanelLabel>
      </PricePanelDesc>
      <PricePanelActions>
        <PricePanelAction>+</PricePanelAction>
        <PricePanelAction>-</PricePanelAction>
      </PricePanelActions>
    </StyledPricePanel>
  );
};

export default function PriceRange() {
  return (
    <StyledContainer>
      <Header>
        <div>Set price range</div>
        <HeaderActions>
          <HeaderFullAction>Full range</HeaderFullAction>
          <HeaderTokensAction>
            <HeaderTokenAction>USDC</HeaderTokenAction>
            <HeaderTokenAction active>ETH</HeaderTokenAction>
          </HeaderTokensAction>
        </HeaderActions>
      </Header>
      <PricePanel />
    </StyledContainer>
  );
}
