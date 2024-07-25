import {
  StyledDappCard,
  StyledDappCardBadge,
  StyledDappCardBody,
  StyledDappCardCategory,
  StyledDappCardCategoryItem,
  StyledDappCardDescription,
  StyledDappCardHead,
  StyledDappCardLogo,
  StyledDappCardName,
  StyledDappCardNetworks,
  StyledDappCardStatics,
  StyledDappCardTitle,
} from './styles';
import Image from 'next/image';

const DappCard = (props: Props) => {
  const {
    name,
    logo,
    description,
    categories,
    networks,
    badges,
    bp = {},
    onClick = () => {}
  } = props;

  const renderBadges = () => {
    if (!badges) return null;
    if (badges.length <= 3) {
      return badges.map((badge, index) => {
        const iconSize = getIconSize(badge.iconSize);
        return (
          <StyledDappCardBadge key={index}>
            <Image src={badge.icon} alt="" width={iconSize.w} height={iconSize.h} />
            {badge.value}
          </StyledDappCardBadge>
        );
      });
    }
    return (
      <>
        {
          badges.slice(0, 2).map((badge, index) => (
            <StyledDappCardBadge key={index}>
              <Image
                src={badge.icon}
                alt=""
                width={getIconSize(badge.iconSize).w}
                height={getIconSize(badge.iconSize).h}
              />
              {badge.value}
            </StyledDappCardBadge>
          ))
        }
        <StyledDappCardBadge className="group">
          {
            badges.slice(2).map((badge, index) => (
              <Image
                key={index}
                src={badge.icon}
                alt=""
                width={getIconSize(badge.iconSize).w}
                height={getIconSize(badge.iconSize).h}
              />
            ))
          }
        </StyledDappCardBadge>
      </>
    );
  };

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
                src={network.logo}
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
        <StyledDappCardStatics>
          {renderBadges()}
        </StyledDappCardStatics>
      </StyledDappCardBody>
    </StyledDappCard>
  );
};

export default DappCard;

const getIconSize = (size: number | number[]) => {
  if (Array.isArray(size)) {
    return {
      w: size[0],
      h: size[1],
    };
  }
  return {
    w: size,
    h: size,
  };
};

export interface Props {
  name: string;
  logo: string;
  description?: string;
  categories?: Category[];
  networks?: Network[];
  badges?: Badge[];
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
  logo: string;
}

export interface Badge {
  icon: string;
  // if you need to specify different width and height
  // please pass in an array: [width, height]
  iconSize: number | number[];
  value?: string;
}
