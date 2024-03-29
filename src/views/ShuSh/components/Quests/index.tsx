import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';

import QuestItem from '../../../Quest/components/QuestItem';
const QuestsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 0 -10px;
  --onboarding-color: #787dff;
  --social-color: #aad6ff;
  --engage-color: #f4ca79;
`;

const Title = styled.div`
  font-family: Gantari;
  font-size: 36px;
  font-weight: 600;
  line-height: 100%;
  background: linear-gradient(180deg, #fff 0%, #afafaf 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 80px 0 20px;
`;
const StyledLoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 222px;
`;
const Quests = ({ questList, loading }: any) => {
  return (
    <>
      <Title>Related Quests</Title>
      {loading ? (
        <StyledLoadingWrapper>
          <Loading size={60} />
        </StyledLoadingWrapper>
      ) : (
        <QuestsWrap>
          {questList.map((quest: any, index: number) => (
            <QuestItem quest={quest} key={index} />
          ))}
        </QuestsWrap>
      )}
    </>
  );
};
export default Quests;
