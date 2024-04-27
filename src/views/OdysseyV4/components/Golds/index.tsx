import Image from 'next/image';
import { useEffect, useState } from 'react';

import Loading from '@/components/Icons/Loading';

import { GoldsMap } from '../../const';
import RankModal from '../RankModal';
import RefreshButton from '../RefreshButton';
import StatusTag from '../StatusTag';
import Timer from '../Timer';
import Trapeziform from '../Trapeziform';
import TrapeziformBtn from '../TrapeziformBtn';
import Quest from './quest';
import {
  BgFoot,
  BgHead,
  Body,
  BodyLeft,
  BodyRight,
  Head,
  HeadLeft,
  HeadRight,
  LoadingWrap,
  StyledContainer,
  StyledContent,
  StyledTimerBox,
} from './styles';

export default function Golds({ loading, list, data, onRefreshDetail }: any) {
  const [id, setId] = useState('');

  const [showRankModal, setShowRankModal] = useState(false);
  const [curDapp, setCurDapp] = useState('');

  const showRank = (dapp: string, id: string) => {
    setShowRankModal(true);
    setCurDapp(dapp);
    setId(id);
  };

  const hideRank = () => {
    setShowRankModal(false);
    setCurDapp('');
    setId('');
  };

  return (
    <StyledContainer>
      {showRankModal ? <RankModal name={curDapp} id={id} onClose={hideRank} /> : null}
      <BgHead />
      <StyledContent>
        {loading ? (
          <LoadingWrap>
            <Loading size={30} />
          </LoadingWrap>
        ) : (
          list.map((item: any) => (
            <Quest
              key={item.name}
              showRank={showRank}
              data={{ ...GoldsMap.get(item.name), ...item, start_time: data.start_time, end_time: data.end_time }}
              onRefreshDetail={onRefreshDetail}
            />
          ))
        )}
      </StyledContent>
      <BgFoot />
    </StyledContainer>
  );
}
