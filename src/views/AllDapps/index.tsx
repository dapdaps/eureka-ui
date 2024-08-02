import {
  StyledBody,
  StyledContainer,
  StyledFilters,
  StyledNetworkDropdownItem, StyledRadio,
  StyledRewardNow,
  StyledSearch,
  StyledSearchIcon,
  StyledSearchInput,
  StyledSelectorLoading,
  StyledFiltersBackdrop
} from '@/views/AllDapps/styles';
import AllDappsTitle from '@/views/AllDapps/components/Title';
import Selector from '@/components/Dropdown/Selector';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';
import Image from 'next/image';
import { AllNetworks, SortList, TrueString } from '@/views/AllDapps/config';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Loading from '@/components/Icons/Loading';
import DappList from './components/DappList';
import { checkQueryEmpty } from '@/views/AllDapps/utils';

const AllDapps = (props: Props) => {
  const {} = props;

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const router = useRouter();

  const categoryRef = useRef<any>(null);

  const [networkList, setNetworkList] = useState<any>([AllNetworks]);
  const [networkLoading, setNetworkLoading] = useState<boolean>(false);
  const [network, setNetwork] = useState<any>(AllNetworks.id);
  const [sort, setSort] = useState<any>(SortList[0].value);
  const [rewardNow, setRewardNow] = useState<boolean>(false);
  const [airdrop, setAirdrop] = useState<boolean>(false);
  const [category, setCategory] = useState<number| string>();
  const [searchWord, setSearchWord] = useState<string | undefined>();
  const [scrolled, setScrolled] = useState<boolean>(false);

  const setQueryParams = useCallback((params: any) => {
    router.replace(`${pathname}${!params.toString() ? '' : '?' + params.toString()}`, undefined, { scroll: false });
  }, [router, pathname]);

  const fetchNetworkData = async () => {
    try {
      setNetworkLoading(true);
      const resultNetwork = await get(`${QUEST_PATH}/api/network/list`);
      const data = resultNetwork.data || [];
      data.unshift(AllNetworks);
      setNetworkList(data);
      setNetworkLoading(false);
    } catch (error) {
      console.error('Error fetching resultNetwork data:', error);
      setNetworkLoading(false);
    }
  };

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

  useEffect(() => {
    fetchNetworkData();
    const handleScroll = () => {
      if (window.scrollY > 294) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      setNetwork(AllNetworks.id);
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
      setSearchWord('');
    }

    if (window.scrollY > 0) {
      window.scrollTo(0, 0);
    }

  }, [router.query, networkList]);

  return (
    <StyledContainer>
      <AllDappsTitle
        onCategory={onSelectCategory}
        activeCategory={category}
        dappList={[
          { logo: '/images/alldapps/icon-title-dapp-1.svg' },
          { logo: '/images/alldapps/icon-title-dapp-2.svg' },
          { logo: '/images/alldapps/icon-title-dapp-3.svg' },
          { logo: '/images/alldapps/icon-title-dapp-4.svg' },
          { logo: '/images/alldapps/icon-title-dapp-5.svg' },
          { logo: '/images/alldapps/icon-title-dapp-6.svg' },
        ]}
        ref={categoryRef}
        categoryClassname={scrolled ? 'category-fixed' : ''}
      />
      <StyledBody>
        <StyledFiltersBackdrop
          variants={{
            visible: {
              opacity: 1,
              display: 'block',
              y: 0,
            },
            hidden: {
              opacity: 0,
              display: 'none',
              y: -50,
            },
          }}
          initial="hidden"
          animate={scrolled ? 'visible' : 'hidden'}
          transition={{
            duration: 0.6,
          }}
        />
        <StyledFilters
          fixed={scrolled}
          variants={{
            visible: {
              zIndex: 50,
              y: 104,
            },
            hidden: {
              zIndex: 2,
              y: 0,
            },
          }}
          initial="hidden"
          animate={scrolled ? 'visible' : 'hidden'}
          transition={{
            duration: 0.6,
          }}
        >
          {
            networkLoading ? (
              <StyledSelectorLoading>
                <Loading />
              </StyledSelectorLoading>
              ) : (
              <Selector
                list={networkList}
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
                      item.logo ? (
                        <Image src={item.logo} alt="" width={22} height={22} />
                      ) : (
                        <div style={{ width: 22, height: 22 }} />
                      )
                    }
                    {item.name}
                  </StyledNetworkDropdownItem>
                )}
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
          network={network}
          sort={sort}
          rewardNow={rewardNow}
          category={category}
          searchText={searchWord}
          airdrop={airdrop}
          bp={{ detail: '10011-001', dapp: '10011-002' }}
        />
      </StyledBody>
    </StyledContainer>
  );
};

export default AllDapps;

interface Props {

}
