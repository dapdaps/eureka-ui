import {
  StyledBody,
  StyledContainer,
  StyledDappList,
  StyledFilters,
  StyledFoot,
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
import { AllNetworks, CategoryList, PageSize, SortList } from '@/views/AllDapps/config';
import { useDebounceFn } from 'ahooks';
import { usePathname, useSearchParams } from 'next/navigation';
import DappCard from '@/views/AllDapps/components/DappCard';
import Pagination from '@/components/pagination';
import useDappOpen from '@/hooks/useDappOpen';
import Empty from '@/components/Empty';
import DappLoading from './Loading/Dapp';
import { useRouter } from 'next/router';
import Loading from '@/components/Icons/Loading';
import chainCofig from '@/config/chains';

const AllDapps = (props: Props) => {
  const {} = props;

  const { open } = useDappOpen();

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
  const [loading, setLoading] = useState<boolean>(false);
  const [dappList, setDappList] = useState<any>([]);
  const [pageTotal, setPageTotal] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);

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

  const fetchDappList = async (page: number) => {
    setPageIndex(page);
    try {
      setLoading(true);
      const params: Record<string, any> = {
        tbd_token: false,
        is_favorite: false,
        page_size: PageSize,
        page,
        sort
      };
      if (network > -1) {
        params.network_ids = network;
      }
      if (category) {
        params.category_ids = category;
      }
      if (searchWord) {
        params.searchWord = searchWord;
      }

      const resultNativeToken = await get(
        `${QUEST_PATH}/api/dapp/filter_list`,
        params
      );
      const data = resultNativeToken.data?.data || [];
      data.forEach((dapp: any) => {
        //#region format categories
        dapp.categories = [];
        dapp.category_ids && dapp.category_ids.forEach((it: any) => {
          const curr = CategoryList.find((_it) => _it.key === it);
          curr && dapp.categories.push(curr);
        });
        //#endregion
        //#region format networks
        dapp.networks = [];
        dapp.dapp_network && dapp.dapp_network.forEach((it: any) => {
          const curr = chainCofig[it.chain_id];
          curr && dapp.networks.push({ ...curr });
        });
        //#endregion
      });
      setDappList(data);
      setPageTotal(resultNativeToken.data.total_page || 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching resultDapp data:', error);
      setLoading(false);
    }
  };

  const onDappCardClick = (dapp: any) => {
    open({ dapp, from: 'alldapps' });
  }

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

  const { run: getDappList } = useDebounceFn(fetchDappList, { wait: 500 });

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

  useEffect(() => {
    getDappList(1);
  }, [network, sort, rewardNow, category, searchWord]);

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

          {
            loading ?
              (<DappLoading />)
              : (
              dappList.length ? (<StyledDappList>
                  {
                    dappList.map((dapp: any, idx: number) => (
                      <DappCard
                        bp={{ detail: '10011-001', dapp: '10011-002' }}
                        key={idx}
                        name={dapp.name}
                        logo={dapp.logo}
                        description={dapp.description}
                        categories={dapp.categories}
                        networks={dapp.networks}
                        onClick={() => onDappCardClick(dapp)}
                        badges={[
                          { icon: '/images/alldapps/icon-exchange.svg', iconSize: 17, value: '$23.56k' },
                          { icon: '/images/alldapps/icon-fire.svg', iconSize: 17, value: '1,235' },
                          { icon: '/images/alldapps/icon-mode.svg', iconSize: 24 },
                          { icon: '/images/alldapps/icon-dapdap-point.svg', iconSize: 24 },
                        ]}
                      />
                    ))
                  }
                </StyledDappList>)
                : (<Empty size={42} tips="No dApps found" />)
              )
          }
      </StyledBody>
      <StyledFoot>
        <Pagination
          pageTotal={pageTotal}
          pageIndex={pageIndex}
          onPage={(page) => {
            fetchDappList(page);
          }}
        />
      </StyledFoot>
    </StyledContainer>
  );
};

export default AllDapps;

interface Props {

}
