import Image from 'next/image';

import { StyledLocked, StyledUnlocked } from './styles';

export default function StatusTag({ status }: any) {
  return status ? (
    <StyledUnlocked>
      <Image src="/images/odyssey/v5/done.svg" alt="" width={21} height={21} />
      <b className="value">200</b>
      <Image src="/images/odyssey/v5/coin.svg" alt="" width={21} height={21} />
      Explored
    </StyledUnlocked>
  ) : (
    <StyledLocked>
      <b className="value">200</b>
      <Image src="/images/odyssey/v5/coin.svg" alt="" width={21} height={21} />
      Unexplored
    </StyledLocked>
  );
}
