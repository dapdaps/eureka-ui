import { memo, useState } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  margin-top: 12px;
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

const Fee = () => {
  const [feeList, setFeeList] = useState([
    {
      value: '0.01%',
      description: 'Best for very stable pairs',
      selecedNum: '0%',
    },
    {
      value: '0.05%',
      description: 'Best for stable pairs',
      selecedNum: '67%',
    },
    {
      value: '0.3%',
      description: 'Best for most pairs',
      selecedNum: '31%',
    },
    {
      value: '1%',
      description: 'Best for most pairs',
      selecedNum: '1%',
    },
  ]);
  return (
    <StyledContainer>
      <StyledSelectedFeeArea>
        <p className="pendingTip">The % you will earn in fees.</p>
        <div className="hideOrEditButton">Hide</div>
      </StyledSelectedFeeArea>
      <StyledFeeSelectList>
        {feeList.map(({ value, description, selecedNum }) => {
          return <FeeCell key={value} value={value} description={description} selecedNum={selecedNum} />;
        })}
      </StyledFeeSelectList>
    </StyledContainer>
  );
};
export default memo(Fee);

const StyledCell = styled.div`
  border: 1px solid #3d363d;
  padding: 8px 6px;
  border-radius: 12px;
  cursor: pointer;
  flex-grow: 1;
  .value {
    font-size: 14px;
    color: #8e8e8e;
  }
  .description {
    font-size: 12px;
    color: #8e8e8e;
    margin: 0;
  }
  .num {
    border-radius: 36px;
    padding: 4px 10px;
    background-color: #262626;
    color: #fff;
    font-size: 12px;
  }
`;
const FeeCell = ({ value, description, selecedNum }: { value: string; description: string; selecedNum: string }) => {
  return (
    <StyledCell>
      <span className="value">{value}</span>
      <p className="description">{description}</p>
      <span className="num">{selecedNum} select</span>
    </StyledCell>
  );
};
