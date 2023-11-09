import styled from 'styled-components';

const FeeSelectWrapper = styled.div`
  font-size: 14px;
  color: #fff;
  font-weight: 400;
  margin-top: 10px;
`;
const FeeSelectBox = styled.div`
  border: 1px solid #3d363d;
  border-radius: 16px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;
const FeeSelectTier = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
const FeeSelectTag = styled.div`
  font-size: 12px;
  padding: 0px 10px;
  height: 30px;
  border-radius: 36px;
  background-color: #262626;
  line-height: 30px;
  display: inline-block;
`;
const FeeSelectButton = styled.div`
  height: 26px;
  line-height: 26px;
  padding: 0px 10px;
  border-radius: 6px;
  background-color: #262626;
  cursor: pointer;
`;
const FeeStages = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 4px;
`;
const FeeStage = styled.div<{ active?: boolean }>`
  border: ${({ active }) => (active ? '2px solid #5EE0FF' : '1px solid #3d363d')};
  border-radius: 12px;
  width: 25%;
  height: 100px;
  padding: 10px 0px 10px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
`;
const FeeStageDesc = styled.div`
  font-size: 12px;
  color: #8e8e8e;
  white-space: nowrap;
`;
const FeeStageLabel = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Checked = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #5ee0ff;
  text-align: center;
  margin-right: 10px;
`;

const FEE_STAGES = [
  {
    fee: '0.01',
    desc: 'Best for very stable pairs',
    select: '0',
  },
  {
    fee: '0.05',
    desc: 'Best for stable pairs',
    select: '67',
  },
  {
    fee: '0.3',
    desc: 'Best for most pairs',
    select: '32',
  },
  {
    fee: '1',
    desc: 'Best for exotic pairs',
    select: '1',
  },
];

export default function FreeSelect() {
  return (
    <FeeSelectWrapper>
      <FeeSelectBox>
        <FeeSelectTier>
          <FeeStageLabel>0.05% fee tier</FeeStageLabel>
          <FeeSelectTag>67% select</FeeSelectTag>
        </FeeSelectTier>
        <FeeSelectButton>Hide</FeeSelectButton>
      </FeeSelectBox>
      <FeeStages>
        {FEE_STAGES.map((stage) => (
          <FeeStage key={stage.fee}>
            <FeeStageLabel>
              <div>{stage.fee}%</div>
              {/* <Checked>
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 3.5L4 6.5L9.5 1"
                    stroke="#131313"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Checked> */}
            </FeeStageLabel>
            <FeeStageDesc>{stage.desc}</FeeStageDesc>
            <div>
              <FeeSelectTag>{stage.select}% select</FeeSelectTag>
            </div>
          </FeeStage>
        ))}
      </FeeStages>
    </FeeSelectWrapper>
  );
}
