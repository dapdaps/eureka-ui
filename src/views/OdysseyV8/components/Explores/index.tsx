import Image from 'next/image';
import { useState } from 'react';

import Loading from '@/components/Icons/Loading';
import { StyledLoadingWrapper } from '@/styled/styles';
import SkakeModel from '@/views/StakeModal/index';

import CompTitle from '../Title';
import Trapeziform from '../Trapeziform';
import WrapAndUnwrap from '../WrapAndUnwrap';
import ExporeItem from './ExporeItem';
import { Btns, Desc, StyledContainer, StyledContent, StyledItemWrap, Title } from './styles';

export default function Explores({ list, userInfo, authConfig, onRefreshDetail }: any) {
  const [stakeShow, setStakeShow] = useState<boolean>(false);
  const [showWrapAndUnwrap, setShowWrapAndUnwrap] = useState(false);
  const [stakeType, setStakeType] = useState<string>('renzo');

  const TrapLayout = {
    borderColor: '#1C1E2D',
    corner: 10,
  };

  return (
    <>
      <StyledContainer>
        <Title>Explore more dApps on Blast</Title>
        <Desc>Interact with popular dApps in Blast on DapDap, win spins and win big prizes.</Desc>
        <Btns>
          <Trapeziform
            {...TrapLayout}
            className="poly-btn"
            handleClick={() => {
              setShowWrapAndUnwrap(true);
            }}
          >
            <Image src="/images/odyssey/v4/btn-mask.png" alt="" width={268} height={62} className="poly-mask" />
            <span className="poly-lp">
              <Image src="/images/odyssey/v4/coin-eth.svg" alt="" width={26} height={26} />
              <Image src="/images/odyssey/v4/coin-weth.svg" alt="" width={26} height={26} className="poly-lp-last" />
            </span>
            Wrap ETH to WETH
            <Image src="/images/odyssey/v4/white-arrow.svg" alt="" width={28} height={16} />
          </Trapeziform>
          <Trapeziform
            {...TrapLayout}
            className="poly-btn large renzo"
            handleClick={() => {
              setStakeShow(true);
              setStakeType('renzo');
            }}
          >
            <Image src="/images/odyssey/v4/btn-mask.png" alt="" width={268} height={62} className="poly-mask" />
            <Image src="/images/odyssey/v4/coin-ezeth.svg" alt="" width={26} height={26} />
            Get ezETH by RENZO
            <Image src="/images/odyssey/v4/white-arrow.svg" alt="" width={28} height={16} />
          </Trapeziform>
          <Trapeziform
            {...TrapLayout}
            className="poly-btn lido"
            handleClick={() => {
              setStakeShow(true);
              setStakeType('lido');
            }}
          >
            <Image src="/images/odyssey/v4/btn-mask.png" alt="" width={268} height={62} className="poly-mask" />
            <Image src="/images/odyssey/v4/coin-eth.svg" alt="" width={26} height={26} />
            Get stETH by LIDO
            <Image src="/images/odyssey/v4/white-arrow.svg" alt="" width={28} height={16} />
          </Trapeziform>
        </Btns>
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="33" viewBox="0 0 38 33" fill="none">
          <path
            d="M15.5722 30.3003C17.1266 32.8849 20.8734 32.8849 22.4278 30.3003L37.0052 6.06153C38.6086 3.3955 36.6884 0 33.5774 0H4.42265C1.31163 0 -0.608558 3.3955 0.994807 6.06153L15.5722 30.3003Z"
            fill="#EBF479"
          />
        </svg>
        {stakeShow && (
          <SkakeModel
            stakeType={stakeType}
            onClose={() => {
              setStakeShow(false);
            }}
          />
        )}
        <WrapAndUnwrap
          open={showWrapAndUnwrap}
          onClose={() => {
            setShowWrapAndUnwrap(false);
          }}
        />
      </StyledContainer>
      <StyledContent>
        <CompTitle title="" subtitle="Complete tasks easily to earn Spin to win" />
        <StyledItemWrap>
          {list?.length ? (
            list
              .filter((item: any) => item.name !== 'Particle')
              .map((item: any) => (
                <ExporeItem
                  key={item.id}
                  {...item}
                  authConfig={authConfig}
                  userInfo={userInfo}
                  onRefreshDetail={onRefreshDetail}
                />
              ))
          ) : (
            <StyledLoadingWrapper $h="100px">
              <Loading size={30} />
            </StyledLoadingWrapper>
          )}
        </StyledItemWrap>
      </StyledContent>
    </>
  );
}
