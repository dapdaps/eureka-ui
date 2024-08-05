import styled from 'styled-components';
import ListItem from '../navigation/desktop/components/ListItem';


import IconLink from '@public/images/header/link.svg';
import Link from 'next/link';
import { StatusType } from '@/views/Odyssey/components/Tag';
import useCompassList from '@/views/Home/components/Compass/hooks/useCompassList';

const Container = styled.div`
    .campaign {
        padding: 10px 20px;
    }
`

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
        color: #979ABE;
    }
    .links {
        font-size: 12px;
        line-height: 12px;
        font-weight: 400;
        color: #979ABE;
        display: flex;
        align-items: center;
        gap: 6px;
        &:hover {
            color: #fff;
            cursor: pointer;
        }
    }
`

const Campaign = () => {
  const { loading: compassListLoading, compassList } = useCompassList()

  return (
    <Container>
      <StyleCampaign>
        <StyleTitle>
            <span className='title'>Hot Campaign</span>
            <Link href={''} className='links'>View all <IconLink /></Link>
        </StyleTitle>
      </StyleCampaign>
      <ListItem
          data={compassList}
          loading={compassListLoading}
        />
    </Container>
  );
};

export default Campaign;
