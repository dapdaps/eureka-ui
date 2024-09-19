import IconArrowRight from '@public/images/campaign/icon-arrow-right.svg';
import { useRouter } from 'next/router';

import LazyImage from '@/components/LazyImage';
import type { Quest } from '@/views/Campaign/models';
import Button from '@/views/Campaign/RubicHoldstation/components/Button';
import Card from '@/views/Campaign/RubicHoldstation/components/Card';
import RubicCardHead from '@/views/Campaign/RubicHoldstation/sections/Rubic/CardHead';
import { StyledCardBg } from '@/views/Campaign/RubicHoldstation/sections/Rubic/styles';

const RubicCard = (props: Props) => {
  const { title, bg, bgWidth, bgHeight, btn, bgClassName, quest } = props;

  const router = useRouter();

  const handleClick = () => {
    if (quest.operators && quest.operators[0]) {
      router.push(`/${quest.operators[0].route}`);
      // window.open(`/${quest.operators[0].route}`, '_blank');
      return;
    }
    if (quest.name === 'Super Bridge') {
      router.push('/super-bridge');
      // window.open('/super-bridge', '_blank');
    }
  };

  return (
    <Card style={{ padding: '31px 36px 30px', flex: 1, height: 371 }}>
      <RubicCardHead title={title} quest={quest} />
      <StyledCardBg>
        <LazyImage containerClassName={`bg-img ${bgClassName}`} src={bg} width={bgWidth} height={bgHeight} />
      </StyledCardBg>
      <Button style={{ width: '100%' }} onClick={handleClick}>
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
  quest: Quest;
}
