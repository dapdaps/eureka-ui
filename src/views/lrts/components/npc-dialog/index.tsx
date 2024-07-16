import Image from 'next/image';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';

import { setNumKMB } from '@/utils/format-number';

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
  dataSource: DataSource;
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

const NpcDialog: FC<IProps> = ({ onClose, dataSource }) => {
  const { maxApr, maxAprSymbol, maxTvl, maxTvlSymbol } = dataSource;
  return (
    <Wrap>
      <Dialog onClose={onClose}>
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
              .typeString(
                `There are ${dataSource.lrtTokens.length} LRTs under ${dataSource.token
                  ?.symbol}, the top APR up to ${Number(maxApr).toFixed(2)}% from ${maxAprSymbol},
and the top TVL reached $${setNumKMB(maxTvl, 2)} from ${maxTvlSymbol}.
`,
              )
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
      </Dialog>
      <Npc />
    </Wrap>
  );
};

export default NpcDialog;
