import CountUp from 'react-countup';

import { Item, StyledContainer, Title, Value } from './styles';

export default function Summary({ data, loading }: any) {
  const { total_transactions = 0, total_users = 0, trading_volume = 0 } = data;

  let golds = 0;
  if (!loading) {
    golds = 13500;
  }

  const duration = 2;

  return (
    <StyledContainer>
      <span className="leftTop corner"></span>
      <span className="rightTop corner"></span>
      <span className="leftBottom corner"></span>
      <span className="rightBottom corner"></span>
      <Item>
        <Title>Trading Volume</Title>

        <Value>
          <CountUp start={0} end={trading_volume} duration={duration} decimals={2} decimal="." prefix="$" suffix="" />
        </Value>
      </Item>
      <Item>
        <Title>Total Transactions</Title>
        <Value>
          <CountUp start={0} end={total_transactions} duration={duration} />
        </Value>
      </Item>
      <Item>
        <Title>Total Users</Title>
        {/* <Value>{formatThousandsSeparator(total_users)}</Value> */}
        <Value>
          <CountUp start={0} end={total_users} duration={duration} />
        </Value>
      </Item>
      <Item>
        <Title>Prize Pool</Title>
        <Value>
          <CountUp start={0} end={25} suffix="M" duration={duration} />
          <svg style={{ marginLeft: 10 }} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="14" cy="14" r="13.5" fill="black" stroke="#FF4646" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.38622 7.17877C9.46564 7.06645 9.59253 7 9.72757 7H18.7021C18.8445 7 18.9773 7.07383 19.0553 7.19636L22.9311 13.2862C23.0384 13.4548 23.0188 13.6772 22.8837 13.8232L14.5209 22.8651C14.3574 23.0419 14.0844 23.0454 13.9166 22.8729L5.12363 13.8296C4.97677 13.6785 4.95857 13.4401 5.08073 13.2673L9.38622 7.17877ZM11.2748 8.08525C11.1 8.08525 11.001 8.29118 11.107 8.43402L14.0455 12.3915C14.1299 12.5053 14.2965 12.5053 14.3809 12.3915L17.3194 8.43402C17.4254 8.29118 17.3264 8.08525 17.1516 8.08525H11.2748ZM18.7753 8.73796C18.6955 8.61267 18.5193 8.60609 18.4309 8.72509L15.5389 12.6201C15.4328 12.7629 15.5319 12.9688 15.7066 12.9688H21.0776C21.2453 12.9688 21.346 12.7773 21.2541 12.6329L18.7753 8.73796ZM20.8747 14.4207C21.0025 14.2825 20.9073 14.0541 20.7218 14.0541H14.9518C14.8353 14.0541 14.7408 14.1513 14.7408 14.2711V20.5096C14.7408 20.7056 14.9734 20.8012 15.1048 20.6592L20.8747 14.4207ZM13.3253 20.7299C13.4583 20.8667 13.6856 20.7698 13.6856 20.5765V14.2711C13.6856 14.1513 13.5911 14.0541 13.4745 14.0541H7.34372C7.1557 14.0541 7.06154 14.2879 7.19449 14.4246L13.3253 20.7299ZM7.011 12.9688C6.83851 12.9688 6.73887 12.7676 6.84032 12.6241L9.62508 8.68611C9.70814 8.56865 9.87777 8.56661 9.96348 8.68205L12.8875 12.6201C12.9935 12.7629 12.8945 12.9688 12.7197 12.9688H7.011Z" fill="url(#paint0_linear_14642_552)" />
            <defs>
              <linearGradient id="paint0_linear_14642_552" x1="9.35921" y1="7.54262" x2="16.5215" y2="20.5065" gradientUnits="userSpaceOnUse">
                <stop stop-color="#FF9892" />
                <stop offset="1" stop-color="#FF5A50" />
              </linearGradient>
            </defs>
          </svg>
        </Value>
      </Item>
    </StyledContainer>
  );
}
