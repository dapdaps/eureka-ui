import Big from 'big.js';
import { memo, useEffect, useState } from 'react';

import CopyButton from '@/components/CopyButton';
import Modal from '@/components/Modal';
import useAddTokenToWallet from '@/hooks/useAddTokenToWallet';

import CloseBtn from '../swap/CloseBtn';
import {
  Addrs,
  Btns,
  Button,
  Desc,
  Explore,
  StyledContainer,
  StyledHeader,
  SubTitle,
  Title,
  TokenIcon,
} from './styles';

const AddTokenModal = ({ show, setShow, token, chainId }: any) => {
  const { add: addToken } = useAddTokenToWallet();

  return (
    <Modal
      display={show}
      showHeader={false}
      width={530}
      modalStyle={{
        border: '1px solid #3f3f3f',
        background: '#2f2f2f',
        borderRadius: '4px',
      }}
      content={
        <StyledContainer>
          <StyledHeader>
            <TokenIcon src={token?.icon} width={36} height={36} alt="" />
            <div>
              <Title>{token?.symbol}</Title>
              <SubTitle>{token?.name}</SubTitle>
            </div>
          </StyledHeader>
          <Desc style={{ marginBottom: 24 }}>{token?.desc}</Desc>
          <Desc style={{ marginBottom: 14 }}>Token address</Desc>
          <Addrs style={{ marginBottom: 24 }}>
            {token?.address}{' '}
            <Btns>
              <CopyButton
                size={14}
                text={token?.address}
                tooltipMessage="Copied"
                tooltipTop={-31}
                tooltipRight={-12}
                tooltipFontSize={12}
              />
              <Explore href={`https://etherscan.io/address/${token.address}`} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                  <path
                    d="M10.8182 8.72727V10C10.8182 11.1046 9.92275 12 8.81818 12H3C1.89543 12 1 11.1046 1 10V4.18182C1 3.07725 1.89543 2.18182 3 2.18182H4.27273"
                    stroke="#828282"
                  />
                  <path d="M5 8.63636L12.6364 1M12.6364 1H7.29091M12.6364 1V6.34545" stroke="#828282" />
                </svg>
              </Explore>
            </Btns>
          </Addrs>
          <Button
            onClick={() => {
              addToken(token);
            }}
          >
            Add to Wallet
          </Button>
          <CloseBtn
            onClick={() => {
              setShow(false);
            }}
          />
        </StyledContainer>
      }
    />
  );
};

export default memo(AddTokenModal);
