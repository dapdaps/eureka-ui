import Image from "next/image";
import React, { useState } from 'react';

import LockStatus from '@/views/OdysseyV5/components/LockStatus';
import {
  StyledCardContainer,
  StyledCardContent,
  StyledCardFoot,
  StyledCardHead,
  StyledCardHeadTitle,
  StyledStatus, StyledStatusExplored,
  StyledStatusItem,
  StyledStatusUnexplored,
} from '@/views/OdysseyV5/components/Mastery/styles';
import RefreshIcon from '@/views/OdysseyV5/components/RefreshButton';
import useCheck from '@/views/OdysseyV5/hooks/useCheck';

const MasteryCard = (props: Props) => {
  const {
    title,
    pointsEarned,
    result,
    children,
    currentStrategy,
    updateStrategies,
  } = props;

  const { checking, handleRefresh } = useCheck(currentStrategy, (_times: number) => {
    updateStrategies(currentStrategy.id, _times);
  }, false, () => {});

  return (
    <StyledCardContainer style={props.styles}>
      <StyledCardHead>
        <StyledCardHeadTitle>{title}</StyledCardHeadTitle>
        <StyledStatus>
          {
            currentStrategy.finished ? (
              <StyledStatusExplored>
                <LockStatus status={true} style={{ lineHeight: 1, height: '100%' }} />
              </StyledStatusExplored>
            ) : (
              <StyledStatusUnexplored>
                <RefreshIcon
                  onClick={(ev: any) => {
                    ev.stopPropagation();
                    if (checking || !currentStrategy || !currentStrategy.id) return;
                    handleRefresh();
                  }}
                  loading={checking}
                  style={{
                    cursor: (currentStrategy && currentStrategy.id) ? 'pointer' : 'not-allowed',
                  }}
                />
                <StyledStatusItem>Unexplored</StyledStatusItem>
              </StyledStatusUnexplored>
            )
          }
        </StyledStatus>
      </StyledCardHead>
      <StyledCardContent style={{ marginTop: currentStrategy.finished ? 30 : 0 }}>
        <div className="section points-earned">
          <div className="title">Points Earned:</div>
          <ul className="list">
            {
              pointsEarned.map((item) => (
                <li className="item" key={item.key}>
                  <Image src={item.icon} alt="" width={34} height={34} />
                  <span dangerouslySetInnerHTML={{ __html: item.name }}></span>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="section result">
          <div className="title">Result:</div>
          <ul className="list">
            {
              result.map((item, index) => (
                <li className="item" key={index}>
                  {item}
                </li>
              ))
            }
          </ul>
        </div>
      </StyledCardContent>
      <StyledCardFoot>
        {children}
      </StyledCardFoot>
    </StyledCardContainer>
  );
};

export default MasteryCard;

interface Props {
  title: string;
  pointsEarned: any[];
  result: any[];
  children: React.ReactElement;
  styles?: React.CSSProperties;
  currentStrategy: any;
  updateStrategies(id: any, times: any): void;
}
