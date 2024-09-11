// @ts-nocheck
import { memo } from "react";
import styled from "styled-components";

const StyledContainer = styled.div``;
const StyledTop = styled.div``;
const StyledBack = styled.div`
  margin: 20px 0 24px;
  display: flex;
  align-items: center;
  gap: 14px;
  cursor: pointer;
  color: #979ABE;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 160px;
`;
const StyledContent = styled.div``;
const StyledCard = styled.div`
  width: 650px;
  margin: 0 auto;
  border-radius: 16px;
  border: 1px solid #373A53;
  background: #262836;
  overflow: hidden;
`;
const StyledCardHead = styled.div`
  padding: 18px 16px 18px 30px;
  background: #32364B;
  border-bottom: 1px solid #373A53;
  
  .strategy-title {
    color: #FFF;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .strategy-description {
    color: #979ABE;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 8px;
  }
`;
const StyledCardBody = styled.div`
  padding: 18px 33px 18px 33px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const StyledCardFoot = styled.div`

`;

export default memo(function StrategyFactoryDetail(props) {
  const {
    currentStrategy,
    onStrategyClose,
  } = props;
  const DynamicComponent = currentStrategy.formContent

  const handleClose = () => {
    onStrategyClose();
  };
  return (
    <StyledContainer>
      <StyledTop>
        <StyledBack onClick={handleClose}>
          <div className="back-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="13"
              viewBox="0 0 9 13"
              fill="none"
            >
              <path
                d="M7.5 1L2 6.49992L7.5 12"
                stroke="#979ABE"
                stroke-width="2"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <div className="back-title">
            Back to Strategies
          </div>
        </StyledBack>
      </StyledTop>
      <StyledContent>
        <StyledCard>
          <StyledCardHead>
            <div className="strategy-title">
              {currentStrategy.NAME}
            </div>
            <div className="strategy-description">
              {currentStrategy.DESCRIPTION_LAUNCH?.join(' ')}
            </div>
          </StyledCardHead>
          <StyledCardBody>
            <DynamicComponent
              {...{
                ...props,
              }}
            />
          </StyledCardBody>
          <StyledCardFoot></StyledCardFoot>
        </StyledCard>
      </StyledContent>
    </StyledContainer>
  );
})

