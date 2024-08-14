import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import { goHomeWithFresh } from '@/utils/activity-utils';

import * as Styles from './styles';

interface IProps {
  open: boolean;
  type: 'success' | 'fail';
  onClose: () => void;
  reward?: number;
}

const Modal: FC<IProps> = ({ open, type, onClose, reward }) => {
  const router = useRouter();
  useEffect(() => { }, []);
  if (!open) return null;
  const goHome = () => {
    router.push('/');
  };

  const mask = <Styles.Mask></Styles.Mask>;
  const close = <Styles.Close onClick={onClose} src="/images/marketing/close.svg"></Styles.Close>;
  const params = {
    initial: { top: -10000 },
    animate: { top: 0 },
  };

  return type === 'success' ? (
    <>
      {mask}
      <Styles.Wrap {...params}>
        {close}
        <Styles.WinIcon src="/images/marketing/congrats.gif"></Styles.WinIcon>

        <Styles.Title>Connected!</Styles.Title>
        <Styles.SucTxt>
          You’re all set and ready to go.
        </Styles.SucTxt>
        <Styles.SucFoot
          onClick={goHome}>
          Visit DapDap and explore more!
        </Styles.SucFoot>
      </Styles.Wrap>
    </>
  ) : (
    <>
      {mask}
      <Styles.Wrap {...params}>
        {close}
        <Styles.FailIcon src="/images/marketing/sorry.svg"></Styles.FailIcon>
        <Styles.Title>Oops</Styles.Title>
        <Styles.FailTxt>
          You are not a new user and do not meet the <br />conditions for participation
        </Styles.FailTxt>

        <Styles.FailFoot onClick={goHomeWithFresh}>
          Go to DapDap, more activities are waiting for you…
        </Styles.FailFoot>
      </Styles.Wrap>
    </>
  );
};

export default Modal;
