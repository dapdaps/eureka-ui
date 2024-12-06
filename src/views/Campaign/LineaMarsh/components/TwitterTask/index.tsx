import IconArrowRight from '@public/images/campaign/icon-arrow-right-white.svg';
import Skeleton from 'react-loading-skeleton';

import useUserInfo from '@/hooks/useUserInfo';
import { useCheck } from '@/views/Campaign/hooks/useCheck';
import { useX } from '@/views/Campaign/hooks/useX';
import useAuthBind from '@/views/QuestProfile/hooks/useAuthBind';
import useAuthConfig from '@/views/QuestProfile/hooks/useAuthConfig';

import { useQuest } from '../../hooks/useQuest';
import Refresh from '../Refresh';

const xIconMap: Record<string, string> = {
  '@AcrossProtocol': 'across',
  '@LynexFi': 'lynex',
  '@efrogs_on_linea': 'efrog',
  '@DapDapMeUp': 'dapdap'
};

const TwitterTask = () => {
  const { data: twitterList, loading, check, account } = useQuest();
  const { userInfo, queryUserInfo } = useUserInfo();
  const authConfig = useAuthConfig();
  const { handleBind: handleXBind } = useX({ userInfo, authConfig });
  const { handleRefresh, refreshing } = useCheck();

  useAuthBind({
    onSuccess: () => {
      console.log('queryUserInfo````');
      queryUserInfo();
    },
    redirect_uri: `${window.location.origin}${window.location.pathname}?category=linea-marsh`
  });

  console.log(userInfo, 'userInfo');

  if (loading) {
    return <Skeleton style={{ marginTop: '20px' }} height={80} count={5} borderRadius={12} />;
  }

  if (!twitterList.length) {
    return null;
  }

  const handleTask = (quest: any) => {
    if (!account) {
      check();
      return;
    }
    if (quest.total_spins > 0) return;
    if (quest.category.startsWith('twitter')) {
      if (!userInfo.twitter?.is_bind) {
        handleXBind();
        return;
      }
    }
    if (!quest.source) return;
    window.open(quest.source, '_blank');
  };

  const onRefresh = (quest: any) => {
    if (!account) {
      check();
      return;
    }
    if (quest.category.startsWith('twitter')) {
      if (!userInfo.twitter?.is_bind) {
        handleXBind();
        return;
      }
    }
    handleRefresh(quest);
  };

  return (
    <>
      {twitterList.map((x: any) => (
        <div
          key={x.id}
          onClick={() => handleTask(x)}
          className="mt-[20px] w-full bg-[#1E2028] rounded-xl border border-[#373A53] p-[14px] flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-[15px]">
            <img
              src={`/svg/campaign/linea-marsh/${xIconMap[x.twitterName] || 'dapdap'}.svg`}
              className="w-[50px] h-[50px]"
              alt=""
            />
            <div className="font-bold font-Montserrat text-base text-white">Follow {x.twitterName} to get </div>
            <img src="/svg/campaign/linea-marsh/gem.svg" alt="" />
            <div className="text-white">50 Gem</div>
          </div>
          <div className="flex items-center gap-4">
            {x.total_spins > 0 ? (
              <div className="bg-[#00FFD1] bg-opacity-20 rounded-lg w-[132px] h-[40px] text-center text-[#00FFD1] flex items-center justify-center gap-2 cursor-pointer">
                <img src="/svg/campaign/linea-marsh/checked.svg" className="w-[18px] h-[18px]" alt="" />
                <span>Finished</span>
              </div>
            ) : (
              <Refresh onClick={() => onRefresh(x)} loading={false} />
            )}
            <IconArrowRight style={{ fill: '#fff' }} />
          </div>
        </div>
      ))}
    </>
  );
};

export default TwitterTask;
