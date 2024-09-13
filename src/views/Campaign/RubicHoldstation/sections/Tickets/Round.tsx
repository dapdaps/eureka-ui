import IconNoPrize from '@public/images/campaign/icon-no-prize-out.svg';
import Big from 'big.js';
import { useContext, useMemo, useState } from 'react';

import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import RubicHoldstationContext from '@/views/Campaign/RubicHoldstation/context';
import type { RewardItem } from '@/views/Campaign/RubicHoldstation/hooks/useTickets';

import Button from '../../components/Button';
import NumberBall from '../../components/NumberBall';
import {
  StyledExpired,
  StyledExpiredNoPrized,
  StyledExpiredPrized,
  StyledPrize,
  StyledPrizePot,
  StyledRound,
  StyledRoundContent,
  StyledRoundHeader,
  StyledRoundInner,
  StyledRoundNumbers,
  StyledRoundTime,
  StyledRoundTitle
} from './styles';

export default function Round(props: { reward: RewardItem }) {
  const { reward } = props;

  const context = useContext(RubicHoldstationContext);

  const { handleCheck } = context.tickets;

  const isShowAdd = !!reward.amountAddStr.length && !reward.expired;

  const [loading, setLoading] = useState(false);

  const onCheck = async () => {
    if (!context.account) {
      context.onAuthCheck();
      return;
    }
    setLoading(true);
    const checkRes = await handleCheck(reward);
    if (!checkRes) {
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const showPrize = useMemo(() => {
    return isShowAdd
      ? formateValueWithThousandSeparatorAndFont(reward.amount + reward.amountAdd.reduce((a, b) => a + b), 2, true, {
          prefix: '$'
        })
      : reward.amountStr;
  }, [isShowAdd, reward]);

  return (
    <StyledRound>
      <StyledRoundInner>
        <StyledRoundHeader>
          <StyledRoundTitle>Round {reward.round}</StyledRoundTitle>
          <StyledRoundTime>Drawn {reward.rewardTime}</StyledRoundTime>
        </StyledRoundHeader>
        <StyledRoundContent>
          <StyledPrizePot>
            <div>Prize Pot</div>
            {isShowAdd && (
              <StyledPrize size={16} style={{ marginTop: 7, whiteSpace: 'nowrap' }}>
                {reward.amountAddStr.join(' + ')} + {reward.amountStr}
              </StyledPrize>
            )}
            <StyledPrize
              size={36}
              $expired={reward.expired}
              $value={showPrize}
              style={{
                marginTop: isShowAdd ? 6 : 12
              }}
            >
              <span className="prize-text">{showPrize}</span>
            </StyledPrize>
          </StyledPrizePot>
          <StyledRoundNumbers>
            {reward.voucherArr?.length
              ? reward.voucherArr.map((n, idx) => (
                  <NumberBall
                    key={idx}
                    number={n}
                    style={{
                      opacity: reward.expired ? 0.5 : 1
                    }}
                  />
                ))
              : [...new Array(5).keys()].map((idx) => <NumberBall key={idx} />)}
          </StyledRoundNumbers>
          {reward.expired ? (
            <StyledExpired>
              {Big(reward.user_reward_amount || 0).gt(0) ? (
                <StyledExpiredPrized>
                  <span className="title">Congrats! You won</span>
                  <StyledPrize size={26} style={{ marginTop: 18 }}>
                    {reward.userRewardAmount}
                  </StyledPrize>
                </StyledExpiredPrized>
              ) : (
                <StyledExpiredNoPrized>
                  <span className="title">No Prize</span>
                  <IconNoPrize />
                </StyledExpiredNoPrized>
              )}
            </StyledExpired>
          ) : (
            <Button disabled={!reward.is_draw_completed} loading={loading} onClick={onCheck}>
              Check Now
            </Button>
          )}
        </StyledRoundContent>
      </StyledRoundInner>
    </StyledRound>
  );
}
