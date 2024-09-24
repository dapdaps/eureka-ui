import {
  StyledDot,
  StyledPercent,
  StyledRange,
  StyledSegment
} from '@/modules/lending/components/CompoundV3/Range/styles';

const CompoundV3Range = (props: Props) => {
  const { value } = props;

  const _value = value > 94 ? 94 : value;

  return (
    <StyledRange>
      <StyledSegment
        style={{
          width: _value + '%',
          backgroundColor: _value >= 80 ? '#F54E59' : _value >= 60 ? '#FFA947' : '#00AD79'
        }}
      />
      <StyledPercent>{value}%</StyledPercent>
      <StyledSegment style={{ width: 94 - _value + '%' }} />
      <StyledDot />
      <StyledSegment style={{ width: '6%' }} />
    </StyledRange>
  );
};

export default CompoundV3Range;

export interface Props {
  value: any;
}
