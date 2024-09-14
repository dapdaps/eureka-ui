import IconImportant from '@public/images/campaign/icon-important.svg';
import { useContext } from 'react';

import Empty from '@/components/Empty';
import useAccount from '@/hooks/useAccount';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';
import RubicHoldstationContext from '@/views/Campaign/RubicHoldstation/context';
import LeaderboardRank from '@/views/Campaign/RubicHoldstation/sections/Leaderboard/Rank';
import {
  StyledContainer,
  StyledContent,
  StyledDesc,
  StyledLeaderboard,
  StyledTable,
  StyledTableBody,
  StyledTableCol,
  StyledTableHeader,
  StyledTableHeaderRow,
  StyledTableRow,
  StyledTableTitle,
  StyledTitle,
  StyledTitlePrimary
} from '@/views/Campaign/RubicHoldstation/sections/Leaderboard/styles';
import LeaderboardUser from '@/views/Campaign/RubicHoldstation/sections/Leaderboard/User';

const Leaderboard = () => {
  const { account } = useAccount();
  const context = useContext(RubicHoldstationContext);
  const { totalReward } = context.tickets;

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
        return <LeaderboardUser address={record.address} />;
      }
    },
    {
      title: 'Trading Volume',
      key: 'tradingVolume',
      width: '240px',
      align: 'right',
      render: (text: string, record: any) => {
        return formateValueWithThousandSeparatorAndFont(record.tradingVolume, 1, true, { prefix: '$', isShort: true });
      }
    }
  ];

  // TODO Fake data
  const data: any = [...new Array(10).keys()].map((i) => ({
    rank: i + 1,
    address: account,
    tradingVolume: Math.random() * 100 + (10 - i) * 2000 - Math.random() * 100 * i
  }));

  // TODO Fake data
  const selfData: any = [
    {
      rank: 2345,
      address: account,
      tradingVolume: 535
    }
  ];

  return (
    <StyledLeaderboard>
      <StyledContainer>
        <StyledTitle>Climb to Leaderboard</StyledTitle>
        <StyledTitle>
          Win<StyledTitlePrimary>{totalReward}</StyledTitlePrimary>Rewards
        </StyledTitle>
        <StyledDesc>
          Trading on HoldStation by using Rubic bridge. <br />
          The ranking changes in real time, updated every 15 minutes, and the final list of <br />
          winners is based on the data at the end of the campaign.
        </StyledDesc>
        <StyledContent>
          <IconImportant />
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
              {data.length ? (
                data.map((item: any, index: number) => (
                  <StyledTableRow key={index}>
                    {columns.map((col: any) => (
                      <StyledTableCol key={col.key} $width={col.width} $align={col.align}>
                        {typeof col.render === 'function' ? col.render(item[col.key], item) : item[col.key]}
                      </StyledTableCol>
                    ))}
                  </StyledTableRow>
                ))
              ) : (
                <Empty tips="No data" />
              )}
            </StyledTableBody>
          </StyledTable>
          <StyledTableTitle>Your current rank</StyledTableTitle>
          <StyledTable>
            <StyledTableBody>
              {selfData.length ? (
                selfData.map((item: any, index: number) => (
                  <StyledTableRow key={index}>
                    {columns.map((col: any) => (
                      <StyledTableCol key={col.key} $width={col.width} $align={col.align}>
                        {typeof col.render === 'function' ? col.render(item[col.key], item) : item[col.key]}
                      </StyledTableCol>
                    ))}
                  </StyledTableRow>
                ))
              ) : (
                <Empty tips="No data" />
              )}
            </StyledTableBody>
          </StyledTable>
        </StyledContent>
      </StyledContainer>
    </StyledLeaderboard>
  );
};

export default Leaderboard;
