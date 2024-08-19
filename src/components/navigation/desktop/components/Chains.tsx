import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/router';
import { IdToPath } from '@/config/all-in-one/chains';
import { Network } from '@/components/DropdownSearchResultPanel/hooks/useDefaultSearch';
import LazyImage from '@/components/LazyImage';

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
  height: 114px;
  row-gap: 10px;
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

  .name {
    white-space: nowrap;
    max-width: 90px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    color: #fff;
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
  onClick
}: {
  loading: boolean;
  data: Network[];
  onClick?: () => void
}) => {
  const router = useRouter()
  
  const handleClick = (item: Network) => {
    onClick?.();
    router.prefetch(`/networks/${IdToPath[item.id]}`);
    router.push(`/networks/${IdToPath[item.id]}`);
  }
  return (
    <GridContainer>
      {loading ? <LoadingCard /> : data.map((item) => (
        <GridItemContainer key={item.id} onClick={() => handleClick(item)} title={item.name}>
          <LazyImage
            src={item.logo}
            alt={item.name}
            width={60}
            height={60}
          />
          <div className="name">{item.name}</div>
        </GridItemContainer>
      ))}
    </GridContainer>
  );
};

export default Chains;
