import Image from 'next/image';
import { useState } from 'react';

import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';
import SkakeModel from '@/views/StakeModal/index';

import CompTitle from '../Title';
import ExporeItem from './ExporeItem';
import { Btns, Desc, StyledContainer, StyledContent, StyledItemWrap, Title } from './styles';

export default function Explores({ list, userInfo, authConfig, onRefreshDetail }: any) {
  const [stakeShow, setStakeShow] = useState<boolean>(false);
  const [showWrapAndUnwrap, setShowWrapAndUnwrap] = useState(false);
  const [stakeType, setStakeType] = useState<string>('renzo');

  const TrapLayout = {
    borderColor: '#1C1E2D',
    corner: 10,
  };

  return (
    <>
      <StyledContent>
        <CompTitle title="" subtitle="Complete tasks easily to earn Spin to win" />
        <StyledItemWrap>
          {list?.length ? (
            list.map((item: any) => (
              <ExporeItem
                key={item.id}
                {...item}
                authConfig={authConfig}
                userInfo={userInfo}
                onRefreshDetail={onRefreshDetail}
              />
            ))
          ) : (
            <StyledLoadingWrapper $h="100px">
              <Loading size={30} />
            </StyledLoadingWrapper>
          )}
        </StyledItemWrap>
      </StyledContent>
    </>
  );
}
