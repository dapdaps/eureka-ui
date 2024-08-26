import { useRouter } from 'next/router';
import { memo } from 'react';

import { StyledActionContainer, StyledActionDesc,StyledActionTitle } from './styles';

const Action = ({ title, desc, icon, path, bg, bp }: any) => {
  const router = useRouter();
  return (
    <StyledActionContainer
      onClick={() => {
        if (path) router.push(path);
      }}
      $clickable={!!path}
      style={{ background: bg }}
      data-bp={bp}
    >
      <StyledActionTitle>{title}</StyledActionTitle>
      <StyledActionDesc>{desc}</StyledActionDesc>
      {icon}
    </StyledActionContainer>
  );
};

export default memo(Action);
