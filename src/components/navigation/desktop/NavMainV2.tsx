import IconArrowDown from '@public/images/header/arrow-down.svg';
import IconArrowRight from '@public/images/header/arrow-right.svg';
import IconBridge from '@public/images/header/bridge.svg';
import IconSwap from '@public/images/header/swap.svg';
import IconArrowLink from '@public/svg/link.svg';
import IconCircle from '@public/svg/odyssey/circle.svg';
import IconNewText from '@public/svg/odyssey/new-text.svg';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo, useRef } from 'react';
import styled from 'styled-components';

import RotatingIcon from '@/components/RotatingIcon';
import { CampaignData } from '@/data/campaign';
import useCompassList from '@/views/Home/components/Compass/hooks/useCompassList';
import { StatusType } from '@/views/Odyssey/components/Tag';

import { Wrapper } from '../styles/nav';

const StyleView = styled.div`
  margin: 0 auto;
  margin-top: 30px;
  padding: 0 30px;
  width: calc(100% - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  gap: 10px;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid rgba(51, 54, 72, 1);
  background: rgba(31, 34, 41, 1);
  border-radius: 12px;
  font-family: Montserrat;
  span {
    text-decoration: underline;
  }
  &:hover {
    background: rgba(24, 25, 30, 1);
  }
  &.chain-all {
    margin-top: 0;
    margin-bottom: 30px;
  }
`;

const ListItem = dynamic(() => import('./components/ListItem'));

// static campaign data
const staticCampaignList: any = [];

console.log(CampaignData, 'CampaignData');

Object.values(CampaignData).forEach((campaign) => {
  if (!campaign.odyssey) return;
  campaign.odyssey.forEach((ody) => {
    console.log(ody, 'ody');
    if (
      !ody.superBridgeBanner ||
      ![StatusType.ongoing, StatusType.ended].includes(ody.status) ||
      staticCampaignList.some((it: any) => it.id === ody.id)
    )
      return;
    ody.tag = 'tales';
    ody.mock = true; // mark as static campaign
    staticCampaignList.push(ody);
  });
});

export const NavMainV2 = ({ className }: { className?: string }) => {
  const { loading: compassListLoading, compassList } = useCompassList();
  const router = useRouter();
  const hasNewOdyssey = useMemo(
    () => compassList.some((item: any) => item.is_new) || staticCampaignList.length > 0,
    [compassList]
  );
  const OdysseyRef = useRef<any>();
  const ChainRef = useRef<any>();

  const sortCompassList = useMemo(() => {
    const statusMap: any = {
      [StatusType.ongoing]: [],
      [StatusType.ended]: [],
      [StatusType.un_start]: []
    };
    compassList.forEach((item: any) => {
      if (!item || !item.status) {
        return;
      }
      statusMap[item.status].push(item);
    });

    const combinedData = [
      ...statusMap[StatusType.ongoing],
      ...statusMap[StatusType.un_start],
      ...statusMap[StatusType.ended]
    ];

    console.log(staticCampaignList, 'staticCampaignList');

    const data = staticCampaignList.sort((a: any, b: any) => {
      if (a.status === b.status) {
        return new Date(b.start_time).getTime() - new Date(a.start_time).getTime();
      }
      return a.status === StatusType.ongoing ? -1 : 1;
    });

    return data.length < 4 ? data.concat(combinedData.slice(0, 4 - data.length)) : data.slice(0, 4);
  }, [compassList]);

  return (
    <Wrapper className={className}>
      <NavigationMenu.Root className="NavigationMenuRoot">
        <NavigationMenu.List className="NavigationMenuList">
          <NavigationMenu.Item>
            {/* <Link href="/">
              <NavigationMenu.Trigger className="NavigationMenuTrigger">Home</NavigationMenu.Trigger>
            </Link> */}
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger" ref={OdysseyRef}>
              Campaign
              {hasNewOdyssey && <RotatingIcon staticIcon={<IconNewText />} rotatingIcon={<IconCircle />} />}
              <IconArrowDown className="CaretDown" aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContentV2 bridge">
              <div className="List bridge">
                <ListItem
                  data={sortCompassList}
                  loading={compassListLoading}
                  onClick={() => OdysseyRef?.current?.click()}
                />
              </div>
              <StyleView
                data-bp="1001-008-001"
                onClick={() => {
                  OdysseyRef?.current?.click();
                  router.prefetch('/campaigns');
                  router.push('/campaigns');
                }}
              >
                <div>View all</div>
                <IconArrowRight />
              </StyleView>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <Link href="/super-bridge" data-bp="1001-001">
              <NavigationMenu.Trigger className="NavigationMenuTrigger">
                <IconBridge />
                Bridge
              </NavigationMenu.Trigger>
            </Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <Link href="/super-swap" data-bp="1001-002">
              <NavigationMenu.Trigger className="NavigationMenuTrigger">
                <IconSwap />
                Swap
              </NavigationMenu.Trigger>
            </Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <Link href="/networks" data-bp="1001-009-001">
              <NavigationMenu.Trigger className="NavigationMenuTrigger" ref={ChainRef}>
                Chains
              </NavigationMenu.Trigger>
            </Link>

            {/* <NavigationMenu.Content className="NavigationMenuContentV2 chains">
              <div className="List chain">
                <Chains loading={networkLoading} data={networkList} onClick={() => ChainRef?.current?.click()}/>
              </div>
              <StyleView className='chain-all' data-bp="1001-009-001" onClick={() => {
                ChainRef?.current?.click()
                router.prefetch('')
                router.push('/networks')
              }}><div>View all</div><IconArrowRight /></StyleView>
            </NavigationMenu.Content> */}
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <Link href="/alldapps" data-bp="1001-003">
              <NavigationMenu.Trigger className="NavigationMenuTrigger">DApps</NavigationMenu.Trigger>
            </Link>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger
              className="NavigationMenuTrigger"
              onClick={() => window.open('https://www.dapdap.net', '_blank')}
            >
              About <IconArrowLink style={{ marginLeft: '6px' }} />
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </Wrapper>
  );
};
