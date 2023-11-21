import { memo, useState } from 'react';
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
  border: 1px solid #3d363d;
  padding: 12px;
  border-radius: 12px;
  min-height: 50px;
  .pendingTip {
    font-size: 12px;
    color: #8e8e8e;
    margin: 0;
  }
  .hideOrEditButton {
    border-radius: 6px;
    background-color: #262626;
    padding: 2px 6px;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.6);
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
  return (
    <StyledContainer>
      <StyledSelectedFeeArea>
        <p className="pendingTip">
          <div>{disabled || !fee ? 'The % you will earn in fees.' : `${FEES[fee]?.value} fee tier`}</div>
          {fee && <div className="num">{frequency[fee]}% select</div>}
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
  border: ${({ isSelected }) => (isSelected ? '2px solid #5EE0FF' : '1px solid #3d363d')};
  padding: 8px 6px;
  border-radius: 12px;
  cursor: pointer;
  width: 25%;
  box-sizing: border-box;

  .value {
    font-size: 14px;
    color: #8e8e8e;
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
  onClick,
}: {
  isSelected: boolean;
  value: string;
  description: string;
  selecedNum: string;
  i: number;
  onClick: () => void;
}) => {
  return (
    <StyledCell isSelected={isSelected} onClick={onClick} i={i}>
      <span className="value">
        <span>{value}</span>
        {isSelected && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#5EE0FF" />
            <path
              d="M6 9.5L9 12.5L14.5 7"
              stroke="#131313"
              strokeWidth="2"
              strokeLinecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </span>
      <p className="description">{description}</p>
      <div className="num">{selecedNum}% select</div>
    </StyledCell>
  );
};
