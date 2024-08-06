import React, { useMemo } from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';


const GridContainer = styled.div`
  padding: 16px 12px;
  display: grid;
  grid-template-columns: repeat(4, 100px);
  border-radius: 12px;
`;

const GridItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: background-color 0.3s, box-shadow 0.3s;
  width: 100px;
  height: 110px;
  &:hover {
    cursor: pointer;
    border-radius: 6px;
    background-color: rgba(0,0,0,0.2);
    img {
        opacity: 1
    }
  }

  img {
    width: 60px;
    height: 60px;
    margin-bottom: 10px;
    display: block;
    border-radius: 12px;
    opacity: 0.6;
  }

  .label {
    color: #fff;
    font-size: 16px;
    height: 16px;
    line-height: 16px;
    width: 86px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const LoadingCard = () => {
  return Array.from({ length: 16 }).map((_) => (
    <GridItemContainer>
      <Skeleton width="60px" height="60px" borderRadius="12px" />
      <Skeleton width="86px" height="16px" borderRadius="6px" />
    </GridItemContainer>
  ));
}

const Chains = ({
  loading,
  data,
}: {
  loading: boolean;
  data: { name: string; logo: string }[];
}) => {
  const items = useMemo(() =>  data.map(item => ({ iconSrc: item.logo, label: item.name })), [data]);

  return (
    <GridContainer>
      {loading ? <LoadingCard /> : items.map((item, index) => (
        <GridItemContainer key={index}>
          <img src={item.iconSrc} alt={item.label} />
          <div className="label">{item.label}</div>
        </GridItemContainer>
      ))}
    </GridContainer>
  );
};

export default Chains;
