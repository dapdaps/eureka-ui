import Image from "next/image";
import React from "react";

import {
  StyledBtn,
  StyledContainer,
  StyledContent,
  StyledFoot,
  StyledHead,
  StyledIcon, StyledReloadBtn, StyledTitle
} from "@/views/OdysseyV5/components/EarnedCard/styles";

const EarnedCard = (props: Props) => {
  const { title, icon, iconBorder, reload } = props;

  return (
    <StyledContainer style={props.styles}>
      <StyledHead>
        <StyledIcon borderColor={iconBorder}>
          <Image src={icon} alt="" width={54} height={54} />
        </StyledIcon>
        <StyledTitle>
          {title.toUpperCase()}
        </StyledTitle>
      </StyledHead>
      <StyledContent>
        {props.children}
      </StyledContent>
      <StyledFoot>
        <StyledBtn>
          {props.submit}
          <Image src="/images/odyssey/v5/arrow.svg" alt="" width={19} height={12} />
        </StyledBtn>
        {
          reload && (
            <StyledReloadBtn>
              <Image src="/images/odyssey/v5/reload.svg" alt="" width={18} height={18} />
            </StyledReloadBtn>
          )
        }
      </StyledFoot>
    </StyledContainer>
  );
};

export default EarnedCard;

interface Props {
  children: React.ReactElement|React.ReactElement[];
  icon: string;
  iconBorder?: string;
  title: string;
  submit: string;
  reload?: boolean;
  styles?: React.CSSProperties;
}
