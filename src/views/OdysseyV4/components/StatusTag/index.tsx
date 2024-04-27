import Image from 'next/image';

import { StyledLocked, StyledUnlocked } from './styles';

export default function StatusTag({ status }: any) {
  return status ? (
    <StyledUnlocked>
      <Image src="/images/odyssey/v4/done.svg" alt="" width={21} height={21} />
      <b className="value">200</b>
      <Image src="/images/odyssey/v4/coin.svg" alt="" width={21} height={21} />
      Unlocked
    </StyledUnlocked>
  ) : (
    <StyledLocked>
      <b className="value">200</b>
      <Image src="/images/odyssey/v4/coin.svg" alt="" width={21} height={21} />
      Locked
    </StyledLocked>
  );
}
