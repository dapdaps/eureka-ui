import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import type { Dispatch, SetStateAction } from 'react';
import React, { useEffect, useMemo, useState } from 'react';

import { StyledFlex, StyledFont, StyledSvg } from '@/styled/styles';

import type { DataType } from '../../hooks/useMedalAma';
import type { MedalType } from '../../types';
import ProgressBar from '../ProgressBar';
import {
  StyledAmaConfirmButton,
  StyledAmaInput,
  StyledAmaInputContainer,
  StyledMark,
  StyledMedalCard,
  StyledMedalImage,
  StyledSpecified,
  StyledSpecifiedContainer,
  StyledStatus
} from './styles';

type PropsType = {
  medal: MedalType;
  style?: React.CSSProperties;
  nameStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  barWidth?: string;
  className?: string;
  tooltip?: string;
  onConfirm?: (data: DataType) => any;
  setUpdater?: Dispatch<SetStateAction<number>>;
};
export default function MedalCard({
  medal,
  style,
  barWidth,
  nameStyle,
  contentStyle,
  className,
  tooltip,
  onConfirm,
  setUpdater
}: PropsType) {
  const [isFocusing, setIsFocusing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [code, setCode] = useState('');
  const total = useMemo(() => (medal?.trading_volume > 0 ? 100 : medal?.threshold), [medal]);
  const quantity = useMemo(
    () => (medal?.trading_volume > 0 ? Big(medal?.completed_percent).toFixed(2) : (medal?.completed_threshold ?? 0)),
    [medal]
  );
  const SPECIAL_LEVEL_NAME_MAPPING: any = {
    'Pioneer Leader': 'JanZ53390935',
    'Pioneer Silver': 'vitalik.eth',
    'Pioneer Bronze': 'checkra1neth'
  };
  const { run: handleFocusAndBlur } = useDebounceFn(
    (focusing) => {
      setIsFocusing(focusing);
    },
    {
      wait: 300
    }
  );
  return (
    <StyledMedalCard style={style} className={className}>
      {medal?.medal_category === 'ama' && (
        <StyledStatus $expired={Date.now() > medal?.end_time}>
          {Date.now() > medal?.end_time ? 'Expired' : 'Limited'}
        </StyledStatus>
      )}
      <StyledFlex gap="15px">
        <StyledMedalImage
          className={Number(quantity) < total && !SPECIAL_LEVEL_NAME_MAPPING[medal?.level_name] ? 'disabled' : ''}
          src={medal?.logo}
        />
        <StyledFlex flexDirection="column" alignItems="flex-start" gap="8px">
          <StyledFont
            color="#FFF"
            fontSize="20px"
            fontWeight="700"
            lineClamp="2"
            className="ellipsis"
            style={nameStyle}
          >
            {medal?.level_name}
          </StyledFont>
          <StyledFont color="#979ABE" style={contentStyle} fontSize="14px" lineClamp="2" className="ellipsis">
            {medal?.level_description}
          </StyledFont>
        </StyledFlex>
      </StyledFlex>
      <StyledMark className={`${className || ''}-reward-badge`}>
        <StyledFont color="#FFF" fontWeight="700">
          {medal?.gem}
        </StyledFont>
        <StyledSvg>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
            <path
              d="M6.24455 14.0005L0.202134 8.2838V5.71712L6.24455 0.000433922H8.95747L14.9999 5.71712V8.2838L8.95747 14.0005H6.24455Z"
              fill="#F4DC27"
            />
            <path
              d="M12.5336 6.68359L7.93568 2.33354L8.95747 0.000201225L14.9999 5.71689L12.5336 6.68359Z"
              fill="#ED9B0D"
            />
            <path d="M6.24457 14.0005L0.202161 8.2838L2.66845 7.3171L7.26636 11.6671L6.24457 14.0005Z" fill="#F1B600" />
            <path d="M8.95752 14.0005L7.93598 11.6671H7.26638L6.2446 14.0005H8.95752Z" fill="#F1F50E" />
            <path d="M8.95752 0.00015378L7.93574 2.3335H7.26663L6.2446 0.00015378H8.95752Z" fill="#EDC102" />
            <path d="M2.66846 6.68346V7.3165L0.202166 8.2832V5.71653L2.66846 6.68346Z" fill="#F6CA18" />
            <path d="M12.5336 6.68323L14.9999 5.71653V8.2832L12.5336 7.31673V6.68323Z" fill="#F1B600" />
            <path
              d="M6.24457 -3.09944e-05L7.26636 2.33331L2.66845 6.68359L0.202161 5.71666L6.24457 -3.09944e-05Z"
              fill="#EFB000"
            />
            <path d="M12.5336 7.3171L14.9999 8.2838L8.95747 14.0005L7.93568 11.6671L12.5336 7.3171Z" fill="#F0CC00" />
          </svg>
        </StyledSvg>
      </StyledMark>
      {medal?.medal_category === 'ama' && Number(quantity) < Number(total) ? (
        <StyledAmaInputContainer>
          <StyledAmaInput
            $error={isError}
            placeholder="Enter the mystery code"
            value={code}
            onChange={(event) => {
              setIsError(false);
              setCode(event?.target?.value);
            }}
            onFocus={() => handleFocusAndBlur(true)}
            onBlur={() => handleFocusAndBlur(false)}
          />
          <StyledAmaConfirmButton
            $show={isFocusing}
            onClick={async () => {
              const result = onConfirm
                ? await onConfirm({
                    medal_id: medal?.id,
                    code
                  })
                : null;
              if (result?.code === 0) {
                setIsError(false);
                setCode('');
                setUpdater && setUpdater(Date.now());
              } else {
                setIsError(true);
              }
            }}
          >
            confirm
          </StyledAmaConfirmButton>
        </StyledAmaInputContainer>
      ) : SPECIAL_LEVEL_NAME_MAPPING[medal?.level_name] ? (
        <StyledFlex justifyContent="space-between">
          <StyledSpecifiedContainer>
            <StyledSpecified>Specified</StyledSpecified>
          </StyledSpecifiedContainer>
          <StyledFont color="#FFF" fontSize="14px">
            Owner: {SPECIAL_LEVEL_NAME_MAPPING[medal?.level_name]}
          </StyledFont>
        </StyledFlex>
      ) : (
        <ProgressBar
          className={`${className || ''}-progress-bar`}
          quantity={+quantity}
          total={total}
          showAchieved={true}
          showPercent={medal?.trading_volume > 0 ? true : false}
          barWidth={barWidth}
          tooltip={tooltip}
        />
      )}
    </StyledMedalCard>
  );
}
