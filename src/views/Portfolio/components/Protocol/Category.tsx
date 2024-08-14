import Image from 'next/image';
import styled from 'styled-components';

import { formateValueWithThousandSeparator } from '@/utils/formate';
import Loading from '@/components/Icons/Loading';
import Big from 'big.js';

export const StyledContainer = styled.div`
  width: 242px;
  height: 129px;
  flex-shrink: 0;
  flex-grow: 1;
  border-radius: 10px;
  backdrop-filter: blur(10px);
  color: #979ABE;
  text-align: left;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  background: #1B1D25;
  padding: 15px 20px 12px;
  position: relative;
  overflow: hidden;

  .bg-img {
    position: absolute;
    opacity: 0.2;
    right: -10px;
    bottom: -54px
  }

  .head {
    display: flex;
    align-items: center;
    gap: 10px;

    .title {
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      color: #fff;
    }
  }

  .body {
    margin-top: 15px;

    .usd {
      line-height: 24px;

      &.active {
        color: #fff;
      }
    }
  }

  .foot {
    margin-top: 13px;

    .executions-btn {
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      height: 30px;
      line-height: 28px;
      flex-shrink: 0;
      padding: 0 11px;
      border-radius: 6px;
      border: 1px solid #3D405A;
      background: #1B1D25;
      color: #979ABE;

      &.active {
        color: #fff;
      }
    }
  }
`;

export const StyledIcon = styled.div<{ src: string }>`
  width: 20px;
  height: 20px;
  background: ${({ src }) => `url("${src}") no-repeat center / contain`};
`;

const Category = (props: any) => {
  const { title, icon, usd, executions, loading, tradingVolume } = props;

  return (
    <StyledContainer>
      <div className="head">
        <StyledIcon src={icon} />
        <div className="title">{title}</div>
      </div>
      <div className="body">
        <div className={`usd ${Big(tradingVolume || 0).gt(0) ? 'active' : ''}`}>
          {
            loading ? (
              <Loading />
            ) : (
              <>${usd}</>
            )
          }
        </div>
      </div>
      <div className="foot">
        <button className={`executions-btn ${executions > 0 ? 'active' : ''}`} type="button">
          {executions} Executions
        </button>
      </div>
      <Image className="bg-img" src="/images/portfolio/category-bg.svg" alt="" width={170} height={170} />
    </StyledContainer>
  );
};

export default Category;
