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
} from '@/views/AllDapps/styles';
import AllDappsTitle from '@/views/AllDapps/components/Title';
import Selector from '@/components/Dropdown/Selector';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';
import Image from 'next/image';
import { AllNetworks, SortList } from '@/views/AllDapps/config';
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

  const [networkList, setNetworkList] = useState<any>([AllNetworks]);
  const [networkLoading, setNetworkLoading] = useState<boolean>(false);
  const [network, setNetwork] = useState<any>(AllNetworks.id);
  const [sort, setSort] = useState<any>(SortList[0].value);
  const [rewardNow, setRewardNow] = useState<boolean>(false);
  const [airdrop, setAirdrop] = useState<boolean>(false);
  const [category, setCategory] = useState<number| string>();
  const [searchWord, setSearchWord] = useState<string>();

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

  const onSortSelect = (_sort: number) => {
    const params = new URLSearchParams(searchParams);
    if (_sort === 1) {
      params.delete('sort');
    } else {
      params.set('sort', _sort.toString());
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
    setSearchWord(e.target.value.trim());
  }

  const onRewardToggle = () => {
    const _rewardNow = !rewardNow;
    const params = new URLSearchParams(searchParams);
    if (_rewardNow) {
      params.set('reward', '1');
    } else {
      params.delete('reward');
    }
    setQueryParams(params);
  };

  useEffect(() => {
    fetchNetworkData();
  }, []);

  useEffect(() => {
    console.log('router.query: %o', router.query);
    const {
      network: _network,
      reward: _reward,
      sort: _sort,
    } = router.query;
    if (checkQueryEmpty(_network as string, () => {
      return networkList.some((it: any) => it.id === Number(_network));
    })) {
      setNetwork(Number(_network));
    } else {
      setNetwork(AllNetworks.id);
    }
  }, [router.query, networkList]);

  useEffect(() => {
    const querySort = router.query.sort;
    if (querySort && querySort !== 'undefined' && !isNaN(Number(querySort))) {
      setSort(Number(querySort));
    } else {
      setSort(SortList[0].value)
    }
  }, [router.query?.sort]);

  useEffect(() => {
    const queryCategory = router.query.category;
    if (queryCategory && queryCategory !== 'undefined' && !isNaN(Number(queryCategory))) {
      setCategory(Number(queryCategory));
    } else {
      setCategory(undefined)
    }
  }, [router.query?.category]);

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
      />
      <StyledBody>
        <StyledFilters>
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
                itemValueKey="id"
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
            onClick={() => {
              setAirdrop(!airdrop);
            }}
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
