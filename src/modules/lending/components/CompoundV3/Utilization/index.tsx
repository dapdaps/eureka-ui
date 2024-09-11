import { StyledAmount, StyledContainer, StyledRing } from '@/modules/lending/components/CompoundV3/Utilization/styles';

const CompoundV3Utilization = (props: Props) => {
  const { value } = props;

  return (
    <StyledContainer>
      <StyledRing xmlns="http://www.w3.org/200/svg">
        <circle stroke="#000"></circle>
        <circle
          stroke="#00D395"
          style={{
            strokeDasharray:
              'calc(2 * 3.1415 * (20 - 3) / 2 * (' +
              props.value +
              ' / 100)) 1000'
          }}
        ></circle>
      </StyledRing>
      <StyledAmount>{value}%</StyledAmount>
    </StyledContainer>
  );
};

export default CompoundV3Utilization;

export interface Props {
  value: any;
}
