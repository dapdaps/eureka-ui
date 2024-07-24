import styled from "styled-components"

const StyleChain = styled.div`
  padding: 0 20px;
  margin-top: 30px;
  .title {
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
    margin-bottom: 16px;
    color: #979ABE;
  }
  .list {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 100px;
    .item {
      display: flex;
      align-items: center;
      flex-direction: column;
      grid-row-gap: 10px;
      .brand {
        width: 60px;
        height: 60px;
        border-radius: 12px;
        opacity: .6;
      }
      .name {
        font-weight: 600;
        font-size: 16px;
        line-height: 16px;
        color: #fff;
      }
    }
  }
`
const Chain = () => {
    return (
        <StyleChain>
        <div className='title'>Chain</div>
        <div className='list'>
          <div className='item'>
            <img className='brand' src="https://s3.amazonaws.com/dapdap.prod/images/supswap.png" alt="" />
            <span className='name'>name</span>
          </div>
          <div className='item'>
            <img className='brand' src="https://s3.amazonaws.com/dapdap.prod/images/supswap.png" alt="" />
            <span className='name'>name</span>
          </div>
          <div className='item'>
            <img className='brand' src="https://s3.amazonaws.com/dapdap.prod/images/supswap.png" alt="" />
            <span className='name'>name</span>
          </div>
        </div>
      </StyleChain>
    )
}

export default Chain