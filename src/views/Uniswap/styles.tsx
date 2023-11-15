import styled from 'styled-components';

const StyledLeftBg = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  transform: translateX(-100%);
  opacity: 0.3;
`;

export const LeftBg = ({ style }: any) => {
  return (
    <StyledLeftBg style={style}>
      <svg width="235" height="84" viewBox="0 0 470 168" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M285.584 0.152344H300.452V18.7599H285.629V33.6281H300.498V18.7599H319.106V33.6281H352.581V52.2358H367.449V33.6281H386.057V52.2358H400.88V67.1038H386.012V52.2358H367.449V67.1038H300.498V85.7117H285.629V67.1038H267.021V18.7599H285.584V0.152344Z"
          fill="#61DFFF"
        />
        <path d="M419.488 67.1038H434.355V85.7117H467.832V100.58H434.355V85.7117H419.488V67.1038Z" fill="#61DFFF" />
        <path d="M501.488 100.805H486.619V119.413H501.488V100.805Z" fill="#61DFFF" />
        <path d="M601.78 152.889H586.912V167.757H601.78V152.889Z" fill="#61DFFF" />
        <path d="M635.255 152.889H620.387V167.757H635.255V152.889Z" fill="#61DFFF" />
        <path d="M15.3799 84.5659H0.511719L0.511719 99.4339H15.3799L15.3799 84.5659Z" fill="#61DFFF" />
        <path d="M48.855 84.5659L33.9872 84.5659V99.4339H48.855V84.5659Z" fill="#61DFFF" />
      </svg>
    </StyledLeftBg>
  );
};
