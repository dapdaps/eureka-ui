import IconNoPrize from '@public/images/campaign/icon-no-prize.svg';
import styled from 'styled-components';

const StyledContainer = styled.div`
  padding: 10px 0 41px;
`;
const StyledTitle = styled.div`
  color: #fff;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  position: relative;
  display: flex;
  justify-content: center;

  .text {
    position: absolute;
    z-index: 1;
    top: 20px;
  }
`;
const StyledText = styled.div`
  color: #fff;
  margin-top: 30px;
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
`;

const NoPrize = (props: Props) => {
  const { round, isFoot = true, className, style } = props;

  return (
    <StyledContainer className={className} style={style}>
      <StyledTitle className={`${className}-title`}>
        <span className={`text ${className}-title-text`}>No Prize</span>
        <IconNoPrize className={`${className}-icon`} />
      </StyledTitle>
      {isFoot && (
        <StyledText>
          You weren&apos;t selected in round {round} <br />
          Good luck is on its way!
        </StyledText>
      )}
    </StyledContainer>
  );
};

export default NoPrize;

interface Props {
  round?: number;
  isFoot?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
