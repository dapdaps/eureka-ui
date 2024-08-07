import React from 'react';
import {
  StyledDappCard,
  StyledDappCardBody,
  StyledDappCardCategory,
  StyledDappCardCategoryItem,
  StyledDappCardDescription,
  StyledDappCardHead,
  StyledDappCardLogo,
  StyledDappCardName,
  StyledDappCardNetworks,
  StyledDappCardTitle,
} from './styles';
import Image from 'next/image';
import Badges from '@/views/AllDapps/components/Badges';
import { NetworkOdyssey } from '@/views/networks/list/hooks/useNetworks';

const DappCard = (props: Props) => {
  const {
    name,
    logo,
    description,
    categories,
    networks,
    rewards,
    bp = {},
    onClick = () => {
    },
    users = 0,
    tradingVolume = 0,
  } = props;

  return (
    <StyledDappCard data-bp={bp?.dapp} onClick={onClick}>
      <StyledDappCardHead $logo={logo}>
        <StyledDappCardCategory>
          {
            categories && categories.map((cate, index) => (
              <StyledDappCardCategoryItem
                key={cate.key || index}
                $colorRgb={cate.colorRgb}
              >
                {cate.label}
              </StyledDappCardCategoryItem>
            ))
          }
        </StyledDappCardCategory>
        <StyledDappCardNetworks>
          {
            networks && networks.map((network, index) => (
              <Image
                src={network.icon}
                alt=""
                width={20}
                height={20}
                key={network.chainId || index}
              />
            ))
          }
        </StyledDappCardNetworks>
      </StyledDappCardHead>
      <StyledDappCardBody>
        <StyledDappCardTitle>
          <StyledDappCardLogo $logo={logo} />
          <StyledDappCardName>{name}</StyledDappCardName>
        </StyledDappCardTitle>
        <StyledDappCardDescription>
          {description}
        </StyledDappCardDescription>
        <Badges
          rewards={rewards}
          users={users}
          tradingVolume={tradingVolume}
        />
      </StyledDappCardBody>
    </StyledDappCard>
  );
};

export default DappCard;

export interface Props {
  name: string;
  logo: string;
  description?: string;
  tradingVolume: number | string;
  users: number | string;
  categories?: Category[];
  networks?: Network[];
  rewards?: Partial<NetworkOdyssey>[];
  bp?: bp;
  onClick?: () => void;
}

interface bp {
  detail?: string;
  dapp?: string;
}

export interface Category {
  key?: string | number;
  // just r,g,b
  // such as: 255,255,255
  colorRgb: string;
  label: string;
}

export interface Network {
  chainId?: number;
  icon: string;
}
