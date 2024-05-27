import Image from 'next/image';

import ClaimButton from '@/views/OdysseyV2-1/components/ClaimButton';
import {
  StyledCardBack,
  StyledCardContainer,
  StyledCardFront,
  StyledCardIcon,
  StyledCount, StyledGameClaim,
  StyledGameContainer,
  StyledGameFooter,
  StyledText,
  StyledTextContainer,
} from '@/views/OdysseyV2-1/components/Matrix/styles';
import { DAPP_SPLIT } from '@/views/OdysseyV2-1/config';
import { useGame } from '@/views/OdysseyV2-1/hooks/useGame';

const MatrixGame = () => {

  const { dappList, handleDapp, calcClaim, claimedDapps, lines, claimedDappsLines } = useGame();

  return (
    <>
      <StyledGameContainer>
        {
          dappList.map((dapp, index) => (
            <StyledCardContainer
              status={dapp.status}
              count={200}
              onClick={() => handleDapp(dapp, index)}
              key={dapp.key}
            >
              <StyledCardFront src={dapp.card} />
              <StyledCardBack>
                <StyledCardIcon src={dapp.icon} alt="" />
                <div className="card-name">{dapp.name}</div>
              </StyledCardBack>
            </StyledCardContainer>
          ))
        }
        <StyledGameClaim>
          <div className="claim-row">
            {
              [...new Array(Math.ceil(dappList.length / DAPP_SPLIT)).keys()].map((i) => (
                <div key={i + ''} className={`claim-cell ${calcClaim('rows', i + 1) ? 'active' : ''}`}>
                  <Image
                    className="claim-img"
                    src="/images/odyssey/v2-1/matrix-pts.svg"
                    alt=""
                    width={91}
                    height={47}
                  />
                </div>
              ))
            }
          </div>
          <div className="claim-col">
            {
              [...new Array(DAPP_SPLIT).keys()].map((i) => (
                <div key={i + ''} className={`claim-cell ${calcClaim('cols', i + 1) ? 'active' : ''}`}>
                  <Image
                    className="claim-img"
                    src="/images/odyssey/v2-1/matrix-pts.svg"
                    alt=""
                    width={91}
                    height={47}
                  />
                </div>
              ))
            }
          </div>
        </StyledGameClaim>
      </StyledGameContainer>
      <StyledGameFooter>
        <StyledTextContainer>
          <StyledCount>{claimedDapps}</StyledCount>
          <StyledText>explored<br />dapps</StyledText>
        </StyledTextContainer>
        <StyledTextContainer className="center">
          <StyledCount>{claimedDappsLines}</StyledCount>
          <StyledText>Completed<br />Lines</StyledText>
        </StyledTextContainer>
        <ClaimButton count={200 * claimedDappsLines} />
      </StyledGameFooter>
    </>
  );
};

export default MatrixGame;