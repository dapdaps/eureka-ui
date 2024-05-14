import {
  StyledContainer,
  StyledContent, StyledEarnedCardContent, StyledEarnedItem,
  StyledFoot,
  StyledHead, StyledInner,
  StyledTitle
} from "@/views/OdysseyV5/components/Blitz/styles";
import EarnedCard from "@/views/OdysseyV5/components/EarnedCard";
import Image from "next/image";
import React from "react";

const EarnList = [
  {
    key: 1,
    name: 'RENZO',
    icon: '/images/odyssey/v5/mastery/temp/renzo.svg',
    tips: 'Use Renzo to complete transactions on dapdap and get extra Orbs/Photons rewards',
    earned: [
      {
        key: 1,
        icon: '/images/odyssey/v5/mastery/temp/photons.svg',
        name: 'Mode Photons',
        type: 'rect',
      },
      {
        key: 2,
        icon: '/images/odyssey/v5/mastery/temp/mode.svg',
        name: 'Mode Points',
        type: 'bound',
      },
      {
        key: 3,
        icon: '/images/odyssey/v5/mastery/temp/renzo-points.svg',
        name: 'RENZO POINTS',
        type: 'bound',
      },
    ],
    conditions: [
      'Transaction volume >100$',
    ],
    submit: 'Supply',
  },
  {
    key: 2,
    name: 'RENZO',
    icon: '/images/odyssey/v5/mastery/temp/renzo.svg',
    tips: 'Use Renzo to complete transactions on dapdap and get extra Orbs/Photons rewards',
    earned: [
      {
        key: 1,
        icon: '/images/odyssey/v5/mastery/temp/photons.svg',
        name: 'Mode Photons',
        type: 'rect',
      },
      {
        key: 2,
        icon: '/images/odyssey/v5/mastery/temp/mode.svg',
        name: 'Mode Points',
        type: 'bound',
      },
      {
        key: 3,
        icon: '/images/odyssey/v5/mastery/temp/renzo-points.svg',
        name: 'RENZO POINTS',
        type: 'bound',
      },
    ],
    conditions: [
      'Transaction volume >100$',
    ],
    submit: 'Supply',
  },
  {
    key: 3,
    name: 'RENZO',
    icon: '/images/odyssey/v5/mastery/temp/renzo.svg',
    tips: 'Use Renzo to complete transactions on dapdap and get extra Orbs/Photons rewards',
    earned: [
      {
        key: 1,
        icon: '/images/odyssey/v5/mastery/temp/photons.svg',
        name: 'Mode Photons',
        type: 'rect',
      },
      {
        key: 2,
        icon: '/images/odyssey/v5/mastery/temp/mode.svg',
        name: 'Mode Points',
        type: 'bound',
      },
      {
        key: 3,
        icon: '/images/odyssey/v5/mastery/temp/renzo-points.svg',
        name: 'RENZO POINTS',
        type: 'bound',
      },
    ],
    conditions: [
      'Transaction volume >100$',
    ],
    submit: 'Supply',
  },
];

const Blitz = () => {

  return (
    <StyledContainer id="odysseySectionModeDAppBlitz">
      <StyledInner>
        <StyledHead>
          <StyledTitle>
            <h2 className="title">
              Mode DApp Blitz
            </h2>
            <h5 className="title sub">
              Experience the Madness, Snatch Extraordinary Bounties!
            </h5>
          </StyledTitle>
        </StyledHead>
        <StyledContent>
          {
            EarnList.map((earn) => (
              <EarnedCard
                key={earn.key}
                title={earn.name}
                icon={earn.icon}
                iconBorder="#DFFE00"
                submit={earn.submit}
                styles={{
                  flex: 1,
                }}
                reload
              >
                <StyledEarnedCardContent>
                  <div className="tips">
                    {earn.tips}
                  </div>
                  <section className="section earned">
                    <div className="title">NFT & Points earned:</div>
                    <ul className="list">
                      {
                        earn.earned.map((item) => (
                          <StyledEarnedItem className="item" key={item.key} type={item.type}>
                            <Image src={item.icon} alt="" width={30} height={30} />
                            {item.name.toUpperCase()}
                          </StyledEarnedItem>
                        ))
                      }
                    </ul>
                  </section>
                  <section className="section requirements">
                    <div className="title">NFT & Points earned:</div>
                    <ul className="list">
                      {
                        earn.conditions.map((condition, idx) => (
                          <li className="item" key={idx}>{condition}</li>
                        ))
                      }
                    </ul>
                  </section>
                </StyledEarnedCardContent>
              </EarnedCard>
            ))
          }
        </StyledContent>
        <StyledFoot>
          <div className="summary">
            <div className="title">Your Mode Orbs</div>
            <div className="value">&lt; 25,668 &gt;</div>
          </div>
          <div className="summary">
            <div className="title">Your Mode Orbs</div>
            <div className="value">&lt; 25,668 &gt;</div>
          </div>
        </StyledFoot>
      </StyledInner>
    </StyledContainer>
  );
};

export default Blitz;
