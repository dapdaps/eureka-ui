
import styled from "styled-components"
import IconUp from '@public/images/header/up.svg';


const StyleTitle = styled.div`
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
    margin-bottom: 16px;
    color: #979ABE;
    display: flex;
    justify-content: space-between;
`

const StylePopular = styled.div`
  .list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 30px;

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
        <StyleTitle style={{ padding: '0 30px'}}>
          <span>Popular Chains</span>
          <span>Trading Volume via DapDap</span>
        </StyleTitle>
        <div className='list'>
          <div className='label'>
            <img className='brand' src="https://s3.amazonaws.com/dapdap.prod/images/mode.png" alt="" />
            <span className='name'>Mode</span>
          </div>
          <div className='value'>
            <span className='tvl'>$164.1m</span>
            <div className='icon'>
              <IconUp />
              <span className='up'>0.23%</span>
            </div>
          </div>
        </div>
      </StylePopular>
    )
}

export default Popular