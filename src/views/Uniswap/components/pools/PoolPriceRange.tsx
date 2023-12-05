import { memo } from 'react';
import styled from 'styled-components';
import { StatusColor } from '../../config';
import { ArrowBothIcon } from './Icons';
import { tickToPrice } from '../../utils/tickMath';
import { sortTokens } from '../../utils/sortTokens';

const StyledWrap = styled.div<{ type?: string; $isDetail?: boolean }>`
  ${(props) =>
    props.type == '1' ? 'margin-top: 20px;' : 'margin-top: 15px;background-color: #FFE6C7;border-radius: 24px;'}
  ${(props) => props.$isDetail && 'padding: 20px;'}
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
  @media (max-width: 768px) {
    width: 100%;
    background-color: transparent;
  }
`;
const StyledHead = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #101010;
  .gap-20 {
    gap: 20px;
  }
  .point {
    width: 5px;
    height: 5px;
    border-radius: 100px;
    margin-right: 6px;
    background-color: #6efa95;
  }
  .range {
    font-size: 14px;
    color: #6efa95;
    font-weight: bold;
  }
  .switch {
    border-radius: 8px;
    background-color: #101010;
    padding: 2px 4px;
    .item {
      font-size: 12px;
      color: #ffffff;
      cursor: pointer;
      height: 26px;
      padding: 0 8px;
    }
    .item.active {
      border-radius: 6px;
      background-color: #fff0dd;
      color: #101010;
    }
  }
`;
const StyledBody = styled.div`
  margin-top: 12px;
  .minmax {
    gap: 12px;
  }
  .mt-17 {
    margin-top: 17px;
  }
`;

const Status = styled.div<{ status: 'in' | 'out' | 'removed' }>`
  color: ${({ status }) => StatusColor[status]};
  display: flex;
  align-items: center;
  gap: 4px;
  &::before {
    content: '';
    display: inline;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: ${({ status }) => StatusColor[status]};
  }
`;
const PoolPriceRange = ({ detail, isReverse, onSetReverse, type, isDetail }: any) => {
  const [_token0 = {}, _token1 = {}] = sortTokens(detail?.token0, detail?.token1);
  const tickArgs = {
    decimals0: _token0.decimals,
    decimals1: _token1.decimals,
    isReverse: !isReverse,
  };
  const priceRate = `${isReverse ? _token0.symbol : _token1.symbol} per ${isReverse ? _token1.symbol : _token0.symbol}`;
  const _tickLow = !isReverse ? detail?.tickLow : detail?.tickHigh;
  const _tickHigh = !isReverse ? detail?.tickHigh : detail?.tickLow;
  const isFullRange = detail?.tickLow === -887272 && detail?.tickHigh === 887272;

  return (
    <StyledWrap type={type} $isDetail={isDetail}>
      <StyledHead className="vchb">
        <div className="hvc gap-20">
          <span>Pirce range</span>
          {detail?.status && (
            <Status status={detail?.status}>
              {detail?.status === 'removed' ? 'Removed' : detail?.status === 'in' ? 'In range' : 'Out range'}
            </Status>
          )}
        </div>
        <div className="switch hvc">
          <span className={`item hvc ${!isReverse && 'active'}`} onClick={onSetReverse}>
            {detail?.token1.symbol}
          </span>
          <span className={`item hvc ${isReverse && 'active'}`} onClick={onSetReverse}>
            {detail?.token0.symbol}
          </span>
        </div>
      </StyledHead>
      <StyledBody>
        <div className="vchb minmax">
          <PriceDetailBox
            priceType="Min price"
            price={
              isFullRange
                ? '0'
                : tickToPrice({
                    ...tickArgs,
                    tick: _tickLow,
                  })
            }
            priceRate={priceRate}
            type={type}
          />
          <ArrowBothIcon />
          <PriceDetailBox
            priceType="Max price"
            price={
              isFullRange
                ? '∞'
                : tickToPrice({
                    ...tickArgs,
                    tick: _tickHigh,
                  })
            }
            priceRate={priceRate}
            type={type}
          />
        </div>
        <div className="mt-17">
          <PriceDetailBox
            priceType="Current price"
            price={tickToPrice({ ...tickArgs, tick: detail?.tick })}
            priceRate={priceRate}
            type={type}
          />
        </div>
      </StyledBody>
    </StyledWrap>
  );
};

const StyledPriceDetailBox = styled.div<{ $type?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ $type }) => ($type !== '1' ? '#fff0dd' : '#FFE6C7')};
  border-radius: 16px;
  height: 118px;
  flex-grow: 1;
  .text {
    font-size: 14px;
    color: #101010;
  }
  .value {
    font-size: 20px;
    color: #101010;
    font-weight: bold;
    margin: 6px 0 2px 0;
  }
  .desc {
    font-size: 14px;
    color: #a49b9a;
  }
`;
const PriceDetailBox = ({
  priceType,
  price,
  type,
  priceRate,
}: {
  priceType: string;
  price: any;
  priceRate: string;
  type?: string;
}) => {
  return (
    <StyledPriceDetailBox $type={type}>
      <span className="text">{priceType}</span>
      <span className="value">{price}</span>
      <span className="desc">{priceRate}</span>
    </StyledPriceDetailBox>
  );
};

export default memo(PoolPriceRange);
