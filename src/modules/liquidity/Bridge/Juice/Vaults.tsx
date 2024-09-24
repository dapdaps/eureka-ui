// @ts-nocheck
import Big from 'big.js';
import { memo } from 'react';
import styled from 'styled-components';
const StyledContainer = styled.div``;
const StyledTips = styled.div`
  margin: 30px 0;
  text-align: center;
  color: #979abe;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledVaults = styled.div`
  width: 1000px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;
const StyledVault = styled.div`
  width: 320px;
  height: 340px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #373a53;
  background: #262836;
`;
const StyledVaultTop = styled.div`
  padding-left: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  height: 93px;
  background: #32364b;
  border-bottom: 1px solid #373a53;
`;
const StyledVaultImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 12px;
  border: 2px solid #262836;
  background: #fff;
`;
const StyledVaultImage = styled.img`
  height: 44px;
`;
const StyledVaultInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const StyledVaultName = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const StyledVaultDesc = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledVaultBottom = styled.div`
  display: flex;
  flex-direction: column;
  height: 247px;
  padding: 16px;
`;
const StyledPointList = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const StyledPoint = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledPointLabel = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledPointValue = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledAccessButton = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 288px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 8px;
  background: var(--button-color);
  color: var(--button-text-color);
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
`;
export default memo(function Vaults(props: any) {
  const { vaults, prices, addAction, onCheckedVaultChange } = props;
  function renderPointValue(vault, point) {
    if (point.type === 'deposited') {
      return point.value
        ? '$' +
            Big(point.value).times(prices[vault.token0]).toNumber().toLocaleString('en-us', {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2
            })
        : '-';
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="11" viewBox="0 0 14 11" fill="none">
          <path d="M1 4.65217L5.17391 8.82609L13 1" stroke="#CE94FA" strokeWidth="2" />
        </svg>
      );
    }
  }
  return (
    <StyledContainer>
      <StyledTips>
        Farm yield and earn points by deploying into different Dapps across the Blast Layer 2 ecosystem.
      </StyledTips>
      <StyledVaults>
        {vaults?.map((vault, index) => {
          return (
            <StyledVault key={index}>
              <StyledVaultTop>
                <StyledVaultImageContainer
                  style={{
                    background: vault.iconBgColor,
                    borderColor: vault.borderColor || '#262836'
                  }}
                >
                  <StyledVaultImage src={vault.icon} />
                </StyledVaultImageContainer>
                <StyledVaultInfo>
                  <StyledVaultName>{vault.name}</StyledVaultName>
                  <StyledVaultDesc>{vault.protocol}</StyledVaultDesc>
                </StyledVaultInfo>
              </StyledVaultTop>
              <StyledVaultBottom>
                <StyledPointList>
                  {vault?.pointList?.map((point, pointIndex) => (
                    <StyledPoint key={pointIndex}>
                      <StyledPointLabel>{point.label}</StyledPointLabel>
                      <StyledPointValue>{renderPointValue(vault, point)}</StyledPointValue>
                    </StyledPoint>
                  ))}
                </StyledPointList>
                <StyledAccessButton
                  onClick={() => {
                    onCheckedVaultChange && onCheckedVaultChange(vault);
                  }}
                >
                  Access
                </StyledAccessButton>
              </StyledVaultBottom>
            </StyledVault>
          );
        }) ?? <></>}
      </StyledVaults>
    </StyledContainer>
  );
});
