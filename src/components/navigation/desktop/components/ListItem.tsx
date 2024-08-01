import styled from "styled-components"
import Skeleton from 'react-loading-skeleton';
import IconOdyssey from '@public/images/header/odyssey-new.svg';
import Status, { StatusType } from '../components/Status';
import { useMemo } from "react";

const Flex = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  padding-right: 0;
  gap: 12px;
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, .25);
    .bridgeImage{
      transform: translateY(-5px); 
    }
  }
  &.bridge-nav {
    padding: 0;
    &:hover {
      background: rgba(31, 34, 41, 1);
    }
    .nav {
      img {
        width: 150px;
        height: 90px;
      }
    }
    
  }
`

const StyleImage = styled.div`
  position: relative;
  transition: transform 0.3s ease-in-out;
  &:hover {
  }
  img {
    width: 100px;
    height: 60px;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    border: 1px solid #333648;
    border-radius: 8px;
  }
`

const StyleNew = styled(IconOdyssey)`
  position: absolute;
  top: -4px;
  right: -9px;
  color: #000;
  font-size: 12px;
`  

const StyleText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`

const StyleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  .title {
    font-weight: 600;
    font-size: 14px;
    color: #fff;
    max-width: 120px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

const StyleDesc = styled.div`
  font-size: 16px;
  color: #fff;
  line-height: 1;
  max-width: 200px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

interface IData {
    id: number;
    banner: string;
    isNew: boolean;
    name: string;
    status: StatusType;
    description: string;
    className?: string
  }

interface IProps {
    data: IData[];
    loading: boolean
    className?: string
} 


const generateNewWithLiveArr = (arr: IData[]): IData[] => {

  if (arr.length === 0) return [];

  const ongoingItems = arr.filter(item => item.status === StatusType.ongoing);

  if (ongoingItems.length === 0) return arr;

  const maxIdItem = ongoingItems.reduce((maxItem, currentItem) => {
    return (currentItem.id > maxItem.id) ? currentItem : maxItem;
  }, ongoingItems[0]);

  return arr.map(item => ({ ...item, isNew: item.id === maxIdItem.id && item.status === 'ongoing' }));
};


const LoadingList = () => {
  return Array.from({ length: 8 }).map((_, index) => (
    <Flex key={index}>
      <StyleImage>
        <Skeleton width="100px" height="60px" />
      </StyleImage>
      <StyleText>
        <StyleHeader>
          <Skeleton width="120px" height="14px" />
          <Status status={StatusType.ongoing} />
        </StyleHeader>
        <Skeleton width="200px" height="32px" />
      </StyleText>
    </Flex>
  ));
}


const ListItem: React.FC<IProps> = ({ data, loading, className }) => {

  const newData = useMemo(() => generateNewWithLiveArr(data), [data]);

  return (
    <>
      {loading ? (
        <LoadingList />
      ) : (
        newData.map((item, index) => (
          <Flex key={index} className={className}>
            <StyleImage className="bridgeImage">
              <img src={item.banner} alt="bridge" />
              {item.isNew && <StyleNew />}
            </StyleImage>
            <StyleText>
              <StyleHeader>
                <div className="title">{item.name}</div>
                <Status status={item.status} />
              </StyleHeader>
              <StyleDesc>{item.description}</StyleDesc>
            </StyleText>
          </Flex>
        ))
      )}
    </>
  );
}

  export default ListItem;