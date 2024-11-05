import { memo, useEffect, useMemo } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import useUserInfo from '@/hooks/useUserInfo';
import { StyledContainer, StyledFlex, StyledFont } from '@/styled/styles';
import useAuthConfig from '@/views/QuestProfile/hooks/useAuthConfig';

import MedalCard from './components/MedalCard';
import useAuthBind from './hooks/useAuthBind';
import type { DataType } from './hooks/useMedalAma';
import useMedalAma from './hooks/useMedalAma';
import useMedalDiscord from './hooks/useMedalDiscord';
import useMedalList from './hooks/useMedalList';
import type { MedalType } from './types';
const StyledLineGradientFont = styled(StyledFont)`
  position: relative;
  margin-top: -50px;
  z-index: 10;
  text-align: center;
  font-size: 46px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 46px */
  text-transform: uppercase;
  background: linear-gradient(90deg, #fff 0%, #979abe 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const StyledInnerContainer = styled.div`
  width: 1287px;
  max-width: 100%;
  margin: 0 auto;
  z-index: 5;
`;
const StyledMedalsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 13px;
`;
const StyledMedalsVideo = styled.video`
  margin: -12px auto 0;
  display: block;
  width: 324px;
  height: 324px;
`;

const StyledCommunityMedals = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 28px;
  /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 30px 14px;
  flex-wrap: wrap; */
`;

const StyledDiscordContainer = styled.div`
  display: flex;
  align-items: center;
`;
const StyledDiscordImage = styled.img`
  margin-left: 10px;
  width: 18px;
`;
const StyledDiscordRefresh = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 23px;
  height: 23px;
  border: 1px solid #979abe;
  border-radius: 4px;
  cursor: pointer;
  @keyframes RotateAnimation {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .rotate {
    animation: RotateAnimation 0.8s linear infinite;
  }
`;

const sortedKeys = ['Voyager Medals', 'Early Adopter Medals', 'Community Medals'];

export default memo(function MedalsView() {
  const [updater, setUpdater] = useState(0);
  const config = useAuthConfig();
  const { loading, medalList } = useMedalList(updater);
  const { userInfo, queryUserInfo } = useUserInfo();
  const { loading: loadingMedalDiscord, run: runMedalDiscord, updateMedal } = useMedalDiscord();
  const { postMedalAma } = useMedalAma();
  const redirectUri = `${window.location.origin}${window.location.pathname}`;
  useAuthBind({
    onSuccess: () => {
      setUpdater(Date.now());
      queryUserInfo();
      runMedalDiscord();
    },
    redirect_uri: redirectUri
  });

  const medalMapping = useMemo(() => {
    const _medalMapping: any = {};
    medalList.forEach((medal) => {
      _medalMapping[medal?.category] = _medalMapping[medal?.category] || [];
      _medalMapping[medal?.category].push(medal);
    });
    return _medalMapping;
  }, [medalList]);

  const sortedMedalKeyList = useMemo(() => {
    if (medalMapping) {
      const keys = Object.keys(medalMapping).sort((a, b) => {
        return sortedKeys.indexOf(a) - sortedKeys.indexOf(b);
      });
      return keys;
    }
    return [];
  }, [medalMapping]);

  const handleBindDiscord = function () {
    if (!userInfo.discord?.is_bind) {
      const path = `https://discord.com/oauth2/authorize?client_id=${config.discord_client_id}&response_type=code&redirect_uri=${redirectUri}&scope=identify`;
      sessionStorage.setItem('_auth_type', 'discord');
      window.open(path, '_blank');
    }
  };
  const handleConfirm = function (data: DataType) {
    return postMedalAma(data);
  };
  const renderMedalList = function (key: string, list: MedalType[]) {
    return (
      <StyledFlex gap="30px 14px" flexWrap="wrap" style={{ width: '100%' }}>
        {list?.map((medal: MedalType, index: number) => {
          return (
            <MedalCard
              key={key + '|' + index}
              medal={medal}
              style={{
                width: 311,
                height: 150
              }}
              nameStyle={{
                fontSize: 16
              }}
              setUpdater={setUpdater}
              onConfirm={handleConfirm}
            />
          );
        })}
      </StyledFlex>
    );
  };

  const renderCommunityMedals = function (key: string, list: MedalType[]) {
    const discordMedalList = list.filter((medal: MedalType) => medal.medal_category === 'discord');
    const notDiscordMedalList = list.filter((medal: MedalType) => medal.medal_category !== 'discord');
    return (
      <StyledCommunityMedals>
        {notDiscordMedalList.length > 0 && renderMedalList(key, notDiscordMedalList)}
        <StyledDiscordContainer>
          {!userInfo.discord?.is_bind ? (
            <StyledFont color="#979ABE" fontSize="16px">
              <span
                style={{ color: '#EBF479', textDecoration: 'underline', cursor: 'pointer' }}
                onClick={handleBindDiscord}
              >
                Bind your discord
              </span>{' '}
              account first and check if you got the community medals below
            </StyledFont>
          ) : (
            <>
              <StyledFont color="#979ABE" fontSize="16px">
                Your discord account:{' '}
              </StyledFont>
              <StyledDiscordImage src="/images/discord.png" />
              <StyledFont color="#FFF" fontSize="16px" style={{ marginLeft: 8, marginRight: 6 }}>
                {userInfo?.discord?.discord_username}
              </StyledFont>
              <StyledDiscordRefresh
                onClick={() => {
                  runMedalDiscord();
                }}
              >
                <svg
                  className={loadingMedalDiscord ? 'rotate' : ''}
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0816 1.32799C10.0753 1.07388 9.88172 0.913738 9.60447 0.919576C9.32676 0.925414 9.18369 1.09484 9.13806 1.34905C9.11442 1.48088 9.12203 1.6188 9.12066 1.75404C9.11833 1.98477 9.12003 2.21554 9.12003 2.44632C9.08396 2.46267 9.04787 2.47903 9.0118 2.49541C8.89062 2.37897 8.7715 2.26034 8.64798 2.14645C7.53472 1.12012 6.21386 0.738034 4.73465 0.96512C2.64615 1.28573 1.09875 3.02454 0.917168 5.19514C0.746831 7.2313 2.06041 9.19866 4.03213 9.86047C6.02675 10.53 8.24611 9.75072 9.36793 7.98501C9.44015 7.87134 9.51519 7.75465 9.55926 7.62897C9.64485 7.38486 9.60185 7.15761 9.36072 7.02717C9.12841 6.90153 8.90822 6.95199 8.74327 7.16524C8.66078 7.27188 8.59807 7.39354 8.52106 7.50473C7.82554 8.50909 6.87011 9.05634 5.64753 9.11594C4.01051 9.19574 2.50987 8.1339 2.03279 6.56881C1.54005 4.95238 2.22158 3.2107 3.67933 2.36103C5.09636 1.53508 6.91553 1.7721 8.06225 2.93672C8.14623 3.02201 8.2028 3.13427 8.33894 3.33008C7.89125 3.33008 7.54659 3.31185 7.2048 3.33541C6.88916 3.35719 6.72199 3.54502 6.72458 3.80871C6.72711 4.06544 6.90601 4.27788 7.20973 4.28535C8.00247 4.30485 8.79605 4.29777 9.5892 4.28932C9.85051 4.28654 10.0668 4.13696 10.0748 3.87875C10.1008 3.02906 10.1029 2.17781 10.0816 1.32799Z"
                    fill="#979ABE"
                  />
                </svg>
              </StyledDiscordRefresh>
            </>
          )}
        </StyledDiscordContainer>
        {discordMedalList.length > 0 && renderMedalList(key, discordMedalList)}
      </StyledCommunityMedals>
    );
  };

  useEffect(() => {
    updateMedal && setUpdater(Date.now());
  }, [updateMedal]);
  return (
    <StyledContainer style={{ backgroundColor: '#000' }}>
      <StyledInnerContainer>
        <StyledMedalsVideo src="/videos/MedalDashboard.webm" controls={false} muted autoPlay loop />
        <StyledLineGradientFont>Medal Dashboard</StyledLineGradientFont>
        <StyledFont
          color="#979ABE"
          fontSize="20px"
          lineHeight="160%"
          textAlign="center"
          style={{ width: 665, margin: '12px auto 54px' }}
        >
          Track your progress and earn recognition, as you explore, trade, and contribute across multiple Ethereum L2 &
          EVM networks.
        </StyledFont>
        <StyledFlex flexDirection="column" gap="100px">
          {sortedMedalKeyList.map((key) => {
            return (
              <StyledMedalsContainer key={key}>
                <StyledFlex gap="6px" style={{ paddingLeft: 16, marginBottom: 20 }}>
                  <StyledFont color="#FFF" fontSize="20px" fontWeight="600" style={{ textTransform: 'capitalize' }}>
                    {key.split('_').join(' ')}
                  </StyledFont>
                </StyledFlex>
                {key.split('_').join(' ') === 'Community Medals'
                  ? renderCommunityMedals(key, medalMapping[key])
                  : renderMedalList(key, medalMapping[key])}
              </StyledMedalsContainer>
            );
          })}
        </StyledFlex>
      </StyledInnerContainer>
    </StyledContainer>
  );
});
