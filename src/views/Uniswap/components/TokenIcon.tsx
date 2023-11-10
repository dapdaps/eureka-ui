import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useIconsStore } from '@/stores/icons';

const StyledTokenIcon = styled.img<{ size: number }>`
  border-radius: 50%;
  width: ${({ size }) => size + 'px'};
  height: ${({ size }) => size + 'px'};
`;

const DEFAULT_TOKEN_ICON = 'https://ipfs.near.social/ipfs/bafkreigrjhg7cu6bceirvh3vuujt7pg7l5um3jeuemhd2ac3mmh3qjjwme';
const getIconByAddress = (address: string) => {
  return `https://assets.dapdap.net/images/${address.toLowerCase()}.png`;
};
export default function TokenIcon({ token, size = 22, style }: any) {
  const iconsStore: any = useIconsStore();
  const getIcon = () => {
    if (token?.icon) return token.icon;
    if (iconsStore?.getIcon(token)) return iconsStore.getIcon(token);
    if (token?.address && getIconByAddress(token.address)) return token?.address && getIconByAddress(token.address);
    return DEFAULT_TOKEN_ICON;
  };
  const [src, setSrc] = useState('');
  useEffect(() => {
    const _icon = getIcon();
    if (_icon !== src) setSrc(_icon);
  }, [token]);
  return (
    <StyledTokenIcon
      src={src}
      size={size}
      style={style}
      onLoad={() => {
        if (token?.symbol) {
          iconsStore.addIcon({ ...token, icon: src });
        }
      }}
      onError={() => {
        setSrc(iconsStore.getIcon(token) || (token?.address && getIconByAddress(token.address)) || DEFAULT_TOKEN_ICON);
      }}
    ></StyledTokenIcon>
  );
}
