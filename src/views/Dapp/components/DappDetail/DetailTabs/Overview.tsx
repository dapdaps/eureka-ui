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
  StyledAirdropArrow
} from './styles';

import { actionList, airdropList } from '../config';
import ArrowIcon from "@/components/Icons/ArrowIcon";

const airdropShadow = (
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
    <path opacity="0.2" d="M0 12C0 5.37258 5.37258 0 12 0H30L0 30V12Z" fill="currentColor" />
  </svg>
);

const Overview = ({name, description}: any) => {

  return (<> <StyledOverview>
    <StyledOverviewTitle>What is {name ?? ''}?</StyledOverviewTitle>
    <StyledOverviewDesc>{description ?? ''}</StyledOverviewDesc>
    <StyledToken>
      <StyledTokenLabel>Project Token</StyledTokenLabel>
      <StyledTokenValue>TBD🔥</StyledTokenValue>
    </StyledToken>
  </StyledOverview>
      <StyledAirdrop>
        <StyledAirdropHead>
          {
            airdropList.map(airdrop => (<div key={airdrop.key} className='airdrop-item'>
              <StyledAirdropLabel>{airdrop.label}</StyledAirdropLabel>
              <StyledAirdropValue>{airdrop.value}</StyledAirdropValue>
            </div>))
          }

        </StyledAirdropHead>
        <StyledAirdropBody>
          {
            actionList.map(item => (
              <StyledAirdropBodyItem>
                <div>
                  <StyledAirdropShadow>
                    {airdropShadow}
                    <StyledAirdropIcon url='/images/alldapps/icon-checked.svg'/>
                  </StyledAirdropShadow>
                  <StyledAirdropTitle>{item.label}</StyledAirdropTitle>
                </div>
                <StyledAirdropArrow>
                  <ArrowIcon size={11}/>
                </StyledAirdropArrow>
              </StyledAirdropBodyItem>
            ))
          }
        </StyledAirdropBody>
      </StyledAirdrop>
  </>

  );
};


export default Overview;