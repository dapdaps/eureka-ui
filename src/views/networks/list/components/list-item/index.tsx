import type { CSSProperties, FC, ReactNode } from 'react';
import React, { memo } from 'react';
import popupsData, { IdToPath } from '@/config/all-in-one/chains';
import { Network } from '@/views/networks/list/hooks/useNetworks';
import Reward from '@/views/networks/list/components/reward';
import {
  Btn,
  BtnGroup,
  DataList,
  StyledChainOdyssey,
  Wrap,
  Head,
  ChainOdyssey,
} from '@/views/networks/list/components/styles';
import { CardHead, DataListShown } from '@/views/networks/list/components/utils';

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
          { odyssey.length > 0 && (<StyledChainOdyssey><ChainOdyssey src='/images/odyssey/welcome/logo.gif'/></StyledChainOdyssey>) }
          <Btn href={`/networks/${IdToPath[id]}`} data-bp="1006-002">
            Details
          </Btn>
          <Btn href={`/all-in-one/${path}`} data-bp="1006-001" className="allinone-btn"
               $bgColor={matchedItem?.theme.button.bg} $color={matchedItem?.theme.button.text}>
            All-In-One
          </Btn>
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
  dataSource: Network;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}