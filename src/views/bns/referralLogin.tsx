import loginLogo from '@public/images/others/bns/login_logo.svg?url';
import { useConnectWallet } from '@web3-onboard/react';
import { setCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import { getAccessToken } from '@/apis';
// import ConfirmOfficialUrl from '@/components/ConfirmOfficialUrl';
import useInititalDataWithAuth from '@/hooks/useInititalDataWithAuth';
import useToast from '@/hooks/useToast';
import { ellipsAccount } from '@/utils/account';
import { get, post } from '@/utils/http';

import useGetInviter from './hooks/useGetInviter';
import {
  StyledFlex,
  StyledImage,
  StyledInvitedAward,
  StyledLoginConnectWalletButton,
  StyledLoginVideo,
  StyledText
} from './styles';

const StyledUserContainer = styled.div`
  margin-bottom: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 400;
  color: #979abe;
`;
const StyledUser = styled.div`
  min-width: 169px;
  height: 60px;
  padding: 12px 20px 9px 14px;
  border-radius: 72px;
  border: 1px solid #373a53;
  background: #1b1e27;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const StyledUserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
`;
const StyledUserMessage = styled.div``;
const StyledUserName = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const StyledUserAddress = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const LoginView = () => {
  const router = useRouter();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const { queryUserInfo } = useInititalDataWithAuth();
  const toast = useToast();
  const [address, setAddress] = useState('');
  const { inviter } = useGetInviter(router?.query?.inviteCode);

  async function checkAddress() {
    const res: any = await get(`/api/invite/check-address/${address}`);

    if ((res.code as number) !== 0) return;

    if (res.data.is_activated) {
      fetchAccessToken();
    } else {
      activeWithCode();
    }
  }
  async function fetchAccessToken() {
    await getAccessToken(address);
    await queryUserInfo();
    setCookie('LOGIN_ACCOUNT', address);
    setCookie('AUTHED_ACCOUNT', address);
    router.replace((router.query?.source as string) || '/');
  }

  async function activeWithCode() {
    const res: any = await post(`/api/invite/activate`, { address, code: router?.query?.inviteCode });
    if (res.data.is_success) {
      fetchAccessToken();
    }
  }

  useEffect(() => {
    if (wallet) {
      setAddress((wallet as any)['accounts'][0].address);
    }
  }, [wallet]);

  useEffect(() => {
    if (address) {
      checkAddress();
    }
  }, [address]);
  return (
    <StyledFlex style={{ height: '100vh' }} $gap="82px">
      {/* <ConfirmOfficialUrl /> */}
      <StyledImage>
        <StyledLoginVideo width={824} height={636} autoPlay muted playsInline loop>
          <source src="/assets/images/login_background.mp4" type="video/mp4" />
          <track src="/path/to/captions.vtt" kind="subtitles" srcLang="en" label="English" />
          Your browser does not support the video tag.
        </StyledLoginVideo>
      </StyledImage>
      <StyledFlex $direction="column">
        <StyledImage style={{ marginBottom: 24 }}>
          <Image width={409} src={loginLogo} alt="loginLogo" />
        </StyledImage>
        {/* <StyledInvitedUsers>Invited users only</StyledInvitedUsers> */}

        {inviter && (
          <StyledUserContainer>
            <StyledText $color="#979ABE" $size="18px">
              Invited by
            </StyledText>
            <StyledUser>
              <StyledUserAvatar>
                <Image width={36} height={36} src={inviter.avatar} alt="avator" />
              </StyledUserAvatar>
              <StyledUserMessage>
                {inviter?.username && <StyledUserName>{inviter?.username}</StyledUserName>}
                <StyledUserAddress>{ellipsAccount(inviter?.address)}</StyledUserAddress>
              </StyledUserMessage>
            </StyledUser>
          </StyledUserContainer>
        )}
        <StyledInvitedAward>
          💡You’ve been invited to join DapDap! By joining through this referral link and completing a valid
          transaction, you’ll help your friend progress toward earning the Promotional Maestro Medal.
        </StyledInvitedAward>
        <StyledLoginConnectWalletButton
          onClick={() => {
            connect();
          }}
          disabled={connecting}
          data-bp="1001-005"
        >
          Connect Wallet
        </StyledLoginConnectWalletButton>
      </StyledFlex>
    </StyledFlex>
  );
};

export default memo(LoginView);
