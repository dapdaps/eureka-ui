import styled from 'styled-components';
import { Network } from './hooks/useDefaultSearch';
import Skeleton from 'react-loading-skeleton';

const StyleChain = styled.div`
  padding: 0 20px;
  margin-top: 30px;
  .title {
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
    margin-bottom: 16px;
    color: #979abe;
  }
`;
const StyleList = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 100px;
  margin-bottom: 20px;
  .item {
    display: flex;
    align-items: center;
    flex-direction: column;
    grid-row-gap: 10px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
      cursor: pointer;
      & .brand {
        opacity: 1;
      }
    }
    .brand {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      opacity: 0.6;
    }
    .name {
      font-weight: 600;
      font-size: 16px;
      line-height: 16px;
      color: #fff;
      text-align: center;
    }
  }
`;

const LoadingCard = () => (
  <StyleList>
    {Array.from({ length: 6 }).map((_, index) => (
      <div className="item" key={index}>
        <Skeleton circle={true} height={60} width={60} />
        <Skeleton height={16} width={60} />
      </div>
    ))}
  </StyleList>
);

const Chain = ({ data, loading, onClick }: { data: Network[]; loading: boolean; onClick: (item: any) => void }) => {
  if (!data || data.length === 0) return null
  return (
    <StyleChain>
      <div className="title">Chain</div>
      {loading ? (
        <LoadingCard />
      ) : (
        <StyleList>
          {(data).map((item, index) => (
            <div className="item" key={index} onClick={() => onClick(item)}>
              <img className="brand" src={item.logo} alt="" />
              <span className="name">{item.name}</span>
            </div>
          ))}
        </StyleList>
      )}
    </StyleChain>
  );
};

export default Chain;
