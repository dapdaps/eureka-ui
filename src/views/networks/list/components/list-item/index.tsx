import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

interface IProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const Wrap = styled.div`
  width: 1260px;
  height: 186px;
  padding: 30px 30px 0;
  border-radius: 20px;
  border: 1px solid #202329;
  background: #18191e;
  backdrop-filter: blur(10px);
  margin-bottom: 20px;
  transition: border 0.2s ease-in;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    border: 1px solid rgb(235, 244, 121);
  }
`;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChainName = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const ChainDesc = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%; /* 14px */
`;
const LogoGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
const BtnGroup = styled.div`
  display: flex;
  gap: 16px;
`;
const Btn = styled(Link)`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(55, 58, 83, 1);
  background: linear-gradient(0deg, rgba(55, 58, 83, 0.5), rgba(55, 58, 83, 0.5));
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  border-radius: 12px;
  padding: 12px 22px;
  cursor: pointer;
  &:hover {
    text-decoration: none;
    background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
    color: rgba(30, 32, 40, 1);
  }
  @media (max-width: 1478px) {
    font-size: 14px;
  }
`;
const DataList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  .item {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .key {
    color: #979abe;
    text-align: center;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  .value {
    color: #fff;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%; /* 16px */
  }
`;

const ListItem: FC<IProps> = (props) => {
  const [state, setState] = useState<number>(0);

  useEffect(() => {}, []);

  return (
    <Wrap>
      <Head>
        <LogoGroup>
          <Image src={''} width={60} height={60} alt="network" />
          <div>
            <ChainName>Mode</ChainName>
            <ChainDesc></ChainDesc>
          </div>
        </LogoGroup>
        <BtnGroup>
          <Btn
            href={''}
            // href={`/network/${IdToPath[child.id]}`}
            data-bp="10012-002"
            className="paragraph-btn-item"
          >
            Chain-Navi
          </Btn>
          <Btn
            href={''}
            // href={`/network/${IdToPath[child.id]}`}
            data-bp="10012-002"
            className="paragraph-btn-item"
          >
            Details
          </Btn>
        </BtnGroup>
      </Head>
      <DataList>
        <div className="item">
          <span className="key">Trading Volume via DapDap</span>
          <span className="value">$13.4m</span>
        </div>
        <div className="item">
          <span className="key">Users</span>
          <span className="value">17.9k</span>
        </div>
        <div className="item">
          <span className="key">Integrated dApps</span>
          <span className="value">30</span>
        </div>
        <div className="item">
          <span className="key">Campaign Reward</span>
          <span className="value">92.9m</span>
        </div>
      </DataList>
    </Wrap>
  );
};

export default memo(ListItem);
