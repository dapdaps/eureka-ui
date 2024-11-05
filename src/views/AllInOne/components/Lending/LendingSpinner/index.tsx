import styled from 'styled-components';

const Spinner = styled.div`
  position: fixed;
  z-index: 8001;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
`;
const SpinnerCover = styled.div`
  position: absolute;
  z-index: 50;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  background: var(--agg-secondary-color, #000);
  opacity: 0.6;
`;
const SpinnerContainer = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const SpinnerImg = styled.img`
  width: 50px;
`;

const LendingSpinner = (props: { from?: string }) => {
  const { from } = props;

  return (
    <Spinner>
      {from !== 'layer' && <SpinnerCover />}
      <SpinnerContainer>
        <SpinnerImg src={from === 'layer' ? '/assets/images/layer-spinner.png' : '/assets/images/dapdap-spinner.gif'} />
      </SpinnerContainer>
    </Spinner>
  );
};

export default LendingSpinner;
