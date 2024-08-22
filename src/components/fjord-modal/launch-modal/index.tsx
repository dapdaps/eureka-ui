import type { FC, ReactNode } from 'react';
import React, { forwardRef,useEffect, useState } from 'react';

import { Wrapper } from './style.modal';

interface IProps {
  children?: ReactNode;
}

const Modal = ({ children }: IProps, ref: any) => {
  return (
    <Wrapper>
      <div className="mask"></div>
      <section ref={ref} className="base-modal">{children}</section>
    </Wrapper>
  );
};

export default forwardRef(Modal)

