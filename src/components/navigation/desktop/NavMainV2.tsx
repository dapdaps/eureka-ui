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



const items = [
  { iconSrc: 'https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png', label: 'Arbitrum' },
  { iconSrc: 'https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png', label: 'Avalanche' },
  { iconSrc: 'https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png', label: 'Base' },
  { iconSrc: 'https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png', label: 'Blast' },
  { iconSrc: 'https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png', label: 'BNB' },
  { iconSrc: 'https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png', label: 'Gnosis' },
  { iconSrc: 'https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png', label: 'Linea' },
  { iconSrc: 'https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png', label: 'Manta' },
  { iconSrc: 'https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png', label: 'Mantle' },
  { iconSrc: 'https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png', label: 'Metis' },
  { iconSrc: 'https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png', label: 'Mode' },
  { iconSrc: 'https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png', label: 'Optimism' },
  { iconSrc: 'https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png', label: 'Polygon' },
  { iconSrc: 'https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png', label: 'Polygon zkEVM' },
  { iconSrc: 'https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png', label: 'Scroll' },
  { iconSrc: 'https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png', label: 'zksync' },
];

export const NavMainV2 = ({ className }: { className?: string }) => {
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
            <NavigationMenu.Content className="NavigationMenuContent bridge">
              <ul className="List">
                <ListItem
                  imgSrc="https://s3.amazonaws.com/dapdap.prod/images/group 48098858.png"
                  isNew={true}
                  title="Odyssey Vol.5"
                  status={StatusType.LIVE}
                  description="DapDap x Mode: The Airdrop Ascendancy"
                  className='bridge-nav'
                />
              </ul>
              <StyleView><div>View all</div><IconArrowRight /></StyleView>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger" onClick={recordMouseEnter}>
              <IconBridge />
              Bridge
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger" onClick={recordMouseEnter}>
              <IconSwap />
              Swap
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className="NavigationMenuTrigger" onClick={recordMouseEnter}>
              Chains
              <IconArrowDown />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className="NavigationMenuContent chains">
              <ul className="List chain">
                <Chains items={items}></Chains>
              </ul>
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
