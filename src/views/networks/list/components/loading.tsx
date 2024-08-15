import React, { memo } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { ModeKey } from '@/views/networks/list';
import {
  ChainDesc,
  ChainInfo,
  ChainNameContainer,
  LogoGroup,
  StyledBtnGroup,
  StyledCardContainer,
  StyledCardHead,
  StyledData,
  StyledDataItem,
  StyledReward,
} from '@/views/networks/list/components/styles';
import {  DataListShown } from '@/views/networks/list/components/utils';

const LoadingSkeleton = ({ type }: {type: ModeKey}) => {
  return type === 'list' ? (  <StyledLoadingSkeleton>
    <StyledLoadingHead>
      <StyledLoadingHeadLeft>
        <Skeleton
          width="60px"
          height="60px"
          borderRadius="12px"
          containerClassName="skeleton"
        />
        <div className="loading-title">
          <Skeleton
            width="42px"
            height="25px"
            borderRadius="12px"
            containerClassName="skeleton"
          />
          <Skeleton
            width="42px"
            height="21px"
            borderRadius="12px"
            containerClassName="skeleton"
          />
        </div>
      </StyledLoadingHeadLeft>
      <StyledLoadingHeadRight>
        <Skeleton
          width="124px"
          height="40px"
          borderRadius="12px"
          containerClassName="skeleton"
        />
        <Skeleton
          width="124px"
          height="40px"
          borderRadius="12px"
          containerClassName="skeleton"
        />
      </StyledLoadingHeadRight>
    </StyledLoadingHead>
    <StyledLoadingBody>
      <Skeleton
        width="225px"
        height="46px"
        borderRadius="12px"
        containerClassName="skeleton"
      />
      <Skeleton
        width="225px"
        height="46px"
        borderRadius="12px"
        containerClassName="skeleton"
      />
      <Skeleton
        width="225px"
        height="46px"
        borderRadius="12px"
        containerClassName="skeleton"
      />
      <Skeleton
        width="225px"
        height="46px"
        borderRadius="12px"
        containerClassName="skeleton"
      />
    </StyledLoadingBody>
  </StyledLoadingSkeleton>) : (<StyledCardContainer>
    <StyledCardHead>
      <LogoGroup>
        <Skeleton width={72} height={72}/>
        <ChainInfo>
          <ChainNameContainer className='chain-name-card'>
           <Skeleton width={60} height={25}/>
           <Skeleton width={100} height={25}/>
          </ChainNameContainer>
          <ChainDesc>
            <Skeleton width={42} height={21}/>
          </ChainDesc>
        </ChainInfo>
      </LogoGroup>
    </StyledCardHead>
    <StyledData>
      {
        DataListShown({ medals: 0,
          classname: 'list-card-data'
        }).map((item) => (<StyledDataItem key={item.key}>
          <Skeleton width={128} height={20}/>
          <Skeleton width={72} height={20}/>
        </StyledDataItem>))
      }
    </StyledData>
    <StyledReward>
      <Skeleton width={128} height={20}/>
      <Skeleton width={82} height={20}/>
    </StyledReward>
    <StyledBtnGroup>
      <Skeleton width={108} height={48}/>
      <Skeleton width={229} height={48}/>
    </StyledBtnGroup>
  </StyledCardContainer>);
};

export default memo(LoadingSkeleton);

export const StyledLoadingSkeleton = styled.div`
  width: 1260px;
  height: 186px;
  border-radius: 20px;
  border: 1px solid #202329;
  background: #18191e;
  backdrop-filter: blur(10px);
  margin-bottom: 20px;
  padding: 30px 30px 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 20px;
`;
export const StyledLoadingHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
export const StyledLoadingBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
export const StyledLoadingHeadLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`;
export const StyledLoadingHeadRight = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
`;
