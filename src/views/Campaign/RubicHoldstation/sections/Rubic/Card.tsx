import IconArrowRight from '@public/images/campaign/icon-arrow-right.svg';

import LazyImage from '@/components/LazyImage';
import Button from '@/views/Campaign/RubicHoldstation/components/Button';
import Card from '@/views/Campaign/RubicHoldstation/components/Card';
import RubicCardHead from '@/views/Campaign/RubicHoldstation/sections/Rubic/CardHead';
import { StyledCardBg } from '@/views/Campaign/RubicHoldstation/sections/Rubic/styles';

const RubicCard = (props: Props) => {
  const {
    title,
    bg,
    bgWidth,
    bgHeight,
    btn,
    bgClassName,
  } = props;

  return (
    <Card style={{ padding: '31px 36px 30px', flex: 1, height: 371 }}>
      <RubicCardHead title={title} />
      <StyledCardBg>
        <LazyImage containerClassName={`bg-img ${bgClassName}`} src={bg} width={bgWidth} height={bgHeight} />
      </StyledCardBg>
      <Button style={{ width: '100%' }}>
        {btn}
        <IconArrowRight />
      </Button>
    </Card>
  );
};

export default RubicCard;

interface Props {
  title: string;
  bg: string;
  bgWidth: number;
  bgHeight: number;
  btn: string;
  bgClassName?: string;
}
