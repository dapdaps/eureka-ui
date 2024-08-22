import IconCheckIn from '@public/images/header/checkIn.svg'
import IconFistUnActive from '@public/images/header/fist-unactive.svg'
import React, { forwardRef,useImperativeHandle, useState } from 'react';
import styled, { css } from 'styled-components';

import { CheckInStatus, type IDayStatus } from './types';


const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 10px;
  column-gap: 8px;
`;

const Box = styled.div<{ status: CheckInStatus }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  height: 80px;
  justify-content: space-around;
  background-color: ${({ status }) => 
    status === CheckInStatus.claimed ? '#000000' : 'rgba(31, 34, 41, 1)'};
  border-radius: 8px;

  position: relative;
  ${({ status }) => {
    if (status === CheckInStatus.will_claim || status === CheckInStatus.claim) {
      return css`border: 1px dashed rgba(55, 58, 83, 1);`;
    }
    // if (status === CheckInStatus.Special) {
    //   return css`
    //     background-image: url('/images/header/check-box.png');
    //     background-size: 80px 80px;
    //     background-position: center;
    //     background-repeat: no-repeat;
    //   `;
    // }
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
    .wait-checkin {
      width: 46px;
      height: 46px;
    }
`



interface IProps {
  dayStatus: IDayStatus[];
}

export interface CheckInGridRef {
  triggerCheckIn: (day: number) => void;
}

const CheckInGrid = forwardRef<CheckInGridRef, IProps>(
  ({ dayStatus }, ref) => {

  const [statuses, setStatuses] = useState<IDayStatus[]>(dayStatus);

  useImperativeHandle(ref, () => ({
    triggerCheckIn
  }));
  
  const triggerCheckIn = (day: number) => {
    const newStatuses = statuses.slice();
    const index = newStatuses.findIndex((item) => item.day === day);
    if (newStatuses[index].status === CheckInStatus.claim) {
      newStatuses[index].status = CheckInStatus.claimed;
      setStatuses(newStatuses);
    }
  };

  return (
    <Container>
      {statuses.map((item, index) => (
        <Box 
          key={index} 
          status={item.status} 
        >
          <DayLabel>Day {item.day ?? 'x'}</DayLabel>
          <StyleIcon>
            {item.status === CheckInStatus.claimed && <CheckMark />}
            {item.status === CheckInStatus.will_claim && <FistIcon />}
            {
              item.status === CheckInStatus.claim && <img className='wait-checkin' src="/images/header/wait-checkin.gif" alt="" />
            }
          </StyleIcon>
        </Box>
      ))}
    </Container>
  );
});

export default CheckInGrid;