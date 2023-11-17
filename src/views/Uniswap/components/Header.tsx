import { memo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ConnectButton from './ConnectButton';

const StyledHeader = styled.div`
  padding: 20px 40px 20px;
  display: flex;
  justify-content: space-between;
`;
const StyledNavWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const StyledLogo = styled.div`
  width: 32.78px;
  height: 27px;
  margin-top: -5px;
`;
const StyledNavs = styled.div`
  display: flex;
  align-items: center;
`;
const StyledNav = styled.div<{ active?: boolean }>`
  padding: 0px 20px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ active }) => (active ? '#fff' : '#8E8E8E')};
  cursor: pointer;
`;

const NAVS = [
  {
    label: 'Swap',
    path: '/uniswap/swap',
    active: ['/uniswap/swap'],
  },
  {
    label: 'Pools',
    path: '/uniswap/pools',
    active: [
      '/uniswap/pools',
      '/uniswap/pools-add-liquidity',
      '/uniswap/pools-detail-liquidity',
      '/uniswap/pools-remove-liquidity',
      '/uniswap/pools-increase-liquidity',
    ],
  },
];

const Header = () => {
  const router = useRouter();
  return (
    <StyledHeader>
      <StyledNavWrapper>
        <StyledLogo>
          <svg xmlns="http://www.w3.org/2000/svg" width="31" height="33" viewBox="0 0 31 33" fill="none">
            <path
              d="M1.91839 15.6483C1.39153 13.3488 3.87506 7.45045 3.87506 7.45045L17.178 6.56635C19.7509 5.87693 22.3955 7.40382 23.0849 9.97673L28.7103 19.2472C27.806 23.7688 27.0567 26.3322 24.4837 27.0216L11.0003 30.9079C8.42742 31.5973 5.78278 30.0704 5.09337 27.4975L1.91839 15.6483Z"
              fill="#62DDFF"
            />
            <path
              d="M3.58836 10.6388C2.87836 7.98901 4.45085 5.26539 7.1006 4.55539L19.3037 1.28558C21.9534 0.575584 24.6771 2.14807 25.3871 4.79782L28.6569 17.0009C29.3669 19.6507 27.7944 22.3743 25.1446 23.0843L12.9415 26.3541C10.2918 27.0641 7.56817 25.4916 6.85817 22.8418L3.58836 10.6388Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.6251 2.48504L7.42199 5.75484C5.43468 6.28734 4.25532 8.33005 4.78782 10.3174L8.05762 22.5205C8.59012 24.5078 10.6328 25.6871 12.6202 25.1546L24.8232 21.8848C26.8105 21.3523 27.9899 19.3096 27.4574 17.3223L24.1876 5.11921C23.6551 3.1319 21.6124 1.95254 19.6251 2.48504ZM7.1006 4.55539C4.45085 5.26539 2.87836 7.98901 3.58836 10.6388L6.85817 22.8418C7.56817 25.4916 10.2918 27.0641 12.9415 26.3541L25.1446 23.0843C27.7944 22.3743 29.3669 19.6507 28.6569 17.0009L25.3871 4.79782C24.6771 2.14807 21.9534 0.575584 19.3037 1.28558L7.1006 4.55539Z"
              fill="#62DDFF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.0454 7.9507L11.7892 8.82321C11.2557 8.96615 10.9391 9.51449 11.0821 10.048L11.4412 11.3883C11.5841 11.9217 12.1325 12.2383 12.6659 12.0954L15.6242 11.3027C16.7112 11.0114 17.8286 11.6565 18.1199 12.7436C18.4112 13.8307 17.7661 14.948 16.679 15.2393L13.7208 16.032C13.1873 16.1749 12.8707 16.7233 13.0136 17.2567L13.3879 18.6533C13.5308 19.1868 14.0791 19.5034 14.6126 19.3604L17.8689 18.4879C20.7786 17.7083 22.5054 14.7174 21.7258 11.8076C20.9461 8.89782 17.9552 7.17103 15.0454 7.9507Z"
              fill="#62DDFF"
            />
          </svg>
        </StyledLogo>
        <StyledNavs>
          {NAVS.map((nav) => (
            <StyledNav
              key={nav.path}
              active={nav.active.includes(router.pathname)}
              onClick={() => {
                router.push(nav.path);
              }}
            >
              {nav.label}
            </StyledNav>
          ))}
        </StyledNavs>
      </StyledNavWrapper>
      <ConnectButton />
    </StyledHeader>
  );
};

export default memo(Header);
