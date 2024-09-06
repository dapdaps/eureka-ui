import Image from 'next/image';
import React from 'react';

import { IdToPath } from '@/config/all-in-one/chains';
import { formatIntegerThousandsSeparator } from '@/utils/format-number';
import { formatValueDecimal } from '@/utils/formate';
import NativeCurrency from '@/views/networks/detail/components/NativeCurrency';
import {
  Btn,
  ChainDesc,
  ChainInfo,
  ChainName,
  ChainNameContainer,
  LogoGroup,
  StyledChainTag,
  StyledChainTagIcon,
  StyledChainTagText
} from '@/views/networks/list/components/styles';
import ValuePercent from '@/views/networks/list/components/value-percent';

export const TagList = [
  {
    label: 'Top Volume',
    bgColor: '#00D1FF',
    icon: '/images/networks/icon-top.gif',
    classname: 'tag-top'
  },
  {
    label: 'Hottest',
    bgColor: '#FF79C2',
    icon: '/images/networks/icon-hot.gif',
    classname: 'tag-hot'
  }
];

export const DataListShown = ({ tvl, trading_volume_general, total_integrated_dapp, classname }: any) => {
  const list = [
    {
      key: 'tvl',
      label: 'TVL',
      percent: true,
      value: <ValuePercent className={classname}>{formatValueDecimal(tvl, '$', 2, true)}</ValuePercent>
    },
    {
      key: 'trading_volume_general',
      label: 'Volume (24h)',
      value: (
        <ValuePercent className={classname}>{formatValueDecimal(trading_volume_general, '$', 2, true)}</ValuePercent>
      )
    },
    {
      key: 'dApps',
      label: 'Integrated dApps',
      value: formatIntegerThousandsSeparator(total_integrated_dapp, 0, { type: 'thousand' }),
      underline: true
    }
  ];
  return list;
};

export const ChainTag = ({ idx }: { idx: number }) => {
  if (isNaN(idx) || idx > TagList.length) {
    return null;
  }

  return (
    <StyledChainTag $bgColor={TagList[idx].bgColor} className={TagList[idx].classname ?? ''}>
      <StyledChainTagIcon $url={TagList[idx].icon} className="tag-icon" />
      <StyledChainTagText>{TagList[idx].label}</StyledChainTagText>
    </StyledChainTag>
  );
};

export const CardHead = ({ classname = '', logo, name, isTop, isHot, tbd_token, native_currency }: any) => {
  return (
    <LogoGroup className={classname}>
      <Image src={logo} width={60} height={60} alt="network" className={`${classname}-image`} />
      <ChainInfo className={`${classname}-info`}>
        <ChainNameContainer className={`${classname}-name-container`}>
          <ChainName className="chain-name">{name}</ChainName>
          {isTop ? <ChainTag idx={0} /> : null}
          {isHot ? <ChainTag idx={1} /> : null}
        </ChainNameContainer>
        <ChainDesc>
          <NativeCurrency tbdToken={tbd_token} nativeCurrency={native_currency} className="network-native" />
        </ChainDesc>
      </ChainInfo>
    </LogoGroup>
  );
};

export const FooterButton = ({ bgColor, textColor, id, path }: any) => {
  return (
    <>
      <Btn href={`/networks/${IdToPath[id]}`} data-bp="1006-002">
        Details
      </Btn>
      <Btn
        href={`/all-in-one/${path}`}
        data-bp="1006-001"
        className="allinone-btn"
        $bgColor={bgColor ?? '#EBF479'}
        $color={textColor ?? '#000000'}
      >
        All-In-One
      </Btn>
    </>
  );
};
