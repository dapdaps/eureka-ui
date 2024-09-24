import Big from 'big.js';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';

import { timeFormate } from '../Utils';

const ConfirmBox = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
`;

const PopWapper = styled.div`
  width: 396px;
  padding: 25px 20px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderItem = styled.div`
  display: flex;
  align-items: center;
`;

const ChainIcon = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 4px;
`;

const ChainName = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  margin-left: 5px;
`;

const ArrowWapper = styled.div`
  margin: 0 16px;
`;

const CloseWapper = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;

const List = styled.div`
  margin-top: 30px;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 0;
`;

const ListItemTitle = styled.div`
  color: #979abe;
  font-size: 16px;
  font-weight: 400;
`;

const ListItemContent = styled.div`
  color: #fff;
  text-align: right;
  font-size: 16px;
  font-weight: 400;
`;

const ButtonWapper = styled.div`
  margin-top: 30px;
`;

const SubmitBtn = styled.button`
  margin: 0 auto;
  display: block;
  height: 48px;
  width: calc(100% - 40px);
  line-height: 48px;
  text-align: center;
  border-radius: 8px;
  color: #fff;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
`;

export default function Comfirm({
  chainFrom,
  chainTo,
  toAddress,
  duration,
  gasCostUSD,
  feeCostUSD,
  sendAmount,
  receiveAmount,
  onClose,
  loading,
  disabled,
  color,
  onSend,
  tool
}: any) {
  return (
    <ConfirmBox>
      <PopWapper>
        <Header>
          <HeaderItem>
            <ChainIcon src={chainFrom.icon} />
            <ChainName>{chainFrom.chainName}</ChainName>
          </HeaderItem>
          <ArrowWapper>
            <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 4.99992L11.5 4.99992M11.5 4.99992L7.49992 9.00016M11.5 4.99992L7.49992 0.999837"
                stroke="#979ABE"
                stroke-linecap="round"
              />
            </svg>
          </ArrowWapper>
          <HeaderItem>
            <ChainIcon src={chainTo.icon} />
            <ChainName>{chainTo.chainName}</ChainName>
          </HeaderItem>
        </Header>

        <CloseWapper
          onClick={() => {
            onClose && onClose();
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z"
              fill="#979ABE"
            />
          </svg>
        </CloseWapper>

        <List>
          <ListItem>
            <ListItemTitle>Send</ListItemTitle>
            <ListItemContent>{sendAmount}</ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemTitle>To</ListItemTitle>
            <ListItemContent>{toAddress}</ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemTitle>Est. Arrival</ListItemTitle>
            <ListItemContent>{timeFormate(duration)}</ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemTitle>Bridge Fee</ListItemTitle>
            <ListItemContent>${feeCostUSD}</ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemTitle>Gas Fee</ListItemTitle>
            <ListItemContent>${gasCostUSD}</ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemTitle>Est. Received</ListItemTitle>
            <ListItemContent>{receiveAmount}</ListItemContent>
          </ListItem>
        </List>

        <ButtonWapper>
          <SubmitBtn
            style={{
              background: color,
              color: tool === 'stargate' || tool === 'mode' || tool === 'blast' ? '#000' : '#fff'
            }}
            onClick={async () => {
              !disabled && onSend();
            }}
          >
            {loading ? <Loading size={18} /> : null} Confirm and Send
          </SubmitBtn>
        </ButtonWapper>
      </PopWapper>
    </ConfirmBox>
  );
}
