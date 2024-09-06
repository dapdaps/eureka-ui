import { ActiveBar, Percent, PercentItem, Process, Range } from './styles';

const Steps = [0, 25, 50, 75, 100];

const LendingProcess = (props: Props) => {
  const { value, onChange } = props;

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
          onChange?.(e.target.value);
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

export interface Props {
  value: number;

  onChange?(value: number | string): void;
}
