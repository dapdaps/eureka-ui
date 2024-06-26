import Image from 'next/image';
import { useState } from 'react';

import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';

import ExporeItem from './ExporeItem';
import { StyledContent, StyledItemWrap } from './styles';

export default function Explores({ list, userInfo, authConfig, onRefreshDetail, cols }: any) {
  return (
    <StyledContent className={cols ? `cols-${cols}` : ''}>
      <StyledItemWrap className={cols ? `cols-${cols}` : ''}>
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
  );
}
