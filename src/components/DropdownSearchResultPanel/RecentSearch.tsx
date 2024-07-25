import styled from "styled-components";

const StyleRecent = styled.div`
  margin-bottom: 30px;
  .gird {
    display: flex;
    align-items: center;
    flex-flow: wrap row;
    gap: 10px;
    .item {
      background: #21222B;
      border-radius: 6px;
      padding: 10px 18px;
      font-size: 14px;
      line-height: 14px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      &:hover {
        background: rgba(32, 34, 47, 0.6);
      }
    }
  }
` 

const StyleTitle = styled.div`
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
    margin-bottom: 16px;
    color: #979ABE;
`

const RecentSearch = () => {
    return (
        <StyleRecent>
        <StyleTitle>Recent Searches</StyleTitle>
        <div className='gird'>
          <div className='item'>Mode</div>
        </div>
      </StyleRecent>
    )
}
export default RecentSearch;