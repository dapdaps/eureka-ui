import { memo, useState } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin-top: 12px;
  .num {
    border-radius: 36px;
    padding: 4px 10px;
    background-color: #262626;
    color: #fff;
    font-size: 12px;
    display: inline-block;
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
  gap: 8px;
  margin-top: 12px;
`;

const FEES = {
  100: {
    value: '0.01%',
    description: 'Best for very stable pairs',
    selecedNum: '0%',
    key: 100,
  },
  300: {
    value: '0.05%',
    description: 'Best for stable pairs',
    selecedNum: '67%',
    key: 300,
  },
  3000: {
    value: '0.3%',
    description: 'Best for most pairs',
    selecedNum: '31%',
    key: 3000,
  },
  10000: {
    value: '1%',
    description: 'Best for most pairs',
    selecedNum: '1%',
    key: 10000,
  },
} as { [key: number]: any };

const Fee = ({ fee, disabled, onSelectFee }: any) => {
  const feeList = Object.values(FEES);
  const [showList, setShowList] = useState(false);
  return (
    <StyledContainer>
      <StyledSelectedFeeArea>
        <p className="pendingTip">
          <div>{disabled ? 'The % you will earn in fees.' : `${FEES[fee].value} fee tier`}</div>
          <div className="num">{FEES[fee].selecedNum} select</div>
        </p>
        <div
          className="hideOrEditButton"
          onClick={() => {
            setShowList(!showList);
          }}
        >
          {showList ? 'Hide' : 'Edit'}
        </div>
      </StyledSelectedFeeArea>
      {showList && (
        <StyledFeeSelectList>
          {feeList.map(({ value, key, description, selecedNum }) => {
            return (
              <FeeCell
                key={value}
                isSelected={key === fee}
                value={value}
                description={description}
                selecedNum={selecedNum}
                onClick={() => {
                  onSelectFee(key);
                }}
              />
            );
          })}
        </StyledFeeSelectList>
      )}
    </StyledContainer>
  );
};
export default memo(Fee);

const StyledCell = styled.div<{ isSelected: boolean }>`
  border: ${({ isSelected }) => (isSelected ? '2px solid #5EE0FF' : '1px solid #3d363d')};
  padding: 8px 6px;
  border-radius: 12px;
  cursor: pointer;
  flex-grow: 1;

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
  }
`;
const FeeCell = ({
  isSelected,
  value,
  description,
  selecedNum,
  onClick,
}: {
  isSelected: boolean;
  value: string;
  description: string;
  selecedNum: string;
  onClick: () => void;
}) => {
  return (
    <StyledCell isSelected={isSelected} onClick={onClick}>
      <span className="value">
        <span>{value}</span>
        {isSelected && (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="10" fill="#5EE0FF" />
            <path
              d="M6 9.5L9 12.5L14.5 7"
              stroke="#131313"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        )}
      </span>
      <p className="description">{description}</p>
      <div className="num">{selecedNum} select</div>
    </StyledCell>
  );
};
