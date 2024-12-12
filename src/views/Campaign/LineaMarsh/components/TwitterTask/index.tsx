import IconArrowRight from '@public/images/campaign/icon-arrow-right-white.svg';
import Skeleton from 'react-loading-skeleton';

import useUserInfo from '@/hooks/useUserInfo';
import { useCheck } from '@/views/Campaign/hooks/useCheck';
import { useX } from '@/views/Campaign/hooks/useX';
import useAuthBind from '@/views/QuestProfile/hooks/useAuthBind';
import useAuthConfig from '@/views/QuestProfile/hooks/useAuthConfig';

import { useQuest } from '../../hooks/useQuest';
import Refresh from '../Refresh';
import { useCheckTgStore } from './useCheckTgStore';

interface IconConfig {
  path: string;
  type: 'svg' | 'webp' | 'png';
}

const xIconMap: Record<string, IconConfig> = {
  '@AcrossProtocol': { path: '/svg/campaign/linea-marsh/across', type: 'svg' },
  '@LynexFi': { path: '/svg/campaign/linea-marsh/lynex', type: 'svg' },
  '@efrogs_on_linea': { path: '/svg/campaign/linea-marsh/efrog', type: 'svg' },
  '@CROAK_on_linea': { path: '/assets/tokens/croak', type: 'webp' },
  '@DapDapMeUp': { path: '/svg/campaign/linea-marsh/dapdap', type: 'svg' }
};

const getIconPath = (twitterName: string): string => {
  const iconConfig = xIconMap[twitterName] || { path: '/svg/campaign/linea-marsh/dapdap', type: 'svg' };
  return `${iconConfig.path}.${iconConfig.type}`;
};

const getTaskText = (category: string, name: string) => {
  if (category.startsWith('twitter_follow')) {
    return `Follow ${name} to get`;
  }
  if (category.startsWith('telegram_join')) {
    return `Join ${name} TG to get`;
  }
  return '';
};

const TwitterTask = () => {
  const { data: twitterList, loading, check, account, setUpdater } = useQuest();
  const { userInfo, queryUserInfo } = useUserInfo();
  const authConfig = useAuthConfig();
  const { handleBind: handleXBind } = useX({ userInfo, authConfig });
  const { handleRefresh, refreshing, checkCompleted } = useCheck();
  const checkTgStore = useCheckTgStore();

  useAuthBind({
    onSuccess: () => {
      queryUserInfo();
    },
    redirect_uri: `${window.location.origin}${window.location.pathname}?category=linea-marsh`
  });

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

    if (quest.category.startsWith('telegram')) {
      checkTgStore.addTask(quest.id);
    }
    window.open(quest.source, '_blank');
  };

  const isTgTaskFinished = (quest: any) => {
    return quest.category.startsWith('telegram') && (quest.total_spins > 0 || checkTgStore.hasFinished(quest.id));
  };

  const handleTgTask = (quest: any) => {
    if (checkTgStore.isPending(quest.id)) {
      checkTgStore.finishTask(quest.id);
      return;
    }

    checkTgStore.addTask(quest.id);
    if (quest.source) {
      window.open(quest.source, '_blank');
    }
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
      handleRefresh(quest, () => {
        setUpdater(+new Date());
      });
      return;
    }

    if (quest.category.startsWith('telegram')) {
      // 如果没有访问过TG链接，则刷新无效
      if (!checkTgStore.hasTask(quest.id)) {
        return;
      }
      handleRefresh(quest, () => {
        setUpdater(+new Date());
      });
    }
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
            <img src={getIconPath(x.twitterName)} className="w-[50px] h-[50px]" alt={x.twitterName} />
            <div className="font-bold font-Montserrat text-base text-white">
              {getTaskText(x.category, x.twitterName)}
            </div>
            <img src="/svg/campaign/linea-marsh/gem.svg" alt="" />
            <div className="text-white">20 Gem</div>
          </div>
          <div className="flex items-center gap-4">
            {checkCompleted(x) ? (
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
