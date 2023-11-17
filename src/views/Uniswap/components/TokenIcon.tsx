import { useState } from 'react';
import styled from 'styled-components';

const StyledTokenIcon = styled.img<{ size: number }>`
  border-radius: 50%;
  width: ${({ size }) => size + 'px'};
  height: ${({ size }) => size + 'px'};
`;

const DEFAULT_TOKEN_ICON = 'https://ipfs.near.social/ipfs/bafkreigrjhg7cu6bceirvh3vuujt7pg7l5um3jeuemhd2ac3mmh3qjjwme';
const getIconByAddress = (address: string) => {
  return `https://assets.dapdap.net/images/${address.toLowerCase()}.png`;
};
const getIcon = (token: any) => {
  if (token?.icon) return token.icon;
  if (token?.address && getIconByAddress(token.address)) return token?.address && getIconByAddress(token.address);
  return DEFAULT_TOKEN_ICON;
};
const matchIcon = (token: any) => {
  const _icon = getIcon(token);
  const deadlinks: any = sessionStorage?.getItem('deadlinks') || {};
  if (deadlinks[_icon]) {
    return DEFAULT_TOKEN_ICON;
  }
  return _icon;
};

export default function TokenIcon({ token, size = 22, style }: any) {
  const [src, setSrc] = useState(matchIcon(token));
  return (
    <StyledTokenIcon
      src={src}
      size={size}
      style={style}
      onError={() => {
        setSrc(DEFAULT_TOKEN_ICON);
        const deadlinks: any = sessionStorage.getItem('deadlinks') || {};
        if (token?.symbol) deadlinks[src] = true;
      }}
    ></StyledTokenIcon>
  );
}
