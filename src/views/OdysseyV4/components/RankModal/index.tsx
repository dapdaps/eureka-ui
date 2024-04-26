import Image from 'next/image';

import Loading from '@/components/Icons/Loading';
import { ellipsAccount } from '@/utils/account';
import { simplifyNum } from '@/utils/format-number';

import useLeaderBoard from '../../hooks/useLeaderBoard';
import Trapeziform from '../Trapeziform';
import { Avatar, ModalBody, ModalHead, StyledContainer, StyledContent } from './styles';

export default function RankModal({ name, id, onClose }: any) {
  const { ranks, loading: rankLoading, fetchData } = useLeaderBoard(id);

  const TrapLayout = {
    borderColor: '#FFDD4D',
    corner: 34,
  };

  const RankMap = new Map([
    [1, '/images/odyssey/v4/rank1.svg'],
    [2, '/images/odyssey/v4/rank2.svg'],
    [3, '/images/odyssey/v4/rank3.svg'],
  ]);

  const renderLogo = () => {
    switch (name) {
      case 'Particle':
        return <Image src="/images/odyssey/v4/logo-particle.svg" alt="" width={43} height={43} />;
      case 'Thruster':
        return <Image src="/images/odyssey/v4/logo-thruster.svg" alt="" width={43} height={43} />;
      case 'PAC Finance':
        return <Image src="/images/odyssey/v4/logo-pac.svg" alt="" width={43} height={43} />;
    }
  };
  return (
    <StyledContainer>
      <StyledContent>
        {/* <Trapeziform {...TrapLayout}>
          </Trapeziform> */}
        <ModalHead>
          <span className="left">
            {renderLogo()}
            {name} Top 50 Rank
            <div className="smoke"></div>
          </span>
          <Image
            onClick={onClose}
            src="/images/odyssey/v4/close.svg"
            alt=""
            width={12}
            height={12}
            style={{ cursor: 'pointer', zIndex: 1 }}
          />
        </ModalHead>
        <ModalBody>
          <div className="desc">
            The ranking changes in real time, updated every 15 minutes, and the final list of winners is based on the
            data at the end of the campaign.
          </div>
          {!rankLoading ? (
            <>
              <div className="rank-table">
                <div className="rank-head">
                  <div className="rank-th text-left">Rank</div>
                  <div className="rank-th text-left">User address</div>
                  <div className="rank-th text-right">Trading Volume</div>
                </div>

                {ranks?.data?.map((item: any, index: number) => (
                  <div className="rank-row" key={index}>
                    <div className="rank-col text-left">
                      {RankMap.get(item.rank) ? (
                        <Image
                          src={RankMap.get(item.rank) || ''}
                          alt=""
                          width={25}
                          height={25}
                          style={{ marginRight: 10 }}
                        />
                      ) : null}
                      {item.rank}
                    </div>
                    <div className="rank-col text-left">
                      <Avatar src={item?.account?.avatar} />
                      {ellipsAccount(item.account.address)}
                    </div>
                    <div className="rank-col text-right">${simplifyNum(item.trading_volume)}</div>
                  </div>
                ))}
              </div>
              {ranks?.user ? (
                <>
                  <div className="you">You</div>
                  <div className="your-rank rank-row">
                    <div className="rank-col text-left"># {ranks?.user?.rank}</div>
                    <div className="rank-col text-left">
                      <Avatar src={ranks?.user?.account?.avatar} />
                      {ellipsAccount(ranks?.user?.account.address)}
                    </div>
                    <div className="rank-col text-right">${simplifyNum(ranks?.user?.trading_volume)}</div>
                  </div>
                </>
              ) : null}
            </>
          ) : (
            <Loading size={30} />
          )}
        </ModalBody>
      </StyledContent>
    </StyledContainer>
  );
}
