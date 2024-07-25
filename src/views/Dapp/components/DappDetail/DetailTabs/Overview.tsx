import {
  StyledOverviewTitle,
  StyledOverviewDesc,
  StyledOverview,
  StyledToken,
  StyledTokenLabel,
  StyledTokenValue,
  StyledAirdrop,
  StyledAirdropHead,
  StyledAirdropLabel,
  StyledAirdropValue,
  StyledAirdropBody,
  StyledAirdropBodyItem,
  StyledAirdropShadow,
  StyledAirdropIcon,
  StyledAirdropTitle,
  StyledAirdropArrow,
  StyledOverviewContainer,
  StyledAirdropMainTitle,
  StyledAirdropActions,
  StyledAirdropActionsText,
  StyledAirdropActionsTextPrimary,
} from './styles';

import { actionList, airdropList } from '../config';
import ArrowIcon from '@/components/Icons/ArrowIcon';

const Overview = ({ name, description }: any) => {

  return (
    <StyledOverviewContainer>
      <StyledOverview>
        <StyledOverviewTitle>What is {name ?? ''}?</StyledOverviewTitle>
        <StyledOverviewDesc>{description ?? ''}</StyledOverviewDesc>
        <StyledToken>
          <StyledTokenLabel>Project Token</StyledTokenLabel>
          <StyledTokenValue>TBD🔥</StyledTokenValue>
        </StyledToken>
      </StyledOverview>
      <StyledAirdrop>
        <StyledAirdropMainTitle>Airdrop 🪂</StyledAirdropMainTitle>
        <StyledAirdropHead>
          {
            airdropList.map(airdrop => (
              <div key={airdrop.key} className="airdrop-item">
                <StyledAirdropLabel>{airdrop.label}</StyledAirdropLabel>
                <StyledAirdropValue>{airdrop.value}</StyledAirdropValue>
              </div>
            ))
          }
        </StyledAirdropHead>
        <StyledAirdropBody>
          <StyledAirdropActions>
            Actions
            <StyledAirdropActionsText>
              <StyledAirdropActionsTextPrimary>1</StyledAirdropActionsTextPrimary>
              <span>/</span>
              <span>{actionList.length}</span>
            </StyledAirdropActionsText>
          </StyledAirdropActions>
          {
            actionList.map((item) => (
              <StyledAirdropBodyItem $finished={item.finished}>
                <div>
                  <StyledAirdropShadow className={item.finished ? 'finished' : ''}>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0 12C0 5.37258 5.37258 0 12 0H30L0 30V12Z"
                        fill={item.finished ? '#EBF479' : '#979ABE'}
                        opacity={item.finished ? 1 : 0.2}
                      />
                    </svg>
                    {
                      item.finished && (
                        <StyledAirdropIcon url="/images/alldapps/icon-checked.svg" />
                      )
                    }
                  </StyledAirdropShadow>
                  <StyledAirdropTitle>{item.label}</StyledAirdropTitle>
                </div>
                <StyledAirdropArrow>
                  <ArrowIcon size={11} />
                </StyledAirdropArrow>
              </StyledAirdropBodyItem>
            ))
          }
        </StyledAirdropBody>
      </StyledAirdrop>
    </StyledOverviewContainer>
  );
};


export default Overview;