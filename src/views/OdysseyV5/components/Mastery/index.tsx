import EarnedCard from "@/views/OdysseyV5/components/EarnedCard";
import MasteryCard from "@/views/OdysseyV5/components/Mastery/Card";
import {
  StyledContainer,
  StyledContent, StyledEarnedContent,
  StyledEarnedList, StyledInner,
  StyledTitle
} from "@/views/OdysseyV5/components/Mastery/styles";

const MasteryData = [
  {
    key: 1,
    title: 'Minor leverage long (1.25x)',
    pointsEarned: [
      {
        key: 1,
        icon: '/images/odyssey/v5/mastery/temp/ironclad.svg',
        name: 'Ironclad embers',
      },
      {
        key: 2,
        icon: '/images/odyssey/v5/mastery/temp/kim.svg',
        name: 'Kim points',
      },
      {
        key: 3,
        icon: '/images/odyssey/v5/mastery/temp/mode.svg',
        name: 'Mode Points',
      },
    ],
    result: [
      '1.25x leverage long on ETH, APR delta on Ironclad, swap fees from Kim, points accrual',
      'A short can be obtained in the same way, but instead you supply USDC and borrow ETH',
    ],
    earned: [
      {
        key: 1,
        name: 'Ironclad',
        icon: '/images/odyssey/v5/mastery/temp/ironclad-rect.svg',
        conditions: [
          'Supply ETH (current APR ~14%)',
          'Borrow 50% value in USDC (current borrow APR ~ -8.73%)',
        ],
        submit: 'Supply',
        link: '/dapp/ironclad-finance',
      },
      {
        key: 2,
        name: 'Kim',
        icon: '/images/odyssey/v5/mastery/temp/kim-rect.svg',
        conditions: [
          'Swap half USDC to ETH',
          'Add ETH-USDC liquidity',
        ],
        submit: 'Trade',
        link: '/dapp/kim-exchange',
      },
    ],
  },
  {
    key: 2,
    title: 'The Arbitragooor',
    pointsEarned: [
      {
        key: 1,
        icon: '/images/odyssey/v5/mastery/temp/ironclad.svg',
        name: 'Ironclad embers',
      },
      {
        key: 2,
        icon: '/images/odyssey/v5/mastery/temp/kim.svg',
        name: 'Kim points',
      },
      {
        key: 3,
        icon: '/images/odyssey/v5/mastery/temp/ezeth.svg',
        name: 'ezETH points',
      },
    ],
    result: [
      'Net APR of ~27% on ETH, points accrual',
    ],
    earned: [
      {
        key: 1,
        name: 'Ironclad',
        icon: '/images/odyssey/v5/mastery/temp/ironclad-rect.svg',
        conditions: [
          'Supply ETH (current APR ~14%)',
          'Borrow 50% value in USDC (current borrow APR ~ -8.73%)',
        ],
        submit: 'Supply',
        link: '/dapp/ironclad-finance',
      },
      {
        key: 2,
        name: 'STURDY FINANCE',
        icon: '/images/odyssey/v5/mastery/temp/ezeth-rect.svg',
        conditions: [
          'Supply ezETH (current APR ~26%)',
        ],
        submit: 'Supply',
        link: '/dapp/sturdy',
      },
    ],
  },
];

const Mastery = () => {

  return (
    <StyledContainer id="odysseySectionAirdropMastery">
      <StyledInner>
        <StyledTitle>
          <h2 className="title">
            Epic <span className="primary">Airdrop</span> Mastery
          </h2>
          <h5 className="title sub">
            Harnessing the Insanity for Maximum Mode Rewards!
          </h5>
        </StyledTitle>
        <StyledContent>
          {
            MasteryData.map((item) => (
              <MasteryCard
                key={item.key}
                title={item.title}
                pointsEarned={item.pointsEarned}
                result={item.result}
                styles={{ width: 0, flex: 1 }}
              >
                <StyledEarnedList>
                  {
                    item.earned.map((earn) => (
                      <EarnedCard
                        key={earn.key}
                        title={earn.name}
                        icon={earn.icon}
                        submit={earn.submit}
                        styles={{
                          background: '#2A2A2A',
                          paddingLeft: 20,
                          paddingRight: 20,
                          flex: 1,
                      }}
                        handleSubmit={() => {
                          if (earn.link) {
                            window.open(`${window.origin}${earn.link}`, '_blank');
                          }
                        }}
                      >
                        <StyledEarnedContent>
                          {
                            earn.conditions.map((condition, idx) => (
                              <li key={idx}>
                                <div className="point" />
                                {condition}
                              </li>
                            ))
                          }
                        </StyledEarnedContent>
                      </EarnedCard>
                    ))
                  }
                </StyledEarnedList>
              </MasteryCard>
            ))
          }
        </StyledContent>
      </StyledInner>
    </StyledContainer>
  );
};

export default Mastery;
