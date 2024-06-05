import Image from 'next/image';

import ClaimButton from '@/views/OdysseyV2-1/components/ClaimButton';
import {
  StyledCardBack,
  StyledCardContainer,
  StyledCardFront,
  StyledCardIcon,
  StyledCount,
  StyledGameClaim,
  StyledGameContainer,
  StyledGameFooter, StyledPTS,
  StyledText,
  StyledTextContainer,
} from '@/views/OdysseyV2-1/components/Matrix/styles';
import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';
import Big from 'big.js';

const MatrixGame = (props: any) => {
  const {
    dappList,
    handleDapp,
    calcClaim,
    claimedDapps,
    claimedDappsLines,
    dappSplit,
    unclaimed,
    loading,
    onClaim,
    config,
  } = props;

  const containerWidth = 28 * 2 + dappSplit * 182 + (dappSplit - 1) * 10;

  return (
    <>
      <StyledGameContainer style={{ width: containerWidth }}>
        {
          dappList.map((dapp: any, index: number) => (
            <StyledCardContainer
              status={dapp.status}
              count={200}
              onClick={() => handleDapp(dapp, index)}
              key={dapp.id}
            >
              <StyledCardFront src={dapp.card} />
              <StyledCardBack>
                <StyledCardIcon src={dapp.icon} alt="" />
                <div className="card-name">{dapp.name}</div>
              </StyledCardBack>
            </StyledCardContainer>
          ))
        }
        {
          !dappList.length && (
            <StyledLoadingWrapper $h="100px">
              <Loading size={30} />
            </StyledLoadingWrapper>
          )
        }
        <StyledGameClaim>
          <div className="claim-row">
            {
              dappSplit && [...new Array(Math.ceil(dappList.length / dappSplit)).keys()].map((i) => (
                <div key={i + ''} className={`claim-cell ${calcClaim('rows', i + 1) ? 'active' : ''}`}>
                  <StyledPTS>
                    <div>{config ? config.row_reward : 0}</div>
                    <div>PTS</div>
                  </StyledPTS>
                </div>
              ))
            }
          </div>
          <div className="claim-col">
            {
              dappSplit && [...new Array(dappSplit).keys()].map((i) => (
                <div key={i + ''} className={`claim-cell ${calcClaim('cols', i + 1) ? 'active' : ''}`}>
                  <StyledPTS>
                    <div>{config ?config.column_reward : 0}</div>
                    <div>PTS</div>
                  </StyledPTS>
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
        <ClaimButton count={unclaimed} loading={loading} onClaim={onClaim} />
      </StyledGameFooter>
    </>
  );
};

export default MatrixGame;