import Image from 'next/image';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';

import Dialog from './dialog';
import Npc from './npc';

interface IProps {
  onClose: () => void;
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

const NpcDialog: FC<IProps> = ({ onClose }) => {
  return (
    <Wrap>
      <Dialog onClose={onClose}>
        <Typewriter
          options={{
            //   strings: ['Hello', 'World'],
            autoStart: true,
          }}
          onInit={(typewriter) => {
            // playSound('/images/compass/audio/rolling.mp4');
            typewriter
              .typeString('Sir!<br />')
              .typeString(
                'STONE is the best yield-bearing ETH with a decentralized yield optimizing service and the most accessible LST ready for mass adoption on layer2s.',
              )
              .callFunction(() => {
                console.log('String typed out!');
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
