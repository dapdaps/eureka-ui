import IconAdd from '@public/images/tokens/add.svg';
import IconCopy from '@public/images/tokens/copy.svg';
import IconLink from '@public/images/tokens/link.svg';
import Big from 'big.js';
import { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Modal from '@/components/Modal';
import chainCofig from '@/config/chains';
import useToast from '@/hooks/useToast';
import { useTokenPriceLatestStore } from '@/stores/tokenPrice';
import { copyText } from '@/utils/copy';
import { formatIntegerThousandsSeparator } from '@/utils/format-number';
import { formateValueWithThousandSeparator } from '@/utils/formate';
import { get } from '@/utils/http'

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
    & > svg {
      cursor: pointer;
    }
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
  close?(): void;
  trade?: any;
}

interface IData {
  id: number;
  symbol: string;
  circulating_supply: string;
  max_supply: string;
  fully_diluted_valuation: string;
  market_cap: string;
  high_24h: string;
  low_24h: string;
  volume_24h: string;
}

const TokenDetailPopup = (props: Props) => {
  const { visible, close, trade } = props;
  const [loading, setLoading] = useState(false);
  const [tokenDetail, setTokenDetail] = useState<IData>();
  const toast = useToast()
  const priceLatest = useTokenPriceLatestStore(store => store.list);
  const fetchTokenDetail = async () => {
    setLoading(true);
    try {
      const res = await get(`/api/token/market`, {
        symbol: trade.inputCurrency.symbol
      });
      setTokenDetail(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
  }
}

  useEffect(() => {
    if (trade?.inputCurrency) {
      fetchTokenDetail();
    }
  }, []);

  const handleCopyCurrency = () => {
    copyText(trade.inputCurrency.address, () => {
      toast.success('Copied Successfully');
    });
  };

  const handleLink = () => {
    window.open(`https://etherscan.io/token/${trade.inputCurrency.address}`);
  }

  const hanleAddMask = async() => {
    const currChain = chainCofig[trade.inputCurrency.chainId];
    if (typeof window.ethereum === 'undefined' || !currChain) {
      return false;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: `0x${trade.inputCurrency.chainId.toString(16)}`,
          rpcUrls: currChain.rpcUrls,
          chainName: currChain.chainName,
          nativeCurrency: currChain.nativeCurrency,
          blockExplorerUrls: [currChain.blockExplorers],
        }],
      });
      return true;
    } catch (err) {
      console.log('add metamask failed: %o', err);
      toast.fail('Failed to add network!');
      return false;
    }
  }

  const convertVolume24hEth = useMemo(() => {
    if (!priceLatest || !tokenDetail) return 0;
    const ethUsdtRate = priceLatest['ETH']?.price || 0;
    return Big(tokenDetail.volume_24h).div(Big(ethUsdtRate)).toFixed(4);
  }, [priceLatest, tokenDetail]);

  return (
    <Modal
      width={500}
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
              <img className="token-img" src={trade.inputCurrency.icon} alt="" />
              <Title>
                <span className="name">{trade.inputCurrency.symbol}</span>
                <span className="name-desc">{trade.inputCurrency.name === 'ETH' ? 'Ethereum' : trade.inputCurrency.name }</span>
              </Title>
            </Header>
            {
              trade.inputCurrency.address != 'native' && (
                <AddressSection>
                  <Address>
                    <div className="addr">{trade.inputCurrency.address}</div>
                    <div className="options">
                      <IconCopy onClick={handleCopyCurrency} />
                      <IconLink onClick={handleLink} />
                      <IconAdd onClick={hanleAddMask} />
                    </div>
                  </Address>
                </AddressSection>
              )
            }
            <InfoGrid>
              <InfoItem>
                <InfoLabel>Circulating supply</InfoLabel>
                <InfoValue>{formatIntegerThousandsSeparator(tokenDetail?.circulating_supply)}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Fully Diluted Valuation</InfoLabel>
                <InfoValue>${formatIntegerThousandsSeparator(tokenDetail?.fully_diluted_valuation)}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Maximum supply</InfoLabel>
                <InfoValue>{formatIntegerThousandsSeparator(tokenDetail?.max_supply)}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>Market cap</InfoLabel>
                <InfoValue>${formatIntegerThousandsSeparator(tokenDetail?.market_cap)}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>24h high</InfoLabel>
                <InfoValue>${formateValueWithThousandSeparator(tokenDetail?.high_24h, 2)}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>24 low</InfoLabel>
                <InfoValue>${formateValueWithThousandSeparator(tokenDetail?.low_24h, 2)}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>24h volume - ETH</InfoLabel>
                <InfoValue>{formateValueWithThousandSeparator(convertVolume24hEth, 2)}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>24h volume - USD</InfoLabel>
                <InfoValue>${formatIntegerThousandsSeparator(tokenDetail?.volume_24h)}</InfoValue>
              </InfoItem>
            </InfoGrid>
          </StyleMain>
        </StyledToken>
      }
    />
  );
};

export default memo(TokenDetailPopup);
