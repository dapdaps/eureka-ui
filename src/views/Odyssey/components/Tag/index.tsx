import cls from 'classnames';
import styled from 'styled-components';

export enum StatusType {
  ongoing = 'ongoing',
  ended = 'ended',
  un_start = 'un_start',
}

export const statusMap = {
  [StatusType.ongoing]: 'Live',
  [StatusType.ended]: 'Ended',
  [StatusType.un_start]: 'Upcoming',
};

const StyledTagContainer = styled.div`
  position: relative;
  .pool {
    position: relative;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 6px 12px;
    border-radius: 16px;
    border: 1px solid;
    background: rgba(32, 34, 47, 0.8);
    border-color: rgba(255, 255, 255, 0.15);
    &.ongoing {
      border-color: #57db64;
    }
  }
  &.ongoing {
    &:before {
      content: '';
      position: absolute;
      border-radius: 16px;
      width: 100%;
      height: 26px;
      box-shadow: 0px 0px 5px 6px rgba(87, 219, 100, 0.2);
      background: rgba(32, 34, 47, 0.8);
      animation: 1.5s linear infinite firstAnimation;
      z-index: 1;
    }
    @keyframes firstAnimation {
      0% {
        transform: scale(0.8);
      }
      50% {
        transform: scale(1);
      }
      100% {
        transform: scale(0.8);
      }
    }
  }
`;
const StyledFont = styled.div`
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  line-height: 12px;
  position: relative;
  text-transform: capitalize;
  font-family: Montserrat;
`;

export default function Tag({ status, className }: { status: StatusType; className?: string }) {
  return (
    <StyledTagContainer className={cls(`${className} ${status}`)}>
      <div className={cls('pool', status)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
          <circle cx="4" cy="4" r="4" fill={status === StatusType.ongoing ? '#57DB64' : '#979ABE'} />
        </svg>
        <StyledFont>{statusMap[status] || statusMap[StatusType.un_start]}</StyledFont>
      </div>
    </StyledTagContainer>
  );
}
