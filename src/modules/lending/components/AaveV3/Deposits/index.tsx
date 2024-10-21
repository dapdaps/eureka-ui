import Big from 'big.js';
import { ethers } from 'ethers';
import styled from 'styled-components';

import PrimaryButton from '../PrimaryButton';

const Container = styled.div`
  color: white;
  font-family: Montserrat;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 30px;
`;

const Section = styled.div`
  margin-bottom: 20px;
  flex: 1;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 5px;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #888;
  margin-bottom: 15px;
`;

const Card = styled.div`
  background-color: rgba(53, 55, 73, 0.2);
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 10px;
  height: 75px;
`;

const Empty = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const AssetRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AssetInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AssetIcon = styled.img`
  margin-right: 10px;
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

const AssetDetails = styled.div``;

const AssetName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const AssetBalance = styled.div`
  font-size: 14px;
  color: #888;
`;

interface Asset {
  symbol: string;
  balance: string;
  usdValue: string;
}

const DepositModule = ({ depositSets, multicall, multicallAddress, provider, account, prices }: any) => {
  return (
    <Container>
      <Section>
        <Title>Your Deposits</Title>
        <Subtitle>You must deposit collateral in order to borrow HONEY</Subtitle>
        <Card>
          <Empty>You have not deposited any assets</Empty>
        </Card>
      </Section>

      <Section>
        <Title>Available to Deposit</Title>
        <Subtitle>You can deposit the following assets to borrow HONEY</Subtitle>
        {depositSets.map((asset: any) => (
          <Card key={asset.symbol}>
            <AssetRow>
              <AssetInfo>
                <AssetIcon src={asset.icon} />
                <AssetDetails>
                  <AssetName>
                    {asset.balance || 0.01} {asset.symbol}
                  </AssetName>
                  <AssetBalance>${asset.usdValue || 2}</AssetBalance>
                </AssetDetails>
              </AssetInfo>
              <PrimaryButton theme={{ width: '100px' }}>Deposit</PrimaryButton>
            </AssetRow>
          </Card>
        ))}
      </Section>
    </Container>
  );
};

export default DepositModule;
