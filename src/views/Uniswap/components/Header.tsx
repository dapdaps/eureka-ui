import { memo } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import ConnectButton from './ConnectButton';

const StyledHeader = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
`;
const StyledNavWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const StyledLogo = styled.img`
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
    path: '/linea/uniswap/swap',
    active: ['/linea/uniswap/swap'],
  },
  {
    label: 'Pool',
    path: '/linea/uniswap/pools',
    active: [
      '/linea/uniswap/pools',
      '/linea/uniswap/pools-add-liquidity',
      '/linea/uniswap/pools-detail-liquidity',
      '/linea/uniswap/pools-remove-liquidity',
    ],
  },
];

const Header = () => {
  const router = useRouter();
  return (
    <StyledHeader>
      <StyledNavWrapper>
        <StyledLogo src={'/logo44.png'} />
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
