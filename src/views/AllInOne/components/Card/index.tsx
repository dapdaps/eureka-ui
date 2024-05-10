import React, { memo } from 'react';

import { StyledFlex } from '@/styled/styles';
import { StyledCard, StyledContent, StyledPointer, StyledTitle } from '@/views/AllInOne/components/Card/styles';
import { Gradient } from '@/views/AllInOne/components/Gradient';

const AllInOneCardView: React.FC<Props> = (props) => {
  const {
    children,
    title,
    bgColor,
    subTitle,
    style,
    type = 'normal',
    onSelect = () => {
    },
  } = props;

  const handleSelect = () => {
    onSelect();
  };

  return (
    <StyledCard style={style} className={type} bgColor={bgColor} onClick={handleSelect}>
      <Gradient
        classname="card-active-bg"
        bgColor={bgColor as string}
        width={300}
        height={250}
        rx={50}
        ry={20}
        opacity={1}
      />
      <StyledFlex justifyContent="space-between" alignItems="flex-start">
        <StyledTitle className={type}>
          <h3>{title}</h3>
          <div className="sub-title">{subTitle}</div>
        </StyledTitle>
        <StyledPointer>
          <ArrowTopRight classname="arrow-top-right" />
        </StyledPointer>
      </StyledFlex>
      <StyledContent className={type}>
        {children}
      </StyledContent>
    </StyledCard>
  );
};

export default memo(AllInOneCardView);

type CardType = 'normal' | 'nav';

interface Props {
  key?: string;
  children?: React.ReactNode;
  title?: string;
  bgColor?: string;
  subTitle?: string;
  style?: React.CSSProperties;
  path?: string;
  type?: CardType;

  onSelect?(): void;
}

const ArrowTopRight = ({ size = 14, color = '#979ABE', classname, strokeWidth = 1.5 }: {
  size?: number,
  color?: string,
  classname: string,
  strokeWidth?: number
}) => {
  return (
    <svg
      className={classname}
      width={size}
      height={size}
      viewBox={`0 0 ${size + 2} ${size + 2}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 15L15 1M15 1H1M15 1V15" stroke={color} stroke-width={strokeWidth} />
    </svg>
  );
};
