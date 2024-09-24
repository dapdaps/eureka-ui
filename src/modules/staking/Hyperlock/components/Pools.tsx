// @ts-nocheck
import { memo } from 'react';
import styled from 'styled-components';

import Spinner from '@/modules/components/Spinner';

import Pool from './Pool';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: var(--grid-columns);

  &.grid-pool-asset {
    grid-template-columns: 40% 30% 30%;
  }
`;

const GridItem = styled.div`
  padding-left: 24px;
  &.action-item {
    display: flex;
    column-gap: 10px;
    padding-right: 18px;
    justify-content: right;
  }
  &.action-item-head {
    display: flex;
    justify-content: center;
  }
`;

const PoolItem = styled.div`
  margin-bottom: 10px;
`;
export default memo(function Pools(props) {
  const { loading, list } = props;
  return (
    <>
      <GridContainer className="grid-pool-head">
        <GridItem>Pool</GridItem>
        <GridItem>LP Type</GridItem>
        <GridItem>Point Stack</GridItem>
        <GridItem>TVL</GridItem>
      </GridContainer>
      {loading && <Spinner />}
      {list.map((item) => (
        <PoolItem key={item.id}>
          <Pool
            {...{
              ...props,
              data: item,
              stakedTokens: state.stakedMap?.[item.id] || [],
              unStakedTokens: state.unstakedMap?.[item.id] || [],
              handler: state.handler,
              dappLink: dexConfig.dappLink,
              onSuccess: () => {
                updateState({
                  loading: true,
                  userDataUpdater: Date.now()
                });
              },
              onOpenStakeModal: (data) => {
                updateState({
                  modelData: data
                });
              }
            }}
            key={item.id}
          />
        </PoolItem>
      ))}
    </>
  );
});
