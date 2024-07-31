
import styled from "styled-components"
import IconUp from '@public/images/header/up.svg';
import Link from "next/link";
import IconLink from '@public/images/header/link.svg';

const StyleTitle = styled.div`
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
    margin-bottom: 16px;
    color: #979ABE;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .links {
        font-size: 12px;
        line-height: 12px;
        font-weight: 400;
        color: #979ABE;
        display: flex;
        align-items: center;
        gap: 6px;
        &:hover {
            color: #fff;
            cursor: pointer;
        }
    }
`

const StylePopular = styled.div`
  .list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 20px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
    .label {
      display: flex;
      gap: 10px;
      align-items: center;
      .brand {
        width: 30px;
        height: 30px;
      }
      .name {
        font-weight: 600;
        font-size: 16px;
        line-height: 16px;
        color: #fff;
      }
    }
    .value {
      display: flex;
      gap: 6px;
      align-items: center;
      flex-flow: column wrap;
      .tvl {
        font-weight: 500;
        font-size: 14px;
        line-height: 14px;
        color: #fff;
      }
      .icon {
        display: flex;
        gap: 2px;
        align-items: center;
        .up {
          font-size: 12px;
          line-height: 12px;
          color: #06C17E;
        }
      }
    }
  }
`

const Popular = () => {
    return (
        <StylePopular>
        <StyleTitle>
          <span>Popular Chains</span>
          <Link href={''} className='links'>View all <IconLink /></Link>
        </StyleTitle>
        <div className='list'>
          <div className='label'>
            <img className='brand' src="https://s3.amazonaws.com/dapdap.prod/images/mode.png" alt="" />
            <span className='name'>Mode</span>
          </div>
        </div>
      </StylePopular>
    )
}

export default Popular