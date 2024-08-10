import styled from 'styled-components';
import Link from 'next/link';
import IconLink from '@public/images/header/link.svg';
import { Dapp, Network } from './hooks/useDefaultSearch';
import useDappOpen from '@/hooks/useDappOpen';
import { IdToPath } from '@/config/all-in-one/chains';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';

const StyleTitle = styled.div`
  font-size: 14px;
  line-height: 14px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #979abe;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  .links {
    font-size: 12px;
    line-height: 12px;
    font-weight: 400;
    color: #979abe;
    display: flex;
    align-items: center;
    gap: 6px;
    &:hover {
      color: #fff;
      cursor: pointer;
    }
  }
`;

const StylePopular = styled.div``;

const StyleList = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 20px;

    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
      cursor: pointer;
    }
    .label {
      display: flex;
      gap: 10px;
      align-items: center;
      .brand {
        width: 30px;
        height: 30px;
      }
      .name {
        font-weight: 600;
        font-size: 16px;
        line-height: 16px;
        color: #fff;
      }
    }
    .value {
      display: flex;
      gap: 6px;
      align-items: center;
      flex-flow: column wrap;
      .tvl {
        font-weight: 500;
        font-size: 14px;
        line-height: 14px;
        color: #fff;
      }
      .icon {
        display: flex;
        gap: 2px;
        align-items: center;
        .up {
          font-size: 12px;
          line-height: 12px;
          color: #06c17e;
        }
      }
    }
`

export enum PopularType {
  Chains = 'Chains',
  dApps = 'dApps',
}

type PopularItem = Network | Dapp;


const LoadingCard = () => {
  return Array.from({ length: 3 }).map((_) => (
    <StyleList>
      <div className="label">
        <Skeleton width="30px" height="30px"  borderRadius={'6px'}/>
        <Skeleton width="350px" height="16px" />
      </div>
    </StyleList>
  ));
}

const Popular = ({
  title,
  data,
  loading,
  classNames,
  sx,
  onClick
}: {
  title: PopularType;
  data: PopularItem[];
  loading: boolean;
  classNames?: string;
  sx?: React.CSSProperties;
  onClick?: () => void;
}) => {
  const { open } = useDappOpen();
  const router = useRouter();
  const onDappCardClick = (dapp: any) => {
    open({ dapp, from: 'alldapps' });
  };

  const handleClick = (item: PopularItem) => {
    if (title === PopularType.dApps) {
      const dapp = item as Dapp;
      return onDappCardClick(dapp.id);
    } else {
      const network = item as Network;
      router.push(`/networks/${IdToPath[network.id]}`);
    }
    onClick?.()
  }

  const handleGotoAll = () => {
    if (title === PopularType.dApps) {
      router.push('/alldapps');
    } else {
      router.push('/networks');
    }
    onClick?.()
  }

  return (
    <StylePopular className={classNames} style={sx}>
      <StyleTitle>
        <span>Popular {title}</span>
        <div onClick={handleGotoAll} className="links">
          View all <IconLink />
        </div>
      </StyleTitle>
      {
        loading ? <LoadingCard /> : (
          data.map((item: PopularItem) => (
            <StyleList key={item.id} onClick={() => handleClick(item)}>
              <div className="label">
                <img className="brand" src={item.logo} alt="" />
                <span className="name">{item.name}</span>
              </div>
            </StyleList>
          ))
        )
      }
    </StylePopular>
  );
};

export default Popular;
