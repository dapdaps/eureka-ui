import { useDebounceFn } from 'ahooks';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';

import { ArrowLineIcon } from '@/components/Icons/ArrowLineIcon';
import odysseyConfig from '@/config/odyssey';
import odyssey from '@/config/odyssey';
import useToast from '@/hooks/useToast';
import { StyledFlex } from '@/styled/styles';
import { formatIntegerThousandsSeparator } from '@/utils/format-number';
import SimpleTooltip from '@/views/AllDapps/components/Badges/Tooltip';
import {
  StyledOdysseyBanner,
  StyledOdysseyBannerMask,
  StyledOdysseyBody,
  StyledOdysseyButton,
  StyledOdysseyContainer,
  StyledOdysseyHead,
  StyledOdysseyIcon,
  StyledOdysseyIconTitle,
  StyledOdysseyInfo,
  StyledOdysseyTitle,
  StyledOdysseyTop,
  StyledTagChain,
  StyledTagChains,
  StyledTagIcon,
  StyledTagItem,
  StyledTagItemInner,
  StyledTagLabel,
  StyledTagList,
  StyledVideo,
  StyledVideoIcon,
} from '@/views/Dapp/components/DappDetail/RelativeOdyssey/styles';
import Tag, { StatusType } from '@/views/Odyssey/components/Tag';
import RewardIcons from '@/views/OdysseyV8/RewardIcons';
import ImageFallback from '@/views/Portfolio/components/ImageFallback';

import OdysseyVideo from './Video';

const isDevelopment = process.env.NODE_ENV === 'development';

const OdysseyCardComponent = (props: Props) => {
  const {
    banner,
    status,
    name,
    id,
    rewards,
    volume,
    users,
    medals,
    className,
    bp,
    isHoverButton,
  } = props;

  const tagListRef = useRef<any>();

  const onRewardHover = () => {
    if (!tagListRef.current) return;
    onRewardLeaveCancel();
    tagListRef.current.scrollTo({
      left: tagListRef.current.scrollWidth,
      behavior: 'smooth',
    });
  };
  const { run: onRewardLeave, cancel: onRewardLeaveCancel } = useDebounceFn(() => {
    if (!tagListRef.current) return;
    tagListRef.current.scrollTo({
      left: 0,
      behavior: 'smooth',
    });
  }, { wait: 300 });

  const router = useRouter();

  const [show, setShow] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const toast = useToast();

  const onCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (isDevelopment) {
      toast.fail('This Odyssey ID is not available in the current FE version');
    }
    if (odyssey[id]) {
      router.push(odyssey[id].path);
    }
  };

  const onBadgeClick = (e: React.MouseEvent<HTMLElement, MouseEvent>, badge: any) => {
    e.stopPropagation();
    console.log('badge: %o', badge);
  };

  const activity = {
    id,
    name,
    status,
    banner,
  };

  const Config = odysseyConfig[id] || {};

  const showVideo = (_video: string) => {
    if (!_video) {
      return;
    }
    setVideoUrl(_video);
    setShow(true);
  };

  const summaryList = useMemo(() => ([
    {
      key: 'volume',
      icon: 'icon-swap.png',
      value: `$${formatIntegerThousandsSeparator(volume, 1)}`,
      tooltip: 'Trading Volume',
    },
    {
      key: 'users',
      icon: 'icon-hot.svg',
      value: formatIntegerThousandsSeparator(users, 1),
      tooltip: 'User Amount',
    },
  ]), []);

  const badges = useMemo(() => {
    if (!rewards) return [];
    const _badges: any = [];
    let rewardsList: any;
    try {
      rewardsList = JSON.parse(rewards);
    } catch (err) {
      console.log(err);
    }
    rewardsList.forEach((reward: any) => {
      const currIdx = _badges.findIndex((it: any) => it.name === reward.name);
      if (currIdx < 0) {
        _badges.push({
          name: reward.name,
          icon: RewardIcons[reward.logo_key]?.icon ?? '',
          iconSize: 20,
          value: reward.value,
          odyssey: [{
            ...activity,
            badgeValue: reward.value,
          }],
        });
      } else {
        if (!_badges[currIdx].odyssey.some((ody: any) => ody.id === id)) {
          _badges[currIdx].odyssey.push({
            ...activity,
            badgeValue: reward.value,
          });
        }
      }
    });
    return _badges;
  }, [rewards, activity]);

  const isLive = odysseyIsLive(status);

  const formatTitle = (_name: string | undefined) => {
    if (!_name) {
      return '';
    }
    const reg = /\：|\:/;
    if (_name.includes('：') || _name.includes(':')) {
      return <>{_name.split(reg)?.[0] ?? ''}: <br />{name?.split(reg)?.[1] ?? ''}</>;
    }
    return _name;
  };

  useEffect(() => {
    if (odyssey[id]) {
      router.prefetch(odyssey[id].path);
    }
  }, [id]);

  return (
    <>
      <StyledOdysseyContainer
        className={className}
        $isHoverButton={isHoverButton}
        onClick={(e) => {
          if (isHoverButton) return;
          onCardClick(e);
        }}
      >
        <StyledOdysseyTop
          $isHoverButton={isHoverButton}
          whileHover={isHoverButton ? 'visible' : 'hidden'}
          initial="hidden"
        >
          <StyledOdysseyBanner>
            <ImageFallback
              fallbackSrc="/images/odyssey/fallback.svg"
              src={banner}
              alt=""
              width={403}
              height={202}
              style={{
                width: '100%',
                opacity: isLive ? 1 : 0.5,
                filter: isLive ? 'unset' : 'grayscale(100%)',
                objectFit: 'cover',
              }}
            />
            <StyledOdysseyBannerMask />
          </StyledOdysseyBanner>
          <StyledOdysseyButton
            onClick={onCardClick}
            data-bp={bp}
            variants={{
              visible: {
                opacity: 1,
                display: 'flex',
                y: 0,
              },
              hidden: {
                opacity: 0.1,
                display: 'none',
                y: 20,
              },
            }}
            style={{ x: '-50%' }}
          >
            <span>{isLive ? 'Join' : 'View'} Campaign</span>
            <ArrowLineIcon classname="arrow-right" />
          </StyledOdysseyButton>
          <StyledOdysseyHead>
            <StyledOdysseyInfo>
              <StyledOdysseyIcon />
              <StyledOdysseyIconTitle>
                Vol.{renderVolNo({ name, id })}
              </StyledOdysseyIconTitle>
            </StyledOdysseyInfo>
            <Tag status={status} />
          </StyledOdysseyHead>
          {
            Config.video && (
              <StyledVideo
                url={banner}
                onClick={(e) => {
                  e.stopPropagation();
                  showVideo(Config.video);
                }}
              >
                <StyledVideoIcon src="/images/alldapps/icon-play.svg" />
              </StyledVideo>
            )
          }
        </StyledOdysseyTop>
        <StyledOdysseyBody>
          <StyledOdysseyTitle $isLive={isLive}>
            {formatTitle(name)}
          </StyledOdysseyTitle>
          <StyledTagList ref={tagListRef}>
            {
              summaryList.map((item: any, index: number) => (
                <SimpleTooltip
                  tooltip={item.tooltip}
                  key={item.key}
                >
                  <StyledTagItem onClick={(e) => onBadgeClick(e, item)}>
                    {item.icon && (
                      <StyledTagIcon src={`/images/alldapps/${item.icon}`} />
                    )}
                    <StyledTagLabel>
                      {item.type === 'medal' ? `${item.value} Medal` : item.value}
                    </StyledTagLabel>
                  </StyledTagItem>
                </SimpleTooltip>
              ))
            }
            {
              medals && medals?.length > 0 && (
                <StyledTagItem key="medal">
                  <StyledTagLabel>
                    <StyledFlex justifyContent="center" alignItems="center" gap="5px">
                      {
                        medals.length === 1 && (
                          <Image src={medals[0].icon} alt="" width={18} height={24} />
                        )
                      }
                      {medals.length} Medal{medals.length > 1 ? 's' : ''}
                    </StyledFlex>
                  </StyledTagLabel>
                </StyledTagItem>
              )
            }
            {
              badges && badges?.length > 0 && (
                <StyledTagItem
                  key="reward"
                  className="reward"
                  onHoverStart={onRewardHover}
                  onHoverEnd={onRewardLeave}
                >
                  <StyledTagItemInner className={`reward ${isLive ? 'tag-active' : 'tag-default'}`}>
                    <div
                      className="reward-text"
                      style={{
                        opacity: isLive ? 1 : 0.5,
                      }}
                    >
                      {badges[0].value} {badges[0].name.toUpperCase()}
                    </div>
                    <StyledTagChains>
                      {
                        badges.map((badge: any, idx: number) => (
                          <StyledTagChain
                            key={badge.name}
                            initial={{
                              zIndex: 1,
                            }}
                            whileHover={{
                              scale: 1.2,
                              zIndex: 2,
                            }}
                            onClick={(e) => onBadgeClick(e, badge)}
                          >
                            <SimpleTooltip tooltip={badge.name}>
                              <Image
                                src={badge.icon}
                                alt=""
                                width={badge.iconSize}
                                height={badge.iconSize}
                                style={{
                                  opacity: isLive ? 1 : 0.5,
                                }}
                              />
                            </SimpleTooltip>
                          </StyledTagChain>
                        ))
                      }
                    </StyledTagChains>
                  </StyledTagItemInner>
                </StyledTagItem>
              )
            }
          </StyledTagList>
        </StyledOdysseyBody>
      </StyledOdysseyContainer>
      <OdysseyVideo
        src={videoUrl}
        visible={show}
        close={() => {
          setShow(false);
        }}
      />
    </>
  );
};

export default memo(OdysseyCardComponent);

export interface Props {
  banner: string;
  name: string;
  id: number;
  // enum of StatusType
  status: StatusType;
  // JSON string, such as: "[{\"name\":\"Gold\",\"value\":\"7500\",\"logo_key\":\"blast_gold\"}]"
  rewards?: string;
  // trading_volume
  // please directly prop a numeric string; the component will handle formatting internally
  volume?: string;
  // total_users
  users?: string;
  // if there are badges
  // please prop them as an array
  medals?: { icon: string; id: number; }[];
  // custom className
  className?: string;
  bp?: string;
  isHoverButton?: boolean;
}

const odysseyIsLive = (status: StatusType) => {
  return status === StatusType.ongoing;
};

const renderVolNo = (options: { name: string; id: number; }) => {
  const {
    name,
    id,
  } = options;
  if (!name) return null;
  if (name.indexOf('Vol.4+:') > -1) {
    return '4+';
  }
  // ⚠️ Special: mode-odyssey id is 7, but show number is 5
  if (id === 7) {
    return 5;
  }
  return id;
};
