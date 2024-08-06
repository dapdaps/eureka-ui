import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import styled from 'styled-components';

import { recordMouseEnter } from '@/utils/analytics';

import { Wrapper } from '../styles/nav';
import IconArrowDown from '@public/images/header/arrow-down.svg';
import IconSwap from '@public/images/header/swap.svg';
import IconBridge from '@public/images/header/bridge.svg';
import IconOdyssey from '@public/images/header/odyssey-new.svg';
import IconArrowRight from '@public/images/header/arrow-right.svg'
import { StatusType } from "@/views/Odyssey/components/Tag";
import Chains from './components/Chains';
import ListItem from './components/ListItem';
import useNetworks from '@/views/networks/list/hooks/useNetworks';
import { DividerHorizontalIcon } from '@radix-ui/react-icons';
import useCompassList from '@/views/Home/components/Compass/hooks/useCompassList';
import { useMemo } from 'react';
import { useRouter } from 'next/router';

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
`




export const NavMainV2 = ({ className }: { className?: string }) => {
  const { loading: networkLoading, networkList } = useNetworks();
  const { loading: compassListLoading, compassList } = useCompassList()
  const router = useRouter();
  const hasNewOdyssey = useMemo(() => compassList.some((item: any) => item.is_New), [compassList])

  return (
    <Wrapper className={className}>
      <NavigationMenu.Root className="NavigationMenuRoot">
        <NavigationMenu.List className="NavigationMenuList">
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Odyssey
              { hasNewOdyssey && <IconOdyssey />}
              <IconArrowDown className="CaretDown" aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContentV2 bridge">
              <div className="List bridge">
                <ListItem
                  data={compassList}
                  loading={compassListLoading}
                />
              </div>
              <StyleView onClick={() => router.push('/odyssey-list')}><div>View all</div><IconArrowRight /></StyleView>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger" onClick={() => router.push('/super-bridge')}>
              <IconBridge />
              Bridge
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              <IconSwap />
              Swap
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Chains
              <IconArrowDown className="CaretDown" aria-hidden />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContentV2 chains">
              <div className="List chain">
                <Chains loading={networkLoading} data={networkList} />
              </div>
              <StyleView className='chain-all' onClick={() => router.push('/networks')}><div>View all</div><IconArrowRight /></StyleView>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger" onClick={(e) => {
              router.push('/alldapps')
              recordMouseEnter(e)
            }}>
              DApps
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </Wrapper>
  );
};
