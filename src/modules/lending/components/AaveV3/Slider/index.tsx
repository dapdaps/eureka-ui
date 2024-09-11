import { styled } from 'styled-components';

const Wrapper = styled.div`
  .SliderRoot {
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    touch-action: none;
    width: 100%;
    height: 20px;
  }

  .SliderTrack {
    background-color: #383947;
    position: relative;
    flex-grow: 1;
    border-radius: 9999px;
    height: 3px;
  }

  .SliderRange {
    position: absolute;
    background-color: white;
    border-radius: 9999px;
    height: 100%;
  }

  .SliderThumb {
    display: block;
    width: 20px;
    height: 20px;
    background-color: white;
    box-shadow: 0 2px 10px #000;
    border-radius: 10px;
  }
  .SliderThumb:hover {
    /* background-color: var(--violet3); */
  }
  .SliderThumb:focus {
    outline: none;
    /* box-shadow: 0 0 0 5px var(--blackA8); */
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  font-weight: 700;
  padding: 10px 0;
  color: white;
`;
const Leverage = styled.div`
  color: #8a8db9;
`;
const LeverageValue = styled.span`
  color: white;
`;

const Slider = () => {
  const { LEVERAGE, onSliderChange } = props;

  const MIN_LEVERAGE = 1.1;
  State.init({
    value: [MIN_LEVERAGE],
  });

  function onChange(_value) {
    onSliderChange(_value);
    State.update({
      value: [_value],
    });
  }

  return (
    <Wrapper>
      <Leverage>
        Leverage
        <LeverageValue>x {state.value}</LeverageValue>
      </Leverage>
      <Title>
        <span>{state.value}</span>
        <span>{LEVERAGE}</span>
      </Title>
      <Slider.Root
        className="SliderRoot"
        value={state.value}
        //   defaultValue={[MIN_LEVERAGE]}
        min={MIN_LEVERAGE}
        max={LEVERAGE}
        step={0.1}
        aria-label="Volume"
        onValueChange={onChange}
      >
        <Slider.Track className="SliderTrack">
          <Slider.Range className="SliderRange" />
        </Slider.Track>
        <Slider.Thumb className="SliderThumb" />
      </Slider.Root>
    </Wrapper>
  );
};

export default Slider;
