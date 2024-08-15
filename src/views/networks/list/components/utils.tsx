import {
  ChainDesc,
  ChainInfo, ChainName, ChainNameContainer,
  LogoGroup,
  StyledChainTag,
  StyledChainTagIcon,
  StyledChainTagText,
} from '@/views/networks/list/components/styles';
import React from 'react';
import ValuePercent from '@/views/networks/list/components/value-percent';
import { formatIntegerThousandsSeparator } from '@/utils/format-number';
import Image from 'next/image';
import NativeCurrency from '@/views/networks/detail/components/NativeCurrency';

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

export const DataListShown = (
  {
    trading_volume_change_percent,
    trading_volume,
    participants_change_percent,
    participants,
    total_integrated_dapp,
    medals,
    classname
  }: any
) => {
  const list = [{
    key: 'Volume',
    label: 'Trading Volume',
    percent: true,
    value: <ValuePercent percent={trading_volume_change_percent} className={classname}>
    ${formatIntegerThousandsSeparator(trading_volume, 1)}
  </ValuePercent>
  },
  {
    key: 'Users',
      label: 'Users',
    value:  <ValuePercent percent={participants_change_percent} className={classname}>
    {formatIntegerThousandsSeparator(participants, 0)}
  </ValuePercent>
  },
  {
    key: 'dApps',
    label: 'Integrated dApps',
    value: formatIntegerThousandsSeparator(total_integrated_dapp, 0, { type: 'thousand' }),
    underline: true
  }
];
  if (medals !== undefined) {
    return list.concat({
        key: 'Medals',
        label: 'Medals',
        value: medals,
        underline: true
      })
  }
  return list;
}



export const ChainTag = ({ idx }: { idx: number }) => {

  if (isNaN(idx) || idx > TagList.length) { return null; }

  return (<StyledChainTag $bgColor={TagList[idx].bgColor} className={TagList[idx].classname ?? ''}>
    <StyledChainTagIcon $url={TagList[idx].icon} className='tag-icon'/>
    <StyledChainTagText>{TagList[idx].label}</StyledChainTagText>
  </StyledChainTag>)
}

export const CardHead = ({ classname, logo, name, isTop,  isHot, tbd_token, native_currency}: any) => {

  return (
    <LogoGroup className={classname}>
      <Image src={logo} width={60} height={60} alt="network" className={`${classname}-image`}/>
      <ChainInfo>
        <ChainNameContainer className={`${classname}-name-container`}>
          <ChainName>{name}</ChainName>
          {isTop ? (<ChainTag idx={0} />) : null}
          {isHot ? (<ChainTag idx={1} />) : null}
        </ChainNameContainer>
        <ChainDesc>
          <NativeCurrency tbdToken={tbd_token} nativeCurrency={native_currency} className='network-native'/>
        </ChainDesc>
      </ChainInfo>
    </LogoGroup>
  );

}