import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';
import Title from '@/views/OdysseySurge/components/Title';
import { StyledEmptyContainer } from '@/views/OdysseySurge/styles';

import DappCard from '../DappCard';
import { StyledBody, StyledContainer, StyledContent, StyledQuestWrap,StyledSubTitle, StyledTitle } from './styles';

const Quest_List = [
  {
    key: 1,
    title: 'BRIDGE',
    data: 'bridge',
  },
  {
    key: 2,
    title: 'SWAP',
    data: 'swap',
  },
  {
    key: 3,
    title: 'LENDING',
    data: 'lending',
  },
  {
    key: 4,
    title: 'STAKING',
    data: 'staking',
  },
];

const Quest = ({ list, onRefreshDetail, loading, detailLoading, setDetailLoading }: any) => {
  return (
    <StyledContainer>
      <>
        <StyledTitle>Explore Modular Linea</StyledTitle>
        <StyledSubTitle>Navigate a Curated Selection of Partner dApps Across the Linea Ecosystem</StyledSubTitle>
        {
          Quest_List.map(quest => (
            <StyledQuestWrap key={quest.key} className={quest.title.toLowerCase()}>
              <StyledBody>
                <Title title={quest.title} />
                <StyledContent>
                  {
                    loading
                      ? <StyledLoadingWrapper $h="100px">
                        <Loading size={30} />
                      </StyledLoadingWrapper>
                      : (
                        list?.[quest.data]?.length
                          ? list[quest.data].map((item: any) => (
                            <DappCard
                              key={item.id}
                              {...item}
                              detailLoading={detailLoading}
                              setDetailLoading={setDetailLoading}
                              onRefreshDetail={onRefreshDetail} />
                          ))
                          : <StyledEmptyContainer>No data</StyledEmptyContainer>)
                  }
                </StyledContent>
              </StyledBody>
            </StyledQuestWrap>
          ))
        }
      </>
    </StyledContainer>
  );
}

export default Quest;
