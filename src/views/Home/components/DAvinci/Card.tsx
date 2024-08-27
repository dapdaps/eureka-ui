import LazyImage from '@/components/LazyImage';
import type { SwiperItem } from '@/views/Home/components/DAvinci/config';
import {
  StyledCard,
  StyledCardArticle,
  StyledCardTitle,
  StyledContent,
} from '@/views/Home/components/DAvinci/styles';

const DAvinciCard = (props: Props) => {
  const { img, title, article, background } = props.swiperItem;

  return (
    <StyledCard>
      <LazyImage
        src={img}
        width={680}
        height={354}
        style={{
          background,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />
      <StyledContent>
        <StyledCardTitle data-swiper-parallax="-2000">{title}</StyledCardTitle>
        <StyledCardArticle data-swiper-parallax="-4000">{article}</StyledCardArticle>
      </StyledContent>
    </StyledCard>
  );
};

export default DAvinciCard;

interface Props {
  swiperItem: SwiperItem;
}
