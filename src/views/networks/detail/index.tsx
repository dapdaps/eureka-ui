import { memo, useMemo, useEffect, useState } from 'react';
import Image from 'next/image';
import chainsConfig, { PathToId } from '@/config/all-in-one/chains';
import useReport from '@/views/Landing/hooks/useReport';
import useDetail from './hooks/useDetail';

import Top from './components/Top';
import QuickOnboarding from './components/QuickOnboarding';
import Dapps from './components/Dapps';
import Quests from './components/Quests';
import DappList from '@/views/AllDapps/components/DappList';
import { CategoryList, TitleDapp, TitleDappList } from '@/views/AllDapps/config';
import useCategoryDappList from '@/views/Quest/hooks/useCategoryDappList';
import { useRouter } from 'next/router';
import Medal from '@/views/networks/detail/components/medals';
import {
  StyledContainer,
  DappTitle,
  StyledCategory,
  StyledCategoryItem,
  StyledDetail,
  TabHead,
  TabBody,
  SubTitle,
  MedalWrap,
  CompaginWrap,
  CompaginBanner,
  CompaginBtn,
  CompaginTitle,
  CompaginVolume,
  IconGroup,
} from './styles';

const ChainDetail = ({ path }: any) => {
  const { loading, detail, hotDapps, quests } = useDetail(PathToId[path]);
  const { handleReport } = useReport();
  const currentChain = useMemo(() => {
    return chainsConfig[path];
  }, [path]);

  useEffect(() => {
    if ([4, 6].includes(Number(PathToId[path]))) {
      handleReport(`network/${path}`);
    }
  }, [path]);
  const router = useRouter();
  const { categories } = useCategoryDappList();

  // const onSelectCategory = (_category: any) => {
  //   const params = new URLSearchParams(searchParams);
  //   if (!_category) {
  //     params.delete('category');
  //   } else {
  //     params.set('category', _category.toString());
  //   }
  //   router.replace(`${pathname}${!params.toString() ? '' : '?' + params.toString()}`, undefined, { scroll: false });
  // }
  const categoryList = useMemo(() => {
    return Object.values(categories || {}).map((it: any) => {
      const curr = CategoryList.find((_it) => _it.key === it.id);
      return {
        ...curr,
      };
    });
  }, [categories, CategoryList]);
  const [category, setCategory] = useState<number | string>();
  const [currentCategory, setCurrentCategory] = useState<any>();
  const handleCurrentCategory = (category: any) => {
    setCategory(category.key);
    if (category.key === currentCategory?.key) {
      setCurrentCategory(undefined);
      // onSelectCategory(undefined);
      return;
    }
    setCurrentCategory(category);
    // onSelectCategory(category.key);
  };

  const [curTab, setCurTab] = useState('OVERVIEW');

  return (
    <StyledContainer>
      <Top chain={{ ...currentChain, ...detail }} />
      <QuickOnboarding path={path} chain={{ ...currentChain }} />

      <StyledDetail>
        <div className="left">
          <TabHead>
            <div className={`tab-item ${curTab === 'OVERVIEW' && 'active'}`} onClick={() => setCurTab('OVERVIEW')}>
              Overview
            </div>
            <span className="line"></span>
            <div className={`tab-item ${curTab === 'HISTORY' && 'active'}`} onClick={() => setCurTab('HISTORY')}>
              My History (32)
            </div>
          </TabHead>
          {curTab === 'OVERVIEW' ? (
            <TabBody>
              <div className="intro-title">Introducing {detail?.name}</div>
              <div className="intro-desc">{detail?.description}</div>
              <div className="pj-title">Project Token</div>
              <div className="pj-value">
                <span>
                  <Image src={detail?.logo} width={26} height={26} alt="" /> {detail?.name}
                </span>
                <span className="price">$0.02735</span>
              </div>
              <div className="pj-title">Token Address</div>
              <div className="pj-value">
                <span className="pj-detail">
                  <Image src={detail?.logo} width={26} height={26} alt="" /> 0xdfc...e3167a
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="6" y="6" width="9" height="9" rx="2" stroke="#979ABE" />
                    <path
                      d="M10 4V3C10 1.89543 9.10457 1 8 1H3C1.89543 1 1 1.89543 1 3V8C1 9.10457 1.89543 10 3 10H4"
                      stroke="#979ABE"
                    />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
                    <path
                      d="M10.8182 8.72727V10C10.8182 11.1046 9.92275 12 8.81818 12H3C1.89543 12 1 11.1046 1 10V4.18182C1 3.07725 1.89543 2.18182 3 2.18182H4.27273"
                      stroke="#979ABE"
                    />
                    <path d="M5 8.63636L12.6364 1M12.6364 1H7.29091M12.6364 1V6.34545" stroke="#979ABE" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                    <g clip-path="url(#clip0_16201_1845)">
                      <path
                        d="M15.405 0.229027L9.15503 4.85303L10.317 2.12803L15.405 0.228027V0.229027Z"
                        fill="#E17726"
                      />
                      <path
                        d="M0.990881 0.229004L7.18588 4.897L6.07888 2.127L0.990881 0.230004V0.229004ZM13.1539 10.953L11.4909 13.493L15.0519 14.474L16.0719 11.009L13.1539 10.953ZM0.327881 11.007L1.34088 14.472L4.89588 13.492L3.23888 10.952L0.327881 11.007Z"
                        fill="#E27625"
                      />
                      <path
                        d="M4.70704 6.66007L3.71704 8.15207L7.24104 8.31207L7.12404 4.52007L4.70704 6.66007ZM11.69 6.66007L9.23504 4.47607L9.15504 8.31107L12.679 8.15107L11.689 6.65807L11.69 6.66007ZM4.89704 13.4921L7.02904 12.4621L5.19304 11.0321L4.89704 13.4921ZM9.36704 12.4621L11.493 13.4921L11.203 11.0321L9.36704 12.4621Z"
                        fill="#E27625"
                      />
                      <path
                        d="M11.493 13.4929L9.36697 12.4629L9.53997 13.8439L9.52097 14.4299L11.493 13.4929ZM4.89697 13.4929L6.87497 14.4299L6.86297 13.8439L7.02897 12.4629L4.89697 13.4929Z"
                        fill="#D5BFB2"
                      />
                      <path
                        d="M6.91204 10.1189L5.14404 9.59988L6.39304 9.02588L6.91304 10.1179L6.91204 10.1189ZM9.48404 10.1189L10.004 9.02688L11.258 9.60088L9.48404 10.1189Z"
                        fill="#233447"
                      />
                      <path
                        d="M4.89797 13.4941L5.20697 10.9541L3.24097 11.0091L4.89797 13.4941ZM11.19 10.9511L11.493 13.4911L13.156 11.0071L11.19 10.9511ZM12.679 8.1521L9.15497 8.3121L9.48297 10.1201L10.002 9.0281L11.257 9.6011L12.679 8.1521ZM5.14597 9.6011L6.39397 9.0281L6.91397 10.1191L7.24097 8.3131L3.71797 8.1531L5.14597 9.6001V9.6011Z"
                        fill="#CC6228"
                      />
                      <path
                        d="M3.71802 8.1521L5.19502 11.0321L5.14502 9.6021L3.71802 8.1521ZM11.258 9.6011L11.203 11.0321L12.68 8.1521L11.258 9.6021V9.6011ZM7.24002 8.3131L6.91202 10.1191L7.32602 12.2531L7.41902 9.4411L7.23902 8.3121L7.24002 8.3131ZM9.15602 8.3131L8.98302 9.4351L9.07002 12.2531L9.48402 10.1191L9.15602 8.3131Z"
                        fill="#E27525"
                      />
                      <path
                        d="M9.48404 10.1201L9.07004 12.2531L9.36704 12.4631L11.203 11.0331L11.258 9.60205L9.48404 10.1201ZM5.14404 9.60205L5.19404 11.0321L7.03004 12.4621L7.32604 12.2531L6.91204 10.1201L5.14404 9.60205Z"
                        fill="#F5841F"
                      />
                      <path
                        d="M9.52097 14.4299L9.53897 13.8439L9.37897 13.7079H7.01697L6.86297 13.8439L6.87497 14.4299L4.89697 13.4919L5.58897 14.0589L6.99197 15.0279H9.39697L10.807 14.0589L11.493 13.4919L9.52097 14.4299Z"
                        fill="#C0AC9D"
                      />
                      <path
                        d="M9.36704 12.4629L9.07004 12.2529H7.32604L7.03004 12.4629L6.86304 13.8449L7.01704 13.7089H9.38004L9.54004 13.8449L9.36804 12.4629H9.36704Z"
                        fill="#161616"
                      />
                      <path
                        d="M15.673 5.15603L16.198 2.60303L15.407 0.229027L9.36702 4.69903L11.69 6.66003L14.973 7.61603L15.696 6.77103L15.381 6.54303L15.881 6.08703L15.498 5.79103L15.999 5.40803L15.672 5.15603H15.673ZM0.198021 2.60303L0.730021 5.15603L0.390021 5.40803L0.897022 5.79103L0.513021 6.08703L1.01402 6.54303L0.699021 6.77103L1.42202 7.61603L4.70502 6.66003L7.03002 4.70003L0.990021 0.228027L0.197021 2.60303H0.198021Z"
                        fill="#763E1A"
                      />
                      <path
                        d="M14.9739 7.61595L11.6899 6.65995L12.6799 8.15195L11.2019 11.032L13.1549 11.008H16.0729L14.9729 7.61595H14.9739ZM4.70488 6.65995L1.42188 7.61595L0.327881 11.008H3.23888L5.19288 11.032L3.71588 8.15195L4.70488 6.65995ZM9.15588 8.31195L9.36588 4.69795L10.3189 2.12695H6.07788L7.02988 4.69795L7.23988 8.31195L7.31988 9.44695L7.32588 12.252H9.06988L9.07588 9.44695L9.15588 8.31195Z"
                        fill="#F5841F"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_16201_1845">
                        <rect width="17" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </span>
              </div>
            </TabBody>
          ) : null}
          {curTab === 'HISTORY' ? <TabBody>2</TabBody> : null}
        </div>
        <div className="right">
          <MedalWrap>
            <SubTitle style={{ marginBottom: 20 }}>Medals</SubTitle>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Medal logo="/images/medals/medal-trader.svg" title="Mode Trader" status="Acheived" process={100} />
              <Medal logo="/images/medals/medal-voyager.svg" title="Mode Voyager" status="Process" process={30} />
              <Medal logo="/images/medals/medal-pioneer.svg" title="Mode Pioneer" status="Process" process={15} />
            </div>
          </MedalWrap>
          <SubTitle style={{ marginBottom: 30 }}>Campaign and Rewards</SubTitle>
          <CompaginWrap>
            <CompaginBanner>
              <CompaginBtn>
                Join Campaign
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 18 12" fill="none">
                  <path
                    d="M1 5.2C0.558172 5.2 0.2 5.55817 0.2 6C0.2 6.44183 0.558172 6.8 1 6.8L1 5.2ZM17.5657 6.56569C17.8781 6.25327 17.8781 5.74674 17.5657 5.43432L12.4745 0.343147C12.1621 0.0307274 11.6556 0.0307274 11.3431 0.343147C11.0307 0.655566 11.0307 1.1621 11.3431 1.47452L15.8686 6L11.3431 10.5255C11.0307 10.8379 11.0307 11.3444 11.3431 11.6569C11.6556 11.9693 12.1621 11.9693 12.4745 11.6569L17.5657 6.56569ZM1 6.8L17 6.8L17 5.2L1 5.2L1 6.8Z"
                    fill="black"
                  />
                </svg>
              </CompaginBtn>
            </CompaginBanner>
            <CompaginTitle>
              DapDap X Mode: The Airdrop Ascendancy <span className="tag">Ended</span>
            </CompaginTitle>
            <CompaginVolume>
              <span className="value">$15k MODE</span>
              <IconGroup>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <rect x="1" y="1" width="28" height="28" rx="14" fill="#DFFE00" stroke="#292B33" stroke-width="2" />
                  <path
                    d="M10.8001 21.0667H8.06641V8.93335H12.1392L14.6687 15.8457V17.8311H15.4126V15.8457L17.9421 8.93335H21.9331V21.0667H19.2813V15.0368L20.3972 11.5806L19.6532 11.36L16.0822 21.0667H13.9991L10.5025 11.36L9.68412 11.5806L10.8001 15.0368V21.0667Z"
                    fill="black"
                  />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                  <rect x="1" y="1" width="28" height="28" rx="14" fill="#D9F0F0" stroke="#292B33" stroke-width="2" />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M14.9347 7.95662L17.6804 6.375C17.8987 6.24928 18.1691 6.40982 18.1691 6.66515V6.73338C18.1691 7.08653 18.334 7.41865 18.6132 7.62808L21.2905 9.63582C22.2099 10.3253 22.1288 11.7496 21.1373 12.3262L18.5796 13.8139C17.9597 14.1744 17.9093 15.0651 18.4844 15.4958L21.2859 17.5935C22.2066 18.2829 22.1253 19.7091 21.1323 20.2853L18.3721 21.8871C18.1539 22.0137 17.8826 21.8533 17.8826 21.5974V21.5143C17.8826 21.1629 17.7194 20.8322 17.4424 20.6226L14.7734 18.6019C13.8575 17.9085 13.9444 16.4854 14.9375 15.9128L17.4672 14.4542C18.0872 14.0968 18.1422 13.2086 17.5712 12.7747L14.7678 10.6442C13.8539 9.9498 13.9423 8.52832 14.9347 7.95662ZM8.86795 10.5566L11.6137 8.97501C11.8319 8.84927 12.1023 9.00982 12.1023 9.26515V9.33338C12.1023 9.68653 12.2672 10.0186 12.5465 10.2281L15.2238 12.2358C16.1431 12.9253 16.062 14.3496 15.0706 14.9262L12.5129 16.4138C11.893 16.7744 11.8425 17.6651 12.4177 18.0957L15.2191 20.1935C16.1399 20.8829 16.0585 22.3091 15.0655 22.8853L12.3054 24.4871C12.0871 24.6137 11.8158 24.4532 11.8158 24.1975V24.1142C11.8158 23.7629 11.6526 23.4322 11.3757 23.2225L8.70658 21.2019C7.79076 20.5085 7.8776 19.0854 8.87067 18.5128L11.4004 17.0542C12.0204 16.6967 12.0754 15.8086 11.5044 15.3747L8.70099 13.2442C7.78717 12.5498 7.87547 11.1283 8.86795 10.5566Z"
                    fill="#075A5A"
                  />
                </svg>
              </IconGroup>
            </CompaginVolume>
          </CompaginWrap>
        </div>
      </StyledDetail>

      <DappTitle>
        <span className="highlight">20</span> dApps on Mode
      </DappTitle>
      <StyledCategory>
        {categoryList.map((cate: any) => (
          <StyledCategoryItem
            key={cate.key}
            $colorRgb={cate.colorRgb}
            className={currentCategory?.key === cate.key ? 'selected' : ''}
            onClick={() => handleCurrentCategory(cate)}
          >
            {cate.value} {cate.label}
          </StyledCategoryItem>
        ))}
      </StyledCategory>
      <DappList
        style={{
          width: '1247px',
          margin: '30px auto 0',
        }}
        // network={currentChain.chainId}
        // sort={sort}
        // rewardNow={rewardNow}
        category={category}
        bp={{ detail: '10011-001', dapp: '10011-002' }}
      />
      {/* <Dapps dapps={hotDapps} chainName={currentChain.title} /> */}

      {/* <Quests quests={quests} /> */}
    </StyledContainer>
  );
};

export default memo(ChainDetail);
