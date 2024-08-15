import { memo } from 'react';
import Modal from '@/components/Modal';
import styled from 'styled-components';
import { MedalType } from '@/views/Profile/types';
import { useRouter } from 'next/router';
import IconAdd from '@public/images/tokens/add.svg';
import IconLink from '@public/images/tokens/link.svg';
import IconCopy from '@public/images/tokens/copy.svg';

const StyledToken = styled.div`
  padding: 0 24px;
`;
const StyleMain = styled.div`
  display: flex;
  flex-direction: column;
  .medal-logo {
    width: 202px;
    height: 202px;
    object-fit: contain;
    margin-bottom: 12px;
  }
  .header {
    font-size: 700;
    font-family: Montserrat;
    font-size: 32px;
    line-height: 40px;
    margin-bottom: 20px;
    color: #fff;
  }

  .title {
    font-size: 20px;
    font-weight: 700;
    font-family: Montserrat;
    color: #fff;
    margin-bottom: 40px;
    span {
      color: #ebf479;
    }
  }

  .btns {
    display: flex;
    gap: 20px;
    align-items: center;
    .btn {
      width: 234px;
      height: 56px;
      border: 1px solid #45475c;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      color: #979abe;
      background-color: #21222b;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const Header = styled.div`
  display: flex;
  gap: 14px;
  margin-bottom: 20px;
  .token-img {
    width: 34px;
    height: 34px;
  }
`;

const Title = styled.h2`
  display: flex;
  flex-direction: column;
  color: #fff;
  .name {
    font-family: Montserrat;
    font-size: 18px;
    font-weight: 600;
    line-height: 22px;
  }
  .name-desc {
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
`;

const AddressSection = styled.div`
  color: #fff;
  margin-bottom: 42px;
  .token-title {
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
    margin-bottom: 7px;
  }
  .options {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const Address = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .addr {
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 30px;
  grid-column-gap: 50px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoLabel = styled.span`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 400;
  line-height: 17.07px;
  text-align: left;
  margin-bottom: 6px;
  color: #979abe;
`;

const InfoValue = styled.span`
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  text-align: left;
  color: #fff;
  max-width: 190px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export interface Props {
  visible?: boolean;
  data?: MedalType;
  close?(): void;
}

const TokenDetailPopup = (props: Props) => {
  const { visible, close, data } = props;
  const router = useRouter();
  return (
    <Modal
      width={476}
      overlayStyle={{
        backdropFilter: 'blur(10px)',
        height: '100vh',
      }}
      className="medal-modal"
      style={{
        background: '#262836',
        border: '1px solid #373A53',
        backdropFilter: 'blur(10px)',
        paddingBottom: '40px',
      }}
      display={visible || false}
      onClose={() => close?.()}
      portal
      content={
        <StyledToken>
          <StyleMain>
            <Header>
              <img className="token-img" src="/images/tokens/blast.svg" alt="" />
              <Title>
                <span className="name">ETH</span>
                <span className="name-desc">Ethereum</span>
              </Title>
            </Header>

            <AddressSection>
              <div className="token-title">Token address</div>
              <Address>
                <div className="addr">0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9</div>
                <div className="options">
                  <IconCopy />
                  <IconLink />
                  <IconAdd />
                </div>
              </Address>
            </AddressSection>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Circulating supply</InfoLabel>
                <InfoValue>1.38k</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Liquidity</InfoLabel>
                <InfoValue>$2.18m</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Maximum supply</InfoLabel>
                <InfoValue>1.38k</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Market cap</InfoLabel>
                <InfoValue>$4.34m</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>24h high</InfoLabel>
                <InfoValue>$3,174.79</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>24 low</InfoLabel>
                <InfoValue>$3,074.79</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>24h volume - ETH</InfoLabel>
                <InfoValue>237.215144</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>24h volume - USD</InfoLabel>
                <InfoValue>$738.47k</InfoValue>
              </InfoItem>
            </InfoGrid>
          </StyleMain>
        </StyledToken>
      }
    />
  );
};

export default memo(TokenDetailPopup);
