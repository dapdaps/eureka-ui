import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import styled from 'styled-components';

import { recordMouseEnter } from '@/utils/analytics';

import { Wrapper } from '../styles/nav';
import IconArrowDown from '@public/images/header/arrow-down.svg';
import IconSwap from '@public/images/header/swap.svg';
import IconBridge from '@public/images/header/bridge.svg';
import IconOdyssey from '@public/images/header/odyssey-new.svg';
import IconArrowRight from '@public/images/header/arrow-right.svg'
import { StatusType } from './components/Status';
import Chains from './components/Chains';
import ListItem from './components/ListItem';
import useNetworks from '@/views/networks/list/hooks/useNetworks';
import { DividerHorizontalIcon } from '@radix-ui/react-icons';


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

  return (
    <Wrapper className={className}>
      <NavigationMenu.Root className="NavigationMenuRoot">
        <NavigationMenu.List className="NavigationMenuList">
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
              Odyssey
              <IconOdyssey />
              <IconArrowDown />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContentV2 bridge">
              <div className="List">
                <ListItem
                  imgSrc="https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png"
                  isNew={true}
                  title="Odyssey Vol.5"
                  status={StatusType.LIVE}
                  description="DapDap x Mode: The Airdrop Ascendancy"
                  className='bridge-nav'
                />
              </div>
              <StyleView><div>View all</div><IconArrowRight /></StyleView>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger">
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
              <IconArrowDown />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContentV2 chains">
              <div className="List chain">
                <Chains loading={networkLoading} data={networkList} />
              </div>
              <StyleView className='chain-all'><div>View all</div><IconArrowRight /></StyleView>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger" onClick={recordMouseEnter}>
              DApps
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </Wrapper>
  );
};
