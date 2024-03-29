import { memo } from 'react';
import useAccount from '@/hooks/useAccount';
import { ellipsAccount } from '@/utils/account';
import Chat from './Chat';
import Tab from '../Tab';
import {
  StyledContainer,
  StyledContent,
  StyledUserInfoWrapper,
  DefaultProfileIcon,
  StyledAddressWrapper,
  StyledAddress,
  StyledMetamask,
} from './styles';

const Top = ({ tab, setTab }: any) => {
  const { account } = useAccount();
  return (
    <StyledContainer>
      <StyledContent>
        <div>
          <StyledUserInfoWrapper>
            <DefaultProfileIcon />
            <div>
              <StyledAddressWrapper>
                <StyledAddress>{ellipsAccount(account)}</StyledAddress>
              </StyledAddressWrapper>
              <StyledMetamask>
                <img
                  width={16}
                  src="https://assets.dapdap.net/images/bafkreibaoxmk33xaub4u4evqf7tgymniar47pcfo2rsose5c5jymrmybxq.png"
                  alt=""
                />
                <span>MetaMask</span>
              </StyledMetamask>
            </div>
          </StyledUserInfoWrapper>
          <Tab tab={tab} setTab={setTab} />
        </div>
        <Chat totalBalance={null} />
      </StyledContent>
    </StyledContainer>
  );
};

export default memo(Top);
