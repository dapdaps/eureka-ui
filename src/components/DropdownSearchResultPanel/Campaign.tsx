import styled from 'styled-components';
import ListItem from '../navigation/desktop/components/ListItem';
import { StatusType } from '../navigation/desktop/components/Status';

import IconLink from '@public/images/header/link.svg';
import Link from 'next/link';

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
  return (
    <Container>
      <StyleCampaign>
        <StyleTitle>
            <span className='title'>Hot Campaign</span>
            <Link href={''} className='links'>View all <IconLink /></Link>
        </StyleTitle>
      </StyleCampaign>
      <ListItem
        className="campaign"
        imgSrc="https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png"
        isNew={true}
        title="Odyssey Vol.5"
        status={StatusType.ongoing}
        description="DapDap x Mode: The Airdrop Ascendancy"
      />
    </Container>
  );
};

export default Campaign;
