import axios from 'axios';
import Big from 'big.js';
import { addDays, format, isAfter, isBefore, isEqual, parseISO } from 'date-fns';
import { utils } from 'ethers';
import { useEffect, useMemo, useState } from 'react';

import Modal from '@/components/Modal';
import chainCofig from '@/config/chains';
import multicallConfig from '@/config/contract/multicall';
import useAccount from '@/hooks/useAccount';
import useSwitchChain from '@/hooks/useSwitchChain';
import Chains from '@/modules/staking/Teahouse/EasyEarn/Chains';
import DepositModal from '@/modules/staking/Teahouse/EasyEarn/Deposit';
import WithdrawModal from '@/modules/staking/Teahouse/EasyEarn/Withdraw';
import { usePriceStore } from '@/stores/price';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import { get } from '@/utils/http';
import { getUTCTime } from '@/utils/utc';

/** @name UTC
/ * Monday 5:00 to Tuesday 5:00
/ * Wednesday 5:00 to Thursday 5:00
/ * Friday 5:00 to Saturday 5:00
  */
const AvailableUTCTimeslots = [
  { start: { week: 1, time: '5:00:00' }, end: { week: 2, time: '5:00:00' } },
  { start: { week: 3, time: '5:00:00' }, end: { week: 4, time: '5:00:00' } },
  { start: { week: 5, time: '5:00:00' }, end: { week: 6, time: '5:00:00' } }
];

const APR_LIST: any = {
  WBTC: '1.3~2.8',
  ETH: '5.5~8.3',
  USDC: '8.7~10.2',
  USDT: '10.2~12.7'
};

const TeahouseEasyEarn = (props: any) => {
  const { localConfig } = props;
  const dexConfig = { ...localConfig.basic, networks: localConfig.networks };

  const prices = usePriceStore((store) => store.price);
  const { account, provider, chainId } = useAccount();
  const { switching, switchChain } = useSwitchChain();

  const { easyEarn } = dexConfig;

  const { pools, shareInfoApi, lockedList = [] } = easyEarn;
  const _tokenList: any = [];
  const _shareInfoList: any = [];
  const _chainList: any = [];
  for (const _chainId in pools) {
    const chainId = +_chainId;
    // @ts-ignore
    const currChain = chainCofig[chainId];
    _chainList.push(currChain);
    const multicallAddress = multicallConfig[currChain.chainId];
    const _pools = pools[chainId];
    Object.values(_pools).forEach((pool: any) => {
      const tokenIdx = _tokenList.findIndex((token: any) => token.symbol === pool.token.symbol);
      if (tokenIdx < 0) {
        const locked = lockedList.includes(pool.token.symbol);
        _tokenList.push({
          icon: pool.token.icon,
          symbol: pool.token.symbol,
          locked,
          chainList: [
            {
              ...currChain,
              multicallAddress,
              pool
            }
          ]
        });
        _shareInfoList.push({
          address: pool.address,
          request: axios.get(shareInfoApi({ account, chainId, address: pool.address }))
        });
        return;
      }
      _tokenList[tokenIdx].chainList.push({
        ...currChain,
        multicallAddress,
        pool
      });
      _shareInfoList.push({
        address: pool.address,
        request: axios.get(shareInfoApi({ account, chainId, address: pool.address }))
      });
    });
  }

  const [depositVisible, setDepositVisible] = useState(false);
  const [withdrawVisible, setWithdrawVisible] = useState(false);
  const [data, setData] = useState<any>({});
  const [currentTime, setCurrentTime] = useState<any>();
  const [tokenList, setTokenList] = useState<any>([]);
  const [shareInfoList, setShareInfoList] = useState<any>([]);
  const [currentChain, setCurrentChain] = useState<any>();

  const available = useMemo(() => {
    if (!currentTime) return false;
    const currentUTCTime = new Date(getUTCTime(currentTime));
    let currentUTCWeek: number = currentTime.getUTCDay();
    if (currentUTCWeek === 0) currentUTCWeek = 7;

    let _available = false;
    for (const slot of AvailableUTCTimeslots) {
      const startTime = new Date(currentUTCTime);
      const endTime = new Date(currentUTCTime);
      if (currentUTCWeek === slot.start.week) {
        const [h, m, s] = slot.start.time.split(':');
        startTime.setHours(+h);
        startTime.setMinutes(+m);
        startTime.setSeconds(+s);
        endTime.setHours(24);
        endTime.setMinutes(0);
        endTime.setSeconds(0);
      }
      if (currentUTCWeek === slot.end.week) {
        const [h, m, s] = slot.end.time.split(':');
        startTime.setHours(0);
        startTime.setMinutes(0);
        startTime.setSeconds(0);
        endTime.setHours(+h);
        endTime.setMinutes(+m);
        endTime.setSeconds(+s);
      }
      if ([slot.start.week, slot.end.week].includes(currentUTCWeek)) {
        if (
          (isAfter(currentUTCTime, startTime) || isEqual(currentUTCTime, startTime)) &&
          (isBefore(currentUTCTime, endTime) || isEqual(currentUTCTime, endTime))
        ) {
          _available = true;
          break;
        }
      }
    }

    return _available;
  }, [currentTime]);

  const currentUntilTime = useMemo(() => {
    if (!currentTime) return '';
    const currentUTCTime = new Date(getUTCTime(currentTime));
    const currentUTCWeek: number = currentTime.getUTCDay();
    for (const slot of AvailableUTCTimeslots) {
      if (currentUTCWeek <= slot.start.week) {
        const days = slot.start.week - currentUTCWeek;
        const until = addDays(currentUTCTime, days);
        const [h, m, s] = slot.start.time.split(':');
        until.setHours(+h);
        until.setMinutes(+m);
        until.setSeconds(+s);
        const localTime = new Date(format(until, 'yyyy-MM-dd HH:mm:ss') + '.000Z');
        return format(localTime, 'yyyy-MM-dd HH:mm');
      }
    }
    return '';
  }, [currentTime]);

  const chainAvailable = useMemo(() => {
    if (!account) return false;
    if (!Object.keys(pools).includes(chainId + '')) return false;
    return true;
  }, [account, chainId]);

  const handleDeposit = (token: any) => {
    setData(token);
    setDepositVisible(true);
  };

  const handleWithdraw = (token: any) => {
    setData(token);
    setWithdrawVisible(true);
  };

  const handleClose = () => {
    setDepositVisible(false);
    setWithdrawVisible(false);
    setData({});
    getManaged();
  };

  const getManaged = async () => {
    axios
      .get('https://vault-api.teahouse.finance/vaults/type/managed')
      .then((res: any) => {
        if (res.status !== 200 || !res.data?.vaults) {
          return;
        }
        const __tokenList = _tokenList.slice();
        __tokenList.forEach((token: any) => {
          token.tvl = 0;
          token.tvlUsd = 0;
          token.aprList = [];
          token.chainList.forEach((item: any) => {
            const currPool = res.data?.vaults.find(
              (it: any) => it.address.toLowerCase() === item.pool.address.toLowerCase()
            );
            if (!currPool) return;
            // item.price = utils.formatUnits(currPool.latestInfo.shareTokenPrice || '1', 18);
            item.price = prices?.[item.pool.token.symbol] ?? '1';

            item.apr = utils.formatUnits(currPool.latestInfo.shareTokenApr || '0', 4);
            token.aprList.push(Big(item.apr).abs());

            item.tvl = utils.formatUnits(currPool.latestInfo.tvl || '0', currPool.assetDecimals);
            item.tvlUsd = Big(item.tvl).times(item.price);
            token.tvl = Big(token.tvl).plus(item.tvl);
            token.tvlUsd = Big(token.tvlUsd).plus(item.tvlUsd);
          });
          token.tvlShown = formateValueWithThousandSeparatorAndFont(token.tvl, 2, true, {
            isShort: true,
            isZeroPrecision: true
          });
          token.tvlUsd = formateValueWithThousandSeparatorAndFont(token.tvlUsd, 2, true, {
            isShort: true,
            isZeroPrecision: true,
            prefix: '$'
          });
          // token.apr = Big(token.aprList.reduce((a: any, b: any) => Big(a).plus(b), 0)).toFixed(2);
          token.apr = APR_LIST[token.symbol];
        });
        setTokenList(__tokenList);
      })
      .catch((err: any) => {
        console.log('getManaged failed: %o', err);
        setTokenList(_tokenList);
      });
  };

  const handleCurrentChain = (chain: any) => {
    if (switching) return;
    setCurrentChain(chain);
    switchChain({
      chainId: `0x${Number(chain.chainId).toString(16)}`
    });
  };

  const getServerTime = () => {
    get('/api/timestamp')
      .then((res: any) => {
        if (res.code !== 0) {
          console.log('get server time failed: %o', res.msg);
          setCurrentTime(new Date());
          return;
        }
        setCurrentTime(new Date(res.data.timestamp * 1000));
      })
      .catch((err: any) => {
        console.log('get server time failed: %o', err);
        setCurrentTime(new Date());
      });
  };

  useEffect(() => {
    if (!account) return;
    Promise.all(_shareInfoList.map((it: any) => it.request)).then((res: any) => {
      const __shareInfoList = _tokenList.slice();
      __shareInfoList.forEach((token: any) => {
        token.assetsAmount = Big(0);
        token.assetsValue = Big(0);
        token.chainList.forEach((item: any) => {
          const idx = _shareInfoList.findIndex(
            (it: any) => it.address.toLowerCase() === item.pool.address.toLowerCase()
          );
          if (idx < 0 || !res[idx].data?.shareInfo) return;
          token.assetsAmount = Big(token.assetsAmount).plus(
            utils.formatUnits(res[idx].data.shareInfo.amount, item.pool.decimals) || 0
          );
          token.assetsValue = Big(token.assetsValue).plus(
            utils.formatUnits(res[idx].data.shareInfo.value, item.pool.token.decimals) || 0
          );
        });
      });
      setShareInfoList(__shareInfoList);
    });
  }, [account]);

  useEffect(() => {
    getServerTime();
    const timer = setInterval(() => {
      getServerTime();
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    getManaged();
  }, [prices]);

  return (
    <div className="w-[1076px] flex items-stretch justify-between gap-[12px] flex-wrap">
      {tokenList.map((it: any, index: number) => (
        <div
          key={it.symbol}
          className="w-[260px] h-[254px] relative border border-[#373A53!important] rounded-[16px] bg-[#33364b]"
        >
          <div className="w-full absolute left-0 top-0 px-[16px] pt-[16px] pb-[14px] rounded-[16px] border-b border-[#373A53!important] bg-[#262836]">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-[6px]">
                <img className="w-[36px] h-[36px]" src={it.icon} alt="" />
                <div className="text-white text-[16px] font-[500]">{it.symbol}</div>
              </div>
              <div className="flex items-center gap-[6px] justify-end">
                {it.chainList.map((c: any) => (
                  <img key={c.chainId} className="w-[20px] h-[20px] rounded-[4px]" src={c.icon} alt="" />
                ))}
              </div>
            </div>
            <div className="flex justify-between items-start mt-[26px]">
              <div className="flex flex-col gap-[5px] leading-[1]">
                <div className="text-[#979ABE] text-[14px] font-[400]">APR%</div>
                <div className="text-white text-[20px] font-[700]">{it.apr}%</div>
              </div>
              <div className="flex flex-col gap-[5px] leading-[1]">
                <div className="text-[#979ABE] text-[14px] font-[400]">AUM</div>
                <div className="text-white text-[20px] font-[700]">{it.tvlShown}</div>
                <div className="text-white text-[12px] font-[400] mt-[-3px]">{it.tvlUsd}</div>
              </div>
            </div>
            <div className="flex justify-between items-start gap-[10px] mt-[20px]">
              <button
                type="button"
                className="flex-1 h-[40px] rounded-[8px] bg-[#B4E9CB] border border-solid border-[#B4E9CB!important] text-center leading-[38px] text-black text-[16px] font-[600]"
                onClick={() => handleDeposit(it)}
              >
                Deposit
              </button>
              <button
                type="button"
                className="flex-1 h-[40px] rounded-[8px] bg-[#262836] border border-solid border-[#B4E9CB!important] text-center leading-[38px] text-[#B4E9CB] text-[16px] font-[600]"
                onClick={() => handleWithdraw(it)}
              >
                Withdraw
              </button>
            </div>
          </div>
          <div className="flex justify-between items-end absolute w-full bottom-[16px] left-[0] px-[16px]">
            <div className="text-[#979ABE] text-[14px] font-[400]">My Assets</div>
            <div className="text-white text-[14px] font-[600]">
              {Big(shareInfoList[index]?.assetsValue || 0).toFixed(2)}
            </div>
          </div>
        </div>
      ))}
      {data && (
        <DepositModal
          visible={depositVisible}
          onClose={handleClose}
          data={data}
          name="Teahouse Earn"
          available={available}
          untilTime={currentUntilTime}
        />
      )}
      {data && (
        <WithdrawModal
          visible={withdrawVisible}
          onClose={handleClose}
          data={data}
          name="Teahouse Earn"
          available={available}
          untilTime={currentUntilTime}
        />
      )}
      {!chainAvailable && (
        <Modal
          display={true}
          showHeader={false}
          width={370}
          portal
          content={
            <div className="px-[20px] py-[20px]">
              <div className="text-white font-[500] text-[18px] text-center">
                Please connect to the following networks
              </div>
              <Chains
                selected={currentChain}
                onSelect={handleCurrentChain}
                list={_chainList.sort((a: any, b: any) => a.chainName.localeCompare(b.chainName))}
                style={{ flexWrap: 'wrap', marginTop: 10 }}
                chainStyle={{ width: '48%', justifyContent: 'flex-start' }}
              />
            </div>
          }
        />
      )}
    </div>
  );
};

export default TeahouseEasyEarn;
