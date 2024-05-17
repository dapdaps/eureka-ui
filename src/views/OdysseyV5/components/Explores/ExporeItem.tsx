import { memo, useEffect, useState } from 'react';
import Image from 'next/image';

import useCheck from '../../hooks/useCheck';
import useReport from '../../hooks/useReport';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import LockStatus from '../LockStatus';
import RefreshIcon from '../RefreshButton';
import CardInput from './CardInput';
import { StyledItem, StyledItemLeft, StyledItemRight, StyledItemTitle, Unexplored, ArrowContainer, StyledItemShadow } from './styles';

const ExporeItem = ({
  userInfo,
  authConfig,
  id,
  name = '',
  source,
  category,
  spins = 0,
  total_spins = 0,
  times = 0,
  onRefreshDetail,
  detailLoading,
  setDetailLoading,
}: any) => {
  const [finished, setFinished] = useState(false);
  const { checking, handleRefresh } = useCheck({ id, total_spins, times, spins }, (_times: number) => {
    setFinished(true);
    onRefreshDetail(id, _times);
  }, detailLoading, setDetailLoading);
  const { handleReport } = useReport();

  const onItemClick = () => {
    if (finished) return;

    if (category.startsWith('twitter') && userInfo.twitter?.is_bind) {
      sessionStorage.setItem('_clicked_twitter_' + id, '1');
    }
    if (category.startsWith('twitter') && !userInfo.twitter?.is_bind) {
      const path = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${authConfig.twitter_client_id}&redirect_uri=${window.location.href}&scope=tweet.read%20users.read%20follows.read%20like.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
      sessionStorage.setItem('_auth_type', 'twitter');
      window.open(path, '_blank');
      return;
    }

    if (!source) return;
    if (source === '/network/mode') handleReport(id);
    window.open(source, '_blank');
  };

  useEffect(() => {
    const offers = spins * times;
    setFinished(offers <= total_spins);
  }, [total_spins, times, spins]);

  return (
    <StyledItem onClick={onItemClick} $disabled={times === 0 ? false : finished}>
      <StyledItemLeft>
        <StyledItemTitle>{name}</StyledItemTitle>
      </StyledItemLeft>
      <StyledItemRight>
        {finished ? (
          <>
            <LockStatus status={true} />
          </>
        ) : category === 'password' ? (
          <CardInput
            onConfirm={(val: string) => {
              if (!checking && !detailLoading) handleRefresh(val);
            }}
          />
        ) : (
          <>
            <Unexplored>Unexplored</Unexplored>
            <RefreshIcon
              onClick={(ev: any) => {
                ev.stopPropagation();
                if (checking || detailLoading) return;

                if (category.startsWith('twitter')) {
                  const clicked = sessionStorage.getItem('_clicked_twitter_' + id);
                  clicked && handleRefresh();
                } else {
                  handleRefresh();
                }
              }}
              loading={checking}
            />
            <ArrowContainer>
              <ArrowIcon />
            </ArrowContainer>
          </>
        )}
        <StyledItemShadow>
          <Image src='/images/odyssey/v5/explore-mask.svg' alt='' className='item-mask' width={395} height={70} />
        </StyledItemShadow>
      </StyledItemRight>
    </StyledItem>
  );
};

export default memo(ExporeItem);
