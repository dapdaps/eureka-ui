import {
  StyledContainer,
  StyledOdysseyDetail,
  StyledRelatedTitle,
} from './styles';

import Loading from '@/components/Icons/Loading';
import { memo, useEffect, useState } from 'react';
import OdysseyCard from './Card';
import { get } from '@/utils/http';

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
    try {
      if (dappId) {
        const result = await get(`/api/compass/list-by-dapp?dapp_id=${dappId}`);
        console.log(result);
        const data = result.data || [];
        setOdysseyList(data.sort((a: any, b: any) => b.end_time - a.end_time));
      }
    } catch (err) {
      console.log(err, 'err');
    }
    setLoading(false);
  };

  useEffect(() => {
    getOdysseyList();
  }, []);

  return (
    <StyledContainer>
      <StyledRelatedTitle>{title}</StyledRelatedTitle>
      {
        loading ? (
          <Loading size={24} />
        ) : (
          <>
            <StyledOdysseyDetail>
              {
                odysseyList.map((compass) => (
                  <OdysseyCard
                    key={compass.id}
                    id={compass.id}
                    name={compass.description}
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
          </>
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
