import { useMemo } from 'react';

import LazyImage from '@/components/LazyImage';

import { StyledUser, StyledUserAddress, StyledUserAvatar } from './styles';

const LeaderboardUser = (props: Props) => {
  const { avatar, address } = props;

  const addr = useMemo(() => {
    if (!address) return '-';
    return address.substring(0, 6) + '...' + address.slice(-4);
  }, [address]);

  return (
    <StyledUser>
      {/* {avatar ? (
        <LazyImage src={avatar} width={26} height={26} style={{ borderRadius: '50%' }} />
      ) : (
        <StyledUserAvatar />
      )} */}
      <StyledUserAddress>{addr}</StyledUserAddress>
    </StyledUser>
  );
};

export default LeaderboardUser;

interface Props {
  avatar?: string;
  address?: string;
}
