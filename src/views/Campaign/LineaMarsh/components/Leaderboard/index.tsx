import Big from 'big.js';
import { useState } from 'react';

import Empty from '@/components/Empty';
import Popover, { PopoverPlacement, PopoverTrigger } from '@/components/popover';
import useAccount from '@/hooks/useAccount';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';

import useRank from '../../hooks/useRank';
import Pagination from '../Pagination';
import LeaderboardRank from './Rank';
import {
  StyledContainer,
  StyledContent,
  StyledEndTime,
  StyledLeaderboard,
  StyledPagination,
  StyledTable,
  StyledTableBody,
  StyledTableCol,
  StyledTableHeader,
  StyledTableHeaderRow,
  StyledTableRow,
  StyledTableTitle,
  StyledTips,
  StyledYours
} from './styles';
import LeaderboardUser from './User';

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

  const columns = [
    {
      title: 'Rank',
      key: 'rank',
      width: '150px',
      align: 'left',
      render: (text: string, record: any) => {
        return <LeaderboardRank rank={record.rank} />;
      }
    },
    {
      title: 'User address',
      key: 'address',
      align: 'left',
      render: (text: string, record: any) => {
        return <LeaderboardUser address={record.account.address} />;
      }
    },
    {
      title: 'Trading Volume',
      key: 'tradingVolume',
      width: '240px',
      align: 'right',
      render: (_, record: any) => {
        const nftHolderBoost = new Big(record.trading_volume).minus(record.actual_trading_volume);
        const showBoost = nftHolderBoost.gt(0);

        return (
          <div className="flex items-center gap-1">
            <div className="text-[26px]">
              {formateValueWithThousandSeparatorAndFont(record.trading_volume, 1, true, { prefix: '$', isShort: true })}
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
                        {formateValueWithThousandSeparatorAndFont(record.actual_trading_volume, 1, true, {
                          prefix: '$',
                          isShort: true
                        })}
                      </div>
                    </div>
                    <div className="flex font-Montserrat text-white w-full justify-between items-center mt-[10px]">
                      <div>NFT holder boost</div>
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
                <div className="px-[6px] py-[2px] rounded-[6px] border border-[#000] text-black bg-[#EBF479] text-[12px] font-Montserrat font-bold">
                  1.2x
                </div>
              </Popover>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <StyledLeaderboard>
      <StyledContainer>
        <StyledContent>
          <StyledTable>
            <StyledTableHeader>
              <StyledTableHeaderRow>
                {columns.map((col: any) => (
                  <StyledTableCol key={col.key} $width={col.width} $align={col.align}>
                    {col.title}
                  </StyledTableCol>
                ))}
              </StyledTableHeaderRow>
            </StyledTableHeader>
            <StyledTableBody>
              {getCurrentPageData().length ? (
                getCurrentPageData().map((item: any, index: number) => (
                  <StyledTableRow key={index}>
                    {columns.map((col: any) => (
                      <StyledTableCol key={col.key} $width={col.width} $align={col.align}>
                        {typeof col.render === 'function' ? col.render(item[col.key], item) : item[col.key]}
                      </StyledTableCol>
                    ))}
                  </StyledTableRow>
                ))
              ) : (
                <Empty
                  tips="No data"
                  size={48}
                  style={{
                    height: '420px'
                  }}
                />
              )}
            </StyledTableBody>
          </StyledTable>
          <StyledPagination>
            <StyledTips>
              * The ranking changes in real time, updated every 15 minutes, and the final list of winners is based on
              the data at the end of the campaign.
            </StyledTips>
            {ranks && ranks.length > 10 && (
              <Pagination
                totalItems={ranks.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </StyledPagination>
          {userRank && (
            <>
              <StyledTableTitle>Your current rank</StyledTableTitle>
              <StyledYours>
                <StyledTableCol $width="150px" $align="left">
                  {userRank.rank}
                </StyledTableCol>
                <StyledTableCol $align="left">
                  {account ? account.substring(0, 6) + '...' + account.slice(-4) : '-'}
                </StyledTableCol>
                <StyledTableCol $width="240px" $align="right">
                  {formateValueWithThousandSeparatorAndFont(userRank?.trading_volume, 1, true, {
                    prefix: '$',
                    isShort: true
                  })}
                </StyledTableCol>
              </StyledYours>
            </>
          )}
        </StyledContent>
      </StyledContainer>
      <StyledEndTime>
        <span>Days till campaign ends</span>
        <img src="/svg/campaign/linea-marsh/calc.svg" alt="" />
      </StyledEndTime>
    </StyledLeaderboard>
  );
};

export default Leaderboard;
