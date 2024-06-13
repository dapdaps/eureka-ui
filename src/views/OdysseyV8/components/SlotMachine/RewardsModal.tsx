import Image from 'next/image';
import Modal from '../Modal';
import PoolConfig from './PoolConfig';
import Loading from '@/components/Icons/Loading';
import { Btn } from './PrizeModal';
import { useMemo } from 'react';

export default function RewardsModal({
  isClaiming,
  unclaimedReward,
  onClose,
  onClaim,
}: {
  isClaiming: boolean;
  unclaimedReward: number;
  onClaim: VoidFunction;
  onClose: VoidFunction;
}) {
  const list = useMemo(
    () => [
      ...PoolConfig,
      {
        icon: '/images/quest/coin.png',
        name: 'PTS',
        value: unclaimedReward,
      },
    ],
    [unclaimedReward],
  );

  return (
    <Modal onClose={onClose} style={{ color: '#fff', fontFamily: 'Montserrat', width: 450, padding: 32 }}>
      <div
        style={{
          fontSize: 26,
          fontWeight: 'bold',
        }}
      >
        You have won
      </div>
      <div style={{ marginTop: 44 }}>
        {list.map((item, i) => (
          <>
            <div
              key={item.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: i === 0 ? 50 : 20,
                marginTop: i === list.length - 1 ? 50 : 0,
              }}
            >
              <Image src={item.icon} width={26} height={26} alt={item.name} />
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  flexShrink: 0,
                  color: i === 0 || i === list.length - 1 ? '#D8D800' : '#fff',
                }}
              >
                {item.name}
              </div>
              <div
                style={{
                  flexGrow: 1,
                  width: '100%',
                  height: 1,
                  borderBottom: '1px dashed #979ABE',
                }}
              ></div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  flexShrink: 0,
                  color: i === 0 || i === list.length - 1 ? '#D8D800' : '#fff',
                }}
              >
                {item.value}
              </div>
            </div>
          </>
        ))}
      </div>
      <Btn
        onClick={() => {
          onClaim();
        }}
        style={{
          color: '#02051E',
          width: 134,
          margin: '0px',
          float: 'right',
        }}
        disabled={unclaimedReward < 0 || isClaiming}
      >
        {isClaiming ? <Loading size={18} /> : 'Claim PTS'}
      </Btn>
    </Modal>
  );
}
