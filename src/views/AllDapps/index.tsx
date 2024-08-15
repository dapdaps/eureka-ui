import {
  StyledBody,
  StyledContainer,
  StyledFilters,
  StyledNetworkDropdownItem,
  StyledRadio,
  StyledRewardNow,
  StyledSearch,
  StyledSearchIcon,
  StyledSearchInput,
  StyledSelectorLoading
} from '@/views/AllDapps/styles';
import AllDappsTitle from '@/views/AllDapps/components/Title';
import Selector from '@/components/Dropdown/Selector';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { SortList, TrueString } from '@/views/AllDapps/config';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Loading from '@/components/Icons/Loading';
import DappList from './components/DappList';
import { checkQueryEmpty } from '@/views/AllDapps/utils';
import useList from './hooks/useList';
import { NetworkAll, useNetworks } from '@/hooks/useNetworks';

const categoryAnimation = (_scrolled: boolean, visible = {}, hidden = {}) => ({
  variants:{
    visible,
    hidden,
  },
  initial:"hidden",
  animate: _scrolled ? 'visible' : 'hidden',
  transition:{
    duration: 0.6,
  }
})

const AllDapps = (props: Props) => {
  const {} = props;

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const router = useRouter();
  const { networkList, networkLoading } = useNetworks({ isAll: true, isAllIcon: false });

  const [network, setNetwork] = useState<any>(NetworkAll.id);
  const [sort, setSort] = useState<any>(SortList[0].value);
  const [rewardNow, setRewardNow] = useState<boolean>(false);
  const [airdrop, setAirdrop] = useState<boolean>(false);
  const [category, setCategory] = useState<number| string>();
  const [searchWord, setSearchWord] = useState<string | undefined>();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const categoryRef = useRef<any>(null);

  const {
    loading,
    dappList,
    pageTotal,
    pageIndex,
    fetchDappList,
    titleDappList
  } = useList({
    network,
    sort,
    rewardNow,
    searchText: searchWord,
    airdrop,
    category
  });

  const setQueryParams = useCallback((params: any) => {
    router.replace(`${pathname}${!params.toString() ? '' : '?' + params.toString()}`, undefined, { scroll: false });
  }, [router, pathname]);

  const onSelectNetwork = (_network: number) => {
    const params = new URLSearchParams(searchParams);
    if (_network === -1) {
      params.delete('network');
    } else {
      params.set('network', _network.toString());
    }
    setQueryParams(params);
  }

  const onSortSelect = (_sort: string) => {
    const params = new URLSearchParams(searchParams);
    if (_sort === SortList[0].value) {
      params.delete('sort');
    } else {
      params.set('sort', _sort);
    }
    setQueryParams(params);
  }

  const onSelectCategory = (_category: any) => {
    const params = new URLSearchParams(searchParams);
    if (!_category) {
      params.delete('category');
    } else {
      params.set('category', _category.toString());
    }
    setQueryParams(params);
  }

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const _searchWord = e.target.value.trim();
    setSearchWord(_searchWord);
    if (_searchWord && _searchWord !== 'undefined') {
      params.set('searchword', encodeURIComponent(_searchWord));
    } else {
      params.delete('searchword');
    }
    setQueryParams(params);
  }

  const onRewardToggle = () => {
    const _rewardNow = !rewardNow;
    const params = new URLSearchParams(searchParams);
    if (_rewardNow) {
      params.set('reward', TrueString);
    } else {
      params.delete('reward');
    }
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
    setQueryParams(params);
  }

  const onPage = (_page: number) => {
    const params = new URLSearchParams(searchParams);
    if (!_page || _page === 1) {
      params.delete('page');
    } else {
      params.set('page', _page + '');
    }
    setQueryParams(params);
  };

  useEffect(() => {
    const navbarTop = categoryRef?.current?.offsetTop ?? 278;

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      setScrolled(scrollTop > navbarTop);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [categoryRef]);

  useEffect(() => {
    const {
      network: _network,
      reward: _reward,
      sort: _sort,
      category: _category,
      searchword: _searchWord,
      airdrop: _airdrop
    } = router.query;

    if (checkQueryEmpty(_network as string, () => {
      return networkList.some((it: any) => it.chain_id === Number(_network));
    })) {
      setNetwork(Number(_network));
    } else {
      setNetwork(NetworkAll.id);
    }

    if (checkQueryEmpty(_sort as string, () => true)) {
      setSort(_sort);
    } else {
      setSort(SortList[0].value);
    }

    if (checkQueryEmpty(_category as string, () => !isNaN(Number(_category)))) {
      setCategory(Number(_category));
    } else {
      setCategory(undefined);
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

    if (checkQueryEmpty(decodeURIComponent(_searchWord as string), () => true)) {
      setSearchWord(decodeURIComponent(_searchWord as string));
    } else {
      setSearchWord(undefined);
    }

    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, [router.query, networkList]);

  return (
    <StyledContainer>
      <AllDappsTitle
        bp='1007-001'
        categoryRef={categoryRef}
        animation={categoryAnimation(scrolled, {zIndex: 49, top: 70 }, { zIndex: 0, top: 0 })}
        onCategory={onSelectCategory}
        activeCategory={category}
        dappList={titleDappList ?? []}
        categoryClassname={`${scrolled ? 'category-fixed' : ''} category-title`}
      />
      <StyledBody>
        <StyledFilters
          $fixed={scrolled}
          {
            ...categoryAnimation(scrolled, {zIndex: 49, top: 104 }, { zIndex: 2, top: 0 })
          }
        >
          {
            networkLoading ? (
              <StyledSelectorLoading>
                <Loading />
              </StyledSelectorLoading>
              ) : (
              <Selector
                list={networkList.map((n) => ({ ...n, key: n.id, label: n.name, value: n.chain_id }))}
                value={network}
                onSelect={onSelectNetwork}
                itemValueKey="chain_id"
                itemLabelKey="name"
                popupStyle={{
                  width: 196,
                  maxHeight: 300,
                }}
                renderItem={(item) => (
                  <StyledNetworkDropdownItem>
                    {
                      item.logo && (
                        <Image src={item.logo} alt="" width={22} height={22} />
                      )
                    }
                    {item.name}
                  </StyledNetworkDropdownItem>
                )}
                isArrowRotate={false}
              />
            )
          }
          <Selector
            list={SortList}
            value={sort}
            onSelect={onSortSelect}
            popupStyle={{
              width: 169,
              maxHeight: 300,
            }}
            isArrowRotate={false}
          />
          <StyledRadio
            $selected={airdrop}
            onClick={onAirdropToggle}
          >
            <div className="radio-control"></div>
            <div className="radio-text">
              Potential Airdrop
            </div>
          </StyledRadio>
          <StyledRewardNow
            $selected={rewardNow}
            onClick={onRewardToggle}
          >
            <div className="radio-control"></div>
            <div className="radio-text">
              Reward now
            </div>
          </StyledRewardNow>
          <StyledSearch>
            <StyledSearchIcon>
              <Image src="/images/alldapps/icon-search.svg" alt="" width={18} height={14} />
            </StyledSearchIcon>
            <StyledSearchInput
              type="text"
              placeholder="search dApp"
              value={searchWord}
              onChange={onSearchChange}
            />
          </StyledSearch>
        </StyledFilters>
        <DappList
          loading={loading}
          dappList={dappList}
          pageTotal={pageTotal}
          pageIndex={pageIndex}
          fetchDappList={fetchDappList}
          bp={{ detail: '', dapp: '1007-002' }}
        />
      </StyledBody>
    </StyledContainer>
  );
};

export default AllDapps;

interface Props {

}
