import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import { container } from '@/components/animation';
import Loading from '@/components/Icons/Loading';

import useSwitcher from '../../../hooks/useSwitcher';
import RankModal from '../RankModal';
import Quest from './quest';
import { LoadingWrap, StyledContainer, StyledContent } from './styles';
import UnStart from './unStart';

export default function Spins({ loading, list, onRefreshDetail, authConfig, userInfo }: any) {
  const { isStart, secondsRemaining } = useSwitcher();
  const [showRankModal, setShowRankModal] = useState(false);
  const [rankModalParams, setRankModalParams] = useState<any>({});

  list.sort((a: any, b: any) => {
    return a.index - b.index;
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
              {list.map((item: any) => (
                <Quest
                  key={item.name}
                  data={item}
                  onRefreshDetail={onRefreshDetail}
                  authConfig={authConfig}
                  userInfo={userInfo}
                  onGoldClick={(data: any) => {
                    setRankModalParams({
                      name: data.name,
                      id: data.id,
                      logo: data.icon,
                      bgColor: data.bgColor,
                    });
                    setShowRankModal(true);
                  }}
                />
              ))}
              <div className="more-is-coming">MORE IS COMING...</div>
            </>
          )}
        </StyledContent>
        {showRankModal && (
          <RankModal
            {...rankModalParams}
            onClose={() => {
              setShowRankModal(false);
            }}
          />
        )}
      </StyledContainer>
    </AnimatePresence>
  );
}
