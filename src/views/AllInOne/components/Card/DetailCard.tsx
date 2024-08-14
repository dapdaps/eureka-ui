import React, { memo } from 'react';

import { StyledFlex } from '@/styled/styles';
import { StyledContent, StyledDetailCard, StyledPointer, StyledTitle } from '@/views/AllInOne/components/Card/styles';
import Like from '@/components/Like/index';
import { renderTitle } from '@/views/AllInOne/utils';

const AllInOneDetailCardView: React.FC<Props> = (props) => {
  const {
    children,
    title,
    subTitle,
    style,
    config,
    onShowSettings = () => {},
    likeId
  } = props;

  const handleShowPointer = () => {
    onShowSettings()
  }

  return (
    <StyledDetailCard style={style}>
      <StyledFlex justifyContent="space-between" alignItems="flex-end">
        <StyledTitle>
          <StyledFlex className="title-text-wrap" justifyContent="flex-start" alignItems="center" gap="10px">
            <h3>{renderTitle(title)}</h3>
            <Like id={likeId} category="all-in-one" classname="like-tag" />
          </StyledFlex>
          {/*<div className="sub-title">{subTitle}</div>*/}
        </StyledTitle>
        {
          config && (
            <StyledPointer onClick={handleShowPointer}>
              <Gear classname="setting" />
            </StyledPointer>
          )
        }
      </StyledFlex>
      <StyledContent>
        {children}
      </StyledContent>
    </StyledDetailCard>
  );
};

export default memo(AllInOneDetailCardView);

interface Props {
  key?: string;
  children?: React.ReactNode;
  title?: string;
  bgColor?: string;
  subTitle?: string;
  style?: React.CSSProperties;
  config?: boolean;
  onShowSettings?: () => void;
  likeId: number | null;
}

const ArrowBack = ({ classname }: { classname?: string }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
    >
      <path
        d="M7 12.4999H9.2C11.2987 12.4999 13 10.7986 13 8.6999V8.6999C13 6.60122 11.2987 4.8999 9.2 4.8999H1M1 4.8999L4.8999 1M1 4.8999L4.6001 8.5"
        stroke="#979ABE"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Gear = ({ classname }: { classname?: string }) => {
  return (
    <svg
      width="16"
      height="18"
      viewBox="0 0 16 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
    >
      <path
        d="M7.17184 0.222355C7.42364 0.0766877 7.70926 0 8 0C8.29074 0 8.57637 0.0766877 8.82816 0.222355L15.1718 3.89274C15.4236 4.03841 15.6327 4.24792 15.7781 4.50021C15.9235 4.75251 16 5.0387 16 5.33003V12.67C16 12.9613 15.9235 13.2475 15.7781 13.4998C15.6327 13.7521 15.4236 13.9616 15.1718 14.1073L8.82816 17.7776C8.57637 17.9233 8.29074 18 8 18C7.70926 18 7.42364 17.9233 7.17184 17.7776L0.828158 14.1073C0.576372 13.9616 0.367286 13.7521 0.221915 13.4998C0.0765431 13.2475 7.38473e-06 12.9613 0 12.67V5.33003C7.38473e-06 5.0387 0.0765431 4.75251 0.221915 4.50021C0.367286 4.24792 0.576372 4.03841 0.828158 3.89274L7.17184 0.222355ZM8 1.65964L1.65632 5.33003V12.67L8 16.3404L14.3437 12.67V5.33003L8 1.65964ZM8 5.68064C8.87856 5.68064 9.72115 6.03035 10.3424 6.65286C10.9636 7.27536 11.3126 8.11965 11.3126 9C11.3126 9.88035 10.9636 10.7246 10.3424 11.3471C9.72115 11.9696 8.87856 12.3194 8 12.3194C7.12144 12.3194 6.27886 11.9696 5.65762 11.3471C5.03638 10.7246 4.68737 9.88035 4.68737 9C4.68737 8.11965 5.03638 7.27536 5.65762 6.65286C6.27886 6.03035 7.12144 5.68064 8 5.68064ZM8 7.34032C7.78249 7.34032 7.56711 7.38325 7.36616 7.46665C7.1652 7.55006 6.98261 7.67231 6.82881 7.82643C6.67501 7.98054 6.553 8.16351 6.46977 8.36487C6.38653 8.56623 6.34369 8.78205 6.34369 9C6.34369 9.21795 6.38653 9.43377 6.46977 9.63513C6.553 9.8365 6.67501 10.0195 6.82881 10.1736C6.98261 10.3277 7.1652 10.4499 7.36616 10.5333C7.56711 10.6168 7.78249 10.6597 8 10.6597C8.43928 10.6597 8.86057 10.4848 9.17119 10.1736C9.48181 9.86232 9.65631 9.44018 9.65631 9C9.65631 8.55983 9.48181 8.13768 9.17119 7.82643C8.86057 7.51518 8.43928 7.34032 8 7.34032Z"
        fill="#979ABE" />
    </svg>
  );
};
