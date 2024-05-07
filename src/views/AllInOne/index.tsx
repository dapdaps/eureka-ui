import { memo } from 'react';
import { Container } from '@/views/AllInOne/styles';

const AllInOneView = (props: Props) => {
  const { currentChain } = props;
  return (
    <>
      <Container>
        <h1>New Page</h1>
        <img src={currentChain.bgIcon || currentChain.icon} alt="" />
        <div className="test-line"></div>
      </Container>
    </>
  );
};

export default memo(AllInOneView);

interface Props {
  currentChain: any;
}
