import { useDebounceFn } from 'ahooks';
import { useAnimate, useInView } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { Category } from '@/hooks/useAirdrop';
import { formatValueDecimal } from '@/utils/formate';
import {
  StyledContainer,
  StyledContainerInner,
  StyledRecordContainer,
  StyledRelatedContainer,
  StyledRelatedOdyssey
} from '@/views/Dapp/components/DappDetail/styles';
import useCategoryDappList from '@/views/Quest/hooks/useCategoryDappList';

import DetailTabs from './DetailTabs/index';
import RelativeOdyssey from './RelativeOdyssey';
import DappSummary from './Summary';

const StyleImageMedals = styled.img`
  margin-top: 51px;
  width: 500px;
  height: 220px;
`;
const DappDetail = (props: Props) => {
  const {
    trading_volume,
    trading_volume_change_percent,
    total_execution,
    participants,
    participants_change_percent,
    route,
    dapp_category,
    id,
    tvl,
    trading_volume_general
  } = props;

  const [ref, animate] = useAnimate();
  const isInView = useInView(ref, { once: true });
  const { categories: allCaregories } = useCategoryDappList();

  const summaryList = [
    {
      key: 'tvl',
      label: 'TVL',
      value: `${formatValueDecimal(tvl, '$', 2, true)}`,
      increaseValue: ''
    },
    {
      key: 'txns',
      label: 'Volume (24h)',
      value: `${formatValueDecimal(trading_volume_general, '$', 2, true)}`,
      increaseValue: ''
    }
  ];

  const visible = useDebounceFn(
    () => {
      animate(
        ref.current,
        {
          opacity: 1,
          y: 0
        },
        {
          duration: 1
        }
      );
    },
    { wait: 300 }
  );

  const categories = useMemo(() => {
    const _categories = dapp_category || [];
    // fix#DAP-862
    if (['dapp/kim-exchange', 'dapp/thruster-finance'].includes(route) && allCaregories) {
      const liquidity = allCaregories[4];
      liquidity &&
        _categories.push({
          category_id: liquidity.id,
          category_name: liquidity.name,
          dapp_id: id
        });
    }
    return _categories;
  }, [dapp_category, route, allCaregories, id]);

  useEffect(() => {
    if (!ref.current) return;
    if (!isInView) {
      return;
    }
    visible.run();
  }, [isInView]);

  return (
    <StyledContainer>
      <StyledContainerInner
        ref={ref}
        initial={{
          opacity: 0,
          y: 100
        }}
      >
        <DappSummary
          dappId={props?.id}
          name={props?.name ?? ''}
          logo={props?.logo ?? ''}
          networks={props?.dapp_network ?? []}
          categories={categories}
          summaries={summaryList}
        />
        <StyledRelatedContainer>
          <StyledRecordContainer>
            <DetailTabs {...props} overviewTitle={props?.name && `What is ${props.name} ?`} category={Category.dApp} />
          </StyledRecordContainer>
          <StyledRelatedOdyssey>
            <StyleImageMedals src="/images/medals/coming-soon-medal.png" alt="medals" />
            {/* <Medal id={props?.id} type={Category.dApp} /> */}
            <RelativeOdyssey title="Related Campaign" dappName={props?.name} dappId={props?.id} />
          </StyledRelatedOdyssey>
        </StyledRelatedContainer>
      </StyledContainerInner>
    </StyledContainer>
  );
};

export default DappDetail;

export interface Props {
  tvl: number;
  trading_volume_general: number;
  trading_volume: string;
  trading_volume_change_percent: string;
  total_execution: string;
  participants: string;
  participants_change_percent: string;
  name: string;
  logo: string;
  route: string;
  id: number;
  dapp_network: any;
  dapp_category: any;
  description: string;
  category: Category;
  overviewTitle: string;
  chain_id?: number;
  overviewShadow?: {
    icon?: string;
    color?: string;
  };
}
