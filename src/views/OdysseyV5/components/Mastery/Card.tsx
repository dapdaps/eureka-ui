import Image from "next/image";
import React from "react";

import {
  StyledCardContainer,
  StyledCardContent,
  StyledCardFoot,
  StyledCardHead,
  StyledStatus,
} from '@/views/OdysseyV5/components/Mastery/styles';

const MasteryCard = (props: Props) => {
  const {
    title,
    pointsEarned,
    result,
    children,
    finished,
  } = props;

  return (
    <StyledCardContainer style={props.styles}>
      <StyledStatus $finished={finished}>
        {
          finished ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="8" fill="#DFFE00"/>
              <path d="M4 8.33333L7 11L12 5" stroke="black" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="8" cy="8" r="7" fill="#1A1A1A" stroke="#DFFE00" strokeWidth="2" />
            </svg>
          )
        }
        <div className="status-tips">
          You completed this strategy already
        </div>
      </StyledStatus>
      <StyledCardHead>
        {title}
      </StyledCardHead>
      <StyledCardContent>
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
  finished?: boolean;
}
