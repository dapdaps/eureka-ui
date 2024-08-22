import Image from 'next/image';
import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

interface IProps {
  status: 'Acheived' | 'Process';
  title: string;
  logo: string;
  process: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const Badge = styled.div`
  position: absolute;
  left: 50%;
  top: -10px;
  z-index: 1;
  margin-left: -50px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 107px;
  height: 26px;
  flex-shrink: 0;
  color: #979abe;
  text-align: center;
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 100%; /* 12px */
  border-radius: 34px;
  background: #21222b;
  gap: 4px;
  &.active {
    color: #ebf479;
  }
`;
const Wrap = styled.div`
  position: relative;
  width: 158px;
  text-align: center;
`;
const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 158px;
  height: 174px;
  padding-top: 30px;
  border-radius: 20px;
  border: 1px solid #202329;
  background: #18191e;
  backdrop-filter: blur(10px);
`;
const Title = styled.div`
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  margin-top: 10px;
  line-height: 100%; /* 14px */
`;
const Process = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid #292c41;
  .active {
    position: absolute;
    z-index: 1;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid #dffe00;
  }
`;

const Medal: FC<IProps> = ({ status, title, logo, process }) => {
  //   const [state, setState] = useState<number>(0);

  //   useEffect(() => {
  //   }, []);

  return (
    <Wrap>
      <Badge>
        {status}
        <span>{process === 100 ? '' : `${process}%`}</span>
      </Badge>
      <StyledBody>
        <Process>
          <div className="active">
            <Image src={logo} width={90} height={90} alt="" />
          </div>
        </Process>
        <Title>{title}</Title>
      </StyledBody>
    </Wrap>
  );
};

export default memo(Medal);
