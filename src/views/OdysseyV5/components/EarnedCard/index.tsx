import Image from "next/image";
import React from "react";

import {
  StyledBtn,
  StyledContainer,
  StyledContent,
  StyledFoot,
  StyledHead,
  StyledIcon, StyledIconWrapper,
  StyledTitle,
} from '@/views/OdysseyV5/components/EarnedCard/styles';
import RefreshButton from '@/views/OdysseyV5/components/RefreshButton';
import useCheck from '@/views/OdysseyV5/hooks/useCheck';

const EarnedCard = (props: Props) => {
  const {
    title,
    icon,
    iconBorder,
    reload,
    spins = 0,
    total_spins = 0,
    id = '',
    handleSubmit = () => {
    },
    refreshDetail = () => {
    },
    detailLoading = false,
    setDetailLoading =() => {
  }
  } = props;

  const { checking, handleRefresh } = useCheck({ id, total_spins, spins }, (_times: number) => {
    refreshDetail(id, _times);
  }, detailLoading, setDetailLoading);

  return (
    <StyledContainer style={props.styles}>
      <StyledHead>
        <StyledIconWrapper>
          {
            Array.isArray(icon) ? icon.map((ic, idx) => (
              <StyledIcon
                key={idx}
                borderColor={iconBorder}
                left={7 * idx}
                zIndex={icon.length - idx}
              >
                <Image src={ic} alt="" width={54} height={54} />
              </StyledIcon>
            )) : (
              <StyledIcon borderColor={iconBorder}>
                <Image src={icon} alt="" width={54} height={54} />
              </StyledIcon>
            )
          }
        </StyledIconWrapper>
        <StyledTitle>
          {title.toUpperCase()}
        </StyledTitle>
      </StyledHead>
      <StyledContent>
        {props.children}
      </StyledContent>
      <StyledFoot>
        <StyledBtn onClick={handleSubmit}>
          {props.submit}
          <Image src="/images/odyssey/v5/arrow.svg" alt="" width={19} height={12} />
        </StyledBtn>
        {
          reload && (
            <RefreshButton
              onClick={(ev: any) => {
                ev.stopPropagation();
                if (!checking && !detailLoading) handleRefresh();
              }}
              loading={checking}
            />
          )
        }
      </StyledFoot>
    </StyledContainer>
  );
};

export default EarnedCard;

interface Props {
  children: React.ReactElement | React.ReactElement[];
  icon: string|string[];
  iconBorder?: string;
  title: string;
  submit: string;
  reload?: boolean;
  styles?: React.CSSProperties;
  detailLoading?: boolean;
  id?: string;
  total_spins?: number;
  spins?: number;

  handleSubmit?(): void;
  refreshDetail?(id: string, times: number): void;
  setDetailLoading?(): void;
}
