import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { ListItem } from './components';
import ListCard from './components/list-card';
import {
  StyledContainer,
  StyledBanner,
  StyledTitle,
  StyledDesc,
  StyledWrap,
  StyledH1,
  StyledHead,
  StyledFilters,
  StyledFilterText,
} from './styles';
import useNetworks from './hooks/useNetworks';
import LoadingSkeleton from './components/loading';
import FilterIconList from '@public/images/networks/icon-list.svg';
import FilterIconCard from '@public/images/networks/icon-card.svg';
import SortBy from '@/views/AllDapps/components/Filters/SortBy';
import Radio from '@/components/Radio';
import { SortList, TrueString } from '@/views/AllDapps/config';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { ListContainer } from '@/views/networks/list/components/styles';
import { checkQueryEmpty } from '@/views/AllDapps/utils';
import { useNetworkStore } from '@/stores/network';
import Empty from '@/views/networks/list/components/empty';

const ModeList: Mode[] = [
  {
    key: 'list',
    icon: FilterIconList,
    component: ListItem,
  },
  {
    key: 'card',
    icon: FilterIconCard,
    component: ListCard,
  },
];

const List = () => {

  const mode = useNetworkStore((store: any) => store.mode);
  const setMode = useNetworkStore((store: any) => store.setMode);

  const [sort, setSort] = useState<any>(SortList[0].value);
  const [rewardNow, setRewardNow] = useState<boolean>(false);
  const [airdrop, setAirdrop] = useState<boolean>(false);
  const { loading, l1NetworkList, l2networkList } = useNetworks({ sort, mode, rewardNow, airdrop });

  const onSortSelect = (_sort: string) => {
    setSort(_sort);
  };

  const CurrentComponent = useMemo(() => {
    return ModeList.find(item => item.key === mode)?.component ?? <></>;
  }, [mode]);

  useEffect(() => {
    const _searchParams = new URLSearchParams(location.search);
    const _sort = _searchParams.get('sort');

    if (checkQueryEmpty(_sort as string, () => true)) {
      setSort(_sort);
    } else {
      setSort(SortList[0].value);
    }
  }, []);

  const onModeChange = (_mode: string) => {
    if (_mode === mode) {
      return;
    }
    setMode(_mode);
  };

  return (
    <StyledContainer>
      <StyledBanner>
        <StyledTitle>
          Explore <span className="highlight">15+ L2</span> Networks
        </StyledTitle>
        <StyledDesc>
          Discover the most popular Ethereum roll-ups and EVMs across the market. Also, <br />
          explore related blockchains including Layer-1s, sidechains, and testnets.
        </StyledDesc>
      </StyledBanner>
      <StyledWrap>
        <StyledHead>
          <StyledH1>L2 Networks</StyledH1>
          <StyledFilters>
            <StyledFilterText>Sort by</StyledFilterText>
            <SortBy value={sort} isUrlParams onSelect={onSortSelect} />
            {
              ModeList.map((item) => (
                <item.icon
                  key={item.key}
                  className={`filter-icon ${mode === item.key ? 'active' : ''}`}
                  onClick={() => onModeChange(item.key)}
                />
              ))
            }
          </StyledFilters>
        </StyledHead>
        <ListContainer className={`${mode}-view`}>
          {
            loading ? [...new Array(6).keys()].map((key) => (
              <LoadingSkeleton key={key} type={mode} />
            )) : (
              l2networkList.length > 0 ?
                l2networkList.map((item: any, index: number) => (
                  <CurrentComponent dataSource={item} key={item.id} />
                )) :
                <Empty />
            )
          }
        </ListContainer>
        <StyledHead>
          <StyledH1>L1 Networks</StyledH1>
        </StyledHead>
        <ListContainer className={`${mode}-view`}>
          {
            loading ? [...new Array(2).keys()].map((key) => (
              <LoadingSkeleton key={key} type={mode} />
            )) : (
              l1NetworkList.length > 0 ?
                l1NetworkList.map((item: any) => (
                  <CurrentComponent dataSource={item} key={item.id} />
                )) :
                <Empty />
            )
          }
        </ListContainer>
      </StyledWrap>
    </StyledContainer>
  );
};

export default memo(List);

export type ModeKey = 'list' | 'card';

interface Mode {
  key: ModeKey;
  icon: any;
  component: any;
}
