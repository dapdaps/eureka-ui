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
  } = dataSource;

  const popupsDataArray = Object.values(popupsData);
  const matchedItem = popupsDataArray.find((item) => item.chainId === chain_id);
  const path = matchedItem ? matchedItem.path : '';

  return (
    <Wrap>
      <Head>
        <LogoGroup>
          <Image src={logo} width={60} height={60} alt="network" />
          <ChainInfo>
            <ChainName>{name}</ChainName>
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
          <Btn href={`/all-in-one/${path}`} data-bp="10012-003">
            Chain-Navi
          </Btn>
          <Btn href={`/networks/${IdToPath[id]}`} data-bp="10012-002">
            Details
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
        <div className="item">
          <span className="key">Campaign Reward</span>
          <Reward odyssey={odyssey} />
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

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    border: 1px solid rgb(235, 244, 121);
  }
`;
const Head = styled.div`
  display: flex;
  justify-content: space-between;
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
`;
const Btn = styled(Link)`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(55, 58, 83, 1);
  background: linear-gradient(0deg, rgba(55, 58, 83, 0.5), rgba(55, 58, 83, 0.5));
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  border-radius: 12px;
  padding: 12px 22px;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
    color: rgba(30, 32, 40, 1);
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

  .item {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .key {
    color: #979abe;
    text-align: center;
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
