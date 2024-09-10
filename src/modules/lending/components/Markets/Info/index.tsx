import Big from 'big.js';

import LendingTotal from '@/modules/lending/components/Total';

import {
  StyledInfo,
  StyledInfoContent,
  StyledInfoItem,
  StyledInfoTips,
  StyledInfoTitle,
} from './styles';

const LendingMarketInfo = (props: Props) => {
  const {
    userUnderlyingBalance,
    underlyingToken,
    underlyingPrice,
    minBorrowAmount,

    borrowLimit,
    dexConfig,
    from,
  } = props;

  return (
    <StyledInfo>
      <StyledInfoContent>
        <StyledInfoTitle>Your info</StyledInfoTitle>
        <StyledInfoItem>
          <div>Available to Supply</div>
          <div>
                <span className="white">
                  <LendingTotal
                    total={userUnderlyingBalance}
                    digit={2}
                    unit=""
                  />
                </span>{' '}
            {underlyingToken?.symbol}
          </div>
        </StyledInfoItem>
        <StyledInfoItem>
          <div>Available to Borrow</div>
          <div>
                <span className="white">
                  <LendingTotal
                    total={Big(underlyingPrice || 0).eq(0) ? '0' : Big(borrowLimit || 0).div(underlyingPrice || 1).toString()}
                    digit={2}
                    unit=""
                  />
                </span>{' '}
            {underlyingToken?.symbol}
          </div>
        </StyledInfoItem>

        {dexConfig.name === 'Ionic' && (
          <StyledInfoItem>
            <div>Min Borrow</div>
            <div>
              <span className="white">{minBorrowAmount}</span>{' '}
              {underlyingToken?.symbol}
            </div>
          </StyledInfoItem>
        )}
        <StyledInfoTips>
          {from === 'layer' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <circle cx="7.5" cy="7.5" r="7" stroke="#6F6F6F" />
              <path
                d="M7.5 7.5L7.5 11.25"
                stroke="#6F6F6F"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <circle cx="7.5" cy="4.6875" r="0.9375" fill="#6F6F6F" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <circle cx="6" cy="6" r="5.5" stroke="#EBF479" />
              <path
                d="M6 6L6 9"
                stroke="#EBF479"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <circle cx="6" cy="3.75" r="0.75" fill="#EBF479" />
            </svg>
          )}
          <div>
            To borrow you need to supply any asset to be used as collateral.
          </div>
        </StyledInfoTips>
      </StyledInfoContent>
    </StyledInfo>
  );
};

export default LendingMarketInfo;

interface Props {
  userUnderlyingBalance?: string;
  underlyingToken?: any;
  underlyingPrice?: string;
  minBorrowAmount?: string;
  borrowLimit?: string;
  dexConfig: any;
  from?: string;
}
