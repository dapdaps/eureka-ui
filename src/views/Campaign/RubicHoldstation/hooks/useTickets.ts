import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAuthCheck from '@/hooks/useAuthCheck';
import useToast from '@/hooks/useToast';
import { formateTxDate } from '@/utils/date';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import { get } from '@/utils/http';
import type { Reward } from '@/views/Campaign/models';

export const useTickets = ({ category }: any) => {
  const { account } = useAccount();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const toast = useToast();

  const [totalReward, setTotalReward] = useState('0');
  const [rewards, setRewards] = useState<RewardItem[]>([]);
  // Current logged-in user's lottery tickets
  const [userVouchers, setUserVouchers] = useState<UserVouchers>({
    value: [],
    list: []
  });
  const [userTotalReward, setUserTotalReward] = useState({
    value: '0',
    str: '$0'
  });
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [checkTicketVisible, setCheckTicketVisible] = useState(false);
  const [checkTicketData, setCheckTicketData] = useState<RewardItem | undefined>();

  const formatData = (data: any) => {
    const { total_reward, rewards, user_vouchers, user_total_reward } = data;

    let rewardsList: RewardItem[] = rewards || [];

    rewardsList = rewardsList.sort((a, b) => a.reward_time - b.reward_time);

    setTotalReward(formateValueWithThousandSeparatorAndFont(total_reward, 0, true, { prefix: '$' }));

    let latestReward: RewardItem | undefined = undefined;
    rewardsList = rewardsList.map((reward, idx) => {
      if (reward.is_draw_completed) {
        latestReward = reward;
      }
      const voucherArr = [...new Array(reward.voucher.length).keys()].map((idx) =>
        reward.voucher.substring(idx, idx + 1)
      );
      return {
        ...reward,
        expired: false,
        amountAdd: [],
        amountAddStr: [],
        round: idx + 1,
        rewardTime: formateTxDate(reward.reward_time * 1000, { is24Hour: true, suffix: 'UTC' }),
        amountStr: formateValueWithThousandSeparatorAndFont(reward.amount, 2, true, { prefix: '$' }),
        voucherArr,
        userRewardVoucher: reward.user_reward_voucher.split(',').map((userVoucher: string) => {
          return [...new Array(userVoucher.length).keys()].map((idx) => {
            const no = userVoucher.substring(idx, idx + 1);
            if (!reward.voucher) {
              return { no };
            }
            const voucherNo = voucherArr[idx];
            return {
              no: no,
              won: no === voucherNo
            };
          });
        }) as any,
        userRewardAmount: formateValueWithThousandSeparatorAndFont(reward.user_reward_amount, 2, true, { prefix: '$' })
      };
    });

    if (latestReward) {
      rewardsList.forEach((reward) => {
        if (reward.reward_time < (latestReward as RewardItem).reward_time) {
          reward.expired = true;
        }
      });
    }

    for (let i = 0; i < rewardsList.length; i++) {
      const curr = rewardsList[i];
      if (curr.expired && curr.winners < 1) {
        for (let j = i + 1; j < rewardsList.length; j++) {
          const next = rewardsList[j];
          next.amountAdd = [...curr.amountAdd, curr.amount];
          next.amountAddStr = [...curr.amountAddStr, curr.amountStr];
          break;
        }
      }
    }

    console.log('rewardsList: %o', rewardsList);

    setRewards(rewardsList);
    setUserVouchers({
      value: user_vouchers,
      list: user_vouchers.map((v: string) => [...new Array(v.length).keys()].map((idx) => v.substring(idx, idx + 1)))
    });
    setUserTotalReward({
      value: user_total_reward,
      str: formateValueWithThousandSeparatorAndFont(user_total_reward, 2, true, { prefix: '$' })
    });

    return rewardsList;
  };

  const getData = async (isRefresh?: boolean) => {
    if (!isRefresh) {
      setLoading(true);
    }
    try {
      const res = await get('/api/campaign/reward', { category });
      if (res.code !== 0) throw new Error(res.msg);
      formatData(res.data);
    } catch (err) {
      console.log(err);
    }
    if (!isRefresh) {
      setLoading(false);
    }
  };

  const handleCheck = async (currentReward: RewardItem) => {
    if (checking) return;
    setChecking(true);
    try {
      const res = await get('/api/campaign/reward', { category });
      if (res.code !== 0) throw new Error(res.msg);
      const newRewardsList = formatData(res.data);
      setChecking(false);
      const curr = newRewardsList.find((it) => it.round === currentReward.round);
      if (!curr) {
        setCheckTicketData(undefined);
        setCheckTicketVisible(true);
        return;
      }
      setCheckTicketData(curr);
      setCheckTicketVisible(true);
    } catch (err) {
      console.log(err);
      setChecking(false);
      toast.fail({
        title: 'Action confirmed failed'
      });
    }
  };

  const { run: getDataDelay } = useDebounceFn(
    () => {
      if (!account) {
        getData();
        return;
      }
      check(getData);
    },
    { wait: rewards.length ? 600 : 3000 }
  );

  useEffect(() => {
    getDataDelay();
  }, [account]);

  return {
    totalReward,
    rewards,
    userVouchers,
    userTotalReward,
    loading,
    checking,
    handleCheck,
    checkTicketVisible,
    checkTicketData,
    setCheckTicketVisible,
    setCheckTicketData,
    getData
  };
};

export interface RewardItem extends Reward {
  rewardTime: string;
  amountStr: string;
  amountAdd: number[];
  amountAddStr: string[];
  voucherArr: string[];
  userRewardVoucher: { no: string; won?: boolean }[];
  userRewardAmount: string;
  expired?: boolean;
}

export interface UserVouchers {
  value: string[];
  list: string[][];
}
