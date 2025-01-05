import styled from 'styled-components';

import { ellipsAccount } from '@/utils/account';

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
const Rank = () => {
  const COLUMN_LIST = [
    {
      key: 'rank',
      label: 'RANK',
      width: '20%',
      render(data: any, index: number) {
        const rank = index + 1;
        return rank < 4 ? (
          <div className={['relative', rank === 3 ? 'w-[36px]' : 'w-[32px]'].join(' ')}>
            <img src={'/images/campaign/battle-royale/rank-sort-' + rank + '.svg'} alt="sort" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-black font-Montserrat text-[14px] font-semibold">
              {rank}
            </span>
          </div>
        ) : (
          <div className="w-[60px] flex justify-center">{rank}</div>
        );
      }
    },
    {
      key: 'address',
      label: 'ADDRESS',
      width: '55%',
      render(data: any, index: number) {
        return <div className="text-white font-Montserrat font-semibold">{ellipsAccount(data?.address)}</div>;
      }
    },
    {
      key: 'volume',
      label: 'TRADING VOLUME',
      width: '25%',
      textAlign: 'right',
      render(data: any, index: number) {
        return <div className="text-white font-Montserrat font-semibold text-right">{data?.valume}</div>;
      }
    }
  ];
  const dataList = [
    {
      address: '0x8C7f311f5174b636Bc1849e523810b1e9a4B7a1D',
      valume: 21200000
    }
  ];
  return (
    <div className="mt-[35px] mx-auto w-[1000px] h-[934px] rounded-[12px] bg-[#1E2028] border border-[#373A53]">
      <div className="-mx-[1px]">
        <div className="-mt-[35px] bg-[url('/images/campaign/battle-royale/rank-bg-1.svg')] bg-no-repeat bg-center">
          <div className="pl-[38px] h-[91px] flex items-center gap-[16px]">
            <div className="font-Burial text-[46px] text-gradient">Climb to </div>
            <div className="text-[#33B6FF] text-shadow text-stroke-1-black font-Burial text-[46px]">Top 100</div>
          </div>
        </div>
        <div className="bg-[url('/images/campaign/battle-royale/rank-bg-2.svg')] bg-no-repeat bg-center">
          <div className="pr-[41px] h-[91px] flex items-center justify-end">
            <div className="mr-[8px] font-Burial text-[46px] text-gradient">Win</div>
            <div className="text-[#33B6FF] text-shadow text-stroke-1-black font-Burial text-[46px] font-bold">
              $40,000
            </div>
            <div className="mx-[20px] w-[40px]"></div>
            <div className="font-Burial text-[46px] text-gradient">Rewards</div>
          </div>
        </div>

        <div className="flex items-center pt-[30px] pr-[41px] pl-[55px] pb-[19px]">
          {COLUMN_LIST?.map((column: any) => {
            return (
              <div
                key={column?.key}
                className="text-[#979ABE] text-[20px] font-Montserrat font-semibold"
                style={{ width: column.width, textAlign: column?.textAlign ?? 'left' }}
              >
                {column?.label}
              </div>
            );
          })}
        </div>

        <div className="h-[520px] bg-[#262836] border border-[#373A53]">
          {dataList?.map((data: any, index: number) => (
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
          ))}
        </div>

        <div className="pt-[25px] flex items-center justify-end">
          <Pagination totalItems={20} itemsPerPage={10} currentPage={1} onPageChange={() => {}} />
        </div>

        <div className="mx-auto w-[932px] h-[110px] bg-[url('/images/campaign/battle-royale/rank-bg-3.svg')] bg-no-repeat bg-center">
          <div className="pt-[19px] pl-[21px] text-[#979ABE] font-Montserrat text-[20px] font-semibold uppercase">
            Your Current Rank
          </div>
          <div className="mt-[28px] flex items-center pl-[21px] pr-[31px]">
            <div className="flex items-center gap-[14px]" style={{ width: COLUMN_LIST[0].width }}>
              <StyledRankRect />
              <div className="text-white font-Montserrat text-[16px] font-medium">Rank #234</div>
            </div>

            <div className="text-white font-Montserrat text-[16px] font-medium" style={{ width: COLUMN_LIST[1].width }}>
              {ellipsAccount('0x8C7f311f5174b636Bc1849e523810b1e9a4B7a1D')}
            </div>
            <div
              className="text-right text-white font-Montserrat text-[16px] font-medium"
              style={{ width: COLUMN_LIST[2].width }}
            >
              $21.2K
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rank;
