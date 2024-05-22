import Image from "next/image";
import React from "react";

import {
  StyledCardContainer,
  StyledCardContent,
  StyledCardFoot,
  StyledCardHead
} from "@/views/OdysseyV5/components/Mastery/styles";

const MasteryCard = (props: Props) => {
  const { title, pointsEarned, result, children } = props;

  return (
    <StyledCardContainer style={props.styles}>
      <StyledCardHead>
        {title}
      </StyledCardHead>
      <StyledCardContent>
        <div className="section points-earned">
          <div className="title">Points Earned:</div>
          <ul className="list">
            {
              pointsEarned.map((item) => (
                item.name ?
                  <li className="item" key={item.key}>
                  <Image src={item.icon} alt="" width={34} height={34} />
                  {item.name}
                </li> : <li style={{ width: '200px' }} key={item.key}></li>
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
}
