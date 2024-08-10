import {
  StyledContainer, StyledEmpty,
  StyledOdysseyDetail,
  StyledRelatedTitle,
} from './styles';

import Loading from '@/components/Icons/Loading';
import { memo, useEffect, useState } from 'react';
import OdysseyCard from './Card';
import { get } from '@/utils/http';
import Empty from '@/components/Empty';
import { StyledFlex } from '@/styled/styles';

const RelativeOdyssey = (props: Props) => {
  const {
    title,
    dappId,
    networkId,
    chainId,
  } = props;

  const [odysseyList, setOdysseyList] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);

  const getOdysseyList = async () => {
    if (loading) return;
    setLoading(true);
    let url: string = '';
    let params: any;
    if (dappId) {
      url = '/api/compass/list-by-dapp';
      params = {
        dapp_id: dappId,
      };
    }
    if (networkId) {
      url = '/api/compass/list-by-network';
      params = {
        network_id: networkId,
        chain_id: chainId,
      };
    }
    if (!url) {
      setLoading(false);
      return;
    }
    try {
      const result = await get(url, params);
      const data = result.data || [];
      setOdysseyList(data.sort((a: any, b: any) => b.end_time - a.end_time));
    } catch (err) {
      console.log(err, 'err');
    }
    setLoading(false);
  };

  useEffect(() => {
    getOdysseyList();
  }, [dappId, networkId, chainId]);

  return (
    <StyledContainer>
      <StyledRelatedTitle>{title}</StyledRelatedTitle>
      {
        loading ? (
          <StyledFlex style={{ height: 150 }} justifyContent="center" alignItems="center">
            <Loading size={24} />
          </StyledFlex>
        ) : (
          odysseyList.length ? (
            <StyledOdysseyDetail>
              {
                odysseyList.map((compass) => (
                  <OdysseyCard
                    key={compass.id}
                    id={compass.id}
                    name={compass.name}
                    banner={compass.banner}
                    status={compass.status}
                    rewards={compass.reward}
                    volume={compass.trading_volume}
                    users={compass.total_users}
                    // medals={[
                    //   { icon: '/images/medals/medal-mode-bow.svg', id: 1 },
                    // ]}
                  />
                ))
              }
            </StyledOdysseyDetail>
          ) : (
            <Empty
              tips={(
                <StyledEmpty>No related campaign and rewards now.</StyledEmpty>
              )}
              size={42}
            />
          )
        )
      }
    </StyledContainer>
  );
};

export default memo(RelativeOdyssey);

export interface Props {
  title: string;
  dappId?: number;
  networkId?: number;
  chainId?: number;
}
