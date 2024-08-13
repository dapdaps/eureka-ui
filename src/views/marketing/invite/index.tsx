import { memo } from 'react';
import { StyledContainer } from '@/views/marketing/invite/styles';

const Invite = (props: Props) => {
  const {} = props;

  return (
    <StyledContainer></StyledContainer>
  );
};

export default memo(Invite);

export interface Props {
  logo: string;
  name: string;
  desc: string;
}
