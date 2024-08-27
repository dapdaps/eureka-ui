import IconLink from '@public/images/header/link.svg';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`

`

const StyleMedal = styled.div`
  padding: 0 20px;
`;

const StyleTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    .title {
        font-size: 14px;
        line-height: 14px;
        font-weight: 500;
        color: #979ABE;
        font-family: Montserrat;
    }
    .links {
        font-size: 12px;
        line-height: 12px;
        font-weight: 400;
        color: #979ABE;
        font-family: Montserrat;
        display: flex;
        align-items: center;
        gap: 6px;
        &:hover {
            color: #fff;
            cursor: pointer;
        }
    }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 95px;
  padding: 0 20px;
  .item {
    display: flex;
    align-items: center;
    gap: 4px;
    img {
      width: 58px;
      height: 60px;
    }
    span {
      font-size: 16px;
      line-height: 16px;
      font-weight: 500;
      color: #fff;
      font-weight: 600
    }
  }
`;

const Medal = () => {
  return (
    <Container>
      <StyleMedal>
        <StyleTitle>
            <span className='title'>Medal</span>
            <Link href={''} className='links'>View all <IconLink /></Link>
        </StyleTitle>
      </StyleMedal>
      <Grid>
          <div className='item'>
            <img src="/images/header/medal-trader.png" alt="" />
            <span>Mode Trader</span>
          </div>
          <div className='item'>
            <img src="/images/header/medal-trader.png" alt="" />
            <span>Mode Trader</span>
          </div>
      </Grid>
    </Container>
  );
};

export default Medal;
