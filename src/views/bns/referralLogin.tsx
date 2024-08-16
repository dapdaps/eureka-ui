import useInititalDataWithAuth from '@/hooks/useInititalDataWithAuth';
import { ellipsAccount } from '@/utils/account';
import loginLogo from '@public/images/others/bns/login_logo.svg?url';
import { useConnectWallet } from '@web3-onboard/react';
import { setCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import useGetInviter from './hooks/useGetInviter';
import {
  StyledFlex,
  StyledImage,
  StyledInvitedAward,
  StyledLoginConnectWalletButton,
  StyledLoginVideo,
  StyledSvg,
  StyledText
} from './styles';

import { getAccessToken } from '@/apis';
import useToast from '@/hooks/useToast';
import { get, post } from '@/utils/http';


const StyledUserContainer = styled.div`
  margin-bottom: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 400;
  color: #979ABE;
`
const StyledUser = styled.div`
  min-width: 169px;
  height: 60px;
  padding: 12px 20px 9px 14px;
  border-radius: 72px;
  border: 1px solid #373A53;
  background: #1B1E27;
  display: flex;
  align-items: center;
  gap: 8px;
`
const StyledUserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
`
const StyledUserMessage = styled.div`
  
`
const StyledUserName = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const StyledUserAddress = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledTips = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #EBF479;
  z-index: 999;
`
const LoginView = () => {
  const router = useRouter()
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const { queryUserInfo } = useInititalDataWithAuth();
  const toast = useToast()
  const [address, setAddress] = useState('');
  const [showTips, setShowTips] = useState(true)
  const {
    inviter
  } = useGetInviter(router?.query?.inviteCode)


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
  function handleClose() {
    setShowTips(false)
  }
  async function activeWithCode() {
    const res: any = await post(`/api/invite/activate`, { address, code: router?.query?.inviteCode });
    if (res.data.is_success) {
      toast.success({
        title: '100PTS rewarded!'
      })
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
      {showTips && (
        <StyledTips>
          <StyledFlex $gap='8px'>
            <StyledText
              $color='#000'
              $size='20px'
              $weight='500'
            >
              👀 Please confirm you are visiting the official URL:
            </StyledText>
            <StyledText
              $color='#000'
              $size='20px'
              $weight='700'
            >dapdap.net</StyledText>
          </StyledFlex>

          <StyledSvg style={{
            position: 'absolute',
            right: 21,
            top: 21,
            cursor: 'pointer'
          }} onClick={handleClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884125 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882276 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884276 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z" fill="black" />
            </svg>
          </StyledSvg>
        </StyledTips>
      )}
      <StyledImage>
        <StyledLoginVideo width={824} height={636} autoPlay muted playsInline loop>
          <source src="https://s3.amazonaws.com/dapdap.prod/images/login_background.mp4" type="video/mp4" />
          <track src="/path/to/captions.vtt" kind="subtitles" srcLang="en" label="English" />
          Your browser does not support the video tag.
        </StyledLoginVideo>
      </StyledImage>
      <StyledFlex $direction="column">
        <StyledImage style={{ marginBottom: 24 }}>
          <Image style={{ width: 409 }} src={loginLogo.src} alt="loginLogo" />
        </StyledImage>
        {/* <StyledInvitedUsers>Invited users only</StyledInvitedUsers> */}

        {
          inviter && (
            <StyledUserContainer>
              <StyledText
                $color='#979ABE'
                $size='18px'>
                Invited by
              </StyledText>
              <StyledUser>
                <StyledUserAvatar>
                  <Image width={36} height={36} src={inviter.avatar} alt='avator' />
                </StyledUserAvatar>
                <StyledUserMessage>
                  {
                    inviter?.username && (
                      <StyledUserName>{inviter?.username}</StyledUserName>
                    )
                  }
                  <StyledUserAddress>{ellipsAccount(inviter?.address)}</StyledUserAddress>
                </StyledUserMessage>
              </StyledUser>
            </StyledUserContainer>
          )
        }
        <StyledInvitedAward>
          💡You’ve been invited to join DapDap! By joining through this referral link and completing a valid transaction, you’ll help your friend progress toward earning the Promotional Maestro Medal.
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
