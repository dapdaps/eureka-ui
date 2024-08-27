import { useDebounceFn } from 'ahooks';
import { useAnimate, useInView } from 'framer-motion';
import { useEffect } from 'react';
import styled from 'styled-components';

import { Category } from '@/hooks/useAirdrop';
import { formatIntegerThousandsSeparator } from '@/utils/format-number';
import {
  StyledContainer,
StyledContainerInner,
  StyledRecordContainer,
  StyledRelatedContainer,
  StyledRelatedOdyssey, } from '@/views/Dapp/components/DappDetail/styles';

import DetailTabs from './DetailTabs/index';
import Medal from './Medal';
import RelativeOdyssey from './RelativeOdyssey';
import DappSummary from './Summary';


const StyleImageMedals = styled.img`
  margin-top: 51px;
  width: 100%;
`;

const DappDetail = (props: Props) => {
  const {
    trading_volume,
    trading_volume_change_percent,
    total_execution,
    participants,
    participants_change_percent,
  } = props;

  const [ref, animate] = useAnimate();
  const isInView = useInView(ref, { once: true });

  const summaryList = [
    {
      key: 'volume',
      label: 'Trading Volume on DapDap',
      value: `$${formatIntegerThousandsSeparator(trading_volume, 1)}`,
      increaseValue: trading_volume_change_percent || '',
    },
    {
      key: 'txns',
      label: 'Total txns',
      value: `${formatIntegerThousandsSeparator(total_execution, 0)}`,
      increaseValue: '',
    },
    {
      key: 'user',
      label: 'User',
      value: `${formatIntegerThousandsSeparator(participants, 0)}`,
      increaseValue: participants_change_percent || '',
    },
  ];

  const visible = useDebounceFn(() => {
    animate(ref.current, {
      opacity: 1,
      y: 0,
    }, {
      duration: 1,
    });
  }, { wait: 300 });

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
          y: 100,
        }}
      >
        <DappSummary
          dappId={props?.id}
          name={props?.name ?? ''}
          logo={props?.logo ?? ''}
          networks={props?.dapp_network ?? []}
          categories={props?.dapp_category ?? []}
          summaries={summaryList}
        />
        <StyledRelatedContainer>
          <StyledRecordContainer>
            <DetailTabs
              {...props}
              overviewTitle={props?.name && `What is ${props.name} ?`}
              category={Category.dApp}
            />
          </StyledRecordContainer>
          <StyledRelatedOdyssey>
            <StyleImageMedals src="/images/medals/coming-soon-medal.png" alt="medals" />
            {/* <Medal id={props?.id} type={Category.dApp} /> */}
            <RelativeOdyssey
              title='Related Campaign'
              dappId={props?.id}
            />
          </StyledRelatedOdyssey>
        </StyledRelatedContainer>
      </StyledContainerInner>
  </StyledContainer>
  );
}

export default DappDetail;

export interface Props {
  trading_volume: string;
  trading_volume_change_percent: string;
  total_execution: string;
  participants: string;
  participants_change_percent: string;
  name: string;
  logo: string;
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
