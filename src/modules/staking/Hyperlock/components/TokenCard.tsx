// @ts-nocheck
import Big from 'big.js';
import { memo } from 'react';
import styled from 'styled-components';

import Loading from '@/modules/components/Loading';
import { formatValueDecimal } from '@/utils/formate';

import PoolIcons from './PoolIcons';
const StyledContainer = styled.div`
  padding: 15px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #2e3142;
  transition: 0.5s;
  cursor: pointer;
  display: inline-block;
  margin-right: 12px;
  margin-top: 12px;
  vertical-align: top;

  &:hover {
    border-color: var(--primary);
  }

  .button {
    width: 100%;
    display: block;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const StyledValue = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin-top: 12px;
`;

const StyledId = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 8px;
`;

const StyledFeeWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 8px;
  gap: 7px;
`;

const StyledRange = styled.div`
  padding: 0px 6px;
  height: 16px;
  border-radius: 4px;
  background: #373a53;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
`;

const StyledAccuredFee = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const StyledAccureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const StyledIcon = styled.img`
  width: 26px;
  height: 26px;
`;
export default memo(function TokenCard(props) {
  const {
    name,
    amount0,
    price0,
    amount1,
    price1,
    id,
    from,
    fee,
    token0,
    token1,
    active,
    feeAmount0,
    feeAmount1,
    type,
    balance,
    price,
    onCardClick,
    onDeposit,
    onClaim,
    onWithdraw
  } = props;

  const _token0 = Big(amount0 || 0).mul(price0 || 0);
  const _token1 = Big(amount1 || 0).mul(price1 || 0);

  const total = _token0.add(_token1);

  const isInRange = Big(amount0 || 0).gt(0) && Big(amount1 || 0).gt(0);

  const _balance = Big(balance || 0).mul(price || 0);

  return (
    <StyledContainer
      style={{
        width: from === 'pool' ? '210px' : 'auto',
        borderColor: active ? 'var(--primary)' : '#373a53'
      }}
      onClick={onCardClick}
    >
      <StyledHeader>
        <div>
          <PoolIcons
            {...{
              icons: [token0.icon, token1.icon]
            }}
          />
        </div>
        <div>{name}</div>
      </StyledHeader>
      <StyledValue>{formatValueDecimal(fee ? total : _balance, '$', 4, true)}</StyledValue>
      <StyledId>ID: {fee ? id : `${id.slice(0, 6)}...${id.slice(-4)}`}</StyledId>
      {from !== 'pool' && (
        <>
          <StyledFeeWrapper>
            <div className="fee-wrapper">
              {fee && <div>{fee / 10000} %</div>}
              <div className="type-label">{type || 'V3'}</div>
            </div>
            {fee && (
              <StyledRange style={{ color: isInRange ? '#57e041' : '#EA580A' }}>
                {isInRange ? 'In' : 'Out'} range
              </StyledRange>
            )}
          </StyledFeeWrapper>
          {from === 'in-wallet' && (
            <button
              className="button primary"
              style={{ marginTop: 13, width: 220, height: 42 }}
              onClick={onDeposit}
              disabled={props.depositing}
            >
              {props.depositing ? <Loading /> : 'Deposit'}
            </button>
          )}
          {from === 'deposited' && (
            <>
              {type !== 'V2' && (
                <>
                  <StyledId>Accrued Fees</StyledId>
                  <StyledAccuredFee>
                    <StyledAccureItem>
                      <StyledIcon src={token0.icon} />
                      {formatValueDecimal(feeAmount0, '', 2, true)}
                    </StyledAccureItem>
                    <StyledAccureItem>
                      <StyledIcon src={token1.icon} />
                      {formatValueDecimal(feeAmount1, '', 2, true)}
                    </StyledAccureItem>
                  </StyledAccuredFee>
                </>
              )}
              {fee && (
                <button
                  className="button ghost"
                  style={{ marginTop: 14, width: 220, height: 42 }}
                  disabled={
                    props.claiming ||
                    Big(feeAmount0 || 0)
                      .add(feeAmount1)
                      .eq(0)
                  }
                  onClick={onClaim}
                >
                  {props.claiming ? <Loading size={16} /> : 'Claim'}
                </button>
              )}
              <button
                className="button primary"
                style={{ marginTop: 10, width: 220, height: 42 }}
                disabled={props.withdrawing}
                onClick={onWithdraw}
              >
                {props.withdrawing ? <Loading size={16} /> : 'Withdraw'}
              </button>
            </>
          )}
        </>
      )}
    </StyledContainer>
  );
});
