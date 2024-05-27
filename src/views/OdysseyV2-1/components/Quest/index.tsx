import DappCard from '../DappCard';
import { StyledContainer, StyledContent, StyledSubTitle, StyledTitle, StyledBody, StyledQuestWrap } from './styles';
import Title from '@/views/OdysseyV2-1/components/Title';
import { StyledLoadingWrapper } from '@/styled/styles';
import Loading from '@/components/Icons/Loading';
import { StyledEmptyContainer } from '@/views/OdysseyV2-1/styles';

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
                              onRefreshDetail={onRefreshDetail} />))
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
