import Loading from '@/components/Icons/Loading';
import { AnimatePresence } from 'framer-motion';
import { container } from '@/components/animation';
import { ParticleLink } from '../../const';
import Quest from './quest';
import useSwitcher from '../../hooks/useSwitcher';
import { LoadingWrap, StyledContainer, StyledContent } from './styles';
import UnStart from './unStart';
import DappsConfig from '../../DappsConfig';

const _list = Object.values(DappsConfig);

export default function Spins({ loading, list, data, onRefreshDetail, authConfig, userInfo }: any) {
  const { isStart, secondsRemaining } = useSwitcher();

  list.sort((a: any, b: any) => {
    return a.gold_order - b.gold_order;
  });

  return (
    <AnimatePresence mode="wait">
      <StyledContainer {...container}>
        <div style={{ color: '#979ABE', fontSize: '20px', paddingBottom: '60px', textAlign: 'center' }}>
          Earn Spins by completing missions below
        </div>
        <StyledContent>
          {!isStart ? (
            <UnStart secondsRemaining={secondsRemaining} />
          ) : loading ? (
            <LoadingWrap>
              <Loading size={30} />
            </LoadingWrap>
          ) : (
            <>
              {_list.map((item: any) => (
                <Quest
                  key={item.name}
                  data={item}
                  onRefreshDetail={onRefreshDetail}
                  authConfig={authConfig}
                  userInfo={userInfo}
                />
              ))}
              <div className="more-is-coming">MORE IS COMING...</div>
            </>
          )}
        </StyledContent>
      </StyledContainer>
    </AnimatePresence>
  );
}
