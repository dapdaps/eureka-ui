import type { FC, ReactNode } from 'react';
import React, { useEffect, useState } from 'react';

import { Wrapper } from './style.modal';

interface IProps {
  children?: ReactNode;
}

const Modal: FC<IProps> = ({ children }) => {
  return (
    <Wrapper>
      <div className="mask"></div>
      <section className="base-modal">{children}</section>
    </Wrapper>
  );
};

export default Modal;
