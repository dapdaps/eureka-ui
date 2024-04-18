import { memo, useState, useMemo, useEffect } from 'react';
import { container } from '@/components/animation';
import { AnimatePresence, motion } from 'framer-motion';
import { NoDataLayout } from '../NoDataLayout';
import ProtocolItem from './ProtocolItem';
import { StyledLoadingWrapper } from '@/styled/styles';
import Loading from '@/components/Icons/Loading';
import Switcher from '@/components/Switcher';
import { YourAssetsTitle, ProtocolSelectBox, CheckDot } from './styles';

const Protocol = ({ dapps, filterFunc, loading }: any) => {
  const filteredList = useMemo(() => {
    if (!dapps) return [];
    return dapps.filter(filterFunc);
  }, [dapps, filterFunc]);

  const [openOptions, setOpenOptions] = useState<boolean>(false);

  const [isHide, setIsHide] = useState<boolean>(false);

  const [isExpand, setIsExpand] = useState<boolean>(false);

  useEffect(() => {
    const hideOptions = () => {
      setOpenOptions(false);
    };
    document.addEventListener('click', hideOptions);
    return () => {
      document.removeEventListener('click', hideOptions);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div {...container}>
        <YourAssetsTitle>
          <div className="assets-text">Your Assets & Positions</div>
          <div
            className="asset-function-button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setOpenOptions((b) => !b);
            }}
          >
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />

            {openOptions && (
              <ProtocolSelectBox
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="function-item">
                  <div>Hide</div>

                  <div className="minimum-value-box">{'< $0.1'}</div>

                  <Switcher
                    active={isHide}
                    onChange={() => {
                      setIsHide((h) => !h);
                    }}
                  />
                </div>

                <div className="function-item" style={{ gap: '28px' }}>
                  <div
                    className="frcs"
                    onClick={() => {
                      setIsExpand(false);
                    }}
                  >
                    <CheckDot active={!isExpand}>
                      <div />
                    </CheckDot>

                    <div>Collapse</div>
                  </div>

                  <div
                    className="frcs"
                    onClick={() => {
                      setIsExpand(true);
                    }}
                  >
                    <CheckDot active={isExpand}>
                      <div />
                    </CheckDot>
                    <div>Expand</div>
                  </div>
                </div>
              </ProtocolSelectBox>
            )}
          </div>
        </YourAssetsTitle>
        {filteredList.map((protocol: any, i: number) => {
          return (
            <ProtocolItem isHide={isHide} isExpand={isExpand} protocol={protocol} key={protocol.id + Math.random()} />
          );
        })}
        {loading && (
          <StyledLoadingWrapper $h="100px">
            <Loading size={22} />
          </StyledLoadingWrapper>
        )}
        {!loading && !filteredList.length && <NoDataLayout />}
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Protocol);
