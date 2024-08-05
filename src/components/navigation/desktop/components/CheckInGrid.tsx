import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import IconFistUnActive from '@public/images/header/fist-unactive.svg'
import IconCheckIn from '@public/images/header/checkIn.svg'
enum DayStatus {
  NotChecked,
  Checked,
  Special
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 10px;
  column-gap: 8px;
`;

const Box = styled.div<{ status: DayStatus }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 82px;
  height: 82px;
  justify-content: space-around;
  background-color: ${({ status }) => 
    status === DayStatus.Checked ? '#000000' : 'rgba(31, 34, 41, 1)'};
  border-radius: 8px;

  position: relative;
  ${({ status }) => {
    if (status === DayStatus.NotChecked) {
      return css`border: 1px dashed rgba(55, 58, 83, 1);`;
    }
    if (status === DayStatus.Special) {
      return css`
        background-image: url('/images/header/check-box.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      `;
    }
    return css`border: none;`;
  }}


`;

const DayLabel = styled.div`
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 600;
    line-height: 12px;
    text-align: center;
    color: #fff;
`;

const CheckMark = styled(IconCheckIn)`
  width: 23px;
  height: 17px;
`;

const FistIcon = styled(IconFistUnActive)`
  width: 33px;
  height: 29px;
`;

const StyleIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
`

const initialStatus = [
  DayStatus.Checked,
  DayStatus.Checked,
  DayStatus.Checked,
  DayStatus.NotChecked,
  DayStatus.Special,
  DayStatus.NotChecked,
  DayStatus.NotChecked,
  DayStatus.Special,
  DayStatus.NotChecked,
  DayStatus.NotChecked,
];

const CheckInGrid: React.FC = () => {
  const [statuses, setStatuses] = useState<DayStatus[]>(initialStatus);

  const handleClick = (index: number) => {
    const newStatuses = statuses.slice();
    if (newStatuses[index] === DayStatus.NotChecked) {
      newStatuses[index] = DayStatus.Checked;
      setStatuses(newStatuses);
    }
  };

  return (
    <Container>
      {statuses.map((status, index) => (
        <Box 
          key={index} 
          status={status} 
          onClick={() => handleClick(index)}
        >
          <DayLabel>Day {index + 1}</DayLabel>
          <StyleIcon>
            {status === DayStatus.Checked && <CheckMark />}
            {status === DayStatus.NotChecked && <FistIcon />}
          </StyleIcon>
        </Box>
      ))}
    </Container>
  );
};

export default CheckInGrid;
