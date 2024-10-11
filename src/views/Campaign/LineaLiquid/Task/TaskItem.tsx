import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 35px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  .action {
    display: flex;
    align-items: center;
    gap: 10px;
    .ticket-btn {
      height: 36px;
      line-height: 36px;
      padding: 0 20px;
      background-color: #979abe4d;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      color: #979abe;
    }
  }
`;

const Content = styled.div`
  .desc-item {
    padding: 20px 0;
    display: flex;
    align-items: end;
    gap: 20px;
    &:not(:first-child) {
      border-top: 1px solid rgba(151, 154, 190, 0.3);
    }
    &:last-child {
      padding-bottom: 0;
    }

    .desc-text {
      flex: 1;
      .title {
        font-size: 24px;
        font-weight: 600;
      }
      .desc-list {
        color: rgba(151, 154, 190, 1);
        margin-top: 10px;
        ul {
          margin: 0;
          padding: 0;
          padding-left: 30px;
          &.no-icon {
            list-style: none;
            margin-top: 5px;
          }
        }
        .sep {
          font-weight: 700;
          color: #fff;
        }
      }
    }
    .action-btn {
      width: 250px;
      height: 52px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 6px;
      background-color: rgba(0, 0, 0, 0.5);
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
  renderDesc: () => React.ReactNode;
}

export default function TaskItem({ icon, title, typeText, typeColor, renderDesc }: Props) {
  return (
    <Wrapper>
      <Title>
        <div className="title-with-img">
          <img className="icon" src={icon} />
          <div className="title-text">
            <div className="main-text">{title}</div>
            <div style={{ color: typeColor, fontWeight: 900 }} className="type">
              {' '}
              {typeText}
            </div>
          </div>
        </div>

        <div className="action">
          <div className="ticket-btn">0 ticket</div>
          <div className="refresh">
            <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect opacity="0.3" x="0.5" y="1.05005" width="35" height="35" rx="7.5" stroke="#979ABE" />
              <path
                d="M25.1723 12.0195C25.1623 11.6218 24.8594 11.3711 24.4254 11.3803C23.9907 11.3894 23.7668 11.6546 23.6954 12.0525C23.6584 12.2588 23.6703 12.4747 23.6681 12.6864C23.6645 13.0475 23.6672 13.4087 23.6672 13.77C23.6107 13.7956 23.5542 13.8212 23.4977 13.8468C23.3081 13.6645 23.1216 13.4789 22.9283 13.3006C21.1858 11.6942 19.1184 11.0961 16.8031 11.4516C13.5341 11.9534 11.1121 14.675 10.8279 18.0725C10.5613 21.2595 12.6173 24.3388 15.7035 25.3747C18.8255 26.4227 22.2993 25.2029 24.0552 22.4392C24.1682 22.2613 24.2857 22.0787 24.3546 21.8819C24.4886 21.4999 24.4213 21.1441 24.0439 20.94C23.6803 20.7433 23.3356 20.8223 23.0774 21.1561C22.9483 21.323 22.8502 21.5134 22.7296 21.6875C21.641 23.2595 20.1455 24.1161 18.2319 24.2094C15.6697 24.3343 13.3208 22.6723 12.5741 20.2226C11.8028 17.6925 12.8696 14.9664 15.1513 13.6365C17.3692 12.3437 20.2166 12.7147 22.0115 14.5375C22.1429 14.671 22.2315 14.8468 22.4446 15.1532C21.7438 15.1532 21.2044 15.1247 20.6694 15.1616C20.1754 15.1957 19.9137 15.4897 19.9178 15.9024C19.9217 16.3042 20.2017 16.6367 20.6771 16.6484C21.9179 16.679 23.1601 16.6679 24.4015 16.6547C24.8105 16.6503 25.1491 16.4162 25.1615 16.012C25.2023 14.6821 25.2056 13.3497 25.1723 12.0195Z"
                fill="#979ABE"
              />
            </svg>
          </div>
        </div>
      </Title>

      <Content>{renderDesc()}</Content>
    </Wrapper>
  );
}
