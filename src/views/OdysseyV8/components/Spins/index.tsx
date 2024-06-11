import Loading from '@/components/Icons/Loading';
import Pilcrow from '../Pilcrow';
import { ParticleLink } from '../../const';
import Quest from './quest';
import { BgFoot, LoadingWrap, StyledContainer, StyledContent } from './styles';

export default function Spins({ loading, list, data, onRefreshDetail }: any) {
  const GoldsMap = new Map([
    [
      'Particle',
      {
        logo: '/images/odyssey/v4/logo-particle.svg',
        link: ParticleLink,
        rewardHints: 'To divide up extra Gold',
        desc: 'Get ready to boost your rewards with Particle! Particle is a powerful dapp in the Blast ecosystem. When you trade with Particle on DapDap, you not only receive the same Blast Gold rewards as you would on other platforms but also get spins to get extra surprise rewards from the pool allocated to DapDap.',
        bgColor: '#fff',
        isGold: true,
        reward: '1500 Gold',
      },
    ],
    [
      'Ring Protocol',
      {
        logo: '/images/odyssey/v4/logo-ring.png',
        link: `${location.origin}/dapp/ring-protocol`,
        rewardHints: 'Spin to win for more rewards',
        desc: 'Ring Protocol offers seamless asset trading and lending services within the Blast ecosystem. Explore DeFi with Ring Protocol on DapDap today!Participate in our latest Odyssey campaign and earn additional spin rewards. ',
        bgColor: '#FF37C7',
        isGold: false,
        reward: '100k Points',
      },
    ],
    [
      'Ambient',
      {
        logo: '/images/odyssey/v4/logo-ambient.png',
        link: `${location.origin}/dapp/ambient`,
        rewardHints: 'To divide up extra Gold',
        desc: `Ambient is a Zero-to-One Decentralised Trading Protocol on Blast, offering cutting-edge trading solutions.Complete trades on Ambient to get spin opportunities and hit more big prizes in subsequent "spin to win" games`,
        bgColor: '#9B37FF',
        isGold: true,
        reward: '1000 Gold',
      },
    ],
    [
      'BladeSwap',
      {
        logo: '/images/odyssey/v4/logo-BladeSwap.png',
        link: `${location.origin}/dapp/blade-swap`,
        rewardHints: 'To divide up extra Gold',
        desc: `BladeSwap focuses on providing a convenient and web2-like experience that saves your precious time and gas fees by supporting native batch transactions.Complete trades on Bladeswap to earn spin opportunities and win bigger prizes in the "spin to win" games.`,
        bgColor: '#FFA100',
        isGold: true,
        reward: '1000 Gold',
      },
    ],
  ]);
  list.sort((a: any, b: any) => {
    return a.gold_order - b.gold_order;
  });

  return (
    <StyledContainer>
      <Pilcrow
        title="Earn Extra Gold / Bonus Spins!"
        desc="Interact with popular dApps in Blast on DapDap, earn extra Gold and spin to win!"
      />
      <StyledContent>
        {loading ? (
          <LoadingWrap>
            <Loading size={30} />
          </LoadingWrap>
        ) : (
          list.map((item: any) => (
            <Quest
              key={item.name}
              data={{
                ...GoldsMap.get(item.name),
                ...item,
                start_time: data.start_time,
                end_time: data.end_time,
              }}
              onRefreshDetail={onRefreshDetail}
            />
          ))
        )}
      </StyledContent>
      <BgFoot />
    </StyledContainer>
  );
}
