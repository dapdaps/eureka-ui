import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import useFeeFrequency from '../../hooks/useFeeFrequency';

const StyledContainer = styled.div`
  margin-top: 12px;
  .num {
    border-radius: 36px;
    padding: 4px 10px;
    background-color: #262626;
    color: #fff;
    font-size: 12px;
    display: inline-block;
    white-space: nowrap;
    margin-top: 6px;
  }
  @media (max-width: 768px) {
    .num {
      padding: 4px 5px;
      margin-top: 10px;
    }
  }
`;
const StyledSelectedFeeArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff0dd;
  padding: 12px;
  border-radius: 12px;
  min-height: 50px;
  .pendingTip {
    font-size: 12px;
    color: #101010;
    margin: 0;
    @media (max-width: 768px) {
      display: flex;
      align-items: center;
      gap: 6px;
      .num {
        margin-top: 0px !important;
      }
    }
  }
  .hideOrEditButton {
    border-radius: 6px;
    background-color: #262626;
    padding: 2px 6px;
    cursor: pointer;
    color: #ffffff;
    font-size: 14px;
  }
`;
const StyledFeeSelectList = styled.div`
  display: flex;
  algin-items: center;
  gap: 4px;
  margin-top: 12px;
`;

const FEES = {
  100: {
    value: '0.01%',
    description: 'Best for very stable pairs',
    key: 100,
  },
  500: {
    value: '0.05%',
    description: 'Best for stable pairs',
    key: 500,
  },
  3000: {
    value: '0.3%',
    description: 'Best for most pairs',
    key: 3000,
  },
  10000: {
    value: '1%',
    description: 'Best for exotic pairs',
    key: 10000,
  },
} as { [key: number]: any };

const Fee = ({ fee, token0, token1, disabled, onSelectFee }: any) => {
  const feeList = Object.values(FEES);
  const [showList, setShowList] = useState(false);
  const frequency = useFeeFrequency({ token0, token1 });
  useEffect(() => {
    if (!fee) setShowList(true);
  }, [fee]);
  return (
    <StyledContainer>
      <StyledSelectedFeeArea>
        <p className="pendingTip">
          <div>{disabled || !fee ? 'The % you will earn in fees.' : `${FEES[fee]?.value} fee tier`}</div>
          {token0 && token1 && <div className="num">{frequency[fee]}% select</div>}
        </p>
        <div
          className="hideOrEditButton"
          style={{ cursor: token0 && token1 ? 'pointer' : 'not-allowed' }}
          onClick={() => {
            if (token0 && token1) setShowList(!showList);
          }}
        >
          {showList ? 'Hide' : 'Edit'}
        </div>
      </StyledSelectedFeeArea>
      {showList && (
        <StyledFeeSelectList>
          {feeList.map(({ value, key, description }, i) => {
            return (
              <FeeCell
                key={value}
                isSelected={key === fee}
                value={value}
                description={description}
                selecedNum={frequency[key]}
                onClick={() => {
                  onSelectFee(key);
                }}
                i={i}
                showPercent={token0 && token1}
              />
            );
          })}
        </StyledFeeSelectList>
      )}
    </StyledContainer>
  );
};
export default memo(Fee);

const StyledCell = styled.div<{ isSelected: boolean; i: number }>`
  background-color: #fff0dd;
  padding: 8px 6px;
  border-radius: 12px;
  cursor: pointer;
  width: 25%;
  box-sizing: border-box;

  .value {
    font-size: 14px;
    color: #101010;
    display: flex;
    justify-content: space-between;
  }
  .description {
    font-size: 12px;
    color: #8e8e8e;
    margin: 0;
    ${({ i }) => i === 0 && 'letter-spacing: -0.3px;'}
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    padding: 8px 4px;
    .description {
      white-space: wrap;
      letter-spacing: 0px;
    }
  }
`;
const FeeCell = ({
  isSelected,
  value,
  description,
  selecedNum,
  i,
  showPercent,
  onClick,
}: {
  isSelected: boolean;
  value: string;
  description: string;
  selecedNum: string;
  showPercent?: boolean;
  i: number;
  onClick: () => void;
}) => {
  return (
    <StyledCell isSelected={isSelected} onClick={onClick} i={i}>
      <span className="value">
        <span>{value}</span>
        {isSelected && (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="10" fill="#101010" />
            <path
              d="M6 9.5L9 12.5L14.5 7"
              stroke="#FFE6C7"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </span>
      <p className="description">{description}</p>
      {showPercent && <div className="num">{selecedNum}% select</div>}
    </StyledCell>
  );
};
