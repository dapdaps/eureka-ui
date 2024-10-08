import styled from 'styled-components';

import { ArrowRight } from '../Arrow';
import PublicTitle from '../PublicTitle';

const Container = styled.div`
  background: radial-gradient(108.37% 99.81% at 2.05% 4.07%, #5929a7 0%, #1e1b33 100%),
    radial-gradient(39.17% 39.17% at 29.3% 60.83%, #fff500 0%, rgba(255, 245, 0, 0) 100%);
  border: 1px solid rgba(55, 58, 83, 1);
  border-radius: 16px;
  padding: 20px;
  min-height: 270px;
  position: relative;
  overflow: hidden;
  width: 415px;
`;

const JuniorWapper = styled.div`
  display: flex;
  height: 75px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  align-items: center;
  padding: 0 10px;
  cursor: pointer;
  position: relative;
  .img {
    width: 45px;
    height: 45px;
  }
  .title-wapper {
    margin-left: 10px;
    .title {
      font-size: 18px;
      font-weight: 700;
      line-height: 21.6px;
      color: #fff;
    }
    .sub-title {
      font-size: 16px;
      font-weight: 400;
      line-height: 19.2px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
  .arrow {
    height: 70%;
    flex: 1;
    text-align: right;
  }
`;

const Layer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
`;

export default function Transaction() {
  return (
    <Container>
      <PublicTitle title="Medal" subTitle="You might be interested collecting the medals." />

      <JuniorWapper>
        <img className="img" src="https://assets.db3.app/medal/medal_checkin_1.png" />
        <div className="title-wapper">
          <div className="title">Bridger Junior Medal</div>
          <div className="sub-title">Bridge $10.23 valued assets to get.</div>
        </div>
        <div className="arrow">
          <ArrowRight />
        </div>
        <Layer></Layer>
      </JuniorWapper>
    </Container>
  );
}
