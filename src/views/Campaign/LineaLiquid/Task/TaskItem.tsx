import styled from 'styled-components';

import TicketAction from './TicketAction';

const Wrapper = styled.div`
  padding: 35px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  .title-with-img {
    display: flex;
    align-items: center;
    .icon {
      width: 66px;
    }
    .title-text {
      font-size: 24px;
      font-weight: 600;
      margin-left: 28px;
    }
  }
`;

const Content = styled.div`
  .desc-item {
    padding: 20px 0;
    display: flex;
    align-items: end;
    gap: 20px;
    position: relative;
    &:not(:first-child) {
      border-top: 1px solid rgba(151, 154, 190, 0.3);
    }
    &:last-child {
      padding-bottom: 0;
      .action-btn {
        bottom: 0;
      }
    }

    .desc-text {
      flex: 1;
      /* margin-right: 250px; */
      .title {
        font-size: 24px;
        font-weight: 600;
      }

      .desc-action-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .desc-list {
        color: rgba(151, 154, 190, 1);
        margin-top: 10px;
        margin-right: 250px;
        ul {
          margin: 0;
          padding: 0;
          padding-left: 30px;
          list-style: disc;
          &.no-icon {
            list-style: none;
            margin-top: 5px;
            display: flex;
            flex-wrap: wrap;
            li {
              width: 50%;
            }
          }
        }
        .sep {
          font-weight: 700;
          color: #fff;
        }
      }
    }
    .float-btn {
      position: absolute;
      right: 0;
      bottom: 20px;
      padding-bottom: 72px;
      .time-tip {
        font-size: 14px;
        font-weight: 500;
        margin: 0 0 10px 10px;
      }
    }
    .action-btn {
      width: 250px;
      height: 52px;
      position: absolute;
      margin-top: 20px;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 6px;
      background-color: rgba(0, 0, 0, 0.5);
      &.disabled {
        opacity: 0.3;
        cursor: default;
      }
      .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 20px;
      }
    }
  }
`;

interface Props {
  icon: string;
  title: string;
  typeText: string;
  typeColor: string;
  showTicketAction?: boolean;
  ticket: number;
  pendingTicket?: number;
  refresh: () => void;
  renderDesc: () => React.ReactNode;
}

export default function TaskItem({
  icon,
  title,
  typeText,
  typeColor,
  renderDesc,
  showTicketAction = true,
  refresh,
  ticket = 0,
  pendingTicket = 0
}: Props) {
  return (
    <Wrapper>
      <Title>
        <div className="title-with-img">
          <img className="icon" src={icon} />
          <div className="title-text">
            <div className="main-text">
              {title}
              <div style={{ color: typeColor, fontWeight: 900 }} className="type">
                {' '}
                {typeText}
              </div>
            </div>
          </div>
        </div>

        {showTicketAction && (
          <TicketAction
            refresh={refresh}
            showPengding={typeText === 'Mendi'}
            ticket={ticket}
            pendingTicket={pendingTicket}
          />
        )}
      </Title>

      <Content>{renderDesc()}</Content>
    </Wrapper>
  );
}
