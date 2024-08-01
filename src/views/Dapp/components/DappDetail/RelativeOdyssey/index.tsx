import {
  StyledContainer,
  StyledOdysseyContainer,
  StyledRewardTag,
  StyledOdysseyBanner,
  StyledOdysseyTitle,
  StyledOdysseyTag,
  StyledRewardText,
  StyledOdysseyDetail,
  StyledRelatedTitle,
  StyledOdysseyBody,
  StyledOdysseyHead,
  StyledOdysseyIcon,
  StyledOdysseyInfo,
  StyledOdysseyIconTitle,
  StyledVideo,
  StyledVideoIcon,
  StyledOdysseyTop,
  StyledVideoModal,
  StyledVideoContent,
  StyledTagList,
  StyledTagItem,
  StyledTagIcon,
  StyledTagLabel,
  StyledTagChains,
  StyledTagChain,
  StyledOdysseyTagShadow
} from './styles';

import {
  relativeOdyssey,
} from '../config';
import useCompassList from '@/views/Home/components/Compass/hooks/useCompassList';
import Loading from '@/components/Icons/Loading';
import { useEffect, useState } from 'react';
import odyssey from '@/config/odyssey';
import Modal from '@/components/Modal';

const renderVolNo = (compass: any) => {
  if (!compass) return null;
  if (compass.name.indexOf('Vol.4+:') > -1) {
    return '4+';
  }
  // ⚠️ Special: mode-odyssey id is 7, but show number is 5
  if (compass.id === 7) {
    return 5;
  }
  return compass.id;
};

const configList = [
  {
    key: 'swap',
    icon: 'icon-swap.png',
    value: '$47.3m'
  },
  {
    key: 'hot',
    icon: 'icon-hot.svg',
    value: '459'
  }
];

const TagList = new Array(6).fill(0);

const PlayVideoModal = ({videoUrl, show, setShow}: {videoUrl: string, show: boolean, setShow: (_show: boolean) => void}) => {

  return (
    <StyledVideoModal>
      <Modal
        width={620}
        overlayClassName='video-modal-overlay'
        className='video-modal'
        display={show}
        onClose={() => setShow(false)}
        content={<StyledVideoContent>
          <video controls>
            <source src={videoUrl} type="video/mp4" />
          </video>
        </StyledVideoContent>}
      />
    </StyledVideoModal>
  );
};

const RelativeOdyssey = ({ title }: any) => {

  const [show, setShow] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [filterCompassList, setFilterCompassList] = useState<Record<string, any>[]>([]);

  const { loading, compassList } = useCompassList();

  const odysseyIsLive = (status: string) => {
    return status === 'live';
  }

  useEffect(() => {
    const filterList: Record<string, any>[] = [];
    if (compassList.length > 0) {
      relativeOdyssey.map(item => {
        const finded = compassList.find((compass: any) => compass.id === item);
        if (finded) {
          filterList.push({
            ...finded,
            ...odyssey[item]
          });
        }
      });
    }
    setFilterCompassList(filterList);
  }, [compassList]);

  const showVideo = (_video: string) => {
    if (!_video) {
      return;
    }
    setVideoUrl(_video);
    setShow(true);
  }

  return (
    <StyledContainer>
      <StyledRelatedTitle>{title}</StyledRelatedTitle>
      {
        loading ? (
          <Loading size={24} />
        ) : (
          <>
            <StyledOdysseyDetail>
              {
                filterCompassList.map(compass => (
                  <StyledOdysseyContainer key={compass.id}>
                    <StyledOdysseyTop>
                      <StyledOdysseyBanner url={compass.banner} className={!odysseyIsLive(compass.status) ? 'gray' : ''} />
                      <StyledOdysseyHead>
                        <StyledOdysseyInfo>
                          <StyledOdysseyIcon />
                          <StyledOdysseyIconTitle>Vol.{renderVolNo(compass)}</StyledOdysseyIconTitle>
                        </StyledOdysseyInfo>
                        <StyledOdysseyTagShadow live={odysseyIsLive(compass.status)}>
                          <StyledOdysseyTag className={odysseyIsLive(compass.status) ? 'odyssey-live' : ''}>
                            {compass.status.replace(/^\S|\s(\S)/g, (s: string) => s.toUpperCase())}
                          </StyledOdysseyTag>
                        </StyledOdysseyTagShadow>
                      </StyledOdysseyHead>
                      {
                        compass.video && (<StyledVideo url={compass.banner} onClick={() => showVideo(compass.video)}>
                        <StyledVideoIcon src='/images/alldapps/icon-play.svg'/>
                      </StyledVideo>)
                      }
                    </StyledOdysseyTop>
                    <StyledOdysseyBody>
                      <StyledOdysseyTitle>{compass.name?.split(': ')?.[0] ?? ''}：<br/>{compass.name?.split(': ')?.[1] ?? ''}</StyledOdysseyTitle>

                      <StyledTagList>
                        {
                          configList.map((item: any, index: number) => (
                            <StyledTagItem key={item.key}>
                              { item.icon && <StyledTagIcon src={`/images/alldapps/${item.icon}`} /> }
                              <StyledTagLabel>{item.type === 'medal' ? `${item.value} Medal` : item.value}</StyledTagLabel>
                            </StyledTagItem>
                          ))
                        }
                       <StyledTagItem key='medal'>
                         {/*<StyledTagIcon src={''} />*/}
                         <StyledTagLabel>1 Medal</StyledTagLabel>
                       </StyledTagItem>
                        <StyledTagItem key='reward' className={odysseyIsLive(compass.status) ? 'tag-active' : 'tag-default'}>
                          <div className='reward-text'>{compass.reward}</div>
                          <StyledTagChains style={{ marginRight: `-${(TagList.length - 1) * 6}px` }}>
                            {
                             TagList.map((_, idx) => (
                                <StyledTagChain style={{ left: `${-idx * 6}px`  }} className={idx === TagList.length - 1 ? 'tag-more' : ''} key={idx}/>
                              ))
                            }
                          </StyledTagChains>
                        </StyledTagItem>
                      </StyledTagList>
                    </StyledOdysseyBody>
                  </StyledOdysseyContainer>
                ))
              }
            </StyledOdysseyDetail>
          </>
        )
      }
      <PlayVideoModal videoUrl={videoUrl} show={show} setShow={setShow} />
    </StyledContainer>
  );
};

export default RelativeOdyssey;