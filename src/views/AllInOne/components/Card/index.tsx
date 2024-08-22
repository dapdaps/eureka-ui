import React, { memo, useMemo } from 'react';

import networks from '@/config/swap/networks';
import { StyledFlex } from '@/styled/styles';
import {
  StyledCard,
  StyledContent,
  StyledGradient,
  StyledPointer,
  StyledTitle,
} from '@/views/AllInOne/components/Card/styles';
import { renderTitle } from '@/views/AllInOne/utils';

import { StyledIcon,StyledIcons } from './styles';

const AllInOneCardView: React.FC<Props> = (props) => {
  const { children, title, bgColor, subTitle, style, chainId, type = 'normal', onSelect = () => {} } = props;

  const handleSelect = () => {
    onSelect();
  };
  const dexs = useMemo(() => {
    if (!chainId) return [];
    if (!networks[chainId]) return [];
    return Object.values(networks[chainId].dexs);
  }, [chainId]);

  return (
    <StyledCard style={style} className={type} bgColor={bgColor} onClick={handleSelect}>
      <StyledGradient
        className="card-active-bg"
        $color={bgColor as string}
      />
      <StyledFlex justifyContent="space-between" alignItems="flex-start">
        <StyledTitle className={type}>
          <h3>{renderTitle(title)}</h3>
          <div className="sub-title">{subTitle}</div>
        </StyledTitle>
        <StyledPointer>
          {title === 'Swap' && (
            <StyledIcons>
              {dexs
                .filter((dex, i) => i < 5)
                .map((dex: any) => (
                  <StyledIcon key={dex.name} src={dex.logo} />
                ))}
              {dexs.length > 5 && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="1" y="1" width="22" height="22" rx="9" fill="#2C3241" stroke="#16181D" strokeWidth="2" />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9 11.5C9 12.3284 8.32843 13 7.5 13C6.67157 13 6 12.3284 6 11.5C6 10.6716 6.67157 10 7.5 10C8.32843 10 9 10.6716 9 11.5ZM14 11.5C14 12.3284 13.3284 13 12.5 13C11.6716 13 11 12.3284 11 11.5C11 10.6716 11.6716 10 12.5 10C13.3284 10 14 10.6716 14 11.5ZM17.5 13C18.3284 13 19 12.3284 19 11.5C19 10.6716 18.3284 10 17.5 10C16.6716 10 16 10.6716 16 11.5C16 12.3284 16.6716 13 17.5 13Z"
                    fill="#979ABE"
                  />
                </svg>
              )}
            </StyledIcons>
          )}
          <ArrowTopRight classname="arrow-top-right" />
        </StyledPointer>
      </StyledFlex>
      <StyledContent className={type}>{children}</StyledContent>
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
  chainId: number;
  onSelect?(): void;
}

const ArrowTopRight = ({
  size = 14,
  color = '#979ABE',
  classname,
  strokeWidth = 1.5,
}: {
  size?: number;
  color?: string;
  classname: string;
  strokeWidth?: number;
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
