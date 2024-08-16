import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo } from 'react';
import popupsData from '@/config/all-in-one/chains';
import { Network } from '@/views/networks/list/hooks/useNetworks';
import Reward from '@/views/networks/list/components/reward';
import {
  BtnGroup,
  DataList,
  Wrap,
  Head,
} from '@/views/networks/list/components/styles';
import { CardHead, DataListShown, FooterButton } from '@/views/networks/list/components/utils';
import { Advertise } from '@/hooks/useAdvertise';

const ListItem: FC<IProps> = ({ dataSource }) => {
  const {
    id,
    chain_id,
    odyssey,
  } = dataSource;

  const popupsDataArray = Object.values(popupsData);
  const matchedItem = popupsDataArray.find((item) => item.chainId === chain_id);
  const path = matchedItem ? matchedItem.path : '';

  return (
    <Wrap key={id} $bgColor={matchedItem?.theme.button.bg ?? '#FDFE03'} className='item-shadow'>
      <Head>
        <CardHead {...dataSource}/>
        <BtnGroup>
          <FooterButton
            bgColor={matchedItem?.theme.button.bg}
            textColor={matchedItem?.theme.button.text}
            path={path}
            id={id}
          />
        </BtnGroup>
      </Head>
      <DataList>
        {
          DataListShown({
            ...dataSource
          }).map((item) => (
            <div className="item" key={item.key}>
              <span className="key">{item.label}</span>
              <span className="value">{item.value}</span>
            </div>
          ))
        }
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

export interface IProps {
  dataSource: Network & Advertise;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}