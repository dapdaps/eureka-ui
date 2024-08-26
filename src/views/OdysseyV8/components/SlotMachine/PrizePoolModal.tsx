import Image from 'next/image';

import Modal from '../Modal';
import PoolConfig from './PoolConfig';

export default function PrizeModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} style={{ color: '#fff', fontFamily: 'Montserrat', width: 780 }}>
      <div
        style={{
          fontSize: 26,
          fontWeight: 'bold',
        }}
      >
        ‘SPIN-TO-WIN’ Prize Pool
      </div>
      <div style={{ marginTop: 52 }}>
        {PoolConfig.map((item, i) => (
          <>
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <Image src={item.icon} width={26} height={26} alt={item.name} />
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  flexShrink: 0,
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
                }}
              >
                {item.value}
              </div>
            </div>
            {i === 0 && (
              <div
                style={{
                  paddingLeft: 30,
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 8,
                  marginBottom: 34,
                }}
                key={i}
              >
                {[
                  'Juice 2,500',
                  'Particle 1,500',
                  'Ring 500',
                  'BladeSwap 500',
                  'Cap&Co 1,000',
                  'Early 1,000',
                  'Super Sushi Samurai 500',
                ].map((item) => (
                  <div
                    key={item}
                    style={{ padding: '6px 12px', fontSize: '16px', borderRadius: '6px', background: '#373A53' }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </>
        ))}
      </div>
    </Modal>
  );
}
