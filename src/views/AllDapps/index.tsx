import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import Selector from '@/components/Dropdown/Selector';
import Loading from '@/components/Icons/Loading';
import Radio from '@/components/Radio';
import chainCofig from '@/config/chains';
import { NetworkAll, useNetworks } from '@/hooks/useNetworks';
import SortBy from '@/views/AllDapps/components/Filters/SortBy';
import AllDappsTitle from '@/views/AllDapps/components/Title';
import { SortList, TrueString } from '@/views/AllDapps/config';
import {
  StyledBody,
  StyledContainer,
  StyledFilters,
  StyledNetworkDropdownItem,
  StyledSearch,
  StyledSearchIcon,
  StyledSearchInput,
  StyledSelectorLoading
} from '@/views/AllDapps/styles';
import { checkQueryEmpty } from '@/views/AllDapps/utils';

import DappList from './components/DappList';
import useList from './hooks/useList';

const categoryAnimation = (_scrolled: boolean, visible = {}, hidden = {}) => ({
  variants: {
    visible,
    hidden
  },
  initial: 'hidden',
  animate: _scrolled ? 'visible' : 'hidden',
  transition: {
    duration: 0.6
  }
});

const AllDapps = (props: Props) => {
  const {} = props;

  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();

  const router = useRouter();
  const { networkList, networkLoading } = useNetworks({ isAll: true, isAllIcon: false });

  const [network, setNetwork] = useState<any>(NetworkAll.id);
  const [sort, setSort] = useState<any>(SortList[0].value);
  const [rewardNow, setRewardNow] = useState<boolean>(false);
  const [airdrop, setAirdrop] = useState<boolean>(false);
  const [category, setCategory] = useState<number | string | undefined>(undefined);
  const [searchWord, setSearchWord] = useState<string | undefined>(undefined);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const categoryRef = useRef<any>(null);

  const { loading, dappList, pageTotal, pageIndex, fetchDappList, titleDappList } = useList({
    network,
    sort,
    rewardNow,
    searchText: searchWord,
    airdrop,
    category
  });

  const setQueryParams = useCallback(
    (params: any) => {
      router.replace(`${pathname}${!params.toString() ? '' : '?' + params.toString()}`, undefined, { scroll: false });
    },
    [router, pathname]
  );

  const onSelectNetwork = (_network: number) => {
    if (_network === -1) {
      params.delete('network');
    } else {
      params.set('network', _network.toString());
    }
    setQueryParams(params);
    setNetwork(_network);
  };

  const onSortSelect = (_sort: string) => {
    if (_sort === SortList[0].value) {
      params.delete('sort');
    } else {
      params.set('sort', _sort);
    }
    setQueryParams(params);
    setSort(_sort);
  };

  const onSelectCategory = (_category: any) => {
    if (!_category) {
      params.delete('category');
    } else {
      params.set('category', _category.toString());
    }
    setQueryParams(params);
    setCategory(_category);
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const _searchWord = e.target.value.trim();
    setSearchWord(_searchWord);
    if (_searchWord && _searchWord !== 'undefined') {
      params.set('searchword', encodeURIComponent(_searchWord));
    } else {
      params.delete('searchword');
    }
    setQueryParams(params);
    setSearchWord(_searchWord);
  };

  const onRewardToggle = () => {
    const _rewardNow = !rewardNow;
    if (_rewardNow) {
      params.set('reward', TrueString);
    } else {
      params.delete('reward');
    }
    setQueryParams(params);
    setRewardNow(_rewardNow);
  };

  const onAirdropToggle = () => {
    const _airdrop = !airdrop;
    if (_airdrop) {
      params.set('airdrop', TrueString);
    } else {
      params.delete('airdrop');
    }
    setQueryParams(params);
    setAirdrop(_airdrop);
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
    const searchParams = new URLSearchParams(location.search);
    const _network = searchParams.get('network');
    const _reward = searchParams.get('reward');
    const _sort = searchParams.get('sort');
    const _category = searchParams.get('category');
    const _searchWord = searchParams.get('searchword');
    const _airdrop = searchParams.get('airdrop');

    if (
      networkList.length &&
      checkQueryEmpty(_network as string, () => {
        return networkList.some((it: any) => it.chain_id === Number(_network));
      })
    ) {
      setNetwork(Number(_network));
    }

    if (checkQueryEmpty(_sort as string, () => true)) {
      setSort(_sort);
    }

    if (checkQueryEmpty(_category as string, () => !isNaN(Number(_category)))) {
      setCategory(Number(_category));
    }

    if (checkQueryEmpty(_reward as string, () => _reward === TrueString)) {
      setRewardNow(true);
    }

    if (checkQueryEmpty(_airdrop as string, () => _airdrop === TrueString)) {
      setAirdrop(true);
    }

    if (checkQueryEmpty(decodeURIComponent(_searchWord as string), () => true)) {
      setSearchWord(decodeURIComponent(_searchWord as string));
    }

    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }
  }, [networkList]);

  return (
    <StyledContainer>
      <AllDappsTitle
        bp="1007-001"
        categoryRef={categoryRef}
        animation={categoryAnimation(scrolled, { zIndex: 49, top: 70 }, { zIndex: 0, top: 0 })}
        onCategory={onSelectCategory}
        activeCategory={category}
        dappList={titleDappList ?? []}
        categoryClassname={`${scrolled ? 'category-fixed' : ''} category-title`}
      />
      <StyledBody>
        <StyledFilters
          $fixed={scrolled}
          {...categoryAnimation(scrolled, { zIndex: 49, top: 104 }, { zIndex: 2, top: 0 })}
        >
          {networkLoading ? (
            <StyledSelectorLoading>
              <Loading />
            </StyledSelectorLoading>
          ) : (
            <Selector
              list={networkList
                .filter((n) => n.chain_id === -1 || !!chainCofig[n.chain_id])
                .map((n) => ({ ...n, key: n.id, label: n.name, value: n.chain_id }))}
              value={network}
              onSelect={onSelectNetwork}
              itemValueKey="chain_id"
              itemLabelKey="name"
              popupStyle={{
                width: 196,
                maxHeight: 300
              }}
              renderItem={(item) => (
                <StyledNetworkDropdownItem>
                  {item.logo && <Image src={item.logo} alt="" width={22} height={22} />}
                  {item.name}
                </StyledNetworkDropdownItem>
              )}
              isArrowRotate={false}
            />
          )}
          <SortBy value={sort} onSelect={onSortSelect} />
          <Radio selected={airdrop} onChange={onAirdropToggle} label="Potential Airdrop" />
          {/* <Radio colorful selected={rewardNow} onChange={onRewardToggle} label='Reward now' /> */}
          <StyledSearch>
            <StyledSearchIcon>
              <Image src="/images/alldapps/icon-search.svg" alt="" width={18} height={14} />
            </StyledSearchIcon>
            <StyledSearchInput type="text" placeholder="search dApp" value={searchWord} onChange={onSearchChange} />
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

interface Props {}
