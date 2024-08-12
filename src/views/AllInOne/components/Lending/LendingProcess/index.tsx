import styled from 'styled-components';

const Process = styled.div`
  position: relative;
  width: 100%;
`;
const ActiveBar = styled.div`
  height: 5px;
  border-radius: 10px;
  background-color: var(--supply-color);
  position: absolute;
  left: 0px;
  top: 12px;
`;
const Range = styled.input`
  -webkit-appearance: none;
  width: 100%;
  background-color: transparent;
  position: relative;
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 5px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.3);
  }
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #fff;
    border: 2px solid #181a27;
    margin-top: -7px;
  }
`;
const Percent = styled.div`
  display: flex;
  justify-content: space-between;
`;
const PercentItem = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #979abe;
  cursor: pointer;
`;

const LendingProcess = (props: { value: number; onChange?: (value: number) => void }) => {
  const { value, onChange } = props;
  const Steps = [0, 25, 50, 75, 100];
  return (
    <Process>
      <ActiveBar style={{ width: `${value}%` }} />
      <Range
        type="range"
        value={value}
        step="any"
        min="0"
        max="100"
        onChange={(e) => {
          onChange?.(Number(e.target.value));
        }}
      />
      <Percent>
        {Steps.map((step) => (
          <PercentItem
            key={step}
            onClick={() => {
              onChange?.(step);
            }}
          >
            {step}%
          </PercentItem>
        ))}
      </Percent>
    </Process>
  );
};

export default LendingProcess;
