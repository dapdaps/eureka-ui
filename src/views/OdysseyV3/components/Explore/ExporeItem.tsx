import { memo, useEffect, useState } from 'react';

import useCheck from '../../hooks/useCheck';
import useReport from '../../hooks/useReport';
import ArrowIcon from '../ArrowIcon';
import CheckIcon from '../CheckIcon';
import Fragments from '../Fragments';
import RefreshIcon from '../RefreshButton';
import { StyledItem, StyledItemLeft, StyledItemRight,StyledItemTitle } from './styles';

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
}: any) => {
  const [finished, setFinished] = useState(false);
  const { checking, handleRefresh } = useCheck({ id, total_spins, times, spins }, (_times: number) => {
    setFinished(true);
    onRefreshDetail();
  });
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
    if (source === '/network/scroll') handleReport(id);
    if (source === '/all-in-one/scroll') handleReport(id);
    window.open(source, '_blank');
  };

  useEffect(() => {
    const offers = spins * times;
    setFinished(offers <= total_spins);
  }, [total_spins, times, spins]);

  return (
    <StyledItem onClick={onItemClick} $disabled={times === 0 ? false : finished}>
      <StyledItemLeft>
        <Fragments amount={spins} disabled={finished} />
        <StyledItemTitle>{name}</StyledItemTitle>
      </StyledItemLeft>
      <StyledItemRight>
        {finished ? (
          <CheckIcon />
        ) : (
          <RefreshIcon
            onClick={(ev: any) => {
              ev.stopPropagation();
              if (checking) return;

              if (category.startsWith('twitter')) {
                const clicked = sessionStorage.getItem('_clicked_twitter_' + id);
                clicked && handleRefresh();
              } else {
                handleRefresh();
              }
            }}
            loading={checking}
          />
        )}
        <ArrowIcon />
      </StyledItemRight>
    </StyledItem>
  );
};

export default memo(ExporeItem);
