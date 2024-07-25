import {
  StyledBody,
  StyledContainer,
  StyledFilters,
  StyledNetworkDropdownItem,
  StyledRewardNow,
  StyledSearch,
  StyledSearchIcon,
  StyledSearchInput,
  StyledSelectorLoading
} from '@/views/AllDapps/styles';
import AllDappsTitle from '@/views/AllDapps/components/Title';
import Selector from '@/components/Dropdown/Selector';
import { ChangeEvent, useEffect, useState } from 'react';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';
import Image from 'next/image';
import { AllNetworks, SortList } from '@/views/AllDapps/config';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Loading from '@/components/Icons/Loading';
import DappList from './components/DappList';

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
  const [category, setCategory] = useState<number| string>();
  const [searchWord, setSearchWord] = useState<string>();

  const fetchNetworkData = async () => {
    try {
      setNetworkLoading(true);
      const resultNetwork = await get(`${QUEST_PATH}/api/network/list`);
      const data = resultNetwork.data || [];
      data.unshift(AllNetworks);
      setNetworkList(data);
      console.log(data);
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
    router.replace(`${pathname}${!params.toString() ? '' : '?' + params.toString()}`, undefined, { scroll: false });
  }

  const onSortSelect = (_sort: number) => {
    const params = new URLSearchParams(searchParams);
    if (_sort === 1) {
      params.delete('sort');
    } else {
      params.set('sort', _sort.toString());
    }
    router.replace(`${pathname}${!params.toString() ? '' : '?' + params.toString()}`, undefined, { scroll: false });
  }

  const onSelectCategory = (_category: any) => {
    const params = new URLSearchParams(searchParams);
    if (!_category) {
      params.delete('category');
    } else {
      params.set('category', _category.toString());
    }
    router.replace(`${pathname}${!params.toString() ? '' : '?' + params.toString()}`, undefined, { scroll: false });
  }

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value.trim());
  }

  useEffect(() => {
    fetchNetworkData();
  }, []);

  useEffect(() => {
    const queryNetwork = router.query.network;
    if (queryNetwork && queryNetwork !== 'undefined' && !isNaN(Number(queryNetwork))) {
      setNetwork(Number(queryNetwork));
    } else {
      setNetwork(AllNetworks.id)
    }
  }, [router.query?.network]);

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
          <StyledRewardNow
            className={rewardNow ? 'selected' : ''}
            onClick={() => {
              setRewardNow(!rewardNow);
            }}
          >
            <div className="reward-now-radio"></div>
            <div className="reward-now-text">
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
          bp={{ detail: '10011-001', dapp: '10011-002' }}
        />
      </StyledBody>
    </StyledContainer>
  );
};

export default AllDapps;

interface Props {

}
