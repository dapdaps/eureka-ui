import { memo } from 'react';
import { formateValueWithThousandSeparator } from '@/utils/formate';
import Item from './Item';
import { NetworkTabWrapper, AllNetWorkTab } from './styles';

export const AllNetWorkIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.2963 4.59259C1.02813 4.59259 0 3.56446 0 2.2963C0 1.02813 1.02813 0 2.2963 0C3.56446 0 4.59259 1.02813 4.59259 2.2963C4.59259 3.56446 3.56446 4.59259 2.2963 4.59259ZM12 4.59259C10.7318 4.59259 9.7037 3.56446 9.7037 2.2963C9.7037 1.02813 10.7318 0 12 0C13.2682 0 14.2963 1.02813 14.2963 2.2963C14.2963 3.56446 13.2682 4.59259 12 4.59259ZM21.7037 4.59259C20.4355 4.59259 19.4074 3.56446 19.4074 2.2963C19.4074 1.02813 20.4355 0 21.7037 0C22.9719 0 24 1.02813 24 2.2963C24 3.56446 22.9719 4.59259 21.7037 4.59259ZM2.2963 14.2963C1.02813 14.2963 0 13.2682 0 12C0 10.7318 1.02813 9.7037 2.2963 9.7037C3.56446 9.7037 4.59259 10.7318 4.59259 12C4.59259 13.2682 3.56446 14.2963 2.2963 14.2963ZM2.2963 24C1.02813 24 0 22.9719 0 21.7037C0 20.4355 1.02813 19.4074 2.2963 19.4074C3.56446 19.4074 4.59259 20.4355 4.59259 21.7037C4.59259 22.9719 3.56446 24 2.2963 24ZM12 24C10.7318 24 9.7037 22.9719 9.7037 21.7037C9.7037 20.4355 10.7318 19.4074 12 19.4074C13.2682 19.4074 14.2963 20.4355 14.2963 21.7037C14.2963 22.9719 13.2682 24 12 24ZM21.7037 24C20.4355 24 19.4074 22.9719 19.4074 21.7037C19.4074 20.4355 20.4355 19.4074 21.7037 19.4074C22.9719 19.4074 24 20.4355 24 21.7037C24 22.9719 22.9719 24 21.7037 24ZM12 14.2963C10.7318 14.2963 9.7037 13.2682 9.7037 12C9.7037 10.7318 10.7318 9.7037 12 9.7037C13.2682 9.7037 14.2963 10.7318 14.2963 12C14.2963 13.2682 13.2682 14.2963 12 14.2963ZM21.7037 14.2963C20.4355 14.2963 19.4074 13.2682 19.4074 12C19.4074 10.7318 20.4355 9.7037 21.7037 9.7037C22.9719 9.7037 24 10.7318 24 12C24 13.2682 22.9719 14.2963 21.7037 14.2963Z"
      fill="#2D2F42"
    />
  </svg>
);

const Networks = ({ networks, totalBalance, network, setNetwork }: any) => {
  return (
    <NetworkTabWrapper>
      <AllNetWorkTab
        active={network === 'all'}
        onClick={() => {
          setNetwork('all');
        }}
      >
        {AllNetWorkIcon}

        <div>
          <div className="network-name">All Networks</div>
          <div className="usd-value">${formateValueWithThousandSeparator(totalBalance?.toString(), 4)}</div>
        </div>
      </AllNetWorkTab>

      {networks?.map((chain: any) => {
        return (
          <Item
            key={chain.id}
            chainId={chain.id}
            totalBalance={totalBalance}
            network={network}
            setNetwork={setNetwork}
            usd={chain.usd}
          />
        );
      })}
    </NetworkTabWrapper>
  );
};

export default memo(Networks);