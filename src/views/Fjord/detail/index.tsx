import { format } from 'date-fns';
import { ethers } from 'ethers';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import Breadcrumb from '@/components/Breadcrumb';
import FjordModal from '@/components/fjord-modal';
import tokenConfig from '@/components/fjord-modal/hooks/tokenConfig';
import Tabs from '@/components/fjord-modal/tabs';
import Timer from '@/components/fjord-modal/timer';
import Loading from '@/components/Icons/Loading';
import chains from '@/config/chains';
import useAccount from '@/hooks/useAccount';
import useAddTokenToWallet from '@/hooks/useAddTokenToWallet';
import useAuthCheck from '@/hooks/useAuthCheck';
import { StyledContainer, StyledFlex, StyledFont, StyledLoadingWrapper } from '@/styled/styles';
import type { Token } from '@/types';
import { formatValueDecimal } from '@/utils/formate';
import MedalCard from '@/views/Profile/components/MedalCard';

import SocialButton from '../components/SocialButton';
import useMedal from '../hooks/useMedal';
import usePool from '../hooks/usePool';
import useShares from '../hooks/useShares';
import ProjectDetail from './project';
import SaleDetail from './sale';
import {
  Banner,
  BannerBody,
  Content,
  Desc,
  Intro,
  Logo,
  Main,
  Sider,
  SocialGroup,
  StyledBreadcrumbAndBanner,
  StyledBreadcrumbContainer,
  StyledProjectStatus,
  StyledSiderButton,
  StyledSiderContent,
  TabBody,
  TimerTitle,
  TimerWrap,
  Title
} from './style.detail';
import TradesDetail from './trades';
const STATUS_TXT_MAPPING: any = {
  ongoing: 'Live Now',
  upcoming: 'Coming Soon'
};

export default function LaunchpadYoursPage() {
  const router = useRouter();
  const { check } = useAuthCheck({ isNeedAk: true, isQuiet: true });
  const { account, provider } = useAccount();
  const { add } = useAddTokenToWallet();
  const { loading, pool, queryPool } = usePool();
  const { shares, queryShares } = useShares(account);
  const [totalSupply, setTotalSupply] = useState<any>(0);
  const [minimumSharesSold, setMinimumSharesSold] = useState<any>(0);
  const [currentTab, setCurrentTab] = useState('ProjectDetails');
  const { medal, queryMedal } = useMedal();

  const tabData = [
    {
      name: 'Project Details',
      key: 'ProjectDetails'
    },
    {
      name: 'Sale Details',
      key: 'SaleDetails'
    },

    {
      name: 'Trades',
      key: 'Trades'
    }
  ];
  const token = useMemo(() => {
    return {
      symbol: pool?.share_token_symbol,
      address: pool?.share_token_address,
      decimals: pool?.share_token_decimal
    };
  }, [pool]);
  const social = useMemo(() => {
    let _social = null;
    try {
      _social = JSON.parse(pool?.social);
    } catch (error) {
      _social = {};
    }
    return _social;
  }, [pool]);

  const onTabsChange = (key: string) => {
    setCurrentTab(key);
  };
  const handleQueryPool = function (id: any) {
    queryPool({
      id
    });
  };
  const queryTotalSupply = async function (pool: any) {
    const abi = [
      {
        inputs: [],
        name: 'totalSupply',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ];
    const rpcUrl = chains[pool?.chain_id]?.rpcUrls[0] ?? '';
    if (rpcUrl) {
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const contract = new ethers.Contract(pool?.share_token_address, abi, provider);
      const _totalSupply = await contract.totalSupply();
      setTotalSupply(ethers.utils.formatUnits(_totalSupply, pool?.share_token_decimal));
    }
  };

  const queryMinimumSharesSold = async function (pool: any) {
    const abi = [
      {
        inputs: [],
        name: 'minimumSharesSold',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ];
    const rpcUrl = chains[pool?.chain_id]?.rpcUrls[0] ?? '';
    if (rpcUrl) {
      const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
      const contract = new ethers.Contract(pool?.pool, abi, provider);
      try {
        const _minimumSharesSold = await contract.minimumSharesSold();
        setMinimumSharesSold(ethers.utils.formatUnits(_minimumSharesSold, pool?.share_token_decimal));
      } catch (error) {
        console.log('error: ', error);
        setMinimumSharesSold(0);
      }
    }
  };

  const handleQueryMedal = function (pool: any) {
    queryMedal({
      category: 'launchpad',
      pool: pool?.pool
    });
  };
  const handleReminder = function () {
    window.open(
      `http://www.google.com/calendar/event?action=TEMPLATE&text=${pool?.share_token_name}&dates=${format(pool?.start_time * 1000, "yyyyMMdd'T'HHmmss'Z'")}/${format(pool?.end_time * 1000, "yyyyMMdd'T'HHmmss'Z'")}&details=${pool?.description}`
    );
  };
  useEffect(() => {
    router.query.id && handleQueryPool(router.query.id);
  }, [router.query]);

  useEffect(() => {
    if (pool) {
      queryShares(pool);
      queryTotalSupply(pool);
      queryMinimumSharesSold(pool);
      // handleQueryMedal(pool);
    }
  }, [pool]);

  useEffect(() => {
    // console.log('=======account', account)
    if (pool) {
      if (account) {
        check(() => {
          handleQueryMedal(pool);
        });
      } else {
        handleQueryMedal(pool);
      }
    }
  }, [pool, account]);

  return pool ? (
    <div>
      <StyledBreadcrumbAndBanner
        style={{
          background:
            pool?.share_token_symbol?.toLocaleLowerCase() === 'pear'
              ? 'url("/images/fjord/pear-bg.png") center center / 100% auto no-repeat'
              : pool?.share_token_symbol?.toLocaleLowerCase() === 'tango'
                ? 'url("/images/fjord/tango-bg.png") center -68px / 100% auto no-repeat'
                : '#0C0117'
        }}
      >
        <StyledBreadcrumbContainer>
          <Breadcrumb
            navs={[
              { name: 'Home', path: '/' },
              { name: 'Fjord', path: '/launchpad/fjord' }
            ]}
          />
        </StyledBreadcrumbContainer>
        <Banner>
          <BannerBody>
            <Intro>
              <Logo src={pool?.logo} />
              <div>
                <Title>
                  {pool?.share_token_symbol}
                  {STATUS_TXT_MAPPING[pool?.status] && (
                    <StyledProjectStatus className={pool?.status}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <circle
                          cx="5.04456"
                          cy="5.04456"
                          r="5.04456"
                          fill={pool?.status === 'ongoing' ? '#61FD53' : '#FFAE63'}
                        />
                      </svg>
                      <span>{STATUS_TXT_MAPPING[pool?.status]}</span>
                    </StyledProjectStatus>
                  )}
                </Title>
                <Desc>{pool?.description}</Desc>
              </div>
            </Intro>
            <SocialGroup>
              {social?.website && (
                <SocialButton
                  icon={<img width={20} src="/images/icon-website.png" />}
                  alt="Website"
                  url={social?.website}
                />
              )}
              {social?.twitter && (
                <SocialButton
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M7.1428 5.08177L11.6108 0H10.5524L6.6712 4.41152L3.5736 0H0L4.6852 6.67164L0 12H1.0584L5.1544 7.34028L8.4264 12H12M1.4404 0.780949H3.0664L10.5516 11.2574H8.9252"
                        fill="#fff"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_4989_162"
                          x1="6"
                          y1="0"
                          x2="6"
                          y2="13.2381"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#979ABE" />
                          <stop offset="1" stopColor="#979ABE" stopOpacity="0.5" />
                        </linearGradient>
                      </defs>
                    </svg>
                  }
                  alt="Twitter"
                  url={social?.twitter}
                />
              )}
              {social?.discord && (
                <SocialButton
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 10" fill="none">
                      <path
                        d="M8 0.491013C4.81493 0.491013 2.58063 1.69243 2.58063 1.69243C3.80475 0.731297 5.94397 0.177601 5.94397 0.177601L5.74193 0C3.73344 0.0313412 1.9151 1.25365 1.9151 1.25365C-0.129049 5.00415 0.00168121 8.24275 0.00168121 8.24275C1.66552 10.1337 4.13751 9.99786 4.13751 9.99786L4.98132 9.05762C3.49575 8.77555 2.55686 7.61592 2.55686 7.61592C2.55686 7.61592 4.79116 8.95315 8 8.95315C11.2088 8.95315 13.4431 7.61592 13.4431 7.61592C13.4431 7.61592 12.5043 8.77555 11.0187 9.05762L11.8625 9.99786C11.8625 9.99786 14.3345 10.1337 15.9983 8.24275C15.9983 8.24275 16.129 5.00415 14.0849 1.25365C14.0849 1.25365 12.2666 0.0313412 10.2581 0L10.056 0.177601C10.056 0.177601 12.1953 0.731297 13.4194 1.69243C13.4194 1.69243 11.1851 0.491013 8 0.491013ZM5.53989 4.45046C6.31239 4.45046 6.94227 5.04594 6.93039 5.77724C6.93039 6.49809 6.31239 7.10402 5.53989 7.10402C4.77928 7.10402 4.16128 6.49809 4.16128 5.77724C4.16128 5.04594 4.76739 4.45046 5.53989 4.45046ZM10.4958 4.45046C11.2683 4.45046 11.8863 5.04594 11.8863 5.77724C11.8863 6.49809 11.2683 7.10402 10.4958 7.10402C9.73515 7.10402 9.11715 6.49809 9.11715 5.77724C9.11715 5.04594 9.72326 4.45046 10.4958 4.45046Z"
                        fill="#fff"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_4989_163"
                          x1="8"
                          y1="0"
                          x2="8"
                          y2="11.0317"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#979ABE" />
                          <stop offset="1" stopColor="#979ABE" stopOpacity="0.5" />
                        </linearGradient>
                      </defs>
                    </svg>
                  }
                  alt="Discord"
                  url={social?.discord}
                />
              )}
              {social?.telegram && (
                <SocialButton
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 15 12" fill="none">
                      <path
                        d="M5.643 11.274L5.87603 7.91777L12.2677 2.42717C12.5506 2.1812 12.2094 2.06219 11.8349 2.27642L3.94523 7.02912L0.533028 5.99764C-0.199346 5.79929 -0.207669 5.31529 0.699476 4.96617L13.9904 0.0785899C14.5979 -0.183245 15.1805 0.221409 14.9475 1.11006L12.6838 11.274C12.5257 11.996 12.0679 12.1706 11.4354 11.8374L7.98993 9.40943L6.33376 10.9408C6.14235 11.1233 5.98422 11.274 5.643 11.274Z"
                        fill="#fff"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_4989_164"
                          x1="7.5"
                          y1="0"
                          x2="7.5"
                          y2="13.2381"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#979ABE" />
                          <stop offset="1" stopColor="#979ABE" stopOpacity="0.5" />
                        </linearGradient>
                      </defs>
                    </svg>
                  }
                  alt="Tg"
                  url={social?.telegram}
                />
              )}
            </SocialGroup>
          </BannerBody>
        </Banner>
        {/* <StyledRadialGradient />
        <StyledBannerBg src="/images/fjord/pear-bg.png" /> */}
      </StyledBreadcrumbAndBanner>
      <Content>
        <Main>
          <TimerTitle>{pool?.status === 'upcoming' ? 'Start' : 'End'} in</TimerTitle>
          <TimerWrap>
            {pool?.start_time * 1000 > Date.now() ? (
              <Timer color="white" endTime={Number(pool?.start_time)} />
            ) : (
              <Timer color="white" endTime={Number(pool?.end_time)} />
            )}
          </TimerWrap>
          <Tabs
            tabData={tabData}
            current={currentTab}
            onTabsChange={onTabsChange}
            style={{ marginTop: 4, borderBottom: '1px solid #262836', padding: 0 }}
          ></Tabs>
          {currentTab === 'ProjectDetails' && (
            <TabBody>
              <ProjectDetail pool={pool} />
            </TabBody>
          )}
          {currentTab === 'SaleDetails' && (
            <TabBody>
              <SaleDetail pool={pool} totalSupply={totalSupply} softCap={minimumSharesSold} />
            </TabBody>
          )}
          {currentTab === 'Trades' && (
            <TabBody>
              <TradesDetail pool={pool} />
            </TabBody>
          )}
        </Main>
        <Sider>
          {pool?.status === 'ongoing' ? (
            pool?.pool && (
              <FjordModal
                isModal={false}
                isFixedPriceSale={pool?.mode === 'fixed_price'}
                pool={pool?.pool}
                token={
                  {
                    chainId: pool?.chain_id,
                    address: pool?.share_token_address,
                    name: pool?.share_token_name,
                    symbol: pool?.share_token_symbol,
                    icon: pool?.logo,
                    logoURI: pool?.logo,
                    decimals: pool?.share_token_decimal,
                    isNative: false
                  } as Token
                }
                midToken={
                  {
                    chainId: pool?.chain_id,
                    address: pool?.asset_token_address,
                    name: pool?.asset_token_symbol,
                    symbol: pool?.asset_token_symbol,
                    icon: tokenConfig[pool?.asset_token_symbol]?.icon,
                    logoURI: tokenConfig[pool?.asset_token_symbol]?.icon,
                    decimals: pool?.asset_token_decimal,
                    isNative: false
                  } as Token
                }
                chainId={pool?.chain_id}
                price={pool?.price_usd}
              />
            )
          ) : pool?.status === 'upcoming' ? (
            <StyledSiderContent>
              <StyledFont
                color="#FFF"
                fontSize="60px"
                fontWeight="600"
                style={{ transform: 'rotate(15deg)', paddingTop: 33 }}
              >
                ⏳️
              </StyledFont>
              <StyledFont color="#FFF" fontSize="20px" fontWeight="600">
                Coming Soon
              </StyledFont>
              <StyledFont
                color="#979ABE"
                fontSize="14px"
                style={{ width: 426, textAlign: 'center', marginTop: 60, marginBottom: 80 }}
              >
                This LBP is coming soon! Check back soon and stay up to date via the
                <span
                  style={{ textDecoration: 'underline', cursor: 'pointer', marginLeft: 6 }}
                  onClick={() => {
                    social?.website && window.open(social?.website);
                  }}
                >
                  projects website
                </span>
              </StyledFont>
              <StyledFlex style={{ width: '100%', padding: '0 20px' }} gap="12px">
                <StyledSiderButton onClick={handleReminder}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none">
                    <path
                      d="M3.71933 2.39646L3.51451 1.67258C3.35312 1.10218 3.69054 0.502112 4.26694 0.339023C4.84198 0.176321 5.44515 0.51025 5.60654 1.08066L5.81136 1.80453C9.00177 1.45189 11.545 3.68799 12.4768 6.98141L13.6066 10.9743L16.2558 12.1844C16.7704 12.6651 16.906 13.1079 16.7352 13.7899C16.5666 14.4742 15.9794 14.7195 15.299 14.9121L2.50582 18.5318C1.82536 18.7243 1.19672 18.823 0.693905 18.3316C0.192465 17.8398 0.0752398 17.3889 0.261053 16.7129L0.282649 16.6481L1.86943 14.2967L0.739683 10.3038C-0.19217 7.0104 0.814379 3.76846 3.71933 2.39646ZM10.8045 16.7969C11.0747 17.7516 10.6078 19.0807 9.64534 19.353C8.68285 19.6253 7.58888 18.7379 7.31874 17.7832L10.8045 16.7969Z"
                      fill="white"
                    />
                  </svg>
                  <span>Add to Reminder</span>
                </StyledSiderButton>
                <StyledSiderButton
                  onClick={() => {
                    window.open('https://t.me/dapdap_intern_alpha');
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
                    <path
                      d="M7.62432 15.032L7.93917 10.557L16.575 3.23623C16.9573 2.90827 16.4963 2.74958 15.9903 3.03522L5.33044 9.37215L0.72018 7.99686C-0.269339 7.73238 -0.280584 7.08705 0.94507 6.62157L18.9026 0.104786C19.7234 -0.244327 20.5106 0.295212 20.1957 1.48008L17.1372 15.032C16.9235 15.9947 16.3051 16.2275 15.4505 15.7831L10.7953 12.5459L8.55762 14.5877C8.29899 14.831 8.08535 15.032 7.62432 15.032Z"
                      fill="white"
                    />
                  </svg>
                  <span>Join Group</span>
                </StyledSiderButton>
              </StyledFlex>
              <StyledContainer style={{ paddingTop: 15 }}>
                <StyledFont
                  color="#979ABE"
                  fontSize="14px"
                  onClick={() => {
                    add(token);
                  }}
                >
                  Add {token?.symbol} to MetaMask
                </StyledFont>
              </StyledContainer>
            </StyledSiderContent>
          ) : pool?.status === 'completed' ? (
            <StyledSiderContent>
              <StyledFont
                color="#FFF"
                fontSize="60px"
                fontWeight="600"
                style={{ transform: 'rotate(15deg)', paddingTop: 30 }}
              >
                🤚
              </StyledFont>
              <StyledFont color="#FFF" fontSize="20px" fontWeight="600">
                Ended
              </StyledFont>
              <StyledFont color="#979ABE" fontSize="14px" style={{ width: 470, marginTop: 20, marginBottom: 20 }}>
                Tokens purchased with and without vesting in a V2 LBP must be redeemed by clicking the &apos;Redeem
                Tokens&apos; button below at the end of the LBP
              </StyledFont>
              <StyledFont color="#979ABE" fontSize="14px" style={{ width: 470 }}>
                If the LBP you participated in has vested tokens, you can view the token stream via Sablier using the
                link below.
              </StyledFont>
              <StyledFlex justifyContent="space-between" style={{ width: 458, marginTop: 20, marginBottom: 22 }}>
                <StyledFont color="#979ABE" fontSize="14px">
                  Purchased Shares:
                </StyledFont>
                <StyledFont color="#FFF" fontSize="14px">
                  {formatValueDecimal(shares, '', 3)}
                </StyledFont>
              </StyledFlex>
              <StyledSiderButton style={{ opacity: 0.3 }}>
                <span>You have no tokens to redeem</span>
              </StyledSiderButton>
              <StyledFlex justifyContent="space-between" style={{ paddingTop: 15, width: 470 }}>
                <StyledFlex gap="6px">
                  <StyledFont color="#979ABE" fontSize="14px">
                    View on chain
                  </StyledFont>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <g clip-path="url(#clip0_13116_4836)">
                      <path
                        d="M9.0242 9.99611H0.0078125V0.964111H4.5121V1.9243H0.967999V9.02031H8.06401V5.48401H9.0242V9.99611Z"
                        fill="#979ABE"
                      />
                      <path
                        d="M9.08638 0.222534L9.77335 0.909497L5.33931 5.33572L4.66016 4.65657L9.08638 0.222534Z"
                        fill="#979ABE"
                      />
                      <path
                        d="M9.98394 2.97034H9.01594V0.971899H6.92383V0.00390625H9.99174L9.98394 2.97034Z"
                        fill="#979ABE"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_13116_4836">
                        <rect width="10" height="10" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </StyledFlex>
                <StyledFont
                  color="#979ABE"
                  fontSize="14px"
                  onClick={() => {
                    add(token);
                  }}
                >
                  Add {token?.symbol} to MetaMask
                </StyledFont>
              </StyledFlex>
            </StyledSiderContent>
          ) : (
            <StyledSiderContent>
              <StyledFont
                color="#FFF"
                fontSize="60px"
                fontWeight="600"
                style={{ transform: 'rotate(15deg)', paddingTop: 30 }}
              >
                🍾
              </StyledFont>
              <StyledFont color="#FFF" fontSize="20px" fontWeight="600">
                Concluded
              </StyledFont>
              <StyledFont color="#979ABE" fontSize="14px" style={{ width: 470, marginTop: 20, marginBottom: 20 }}>
                Tokens purchased with and without vesting in a V2 LBP must be redeemed by clicking the &apos;Redeem
                Tokens&apos; button below at the end of the LBP.
              </StyledFont>
              <StyledFont color="#979ABE" fontSize="14px" style={{ width: 470 }}>
                If the LBP you participated in has vested tokens, you can view the token stream via Sablier using the
                link below.
              </StyledFont>
              <StyledFlex justifyContent="space-between" style={{ width: 458, marginTop: 20, marginBottom: 22 }}>
                <StyledFont color="#979ABE" fontSize="14px">
                  Purchased Shares:
                </StyledFont>
                <StyledFont color="#FFF" fontSize="14px">
                  0.123
                </StyledFont>
              </StyledFlex>
              <StyledSiderButton>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none">
                  <path
                    d="M3.71933 2.39646L3.51451 1.67258C3.35312 1.10218 3.69054 0.502112 4.26694 0.339023C4.84198 0.176321 5.44515 0.51025 5.60654 1.08066L5.81136 1.80453C9.00177 1.45189 11.545 3.68799 12.4768 6.98141L13.6066 10.9743L16.2558 12.1844C16.7704 12.6651 16.906 13.1079 16.7352 13.7899C16.5666 14.4742 15.9794 14.7195 15.299 14.9121L2.50582 18.5318C1.82536 18.7243 1.19672 18.823 0.693905 18.3316C0.192465 17.8398 0.0752398 17.3889 0.261053 16.7129L0.282649 16.6481L1.86943 14.2967L0.739683 10.3038C-0.19217 7.0104 0.814379 3.76846 3.71933 2.39646ZM10.8045 16.7969C11.0747 17.7516 10.6078 19.0807 9.64534 19.353C8.68285 19.6253 7.58888 18.7379 7.31874 17.7832L10.8045 16.7969Z"
                    fill="white"
                  />
                </svg>
                <span>Add to Reminder</span>
              </StyledSiderButton>
              <StyledFlex justifyContent="space-between" style={{ paddingTop: 15, width: 470 }}>
                <StyledFlex gap="6px">
                  <StyledFont color="#979ABE" fontSize="14px">
                    View on chain
                  </StyledFont>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <g clip-path="url(#clip0_13116_4836)">
                      <path
                        d="M9.0242 9.99611H0.0078125V0.964111H4.5121V1.9243H0.967999V9.02031H8.06401V5.48401H9.0242V9.99611Z"
                        fill="#979ABE"
                      />
                      <path
                        d="M9.08638 0.222534L9.77335 0.909497L5.33931 5.33572L4.66016 4.65657L9.08638 0.222534Z"
                        fill="#979ABE"
                      />
                      <path
                        d="M9.98394 2.97034H9.01594V0.971899H6.92383V0.00390625H9.99174L9.98394 2.97034Z"
                        fill="#979ABE"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_13116_4836">
                        <rect width="10" height="10" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </StyledFlex>
                <StyledFont
                  color="#979ABE"
                  fontSize="14px"
                  onClick={() => {
                    add(token);
                  }}
                >
                  Add {token?.symbol} to MetaMask
                </StyledFont>
              </StyledFlex>
            </StyledSiderContent>
          )}
          {medal && (
            <MedalCard
              medal={medal}
              style={{
                marginTop: 26,
                width: 510
              }}
            />
          )}
        </Sider>
      </Content>
    </div>
  ) : (
    <StyledContainer style={{ paddingTop: 45 }}>
      <StyledLoadingWrapper $h="100px">
        <Loading size={60} />
      </StyledLoadingWrapper>
    </StyledContainer>
  );
}
