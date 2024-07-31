import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typewriter from 'typewriter-effect';

import { useLrtDataStore } from '@/stores/lrts';
import { setNumKMB } from '@/utils/format-number';

import useLrtsList from '../../hooks/useLrtsList';
import Dialog from './dialog';
import Npc from './npc';

interface IProps {
  lstIndex: number;
  isPlayed: boolean;
  onClose: (index: number) => void;
  onPlayed: (index: number) => void;
}

const Wrap = styled.div``;

function playSound(url: string): void {
  const sound = new window.Audio(url);
  sound.play();
}

const NpcDialog: FC<IProps> = ({ isPlayed, onClose, onPlayed, lstIndex }) => {
  const lrtsData = useLrtDataStore((store: any) => store.data);
  const { completed } = useLrtsList();
  const [text, setText] = useState('');
  const [start, setStart] = useState(false);

  useEffect(() => {
    const _data = lrtsData[lstIndex];

    const _text = `There are ${_data.lrtTokens.length} LRTs under ${_data.token?.symbol}, the top APR up to ${Number(
      _data?.maxApr,
    ).toFixed(2)}% from ${_data?.maxAprSymbol},
and the top TVL reached $${setNumKMB(_data?.maxTvl, 2)} from ${_data?.maxTvlSymbol}.`;
    setText(_text);
  }, [lstIndex, lrtsData, completed]);

  const handleSpeed = () => {
    setStart(true);
    onPlayed(lstIndex);
  }

  return (
    <Wrap>
      <Dialog onClose={() => onClose(lstIndex)} onHandle={handleSpeed}>
        {isPlayed || start ? (
          <span>
            Sir!
            <br />
            {text}
          </span>
        ) : (
          completed && (
            <Typewriter
              options={{
                //   strings: ['Hello', 'World'],
                autoStart: true,
                delay: 0,
              }}
              onInit={(typewriter) => {
                // playSound('/images/compass/audio/rolling.mp4');
                typewriter
                  .typeString('Sir!<br />')
                  .typeString(text)
                  .callFunction(() => {
                    onPlayed(lstIndex);
                  })
                  .start();
              }}
            />
          )
        )}
        {/* {completed && (
          <Typewriter
            options={{
              //   strings: ['Hello', 'World'],
              autoStart: true,
              delay: 20,
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
        )} */}
      </Dialog>
      <Npc onHandle={handleSpeed}/>
    </Wrap>
  );
};

export default NpcDialog;
