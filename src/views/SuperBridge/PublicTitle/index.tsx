import type { ReactElement } from 'react';
import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  font-size: 22px;
  font-weight: 700;
  line-height: 26.4px;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const SubTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0 20px;
`;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
  color: rgba(151, 154, 190, 1);
`;

interface Props {
  title: string | ReactElement;
  subTitle?: string;
  renderAction?: () => ReactElement | null;
}

export default function PublicTitle({ title, subTitle, renderAction }: Props) {
  return (
    <div>
      <Title>
        {title === 'Super Bridge' && (
          <svg width="19" height="28" viewBox="0 0 19 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.518569 12.0992L12.6473 0.695687C13.598 -0.198154 15.0885 0.861905 14.5562 2.05328L11.1451 9.68708C10.814 10.428 11.3022 11.2762 12.1091 11.3622L17.7878 11.9671C18.82 12.0771 19.2304 13.3608 18.4532 14.0491L3.72053 27.0986C2.72016 27.9847 1.24149 26.81 1.87837 25.6351L6.84651 16.4705C7.24896 15.7281 6.77497 14.8138 5.93631 14.7149L1.19686 14.1558C0.188828 14.0369 -0.220926 12.7945 0.518569 12.0992Z"
              fill="#EBF479"
            />
          </svg>
        )}
        {title}
      </Title>
      <SubTitleBox>
        {subTitle && <SubTitle>{subTitle}</SubTitle>}
        {renderAction && renderAction()}
      </SubTitleBox>
    </div>
  );
}
