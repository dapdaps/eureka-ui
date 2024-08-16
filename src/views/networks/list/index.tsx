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
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const router = useRouter();

  const setQueryParams = useCallback((params: any) => {
    router.replace(`${pathname}${!params.toString() ? '' : '?' + params.toString()}`, undefined, { scroll: false });
  }, [router, pathname]);

  const onRewardToggle = () => {
    const _rewardNow = !rewardNow;
    const params = new URLSearchParams(searchParams);
    if (_rewardNow) {
      params.set('reward', TrueString);
    } else {
      params.delete('reward');
    }
    setRewardNow(_rewardNow);
    setQueryParams(params);
  };

  const onAirdropToggle = () => {
    const _airdrop = !airdrop;
    const params = new URLSearchParams(searchParams);
    if (_airdrop) {
      params.set('airdrop', TrueString);
    } else {
      params.delete('airdrop');
    }
    setAirdrop(_airdrop);
    setQueryParams(params);
  };

  const onSortSelect = (_sort: string) => {
    setSort(_sort);
  };

  const CurrentComponent = useMemo(() => {
    return ModeList.find(item => item.key === mode)?.component ?? <></>;
  }, [mode]);

  useEffect(() => {
    const _searchParams = new URLSearchParams(location.search);
    const _reward = _searchParams.get('reward');
    const _sort = _searchParams.get('sort');
    const _airdrop = _searchParams.get('airdrop');

    if (checkQueryEmpty(_sort as string, () => true)) {
      setSort(_sort);
    } else {
      setSort(SortList[0].value);
    }

    if (checkQueryEmpty(_reward as string, () => _reward === TrueString)) {
      setRewardNow(true);
    } else {
      setRewardNow(false);
    }

    if (checkQueryEmpty(_airdrop as string, () => _airdrop === TrueString)) {
      setAirdrop(true);
    } else {
      setAirdrop(false);
    }

  }, []);

  const onModeChange = (_mode: string) => {
    if (_mode === mode) {
      return;
    }
    setMode(_mode);
    const _params: any = new URLSearchParams();
    const _query = router.query;
    if (_mode === 'list') {
      if (_query.sort) {
        _params.set('sort', _query.sort);
      }
      setQueryParams(_params);
      return;
    }
    if (_mode === 'card') {
      if (sort && sort !== SortList[0].value) {
        _params.set('sort', sort);
      }
      if (airdrop) {
        _params.set('airdrop', 1);
      }
      if (rewardNow) {
        _params.set('reward', 1);
      }
      setQueryParams(_params);
      return;
    }
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
              mode === ModeList[1].key && (
                <>
                  <Radio selected={airdrop} onChange={onAirdropToggle} label="Potential Airdrop" />
                  <Radio colorful selected={rewardNow} onChange={onRewardToggle} label="Reward now" />
                </>
              )
            }
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
