import React, { memo } from 'react';

import Arrow2Down from '@/views/AllInOne/components/Arrow2Down';
import {
  StyledBody,
  StyledCard,
  StyledCardBody,
  StyledCardHead,
  StyledContainer,
  StyledDownIcon, StyledFoot
} from '@/views/AllInOne/components/Bridge/styles';
import AllInOneButton from "@/views/AllInOne/components/Button";

const BridgeView = (props: Props) => {
  const { chain } = props;

  console.log(chain);

  return (
    <>
      <StyledContainer>
        <StyledBody>
          <BridgeCard type="editable" title="From">
            top
          </BridgeCard>
          <StyledDownIcon>
            <Arrow2Down />
          </StyledDownIcon>
          <BridgeCard styles={{ marginTop: 12 }} title="To">
            bot
          </BridgeCard>
        </StyledBody>
        <StyledFoot>
          <AllInOneButton
            $background={chain?.selectBgColor}
            $borderColor={chain?.selectBgColor}
            color={chain?.iconColor}
            loading={false}
            disabled={false}
          >
            Input Amount
          </AllInOneButton>
        </StyledFoot>
      </StyledContainer>
    </>
  );
};

export default memo(BridgeView);

interface Props {
  chain?: any;
}

const BridgeCard = (props: BridgeCardProps) => {
  const {
    type,
    styles,
    children,
    title
  } = props;
  return (
    <StyledCard style={styles}>
      <StyledCardHead>
        {title}
      </StyledCardHead>
      <StyledCardBody className={type}>
        {children}
      </StyledCardBody>
    </StyledCard>
  );
};

export type BridgeCardType = 'editable';

interface BridgeCardProps {
  type?: BridgeCardType;
  styles?: React.CSSProperties;
  children: any;
  title: string;
}
