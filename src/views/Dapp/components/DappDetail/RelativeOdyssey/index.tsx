import {
  StyledContainer,
  StyledOdysseyContainer,
  StyledRewardTag,
  StyledOdysseyBanner,
  StyledOdysseyTitle,
  StyledOdysseyTag,
  StyledRewardText,
  StyledOdysseyDetail,
  StyledRelatedTitle
} from './styles';


import {
  relativeOdyssey
} from '../config';
import useCompassList from '@/views/Home/components/Compass/hooks/useCompassList';
import Loading from '@/components/Icons/Loading';
import { useEffect, useState } from 'react';
import odyssey from '@/config/odyssey';
import Medal from '../Medal';

const RelativeOdyssey = () => {

  const { loading, compassList } = useCompassList();

  const [filterCompassList, setFilterCompassList] = useState<Record<string, any>[]>([]);

  useEffect(() => {
    const filterList: Record<string, any>[] = [];
    if (compassList.length > 0) {
      relativeOdyssey.map(item => {
        const finded = compassList.find((compass: any) => compass.id === item);
        if (finded) {
          filterList.push(finded);
        }
      })
    }
    setFilterCompassList(filterList);
  }, [compassList]);

  return (
    <StyledContainer>
      <StyledRelatedTitle>Related Campaign</StyledRelatedTitle>
      {
        loading ? (<Loading size={24}/>) : (
          <>
           <StyledOdysseyDetail>
            {
              filterCompassList.map(compass => (
                <StyledOdysseyContainer>
                  <StyledRewardTag url={['ended', 'un_start'].includes(compass.status) ? odyssey[compass.id]?.rewardDisableIcon : odyssey[compass.id]?.rewardEnableIcon}>
                    <StyledRewardText style={{
                      top: odyssey[compass.id]?.rewardTop ? (odyssey[compass.id]?.rewardTop - 10) : 36,
                    }}>{odyssey[compass.id]?.reward}</StyledRewardText>
                  </StyledRewardTag>
                  <StyledOdysseyBanner url={compass.banner}/>
                  <StyledOdysseyTitle>
                    {compass.name}
                    <StyledOdysseyTag>
                      {compass.status}
                    </StyledOdysseyTag>
                  </StyledOdysseyTitle>
                </StyledOdysseyContainer>
              ))
            }
           </StyledOdysseyDetail>
        </>)
      }
      <Medal />
    </StyledContainer>
  );
};

export default RelativeOdyssey;