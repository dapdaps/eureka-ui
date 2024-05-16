import { memo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ConnectButton from './ConnectButton';

const StyledHeader = styled.div`
  padding: 20px 40px 20px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    padding: 18px 16px;
  }
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
  color: var(--primary-color);
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
  @media (max-width: 768px) {
    padding: 0px 16px;
  }
`;
const StyledFaucets = styled.div`
  padding: 0px 20px;
  font-size: 16px;
  font-weight: 500;
  color: #8e8e8e;
  cursor: pointer;
  position: relative;
  @media (max-width: 768px) {
    padding: 0px 16px;
  }

  & .faucets-list {
    opacity: 0;
  }

  & .faucets-content {
    display: none;
  }

  &:hover {
    color: #fff;
  }

  &:hover .faucets-list {
    opacity: 1;
  }

  &:hover .faucets-content {
    display: block;
  }
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
              fill="#0038FF"
            />
            <path
              d="M3.5883 10.6387C2.8783 7.98899 4.45079 5.26537 7.10054 4.55537L19.3036 1.28557C21.9534 0.575568 24.677 2.14805 25.387 4.79781L28.6568 17.0009C29.3668 19.6506 27.7943 22.3743 25.1446 23.0843L12.9415 26.3541C10.2917 27.0641 7.56811 25.4916 6.85811 22.8418L3.5883 10.6387Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M19.625 2.48502L7.42193 5.75483C5.43462 6.28733 4.25525 8.33004 4.78775 10.3174L8.05756 22.5204C8.59006 24.5078 10.6328 25.6871 12.6201 25.1546L24.8232 21.8848C26.8105 21.3523 27.9899 19.3096 27.4574 17.3223L24.1875 5.1192C23.655 3.13188 21.6123 1.95252 19.625 2.48502ZM7.10054 4.55537C4.45079 5.26537 2.8783 7.98899 3.5883 10.6387L6.85811 22.8418C7.56811 25.4916 10.2917 27.0641 12.9415 26.3541L25.1446 23.0843C27.7943 22.3743 29.3668 19.6506 28.6568 17.0009L25.387 4.79781C24.677 2.14805 21.9534 0.575568 19.3036 1.28557L7.10054 4.55537Z"
              fill="#0038FF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.0454 7.9507L11.7892 8.82321C11.2557 8.96615 10.9391 9.51449 11.0821 10.048L11.4412 11.3883C11.5841 11.9217 12.1325 12.2383 12.6659 12.0954L15.6242 11.3027C16.7112 11.0114 17.8286 11.6565 18.1199 12.7436C18.4112 13.8307 17.7661 14.948 16.679 15.2393L13.7208 16.032C13.1873 16.1749 12.8707 16.7233 13.0136 17.2567L13.3879 18.6533C13.5308 19.1868 14.0791 19.5034 14.6126 19.3604L17.8689 18.4879C20.7786 17.7083 22.5054 14.7174 21.7258 11.8076C20.9461 8.89782 17.9552 7.17103 15.0454 7.9507Z"
              fill="#0038FF"
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
          <StyledFaucets>
            Faucets{' '}
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" viewBox="0 0 11 7" fill="none">
              <path d="M1 1L5.5 5.5L10 1" stroke="currentColor" strokeWidth="2" />
            </svg>
            <FaucetsList />
          </StyledFaucets>
        </StyledNavs>
      </StyledNavWrapper>
      <ConnectButton />
    </StyledHeader>
  );
};

const StyledFaucetsList = styled.div`
  border-radius: 8px;
  border: 1px solid #313540;
  background: #1e2026;
  padding: 6px 0px;
  width: 210px;
  transition: 0.5s;
`;

const StyledFaucetItem = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: capitalize;
  color: #fff;
  transition: 0.5s;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const StyledFaucetsWrapper = styled.div`
  padding-top: 10px;
  position: absolute;
  z-index: 10;
  left: -40px;
  transition: 0.5s;
`;

const LINKS = [
  {
    label: 'Superchain',
    link: 'https://app.optimism.io/faucet',
  },
  {
    label: 'Alchemy',
    link: 'https://basefaucet.com/',
  },
  {
    label: 'Bware Labs',
    link: 'https://bwarelabs.com/faucets',
  },
  {
    label: 'QuickNode',
    link: 'https://faucet.quicknode.com/drip',
  },
  {
    label: 'LearnWeb3',
    link: 'https://learnweb3.io/faucets/base_sepolia',
  },
  {
    label: 'Ethereum Ecosystem',
    link: 'https://www.ethereum-ecosystem.com/faucets/base-sepolia',
  },
];

const FaucetsList = () => {
  return (
    <StyledFaucetsWrapper className="faucets-list">
      <StyledFaucetsList className="faucets-content">
        {LINKS.map((item: any) => (
          <StyledFaucetItem
            key={item.label}
            onClick={() => {
              window.open(item.link, '_blank');
            }}
          >
            <span>{item.label}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9.5L9.5 1M9.5 1H1M9.5 1V9.5" stroke="white" />
            </svg>
          </StyledFaucetItem>
        ))}
      </StyledFaucetsList>
    </StyledFaucetsWrapper>
  );
};

export default memo(Header);
