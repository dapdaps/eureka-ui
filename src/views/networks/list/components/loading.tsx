import { memo } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const LoadingSkeleton = () => {
  return (
    <StyledLoadingSkeleton>
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
    </StyledLoadingSkeleton>
  );
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
