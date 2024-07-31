import styled from "styled-components"

import IconOdyssey from '@public/images/header/odyssey-new.svg';
import Status, { StatusType } from '../components/Status';



const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px 30px;
  &:hover {
    background: rgba(0, 0, 0, 0.25);
    cursor: pointer;
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
    transform: translateY(-5px); 
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
  }
`

const StyleDesc = styled.div`
  font-size: 16px;
  color: #fff;
  line-height: 1;
`
interface ListItemProps {
    imgSrc: string;
    isNew: boolean;
    title: string;
    status: StatusType;
    description: string;
    className?: string
  }

const ListItem: React.FC<ListItemProps> = ({ imgSrc, isNew, title, status, description, className }) => (
    <Flex className={className}>
      <StyleImage className="nav">
        {isNew && <StyleNew />}
        <img src={imgSrc} alt="" />
      </StyleImage>
      <StyleText>
        <StyleHeader>
          <div className="title">{title}</div>
          <Status status={status} />
        </StyleHeader>
        <StyleDesc>{description}</StyleDesc>
      </StyleText>
    </Flex>
  );

  export default ListItem;