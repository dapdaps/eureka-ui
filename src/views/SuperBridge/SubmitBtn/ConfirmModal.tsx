import styled from 'styled-components';
import type { ExecuteRequest, QuoteRequest, QuoteResponse } from 'super-bridge-sdk';

import Loading from '@/components/Icons/Loading';
import { usePriceStore } from '@/stores/price';
import type { Chain, Token } from '@/types';
import { addressFormated, balanceFormated, percentFormated } from '@/utils/balance';

import Modal from '../Modal';

const Box = styled.div`
  background-color: rgba(55, 58, 83, 0.5);
  border-radius: 10px;
  color: #fff;
  border: 1px solid rgba(55, 58, 83, 1);
  padding: 20px;
  margin-top: 10px;
`;

const ChainTokens = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  .chain-token {
    .chain {
      font-size: 16px;
      font-weight: 400;
      line-height: 19.2px;
    }
    .token {
      display: flex;
      align-items: center;
      margin-top: 5px;
      gap: 10px;
      .icon-wapper {
        position: relative;
        width: 22px;
        height: 22px;
        .token-img {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
        .chain-img {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 10px;
          height: 10px;
        }
      }
      .amount {
        font-size: 16px;
        font-weight: 500;
        line-height: 19.2px;
      }
    }
  }
`;

const AddressBox = styled.div`
  .title {
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
    color: #fff;
  }
  .address {
    font-size: 14px;
    font-weight: 500;
    line-height: 16.8px;
    color: rgba(151, 154, 190, 1);
    margin-top: 10px;
  }
`;

const FeeBox = styled.div`
  .fee-line {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &:not(:first-child) {
    margin-top: 5px;
  }
`;

const Container = styled.div<{ disabled?: boolean }>`
  height: 60px;
  line-height: 60px;
  background-color: rgba(235, 244, 121, 1);
  border-radius: 10px;
  text-align: center;
  color: rgba(55, 58, 83, 1);
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
  margin-top: 10px;
  &.disbaled {
    opacity: 0.3;
    cursor: default;
  }
`;

interface Props {
  isLoading: boolean;
  // disabled?: boolean;
  // text: string;
  fromChain: Chain | null;
  toChain: Chain | null;
  fromToken: Token | undefined;
  toToken: Token | undefined;
  amount: string;
  reciveAmount: string | null;
  toAddress: string;
  theme?: any;
  route: QuoteResponse | null;
  onClick: () => void;
  onClose: () => void;
}

export default function ConfirmModal({
  onClick,
  onClose,
  fromChain,
  toChain,
  fromToken,
  toToken,
  amount,
  theme,
  toAddress,
  route,
  reciveAmount,
  isLoading
}: Props) {
  const prices = usePriceStore((store) => store.price);

  const styles = { backgroundColor: theme?.selectBgColor, color: theme?.textColor };

  return (
    <Modal
      title="Confirm Transaction"
      fixed
      onClose={() => {
        !isLoading && onClose();
      }}
    >
      <Box>
        <ChainTokens>
          <div className="chain-token">
            <div className="chain">{fromChain?.chainName}</div>
            <div className="token">
              <div className="icon-wapper">
                <img className="token-img" src={fromToken?.icon} />
                <img className="chain-img" src={fromChain?.icon} />
              </div>
              <div className="amount">
                {amount && balanceFormated(amount)} {fromToken?.symbol}
              </div>
            </div>
          </div>
          <div>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.8536 4.35355C12.0488 4.15829 12.0488 3.84171 11.8536 3.64645L8.67157 0.464466C8.47631 0.269204 8.15973 0.269204 7.96447 0.464466C7.7692 0.659728 7.7692 0.976311 7.96447 1.17157L10.7929 4L7.96447 6.82843C7.7692 7.02369 7.7692 7.34027 7.96447 7.53553C8.15973 7.7308 8.47631 7.7308 8.67157 7.53553L11.8536 4.35355ZM0 4.5H11.5V3.5H0V4.5Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="chain-token">
            <div className="chain">{toChain?.chainName}</div>
            <div className="token">
              <div className="icon-wapper">
                <img className="token-img" src={toToken?.icon} />
                <img className="chain-img" src={toChain?.icon} />
              </div>
              <div className="amount">
                {reciveAmount && balanceFormated(reciveAmount)} {toToken?.symbol}
              </div>
            </div>
          </div>
        </ChainTokens>
      </Box>

      <Box>
        <AddressBox>
          <div className="title">Recipient Address</div>
          <div className="address">{toAddress}</div>
        </AddressBox>
      </Box>

      <Box>
        <FeeBox>
          <div className="fee-line">
            <div>Bridge Fee</div>
            <div>
              $
              {route &&
                fromChain &&
                balanceFormated(
                  route?.feeType === 1
                    ? (prices as any)[fromChain?.nativeCurrency.symbol] * Number(route.fee)
                    : route?.fee
                )}
            </div>
          </div>
        </FeeBox>
        <FeeBox>
          <div className="fee-line">
            <div>Gas Fee</div>
            <div>
              $
              {route &&
                fromChain &&
                balanceFormated(
                  route?.gasType === 1
                    ? (prices as any)[fromChain?.nativeCurrency.symbol] * Number(route.gas)
                    : route?.gas
                )}
            </div>
          </div>
        </FeeBox>
      </Box>
      {isLoading ? (
        <Container style={styles} disabled>
          {' '}
          <Loading size={20} /> Sending
        </Container>
      ) : (
        <Container style={styles} onClick={onClick}>
          Confirm
        </Container>
      )}
    </Modal>
  );
}
