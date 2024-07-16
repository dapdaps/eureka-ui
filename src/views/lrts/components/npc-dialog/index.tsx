import Image from 'next/image';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';

import { useLrtDataStore } from '@/stores/lrts';
import { setNumKMB } from '@/utils/format-number';

import useLrtsList from '../../hooks/useLrtsList';
import Dialog from './dialog';
import Npc from './npc';

type DataSource = {
  amount: number;
  maxApr: number;
  maxAprSymbol: string;
  maxTvl: number;
  maxTvlSymbol: string;
  lrtTokens: any[];
  token: any;
};
interface IProps {
  onClose: () => void;
  lstIndex: number;
}

const Wrap = styled.div`
  /* position: fixed;
  z-index: 13;
  right: 0;
  bottom: 0;
  width: 640px;
  height: 490px; */
`;

function playSound(url: string): void {
  const sound = new window.Audio(url);
  sound.play();
}

const NpcDialog: FC<IProps> = ({ onClose, lstIndex }) => {
  const lrtsData = useLrtDataStore((store: any) => store.data);
  const { completed } = useLrtsList();
  const [text, setText] = useState('');

  useEffect(() => {
    const _data = lrtsData[lstIndex];

    const _text = `There are ${_data.lrtTokens.length} LRTs under ${_data.token?.symbol}, the top APR up to ${Number(
      _data?.maxApr,
    ).toFixed(2)}% from ${_data?.maxAprSymbol},
and the top TVL reached $${setNumKMB(_data?.maxTvl, 2)} from ${_data?.maxTvlSymbol}.`;
    setText(_text);
  }, [lstIndex, lrtsData, completed]);

  return (
    <Wrap>
      <Dialog onClose={onClose}>
        {completed && (
          <Typewriter
            options={{
              //   strings: ['Hello', 'World'],
              autoStart: true,
              delay: 70,
            }}
            onInit={(typewriter) => {
              // playSound('/images/compass/audio/rolling.mp4');
              typewriter
                .typeString('Sir!<br />')
                .typeString(text)
                .callFunction(() => {
                  // console.log('String typed out!');
                })
                // .pauseFor(2500)
                // .deleteAll()
                // .callFunction(() => {
                //   console.log('All strings were deleted');
                // })
                .start();
            }}
          />
        )}
      </Dialog>
      <Npc />
    </Wrap>
  );
};

export default NpcDialog;
