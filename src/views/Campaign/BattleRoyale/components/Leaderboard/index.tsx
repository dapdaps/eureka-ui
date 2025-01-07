import Big from 'big.js';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

import Empty from '@/components/Empty';
import Popover, { PopoverPlacement, PopoverTrigger } from '@/components/popover';
import useAccount from '@/hooks/useAccount';
import { ellipsAccount } from '@/utils/account';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';

import { useDetailStore } from '../../hooks/useDetailStore';
import useRank from '../../hooks/useRank';
import Pagination from '../Pagination';

const StyledRankRect = styled.div`
  width: 8px;
  height: 6px;
  border-radius: 18px;
  border: 1px solid #134370;
  background: #12aaff;
  box-shadow:
    0px 9px 7.6px 0px rgba(255, 255, 255, 0.25) inset,
    0px 0px 10px 0px rgba(18, 170, 255, 0.8);
`;

const Leaderboard = () => {
  const { ranks, userRank, loading } = useRank();
  const [currentPage, setCurrentPage] = useState(1);
  const { account } = useAccount();
  const itemsPerPage = 10;

  const getCurrentPageData = () => {
    if (!ranks || ranks.length === 0) return [];
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return ranks.slice(start, end);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const COLUMN_LIST = [
    {
      key: 'rank',
      label: 'RANK',
      width: '20%',
      render(data: any, index: number) {
        const rank = data.rank;
        return (
          <div className="w-[60px] flex items-center justify-center">
            {rank < 4 ? (
              <div className={['relative', rank === 3 ? 'w-[38px]' : 'w-[32px]'].join(' ')}>
                <img
                  src={'/images/campaign/battle-royale/rank-sort-' + rank + '.svg'}
                  className="w-full h-full"
                  alt="sort"
                />
              </div>
            ) : (
              <div className=" flex justify-center text-white">{rank}</div>
            )}
          </div>
        );
      }
    },
    {
      key: 'address',
      label: 'ADDRESS',
      width: '55%',
      render(data: any) {
        return <div className="text-white font-Montserrat font-semibold">{ellipsAccount(data?.account?.address)}</div>;
      }
    },
    {
      key: 'volume',
      label: 'TRADING VOLUME',
      width: '25%',
      textAlign: 'right',
      render(data: any) {
        const nftHolderBoost = new Big(data.trading_volume).minus(data.actual_trading_volume);
        const showBoost = nftHolderBoost.gt(0);

        return (
          <div className="text-white font-Montserrat font-semibold text-right flex items-center justify-end gap-1">
            <div>
              {formateValueWithThousandSeparatorAndFont(data.trading_volume, 1, true, {
                prefix: '$',
                isShort: true
              })}
            </div>
            {showBoost && (
              <Popover
                trigger={PopoverTrigger.Hover}
                placement={PopoverPlacement.BottomRight}
                contentClassName={`backdrop-blur-[10px]`}
                content={
                  <div
                    className="w-[314px] px-[12px] py-[18px] bg-[#1F2229] rounded-xl border border-[#333648]"
                    style={{
                      boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.25)'
                    }}
                  >
                    <div className="flex font-Montserrat text-white w-full justify-between items-center">
                      <div>Actual trading volume</div>
                      <div>
                        {formateValueWithThousandSeparatorAndFont(data.actual_trading_volume, 1, true, {
                          prefix: '$',
                          isShort: true
                        })}
                      </div>
                    </div>
                    <div className="flex font-Montserrat text-white w-full justify-between items-center mt-[10px]">
                      <div>Additional boost</div>
                      <div>
                        {formateValueWithThousandSeparatorAndFont(nftHolderBoost.toString(), 1, true, {
                          prefix: '$',
                          isShort: true
                        })}
                      </div>
                    </div>
                  </div>
                }
              >
                <div className="px-[6px] py-[2px] rounded-[6px] text-black bg-[#12AAFF] text-[12px] font-Montserrat font-bold">
                  Boost
                </div>
              </Popover>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <div className="mt-[-480px] mx-auto w-[1000px] h-[934px] rounded-[12px] bg-[#1E2028] border border-[#373A53]">
      <div className="-mx-[1px]">
        <div className="-mt-[35px] bg-[url('/images/campaign/battle-royale/rank-bg-1.svg')] bg-no-repeat bg-center">
          <div className="pl-[38px] h-[91px] flex items-center gap-[16px]">
            <div className="font-Burial text-[46px] text-gradient">Climb to </div>
            <div className="text-[#33B6FF] text-shadow font-Burial text-[46px]">Top 100</div>
          </div>
        </div>

        <div className="bg-[url('/images/campaign/battle-royale/rank-bg-2.svg')] bg-no-repeat bg-center">
          <div className="pr-[41px] h-[91px] flex items-center justify-end">
            <div className="mr-[8px] font-Burial text-[46px] text-gradient">Win</div>
            <div className="text-[#33B6FF] text-shadow font-Burial text-[46px] font-bold">$40,000</div>
            <div className="mx-[20px] w-[40px]">
              <img src="/images/campaign/battle-royale/reward.png" className="aspect-square w-full" alt="" />
            </div>
            <div className="font-Burial text-[46px] text-gradient">Rewards</div>
          </div>
        </div>

        <div className="flex items-center pt-[30px] pr-[41px] pl-[55px] pb-[19px]">
          {COLUMN_LIST?.map((column: any) => (
            <div
              key={column?.key}
              className="text-[#979ABE] text-[20px] font-Montserrat font-semibold"
              style={{ width: column.width, textAlign: column?.textAlign ?? 'left' }}
            >
              {column?.label}
            </div>
          ))}
        </div>

        <div className="h-[520px] bg-[#262836] border border-[#373A53]">
          {getCurrentPageData()?.length > 0 ? (
            getCurrentPageData()?.map((data: any, index: number) => (
              <div
                key={index}
                className="pr-[41px] pl-[55px] cursor-pointer flex items-center h-[52px] hover:bg-white/[0.05]"
              >
                {COLUMN_LIST?.map((column: any) => (
                  <div key={`${index}|${column?.key}`} style={{ width: column?.width }}>
                    {column?.render && column.render(data, index)}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <Empty
              tips="No data"
              size={48}
              style={{
                height: '520px'
              }}
            />
          )}
        </div>
        {getCurrentPageData()?.length > 0 && (
          <div className="pt-[25px] flex items-center justify-end">
            <Pagination
              totalItems={ranks?.length || 0}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {userRank && (
          <div className="mx-auto w-[932px] h-[110px] bg-[url('/images/campaign/battle-royale/rank-bg-3.svg')] bg-no-repeat bg-center">
            <div className="pt-[19px] pl-[21px] text-[#979ABE] font-Montserrat text-[20px] font-semibold uppercase">
              Your Current Rank
            </div>
            <div className="mt-[28px] flex items-center pl-[21px] pr-[31px]">
              <div className="flex items-center gap-[14px]" style={{ width: COLUMN_LIST[0].width }}>
                <StyledRankRect />
                <div className="text-white font-Montserrat text-[16px] font-medium">Rank #{userRank.rank}</div>
              </div>
              <div
                className="text-white font-Montserrat text-[16px] font-medium"
                style={{ width: COLUMN_LIST[1].width }}
              >
                {account ? account.substring(0, 6) + '...' + account.slice(-4) : '-'}
              </div>
              <div
                className="text-right text-white font-Montserrat text-[16px] font-medium"
                style={{ width: COLUMN_LIST[2].width }}
              >
                {formateValueWithThousandSeparatorAndFont(userRank.trading_volume, 1, true, {
                  prefix: '$',
                  isShort: true
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
