import followImg from '@public/images/others/odyssey/v1/components/Social/follow.svg?url';
import shareImg from '@public/images/others/odyssey/v1/components/Social/share.svg?url';
import userImg from '@public/images/others/odyssey/v1/components/Social/user.svg?url';
import xImg from '@public/images/others/odyssey/v1/components/Social/x.svg?url';
import styled from 'styled-components';

import Step from '../Step';
import Panel from './Panel';

const Content = styled.div`
  width: var(--main-width);
  margin: 100px auto 0;
`;

const ShareWapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

interface Props {
  list: any[];
  onShare?: () => void;
  onFollow?: () => void;
  getQuestGroupList: () => void;
  getSumaryDetail: () => void;
}

const icons: any = {
  twitter_quote: userImg.src,
  twitter_follow: xImg.src,
};

const marks: any = {
  twitter_quote: shareImg.src,
  twitter_follow: followImg.src,
};

const btnTexts: any = {
  twitter_quote: 'Refer',
  twitter_follow: 'Follow us',
};

export default function SocialIndex({ list, onShare, onFollow, getQuestGroupList, getSumaryDetail }: Props) {
  const actions: any = {
    twitter_quote: onShare,
    twitter_follow: onFollow,
  };

  return (
    <Content>
      <ShareWapper>
        {list
          ?.filter((item) => item.category !== 'twitter_quote')
          .map((item) => {
            return (
              <Panel
                key={item.name}
                icon={icons[item.category]}
                mark={marks[item.category]}
                btnText={btnTexts[item.category]}
                spin={item.spins}
                totalSpin={item.total_spins}
                id={item.id}
                onAction={actions[item.category]}
                mainText={item.name}
                source={item.source}
                value={item}
                getQuestGroupList={getQuestGroupList}
                getSumaryDetail={getSumaryDetail}
              />
            );
          })}
      </ShareWapper>
      {/* <Step count={3} step={3} /> */}
    </Content>
  );
}
