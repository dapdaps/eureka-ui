import React, { memo } from 'react';
import { StyledCard, StyledContent, StyledTitle } from '@/views/AllInOne/components/Card/styles';
import { StyledFlex } from '@/styled/styles';
import { Gradient } from '@/views/AllInOne/components/Gradient';

const AllInOneCardView: React.FC<Props> = (props) => {
  const {
    children,
    title,
    bgColor,
    subTitle,
    style,
  } = props;

  return (
    <StyledCard style={style}>
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
        <StyledTitle>
          <h3>{title}</h3>
          <div>{subTitle}</div>
        </StyledTitle>
        <ArrowTopRight classname="arrow-top-right" />
      </StyledFlex>
      <StyledContent>
        {children}
      </StyledContent>
    </StyledCard>
  );
};

export default memo(AllInOneCardView);

interface Props {
  key?: string;
  children?: React.ReactNode;
  title?: string;
  bgColor?: string;
  subTitle?: string;
  style?: React.CSSProperties;
}

const ArrowTopRight = ({ size = 14, color = '#979ABE', classname, strokeWidth = 1.5 }: { size?: number, color?: string, classname: string, strokeWidth?: number }) => {
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
}
