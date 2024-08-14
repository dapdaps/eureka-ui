import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import popupsData, { IdToPath } from '@/config/all-in-one/chains';
import { Network } from '@/views/networks/list/hooks/useNetworks';
import { formatIntegerThousandsSeparator } from '@/utils/format-number';
import ValuePercent from '@/views/networks/list/components/value-percent';
import Reward from '@/views/networks/list/components/reward';

const renderShadow = (id: number, color: string) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="198" height="186" viewBox="0 0 198 186" fill="none">
    <g opacity="currentOpacity" filter={`url(#network_filter_${id})`}>
      <mask id={`network_mask_${id}`} style={{ maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="198"
            height="186">
        <path d="M0 20C0 8.95431 8.95431 0 20 0H197.836V186H20C8.95429 186 0 177.046 0 166V20Z" fill="#21232A"
              fillOpacity="0.9" />
      </mask>
      <g mask={`url(#network_mask_${id})`}>
        <circle cx="99" cy="3" r="93" fill={`url(#network_radial_${id})`} />
      </g>
    </g>
    <defs>
      <filter id={`network_filter_${id}`} x="-14" y="-20" width="226" height="136" filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="10" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_18445_477" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_18445_477" result="shape" />
      </filter>
      <radialGradient id={`network_radial_${id}`} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(99 3) rotate(90) scale(93)">
        <stop stopColor={color} />
        <stop offset="1" stopColor={color} stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

const TagList = [
  {
    label: 'Top Volume',
    bgColor: '#00D1FF',
    icon: '/images/networks/icon-top.gif',
    classname: 'tag-top'
  },
  {
    label: 'Hottest',
    bgColor: '#FF79C2',
    icon: '/images/networks/icon-hot.png',
    classname: 'tag-hot'
  }
];

const ChainTag = ({ idx }: { idx: number }) => {

  if (isNaN(idx) || idx > TagList.length) { return null; }

  return <StyledChainTag $bgColor={TagList[idx].bgColor} className={TagList[idx].classname ?? ''}>
    <StyledChainTagIcon $url={TagList[idx].icon} className='tag-icon'/>
    <StyledChainTagText>{TagList[idx].label}</StyledChainTagText>
  </StyledChainTag>
}

const ListItem: FC<IProps> = ({ dataSource }) => {
  const {
    id,
    logo,
    name,
    chain_id,
    tbd_token,
    native_currency,
    trading_volume,
    trading_volume_change_percent,
    participants,
    participants_change_percent,
    total_integrated_dapp,
    odyssey,
    index
  } = dataSource;

  const popupsDataArray = Object.values(popupsData);
  const matchedItem = popupsDataArray.find((item) => item.chainId === chain_id);
  const path = matchedItem ? matchedItem.path : '';

  return (
    <Wrap key={id}>
      <div className='item-hover'>{renderShadow(id, matchedItem?.theme.button.bg ?? '#FDFE03')}</div>
      <Head>
        <LogoGroup>
          <Image src={logo} width={60} height={60} alt="network" />
          <ChainInfo>
            <ChainNameContainer>
              <ChainName>{name}</ChainName>
              { index !== undefined && [0, 1].includes(index) ? (<ChainTag idx={index}/>) : null }
              { odyssey.length > 0 && (<ChainOdyssey src='/images/odyssey/welcome/logo.gif'/>) }
            </ChainNameContainer>
            <ChainDesc>
              {tbd_token === 'Y' ? (
                'TBD🔥'
              ) : (
                <>
                  {JSON.parse(native_currency).logo && (
                    <Image src={JSON.parse(native_currency).logo} width={16} height={16} alt="" />
                  )}
                  {JSON.parse(native_currency).name}
                </>
              )}
            </ChainDesc>
          </ChainInfo>
        </LogoGroup>
        <BtnGroup>
          <Btn href={`/networks/${IdToPath[id]}`} data-bp="10012-002">
            Details
          </Btn>
          <Btn href={`/all-in-one/${path}`} data-bp="10012-003" className="allinone-btn"
               $bgColor={matchedItem?.theme.button.bg} $color={matchedItem?.theme.button.text}>
            All-In-One
          </Btn>
        </BtnGroup>
      </Head>
      <DataList>
        <div className="item">
          <span className="key">Trading Volume via DapDap</span>
          <ValuePercent percent={trading_volume_change_percent}>
            ${formatIntegerThousandsSeparator(trading_volume, 1)}
          </ValuePercent>
        </div>
        <div className="item">
          <span className="key">Users</span>
          <ValuePercent percent={participants_change_percent}>
            {formatIntegerThousandsSeparator(participants, 0)}
          </ValuePercent>
        </div>
        <div className="item">
          <span className="key">Integrated dApps</span>
          <span className="value">
             {formatIntegerThousandsSeparator(total_integrated_dapp, 0, { type: 'thousand' })}
          </span>
        </div>
        <div className="item rewards">
          <span className="key">Campaign Reward</span>
          {
            odyssey && odyssey.length > 0 ? (
              <Reward odyssey={odyssey} />
            ) : (
              <span className="value">-</span>
            )
          }
        </div>
      </DataList>
    </Wrap>
  );
};

export default memo(ListItem);

interface IProps {
  dataSource: Network;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const Wrap = styled.div`
  width: 1260px;
  height: 186px;
  padding: 30px 30px 0;
  border-radius: 20px;
  border: 1px solid #202329;
  background: #18191e;
  backdrop-filter: blur(10px);
  margin-bottom: 20px;
  transition: border 0.2s ease-in;
  cursor: pointer;
  position: relative;
  font-family: Montserrat;
  
  .item-hover {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 198px;
    height: 186px;
    z-index: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    .item-hover {
      opacity: 0.1;
    }
  }
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 1;
`;

const ChainName = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const ChainDesc = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #fff;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;
const ChainInfo = styled.div`
  height: 100%;
`;
const LogoGroup = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
const BtnGroup = styled.div`
  display: flex;
  gap: 16px;
  //width: 250px;
  white-space: nowrap;
`;
const Btn = styled(Link)<{ $bgColor?: string, $color?: string }>`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
 
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  padding: 12px 22px;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #45475C;
  
  &.allinone-btn {
    width: 229px;
    font-weight: 600; 
    border: none;
  }

  ${({ $bgColor, $color }) => {
    return {
      background: $bgColor ?? '#21222B',
      color:  $color ?? '#ffffff',
      opacity: 0.8
    };
  }}

  &:hover {
    text-decoration: none;
    background: ${({ $bgColor }) => $bgColor ?? 'linear-gradient(180deg, #eef3bf 0%, #e9f456 100%)'};
    opacity: 1;
    color:  ${({ $color }) => $color ?? '#000000' }
  }

  @media (max-width: 1478px) {
    font-size: 14px;
  }
`;
const DataList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  font-family: Montserrat;
  position: relative;
  z-index: 1;

  .item {
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    &.rewards {
      width: 229px;
      flex-shrink: 0;
      flex-grow: 0;
    }
  }

  .key {
    color: #979abe;
    text-align: left;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  
  .value {
    color: #fff;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
  }
`;

const ChainNameContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;
  margin-bottom: 9px;
`;

const StyledChainTag = styled.div<{$bgColor: string}>`
  position: relative;
  border-radius: 6px;
  border: 2px #101115;
  background-color: ${({$bgColor}) => $bgColor ?? '#ffffff'};
  padding: 6px 14px;
  
  &.tag-top {
    .tag-icon {
      width: 35px;
      height: 35px;
      transform: rotate(-15deg);
      top: -24%;
      margin-left: 10px;
    }
  }
  
  &.tag-hot {
    .tag-icon {
      width: 43px;
      height: 43px;
      top: -46%;
    }
  }
`;

const StyledChainTagIcon = styled.div<{$url: string}>`
  position: absolute;

  left: -20px;
  background: ${({$url}) => $url ? ('url(' + $url + ') no-repeat center') : 'unset'};
  background-size: contain;

`;

const StyledChainTagText = styled.div`
  color: #000;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  
`;

const ChainOdyssey = styled.img`
  width: 104px;
  height: 14px;
  object-fit: contain;
`;