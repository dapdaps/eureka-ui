import { memo, useMemo } from 'react';
import styled from 'styled-components';

import { StyledContainer, StyledFlex, StyledFont } from '@/styled/styles';

import MedalCard from './components/MedalCard';
import useMedalList from './hooks/useMedalList';

const StyledLineGradientFont = styled(StyledFont)`
  position: relative;
  margin-top: -50px;
  z-index: 10;
  text-align: center;
  font-size: 46px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 46px */
  text-transform: uppercase;
  background: linear-gradient(90deg, #fff 0%, #979abe 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const StyledInnerContainer = styled.div`
  width: 1287px;
  max-width: 100%;
  margin: 0 auto;
  z-index: 5;
`;
const StyledMedalsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 13px;
`;
const StyledMedalsVideo = styled.video`
  margin: -12px auto 0;
  display: block;
  width: 324px;
  height: 324px;
`;

const sortedKeys = ['Early Adopter Medals', 'Voyager Medals'];

export default memo(function MedalsView() {
  const { loading, medalList } = useMedalList();

  const medalMapping = useMemo(() => {
    const _medalMapping: any = {};
    medalList.forEach((medal) => {
      _medalMapping[medal?.category] = _medalMapping[medal?.category] || [];
      _medalMapping[medal?.category].push(medal);
    });
    return _medalMapping;
  }, [medalList]);

  const sortedMedalKeyList = useMemo(() => {
    if (medalMapping) {
      const keys = Object.keys(medalMapping).sort((a, b) => {
        return sortedKeys.indexOf(a) - sortedKeys.indexOf(b);
      });
      return keys;
    }

    return [];
  }, [medalMapping]);

  return (
    <StyledContainer style={{ backgroundColor: '#000' }}>
      <StyledInnerContainer>
        <StyledMedalsVideo src="/videos/MedalDashboard.webm" controls={false} muted autoPlay loop />
        <StyledLineGradientFont>Medal Dashboard</StyledLineGradientFont>
        <StyledFont
          color="#979ABE"
          fontSize="20px"
          lineHeight="160%"
          textAlign="center"
          style={{ width: 665, margin: '12px auto 54px' }}
        >
          Track your progress and earn recognition, as you explore, trade, and contribute across multiple Ethereum L2 &
          EVM networks.
        </StyledFont>
        <StyledFlex flexDirection="column" gap="100px">
          {sortedMedalKeyList.map((key) => {
            return (
              <StyledMedalsContainer key={key}>
                <StyledFlex gap="6px" style={{ paddingLeft: 16, marginBottom: 20 }}>
                  <StyledFont color="#FFF" fontSize="20px" fontWeight="600" style={{ textTransform: 'capitalize' }}>
                    {key.split('_').join(' ')}
                  </StyledFont>
                </StyledFlex>
                <StyledFlex gap="30px 14px" flexWrap="wrap" style={{ width: '100%' }}>
                  {medalMapping[key]?.map((medal: any, index: number) => {
                    return (
                      <MedalCard
                        key={key + '|' + index}
                        medal={medal}
                        style={{
                          width: 311,
                          height: 150
                        }}
                        nameStyle={{
                          fontSize: 16
                        }}
                      />
                    );
                  })}
                </StyledFlex>
              </StyledMedalsContainer>
            );
          })}
        </StyledFlex>
      </StyledInnerContainer>
    </StyledContainer>
  );
});
