import Image from 'next/image';
import Loading from '@/components/Icons/Loading';
import Modal from '../Modal';
import RewardIcons from '../../RewardIcons';

export default function RewardsModal({ loading, rewards = {}, onClose }: any) {
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
      <div
        style={{
          fontSize: 16,
          lineHeight: '150%',
          marginTop: 10,
        }}
      >
        You&apos;ve won rewards through the &quot;Spin to Win&quot; in Odyssey Vol.4+ will be settled after the
        conclusion of the event. Wishing you the best of luck in winning big prizes!
      </div>
      {loading ? (
        <div style={{ display: 'flex', height: 200, justifyContent: 'center', alignItems: 'center' }}>
          <Loading size={36} />
        </div>
      ) : (
        <div style={{ marginTop: 30 }}>
          {Object.entries(rewards).length > 0 ? (
            Object.entries(rewards).map(([key, value]) => (
              <>
                <div
                  key={key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 20,
                  }}
                >
                  <Image src={RewardIcons[key].icon} width={26} height={26} alt="" />
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      flexShrink: 0,
                      color: '#fff',
                    }}
                  >
                    {RewardIcons[key].label}
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
                      color: '#fff',
                    }}
                  >
                    {value as string}
                  </div>
                </div>
              </>
            ))
          ) : (
            <div style={{ fontSize: 14, textAlign: 'center' }}>Not rewards...Participate now to win big prizes!</div>
          )}
        </div>
      )}
    </Modal>
  );
}
