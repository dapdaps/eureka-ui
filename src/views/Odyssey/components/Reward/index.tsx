import { useMemo } from 'react';

import { formatValue } from '@/views/Home/components/Tooltip/Odyssey';

import { StatusType } from '../Tag';
import TooltipList from './List';
import { StyledTagItem, StyledTagItemInner } from './styles';

export const parseReward = (reward: string) => {
  if (!reward) return [];
  if (typeof reward === 'string') {
    try {
      return JSON.parse(reward);
    } catch (e) {
      return [];
    }
  }
};

const RewardList = ({ odyssey }: { odyssey: any }) => {
  const rewards = useMemo(() => {
    return parseReward(odyssey?.reward);
  }, [odyssey]);

  if (rewards.length === 0) return null;
  return (
    <StyledTagItem>
      <StyledTagItemInner className={`reward ${odyssey.status === StatusType.ongoing ? 'tag-active' : 'tag-default'}`}>
        <div className="reward-text">
          {formatValue(rewards[0]?.value)}
          {odyssey.tag === 'tales' && odyssey.category === 'linea-liquid' && '+'}
          {!(
            odyssey.tag === 'tales' &&
            (odyssey.category === 'linea-liquid' || odyssey.category === 'linea-liquid-2')
          ) && <span> {rewards[0]?.name}</span>}
        </div>
        <TooltipList odyssey={odyssey} sxImg={{ width: '20px', height: '20px' }} />
      </StyledTagItemInner>
    </StyledTagItem>
  );
};

export default RewardList;
