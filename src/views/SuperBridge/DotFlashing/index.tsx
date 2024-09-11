import React from 'react';

import style from './style.module.css';

export default function DotFlashing({ val }: any) {
  return (
    <div className={style.wrapper}>
      <div className={style.loader}></div>
      <div className={style.number}>{val}</div>
    </div>
  );
}
