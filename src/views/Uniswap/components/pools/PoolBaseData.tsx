import { memo, useState } from 'react';
import styled from 'styled-components';

import ClaimFeesModal from './ClaimFeesModal';
import { NFTIcon } from './Icons';

const StyledWrap = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin-top: 14px;
  width: 100%;
  gap: 16px;
  .vchb {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .hvc {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .w-full {
    width: 100%;
  }
`;
const PoolBaseData = () => {
  return (
    <StyledWrap>
      <NFT />
      <LiquidityAndFee />
    </StyledWrap>
  );
};

const StyledNFTWrap = styled.div`
  width: 378px;
  border: 1px solid #3d363d;
  border-radius: 24px;
`;
const NFT = () => {
  return (
    <StyledNFTWrap className="hvc">
      <NFTIcon />
    </StyledNFTWrap>
  );
};

const StyledLFWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  flex-grow: 1;
`;
const LiquidityAndFee = () => {
  return (
    <StyledLFWrap>
      <Liquidity />
      <UnclaimedFees />
    </StyledLFWrap>
  );
};

const StyledBase = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #3d363d;
  border-radius: 24px;
  padding: 20px;
  background-color: #131313;
  width: 100%;
  gap: 16px;
  .title {
    font-size: 16px;
    color: #ffffff;
    font-weight: bold;
  }
  .value {
    font-size: 36px;
    color: #ffffff;
    font-weight: bold;
  }
  .box {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 16px;
    background-color: #1b1b1b;
    padding: 18px;
    gap: 20px;
    img {
      width: 22px;
      height: 22px;
      border-radius: 100px;
      margin-right: 7px;
    }
    .symbol {
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
    }
    .balance {
      font-size: 16px;
      font-weight: 500;
      color: #ffffff;
    }
  }
`;
const StyledLiquidity = styled(StyledBase)``;
const Liquidity = () => {
  return (
    <StyledLiquidity>
      <span className="title">Liquidity</span>
      <span className="value">$-</span>
      <div className="box">
        <div className="vchb w-full">
          <div className="hvc">
            <img src="" />
            <span className="symbol">ETH</span>
          </div>
          <span className="balance">{'<0'}</span>
        </div>
        <div className="vchb w-full">
          <div className="hvc">
            <img src="" />
            <span className="symbol">USDC</span>
          </div>
          <span className="balance">{'0.7773'}</span>
        </div>
      </div>
    </StyledLiquidity>
  );
};
const StyledUnclaimedFees = styled(StyledBase)``;
const UnclaimedFees = () => {
  const [open, setOpen] = useState(true);
  function closeModal() {
    setOpen(false);
  }
  function openModal() {
    setOpen(true);
  }
  return (
    <StyledUnclaimedFees>
      <div className="vchb">
        <span className="title">Unclaimed fees</span>
        <SolidButton onClick={openModal} />
      </div>
      <span className="value">$-</span>
      <div className="box">
        <div className="vchb w-full">
          <div className="hvc">
            <img src="" />
            <span className="symbol">ETH</span>
          </div>
          <span className="balance">{'<0'}</span>
        </div>
        <div className="vchb w-full">
          <div className="hvc">
            <img src="" />
            <span className="symbol">USDC</span>
          </div>
          <span className="balance">{'0.001675'}</span>
        </div>
      </div>
      <ClaimFeesModal isOpen={open} onRequestClose={closeModal} />
    </StyledUnclaimedFees>
  );
};

const StyledSolidWrap = styled.div`
  height: 35px;
  background-color: #5ee0ff;
  border-radius: 12px;
  padding: 0 12px;
  cursor: pointer;
  color: #131313;
`;
const SolidButton = (props: any) => {
  return (
    <StyledSolidWrap {...props} className="hvc">
      Collect fees
    </StyledSolidWrap>
  );
};

export default memo(PoolBaseData);
