import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';

import ArrowIcon from '@/components/Icons/ArrowIcon';
import useDappOpen from '@/hooks/useDappOpen';
import { useAllInOneTabCachedStore } from '@/stores/all-in-one';
import { useLayoutStore } from '@/stores/layout';
import { ACTIVITY_PTS, PTS_MAP } from '@/views/OdysseyV5/const';

import useCheck from '../../hooks/useCheck';
import Card from '../Card';
import LockStatus from '../LockStatus';
import RefreshButton from '../RefreshButton';
import {
  StyledCardContainer,
  StyledCardTag,
  StyledCardTagContainer,
  StyledCardTagTip,
  StyledDappDesc,
  StyledDappIcon,
  StyledDappName,
  StyledDappTitle,
  StyledDappTitleWrapper,
  StyledDappWrapper,
  StyledFooter,
  StyledFooterActions,
  StyledFooterLeft,
  StyledFooterRight,
  StyledTagIcon,
  StyledTagIconDefault,
  StyledTagText,
  StyledTop
} from './styles';

const ICON_MAP: any = {
  'Li.Fi': 'https://s3.amazonaws.com/dapdap.main/images/lifi.png',
  Stargate: 'https://s3.amazonaws.com/dapdap.main/images/stargate.png',
  Orbiter: '/images/apps/orbiter.png'
};

export default function DappCard({
  id,
  dapp_id,
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
  setDetailLoading
}: any) {
  const [execution, setExecution] = useState(0);

  const { checking, handleRefresh } = useCheck(
    { id, total_spins, spins },
    (_times: number) => {
      onRefreshDetail(id, _times);
      setExecution(id);
    },
    detailLoading,
    setDetailLoading
  );
  const { open: dappOpen } = useDappOpen();
  const setLayout = useLayoutStore((store?: any) => store.set);
  const setCachedTab = useAllInOneTabCachedStore((store: any) => store.setCachedTab);
  const _defaultTip = {
    right: 0,
    top: 0,
    left: 0,
    show: false,
    text: ''
  };
  const [tip, setTip] = useState<{
    right?: number;
    top: number;
    left?: number;
    show: boolean;
    text?: string;
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
        defaultTab: 'bridge'
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
    event.preventDefault();
    event.stopPropagation();
    const cardEl = document.getElementById(`card${id}`)?.getBoundingClientRect();
    const tagEl = document.getElementById(tagId)?.getBoundingClientRect();
    if (!cardEl || !tagEl) {
      return;
    }
    const _position: { top: number; left?: number; right?: number } = {
      top: tagEl.top - cardEl.top,
      left: tagEl.left - cardEl.left + tagEl?.width + 6
    };
    const _maxWidth = window.innerWidth;
    if (cardEl.left + cardEl.width + 200 >= _maxWidth) {
      _position.left = tagEl.left - cardEl.left - 6;
      _position.top = tagEl.top - cardEl.top + tagEl.height + 6;
    }
    setTip({ ..._position, show: true, text });
  };

  const closeCardTip = () => {
    setTip(_defaultTip);
  };

  const getModeTagText = () => {
    const points35 = '3-5x Points';
    const points23 = '2-3x Points';
    const pointsMode = 'Mode PTS';
    if (['trade'].includes(type)) {
      return points35;
    }
    if (['lending'].includes(type)) {
      // Kim Exchange Pool
      if ([175].includes(dapp_id)) {
        return points35;
      }
      // Kelp Renzo ether.fi
      if ([182, 172, 140].includes(dapp_id)) {
        return pointsMode;
      }
      return points23;
    }
  };

  const defaultTag = () => {
    const tags: any[] = [
      {
        type: 'main',
        img: '/images/odyssey/v5/mode-icon.svg',
        text: getModeTagText()
      }
    ];

    if (type === 'bridge') {
      return null;
    }
    // Renzo
    if (dapp_id === 172) {
      tags.push({
        type: 'text',
        id: 'odysseyV7DappCardRenzoText',
        text: 'ETH/Eigenlayer staking APR'
      });
    }
    // PTS
    if (PTS_MAP.has(dapp_id)) {
      if (PTS_MAP.get(dapp_id)?.withEigenlayer) {
        tags.push({
          type: '',
          id: `odysseyV7DappCard${PTS_MAP.get(dapp_id)?.name}`,
          text: PTS_MAP.get(dapp_id)?.text,
          img: '/images/odyssey/v5/renzo-other.svg',
          isLogo: true
        });
      } else {
        tags.push({
          type: '',
          text: PTS_MAP.get(dapp_id)?.text,
          isLogo: true
        });
      }
    }
    // ACTIVITY PTS
    if (ACTIVITY_PTS.has(dapp_id)) {
      tags.push({
        type: 'text',
        text: ACTIVITY_PTS.get(dapp_id)?.text
      });
    }
    return (
      <>
        {tags.map((_tag, idx) => (
          <StyledCardTag
            className={_tag.type}
            key={idx}
            id={_tag.id}
            onMouseEnter={(e) => {
              if (!_tag.id) return;
              showCardTip(e, _tag.text, _tag.id);
            }}
            onMouseLeave={() => {
              if (!_tag.id) return;
              closeCardTip();
            }}
          >
            {_tag.isLogo && <StyledTagIcon src={ICON_MAP[name] || operators?.[0]?.dapp_logo} />}
            {_tag.img && <StyledTagIconDefault className={_tag.isLogo ? 'other' : ''} url={_tag.img} />}
            <StyledTagText>{_tag.text}</StyledTagText>
          </StyledCardTag>
        ))}
      </>
    );
  };

  const names = () => <StyledDappName>{name}</StyledDappName>;

  const desc = () => <StyledDappDesc>{description}</StyledDappDesc>;

  return (
    <StyledCardContainer id={`card${id}`}>
      <Card
        onClick={onItemClick}
        // disabled={times === 0 ? false : execution >= times}
      >
        <StyledTop>
          {PTS_MAP.has(dapp_id) || ACTIVITY_PTS.has(dapp_id) ? (
            <StyledDappWrapper>
              <StyledDappIcon src={ICON_MAP[name] || operators?.[0]?.dapp_logo} />
              <StyledDappTitleWrapper>
                <StyledDappTitle>{names()}</StyledDappTitle>
                {desc()}
              </StyledDappTitleWrapper>
              <StyledCardTagContainer>{defaultTag()}</StyledCardTagContainer>
            </StyledDappWrapper>
          ) : (
            <StyledDappWrapper>
              <StyledDappIcon src={ICON_MAP[name] || operators?.[0]?.dapp_logo} />
              <StyledDappTitleWrapper>
                <StyledDappTitle>
                  <StyledDappName>{name}</StyledDappName>
                  <StyledCardTagContainer>{defaultTag()}</StyledCardTagContainer>
                </StyledDappTitle>
                {desc()}
              </StyledDappTitleWrapper>
            </StyledDappWrapper>
          )}
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
