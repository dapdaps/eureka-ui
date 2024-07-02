import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import useDappOpen from '@/hooks/useDappOpen';
import { useAllInOneTabCachedStore } from '@/stores/all-in-one';
import { useLayoutStore } from '@/stores/layout';

import useCheck from '../../hooks/useCheck';
import ArrowIcon from '@/components/Icons/ArrowIcon';
import Card from '../Card';
import LockStatus from '../LockStatus';
import RefreshButton from '../RefreshButton';
import {
  StyledDappDesc,
  StyledDappIcon,
  StyledDappTitle,
  StyledDappTitleWrapper,
  StyledDappWrapper,
  StyledFooter,
  StyledFooterActions,
  StyledTop,
  StyledCardTagContainer,
  StyledCardTag,
  StyledTagIcon,
  StyledTagText,
  StyledFooterLeft,
  StyledFooterRight,
  StyledDappName,
  StyledCardTagTip,
  StyledCardContainer,
  StyledTagIconDefault,
} from './styles';
import { PTS_MAP, RENZO_CONFIG } from '@/views/OdysseyV5/const';

const ICON_MAP: any = {
  'Li.Fi': 'https://s3.amazonaws.com/dapdap.prod/images/lifi.png',
  Stargate: 'https://s3.amazonaws.com/dapdap.prod/images/stargate.png',
  Orbiter: '/images/apps/orbiter.png',
};

export default function DappCard({
   id,
   operators,
   name,
   category_name,
   source,
   description,
   times,
   spins,
   total_spins,
   onRefreshDetail,
   type,
   detailLoading,
   setDetailLoading,
  }: any) {
  const [execution, setExecution] = useState(0);

  const { checking, handleRefresh } = useCheck({ id, total_spins, spins }, (_times: number) => {
    onRefreshDetail(id, _times);
    setExecution(id);
  }, detailLoading, setDetailLoading);
  const { open: dappOpen } = useDappOpen();
  const setLayout = useLayoutStore((store?: any) => store.set);
  const setCachedTab = useAllInOneTabCachedStore((store: any) => store.setCachedTab);
  const _defaultTip = {
    right: 0,
    top: 0,
    left: 0,
    show: false,
    text: '',
  };
  const [tip, setTip] = useState<{
    right?: number,
    top: number,
    left?: number,
    show: boolean,
    text?: string
  }>(_defaultTip);

  const handleDappRedirect = (dapp: any) => {
    dapp.route && dappOpen({ dapp: { ...dapp, route: `/${dapp.route}` }, from: 'quest', isCurrentTab: false });
  };

  const onItemClick = () => {

    if (operators?.length) {
      handleDappRedirect(operators[0]);
      return;
    }
    if (source === 'wallet/bridge') {
      setLayout({
        showAccountSider: true,
        defaultTab: 'bridge',
      });
      return;
    }
    if (category_name === 'Bridge') {
      setCachedTab(category_name, 534352);
    }
    if (!source) return;
    // window.open(source, '_blank');
  };

  useEffect(() => {
    setExecution(total_spins / spins);
  }, [total_spins, spins]);

  const showCardTip = (event: MouseEvent<HTMLDivElement>, text: string, tagId: string) => {
    if (!isRenzo) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    const cardEl = document.getElementById(`card${id}`)?.getBoundingClientRect();
    const tagEl = document.getElementById(tagId)?.getBoundingClientRect();
    if (!cardEl || !tagEl) {
      return;
    }
    const _position: { top: number, left?: number, right?: number } = {
      top: tagEl.top - cardEl.top,
      left: tagEl.left - cardEl.left + tagEl?.width + 6,
    };
    const _maxWidth = window.innerWidth;
    if ((cardEl.left + cardEl.width + 200) >= _maxWidth) {
      _position.left = tagEl.left - cardEl.left - 6;
      _position.top = tagEl.top - cardEl.top + tagEl.height + 6;
    }
    setTip({ ..._position, show: true, text });
  };

  const closeCardTip = () => {
    setTip(_defaultTip);
  };

  const isRenzo = name === 'Renzo';

  const getTagText = () => {
    if (['trade'].includes(type)) {
      return '3-5x Points';
    }
    if (['lending'].includes(type)) {
      if (isRenzo) {
        return 'Mode Points';
      }
      if (['Kim Exchange'].includes(name)) {
        return '3-5x Points';
      }
      if (['Kelp'].includes(name)) {
        return '2x Points';
      }
      return '2-3x Points';
    }
  };

  const defaultTag = () => {
    return type !== 'bridge' ? <StyledCardTag className="main">
      <StyledTagIconDefault url={'/images/odyssey/v5/mode-icon.svg'} />
      <StyledTagText>
        {getTagText()}
      </StyledTagText>
    </StyledCardTag> : null
  }

  const names = () => (
    <StyledDappName>{name}</StyledDappName>
  )

  const desc = () => (
    <StyledDappDesc>{description}</StyledDappDesc>
  )

  return (
    <StyledCardContainer id={`card${id}`}>
      <Card
        onClick={onItemClick}
        // disabled={times === 0 ? false : execution >= times}
      >
        <StyledTop>
          {
            PTS_MAP.has(name)
              ? <StyledDappWrapper>
                <StyledDappIcon src={ICON_MAP[name] || operators?.[0]?.dapp_logo} />
                <StyledDappTitleWrapper>
                  <StyledDappTitle>
                    {names()}
                  </StyledDappTitle>
                    {desc()}
                </StyledDappTitleWrapper>
                <StyledCardTagContainer>
                  {defaultTag()}
                  {
                    isRenzo ?
                      <StyledCardTag className="text" id="renzo-text"
                                     onMouseEnter={(e) => showCardTip(e, RENZO_CONFIG.otherText, 'renzo-text')}
                                     onMouseLeave={closeCardTip}>
                        <StyledTagText>{RENZO_CONFIG.otherText}</StyledTagText>
                      </StyledCardTag>
                      : null
                  }
                  {
                    PTS_MAP.has(name) ?
                      <StyledCardTag id={isRenzo ? 'renzo-pts' : ''}
                                     onMouseEnter={(e) => showCardTip(e, PTS_MAP.get(name) ?? '', 'renzo-pts')}
                                     onMouseLeave={closeCardTip}>
                        <StyledTagIcon src={ICON_MAP[name] || operators?.[0]?.dapp_logo} />
                        {isRenzo && <StyledTagIconDefault className="other" url={RENZO_CONFIG.otherIcon} />}
                        <StyledTagText
                          className={isRenzo ? 'renzo-text' : ''}>{PTS_MAP.get(name) ?? ''}</StyledTagText>
                      </StyledCardTag>
                      : null
                  }
                </StyledCardTagContainer>
              </StyledDappWrapper>
              : <StyledDappWrapper>
                <StyledDappIcon src={ICON_MAP[name] || operators?.[0]?.dapp_logo} />
                <StyledDappTitleWrapper>
                  <StyledDappTitle>
                    <StyledDappName>{name}</StyledDappName>
                    <StyledCardTagContainer>
                      {defaultTag()}
                    </StyledCardTagContainer>
                  </StyledDappTitle>
                    {desc()}
                </StyledDappTitleWrapper>
              </StyledDappWrapper>
          }
        </StyledTop>
        <StyledFooter>
          <StyledFooterLeft>
            <LockStatus status={total_spins > 0 || execution > 0} />
            <StyledFooterActions>
              <RefreshButton
                onClick={(ev: any) => {
                  ev.stopPropagation();
                  if (!checking && !detailLoading) handleRefresh();
                }}
                loading={checking}
              />
            </StyledFooterActions>
          </StyledFooterLeft>
          <StyledFooterRight className="card_active_arrow">
            <ArrowIcon />
          </StyledFooterRight>
        </StyledFooter>
      </Card>
      <StyledCardTagTip {...tip}>{tip.text}</StyledCardTagTip>
    </StyledCardContainer>
  );
}
