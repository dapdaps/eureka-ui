import styled from 'styled-components';
import ListItem from '../navigation/desktop/components/ListItem';

import IconLink from '@public/images/header/link.svg';
import Link from 'next/link';
import { StatusType } from '@/views/Odyssey/components/Tag';
import useCompassList from '@/views/Home/components/Compass/hooks/useCompassList';
import { Odyssey } from './hooks/useDefaultSearch';
import { useRouter } from 'next/router';

const Container = styled.div`
  .campaign {
    padding: 10px 20px;
  }
`;

const StyleCampaign = styled.div`
  padding: 0 20px;
`;

const StyleTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  .title {
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
    color: #979abe;
  }
`;

const StyledText = styled.div`
  font-size: 12px;
  line-height: 12px;
  font-weight: 400;
  color: #979abe;
  display: flex;
  align-items: center;
  gap: 6px;
  &:hover {
    color: #fff;
    cursor: pointer;
    text-decoration: underline;
  }
`;

const Campaign = ({ data, loading, onClick }: { data: Odyssey[]; loading: boolean; onClick?: () => void }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/odyssey/list');
    onClick?.();
  };

  if (!data || data.length === 0) return null

  return (
    <Container>
      <StyleCampaign>
        <StyleTitle>
          <span className="title">Hot Campaign</span>
          <StyledText onClick={handleClick}>
            View all <IconLink />
          </StyledText>
        </StyleTitle>
      </StyleCampaign>
      <ListItem data={data} loading={loading} onClick={onClick} />
    </Container>
  );
};

export default Campaign;
