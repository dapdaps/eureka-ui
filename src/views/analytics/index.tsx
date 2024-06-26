import { useInterval } from 'ahooks';
import { differenceInDays, format } from 'date-fns';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import useTokensAndChains from '@/components/Bridge/hooks/useTokensAndChains';
import Loading from '@/components/Icons/Loading';
import { QUEST_PATH } from '@/config/quest';
import { formatThousandsSeparator } from '@/utils/format-number';
import { AUTH_TOKENS, get, post } from '@/utils/http';

import {
  AreaChart,
  BarChartChains,
  BarChartUsers,
  PieChartAnnular,
  PieChartSector,
  SimpleSelect,
  VerticalBarChart,
} from './components';
import * as Styles from './styles';

interface IProps {}

const Dashboard: FC<IProps> = ({}) => {
  const router = useRouter();
  const { chains } = useTokensAndChains();
  delete chains['1'];
  const [chainsList, setChainsList] = useState<any>([]);

  const [summaryData, setSummaryData] = useState([
    {
      type: 'time',
      title: 'Days since Launch',
      count: 0,
      increase: 0,
      icon: '/images/dashboard/time.svg',
      txt: 'Launched on Feb 17, 2024',
    },
    {
      type: 'people',
      title: 'Total User',
      count: 0,
      increase: 0,
      icon: '/images/dashboard/people.svg',
      txt: 'in last 24 hours',
    },
    {
      type: 'polyline',
      title: 'Transaction on chain',
      count: 0,
      increase: 0,
      icon: '/images/dashboard/polyline.svg',
      txt: 'in last 24 hours',
    },
    {
      type: 'cube',
      title: 'Online dApps',
      count: 0,
      increase: 0,
      icon: '/images/dashboard/cube.svg',
      txt: 'in last 7 days',
    },
  ]);

  const [userData, setUserData] = useState([]);
  const [userDataRange, setUserDataRange] = useState('');
  const [areaData, setAreaData] = useState<any>([]);
  const [chainsData, setChainsData] = useState([]);
  const [usersData, setUsersData] = useState<any>([]);
  const [tradingData, setTradingData] = useState([]);
  const [ptsData, setPtsData] = useState({
    total_quest_execution: 0,
    total_quest_execution_7day: 0,
    total_users: 0,
    total_users_7day: 0,
  });
  const [currentChainId, setCurrentChainId] = useState<any>();
  const [questData, setQuestData] = useState([]);
  const [rewardData, setRewardData] = useState([]);
  const [dappData, setDappData] = useState([]);
  const [fresh, setFresh] = useState(0);
  const [loading, setLoading] = useState(false);

  const goHome = () => {
    router.push('/');
  };
  const DAPP_ICONS = {
    Bridge: '/images/dashboard/dapp-bridge.svg',
    Swap: '/images/dashboard/dapp-swap.svg',
    Lending: '/images/dashboard/dapp-lending.svg',
    Liquidity: '/images/dashboard/dapp-liquidity.svg',
  };
  useEffect(() => {
    const array = Object.values(chains).map((item: any) => ({ ...item, label: item.chainName, value: item.chainId }));

    const lienaObj = array.find((item: any) => item.chainId === 59144);
    const lienaIndex = array.findIndex((item: any) => item.chainId === 59144);

    array.splice(lienaIndex, 1);
    array.unshift(lienaObj);

    setChainsList([
      {
        groupLabel: '',
        groupItems: array,
      },
    ]);

    setCurrentChainId(chainsList[0]?.groupItems[0]?.chainId);
  }, [chains]);

  useEffect(() => {
    setLoading(true);
    fetchSummaryData();
    fetchQuestData();
    fetchDailyUser();
    if (currentChainId) {
      fetchChainsData();
    }
  }, [fresh]);

  useEffect(() => {
    if (currentChainId) {
      fetchChainsData();
    }
  }, [currentChainId]);

  const [formatedDate, setFormatedDate] = useState(formatDate());

  function formatDate() {
    // 23 February, 2024 | Friday 20 : 46 PM
    return format(new Date(), 'd MMMM, yyyy | EEEE HH : mm a');
  }
  useInterval(() => {
    setFormatedDate(formatDate());
  }, 1000 * 60);

  async function fetchQuestData() {
    try {
      const res = await get(`${QUEST_PATH}/api/dashboard/quest`);

      if ((res.code as number) !== 0) return;
      setLoading(false);
      makeQuestData(res.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  async function fetchChainsData() {
    try {
      const res = await get(`${QUEST_PATH}/api/dashboard/dapps?chain_id=${currentChainId}`);

      if ((res.code as number) !== 0) return;
      setLoading(false);

      const _dappData = res.data.map((item: any) => ({
        ...item,
        name: item.template,
        total_trading_value: +Number(item.total_trading_value).toFixed(2),
      }));

      setDappData(_dappData.sort((a: any, b: any) => b.total_trading_value - a.total_trading_value));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  async function fetchDailyUser() {
    try {
      const res = await get(`${QUEST_PATH}/api/dashboard/daily/user`);

      if ((res.code as number) !== 0) return;
      const reversed = res.data.reverse();
      setUsersData(res.data);
      // setLoading(false);
      // makeQuestData(res.data);
    } catch (error) {
      // setLoading(false);
      console.log(error);
    }
  }
  const renderTitle = (value: string) => {
    switch (value) {
      case '500':
        return '<500';
      case '2000':
        return '500-2k';
      case '10000':
        return '2k-10k';
      case '100000':
        return '10k-100k';
      case '1000000':
        return '100k-1000k';
      case 'more':
        return '>1000k';
    }
  };
  function makeQuestData(data: any) {
    const {
      hot_quests,
      reward_distribution,
      total_quest_execution,
      total_quest_execution_7day,
      total_users,
      total_users_7day,
    } = data;
    setQuestData(hot_quests);
    setPtsData({
      total_quest_execution,
      total_quest_execution_7day,
      total_users,
      total_users_7day,
    });
    const _rewardData = reward_distribution.map((item: any) => ({
      ...item,
      name: renderTitle(item.type),
      Users: item.total,
    }));
    setRewardData(_rewardData.sort((a: any, b: any) => a.id - b.id));
  }
  async function fetchSummaryData() {
    try {
      const res = await get(`${QUEST_PATH}/api/dashboard/data`);

      if ((res.code as number) !== 0) return;
      setLoading(false);
      makeSummaryData(res.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  function makeSummaryData(data: any) {
    const { summary, user_data, user_area, chain_data, trading_data } = data;

    const { last24_transactions, last24_users, total_dapps_7day, total_online_dapps, total_transactions, total_users } =
      summary;

    const temp = [...summaryData];

    const startDate = new Date('2024-02-17');
    const endDate = new Date();
    const daysBetween = differenceInDays(endDate, startDate);

    temp[0].count = daysBetween + 1;
    temp[1].count = total_users;
    temp[1].increase = last24_users;
    temp[2].count = total_transactions;
    temp[2].increase = last24_transactions;
    temp[3].count = total_online_dapps;
    temp[3].increase = total_dapps_7day;
    setSummaryData(temp);

    const startTime = format(user_data[0]?.date_time_second * 1000, 'yyyy/MM/d');
    const endTime = format(user_data[user_data.length - 1]?.date_time_second * 1000, 'yyyy/MM/d');
    setUserDataRange(`${startTime} - ${endTime}`);

    const _userData = user_data.map((item: any) => ({
      // name: format(item.date_time_second * 1000, 'd MMM'),
      name: format(item.date_time_second * 1000, 'd'),
      date: format(item.date_time_second * 1000, 'd,MMM yyyy'),
      Users: item.total_users,
    }));

    setUserData(_userData);

    const _areaData = user_area.map((item: any) => ({
      name: item.country_name,
      total: item.total,
      percent: item.percent,
    }));
    const _normal = _areaData.filter((item: any) => item.percent >= 2);
    const _others = _areaData.filter((item: any) => item.percent < 2);
    const _othersTotal = _others.reduce((accu: number, curr: any) => accu + curr.total, 0);
    const _othersPercent = _others.reduce((accu: number, curr: any) => accu + curr.percent, 0);
    const _othersCountry = {
      name: 'Others',
      total: _othersTotal,
      percent: Number(_othersPercent).toFixed(2),
    };
    // console.log('others:', _othersCountry);

    // console.log('_normal', _normal);
    // console.log('_others', _others);

    setAreaData([..._normal, _othersCountry]);

    const _chainsData = chain_data
      .filter((item: any) => item.total_users > 0 && item.total_trading_value > 0)
      .map((item: any) => ({
        name: item.name,
        logo: item.logo,
        total_trading_value: +Number(item.total_trading_value).toFixed(2),
        // total_trading_value: formatThousandsSeparator(+Number(item.total_trading_value).toFixed(2)),
        total_users: item.total_users,
      }));
    setChainsData(_chainsData);

    const _tradingData = trading_data.map((item: any) => ({
      ...item,
      icon: (DAPP_ICONS as any)[item.action_type],
    }));

    const _tradingDataSort = [
      _tradingData.find((item: any) => item.action_type === 'Bridge'),
      _tradingData.find((item: any) => item.action_type === 'Swap'),
      _tradingData.find((item: any) => item.action_type === 'Lending'),
      _tradingData.find((item: any) => item.action_type === 'Liquidity'),
    ];
    setTradingData(_tradingDataSort as any);
  }
  const goQuest = (id: number) => {
    window.open(`${window.location.origin}/quest/detail?id=${id}`);
  };

  return (
    <Styles.ContainerBg>
      <Styles.Container>
        <Styles.MainTitle>
          Dashboard
          <Styles.MainExtra>
            <Styles.MainDate>{formatedDate}</Styles.MainDate>

            <Styles.Button
              $fz="16px"
              $width="116px"
              $height="48px"
              $color="#ebf479"
              $backgroundHover="#EBF479"
              $colorHover="#000"
              onClick={() => setFresh((n) => n + 1)}
            >
              {loading ? <Loading size={18} /> : 'Refresh'}
            </Styles.Button>
          </Styles.MainExtra>
        </Styles.MainTitle>
        <Styles.Summary>
          {summaryData.map((item) => (
            <Styles.SummaryItem key={item.type}>
              <Styles.SummaryBg></Styles.SummaryBg>
              <Styles.SummaryHead>
                <Styles.SummaryLeft>
                  <Styles.SummaryTitle>{item.title}</Styles.SummaryTitle>
                  <Styles.SummaryCount>{formatThousandsSeparator(item.count || 0)}</Styles.SummaryCount>
                </Styles.SummaryLeft>
                <Styles.SummaryRight className={item.type}>
                  <Styles.SummaryIcon src={item.icon} />
                </Styles.SummaryRight>
              </Styles.SummaryHead>
              <Styles.SummaryFoot>
                {item.type !== 'time' ? <Styles.White>+{item.increase} </Styles.White> : null}
                {item.txt}
              </Styles.SummaryFoot>
            </Styles.SummaryItem>
          ))}
        </Styles.Summary>
        <Styles.SubTitle>$PTS Data</Styles.SubTitle>
        <Styles.PtsWrap>
          <Styles.PtsLeft>
            <Styles.PtsItem>
              <Styles.PtsTitle>Quests Participants</Styles.PtsTitle>
              <Styles.PtsTotal>{formatThousandsSeparator(ptsData.total_users)}</Styles.PtsTotal>
              <Styles.PtsFoot>
                <Styles.PtsWhite>+{formatThousandsSeparator(ptsData.total_users_7day)}</Styles.PtsWhite> new
                participants in last 7 days
              </Styles.PtsFoot>
            </Styles.PtsItem>
            <Styles.PtsItem>
              <Styles.PtsTitle>Quests Completion Times</Styles.PtsTitle>
              <Styles.PtsTotal>{formatThousandsSeparator(ptsData.total_quest_execution)}</Styles.PtsTotal>
              <Styles.PtsFoot>
                <Styles.PtsWhite>+{formatThousandsSeparator(ptsData.total_quest_execution_7day)}</Styles.PtsWhite>{' '}
                quests completion in last 7 days
              </Styles.PtsFoot>
            </Styles.PtsItem>
          </Styles.PtsLeft>
          <Styles.PtsRight>
            <Styles.UsersTotalTitle>
              <Styles.Title>$PTS Distribution</Styles.Title>
            </Styles.UsersTotalTitle>
            <Styles.PieWrap>
              <PieChartSector data={rewardData} />
            </Styles.PieWrap>
          </Styles.PtsRight>
        </Styles.PtsWrap>
        <Styles.SubTitle>Users Data</Styles.SubTitle>
        <Styles.UsersDataWrap>
          <Styles.UsersTotal>
            <Styles.UsersTotalTitle>
              <Styles.Title>News Users</Styles.Title>
              <Styles.Intro>{userDataRange}</Styles.Intro>
              {/* <Styles.Intro>2024/02/17-2024/03/17</Styles.Intro> */}
            </Styles.UsersTotalTitle>
            {userData.length ? <AreaChart data={userData} /> : null}
          </Styles.UsersTotal>

          <Styles.UsersArea>
            <Styles.UsersTotalTitle>
              <Styles.Title>Users Area</Styles.Title>
            </Styles.UsersTotalTitle>
            <PieChartAnnular data={areaData} />
          </Styles.UsersArea>
        </Styles.UsersDataWrap>
        <Styles.UsersWrap>
          <Styles.UsersTotalTitle>
            <Styles.Title>Daily Active Addresses & IP</Styles.Title>
            <Styles.Intro>
              {format(usersData[0]?.date * 1000 || 0, 'yyyy/MM/dd')}-
              {format(usersData[usersData?.length - 1]?.date * 1000 || 0, 'yyyy/MM/dd')}
            </Styles.Intro>
          </Styles.UsersTotalTitle>
          <BarChartUsers data={usersData} />
        </Styles.UsersWrap>
        <Styles.SubTitle>Chains & dApps Data</Styles.SubTitle>
        <Styles.ChainsWrap>
          <Styles.UsersTotalTitle>
            <Styles.Title>Users & Trading Volume</Styles.Title>
            <Styles.Intro>{format(new Date(), 'yyyy/MM/dd')}</Styles.Intro>
          </Styles.UsersTotalTitle>
          <BarChartChains data={chainsData} />
        </Styles.ChainsWrap>

        <Styles.DappsWrap>
          <Styles.DappsLeft>
            <Styles.DappTitle>
              <Styles.Title>Top dApps Trading Volume</Styles.Title>
              <SimpleSelect
                data={chainsList}
                onChange={(chainId) => {
                  setCurrentChainId(chainId);
                }}
              />
            </Styles.DappTitle>
            {dappData.length ? <VerticalBarChart data={dappData} /> : null}
          </Styles.DappsLeft>
          <Styles.DappsRight>
            {tradingData.map((item: any) => (
              <Styles.TradingBox key={item.id}>
                <Styles.TradingBg className="trading-bg" src="/images/dashboard/bg-yellow.png"></Styles.TradingBg>
                <Styles.TradingType>
                  <Styles.TradingIcon src={item.icon} />
                  {item.action_type}
                </Styles.TradingType>
                <Styles.TradingValue>
                  $ {formatThousandsSeparator(+Number(item.total_trading_value).toFixed(2))}
                </Styles.TradingValue>
              </Styles.TradingBox>
            ))}
          </Styles.DappsRight>
        </Styles.DappsWrap>

        {/* https://recharts.org/zh-CN/examples/PieChartWithPaddingAngle */}
        <Styles.SubTitle>Hot Quests</Styles.SubTitle>
        <Styles.QuestWrap>
          <Styles.GridHeader>
            <Styles.HeadItem style={{ textAlign: 'left', paddingLeft: 35 }}>Quest name</Styles.HeadItem>
            <Styles.HeadItem>#social</Styles.HeadItem>
            <Styles.HeadItem>Onlie Date</Styles.HeadItem>
            <Styles.HeadItem>Participants</Styles.HeadItem>
            <Styles.HeadItem>$PTS</Styles.HeadItem>
            <Styles.HeadItem>Source</Styles.HeadItem>
          </Styles.GridHeader>
          <Styles.GridBody>
            {questData.map((item: any) => (
              <Styles.GridRow key={item.id}>
                <Styles.GridCol style={{ justifyContent: 'start', paddingLeft: 35 }} title={item.name}>
                  <Styles.Ellipsis>{item.name}</Styles.Ellipsis>
                </Styles.GridCol>
                <Styles.GridCol className={`${item.type}-type`}>#{item.type}</Styles.GridCol>
                <Styles.GridCol>{format(item.online_date, 'd MMM yyyy')}</Styles.GridCol>
                <Styles.GridCol>{formatThousandsSeparator(item.total_users)}</Styles.GridCol>
                <Styles.GridCol>{item.reward}</Styles.GridCol>
                <Styles.GridCol>
                  <Styles.Button
                    $fz="16px"
                    $width="198px"
                    $height="50px"
                    $color="#ebf479"
                    $backgroundHover="#EBF479"
                    $colorHover="#000"
                    style={{ margin: '0 auto' }}
                    onClick={(e) => goQuest(item.id)}
                  >
                    <Styles.Ellipsis>{item.source}</Styles.Ellipsis>
                  </Styles.Button>
                </Styles.GridCol>
              </Styles.GridRow>
            ))}
          </Styles.GridBody>
        </Styles.QuestWrap>
        <Styles.Foot>
          <Styles.Button
            $fz="18px"
            $width="300px"
            $height="60px"
            $background="#EBF479"
            $backgroundHover="#EBF479"
            onClick={goHome}
          >
            Go to DapDap
          </Styles.Button>
        </Styles.Foot>
        <Styles.Explore>Explore more Function...</Styles.Explore>
      </Styles.Container>
    </Styles.ContainerBg>
  );
};

export default memo(Dashboard);
