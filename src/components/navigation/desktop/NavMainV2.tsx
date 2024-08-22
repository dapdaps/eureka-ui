import IconArrowDown from '@public/images/header/arrow-down.svg';
import IconArrowRight from '@public/images/header/arrow-right.svg'
import IconBridge from '@public/images/header/bridge.svg';
import IconOdyssey from '@public/images/header/odyssey-new.svg';
import IconSwap from '@public/images/header/swap.svg';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useMemo, useRef } from 'react';
import styled from 'styled-components';

import useCompassList from '@/views/Home/components/Compass/hooks/useCompassList';
import { StatusType } from "@/views/Odyssey/components/Tag";

import { Wrapper } from '../styles/nav';
import ListItem from './components/ListItem';

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
`




export const NavMainV2 = ({ className }: { className?: string }) => {
  const { loading: compassListLoading, compassList } = useCompassList()
  const router = useRouter();
  const hasNewOdyssey = useMemo(() => compassList.some((item: any) => item.is_new), [compassList])
  const OdysseyRef = useRef<any>()
  const ChainRef = useRef<any>()

  const sortCompassList = useMemo(() => {
    const statusMap: any = {
      [StatusType.ongoing]: [],
      [StatusType.ended]: [],
      [StatusType.un_start]: [],
    };
    compassList.forEach((item: any) => {
      if (!item || !item.status) {
        return;
      }
      statusMap[item.status].push(item);
    });
  
    return [...statusMap[StatusType.ongoing], ...statusMap[StatusType.un_start], ...statusMap[StatusType.ended]].slice(0, 4);
  }, [compassList]);


  return (
    <Wrapper className={className}>
      <NavigationMenu.Root className="NavigationMenuRoot">
        <NavigationMenu.List className="NavigationMenuList">
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger" ref={OdysseyRef}>
              Odyssey
              { hasNewOdyssey && <IconOdyssey />}
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
              <StyleView data-bp="1001-008-001" onClick={() => {
                OdysseyRef?.current?.click();
                router.prefetch('/odyssey')
                router.push('/odyssey')
              }}><div>View all</div><IconArrowRight /></StyleView>
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
            <Link href='/alldapps' data-bp="1001-003">
              <NavigationMenu.Trigger className="NavigationMenuTrigger">
                DApps
              </NavigationMenu.Trigger>
              </Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </Wrapper>
  );
};
