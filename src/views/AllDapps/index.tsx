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
} from '@/views/AllDapps/styles';
import AllDappsTitle from '@/views/AllDapps/components/Title';
import Selector from '@/components/Dropdown/Selector';
import { useEffect, useState } from 'react';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';
import Image from 'next/image';
import { AllNetworks, CategoryList, PageSize, SortList } from '@/views/AllDapps/config';
import { useDebounceFn } from 'ahooks';
import { useSearchParams } from 'next/navigation';
import DappCard from '@/views/AllDapps/components/DappCard';
import Pagination from '@/components/pagination';

const AllDapps = (props: Props) => {
  const {} = props;

  const searchParams = useSearchParams();

  const [networkList, setNetworkList] = useState<any>([AllNetworks]);
  const [network, setNetwork] = useState<any>(AllNetworks.chain_id);
  const [sort, setSort] = useState<any>(SortList[0].value);
  const [rewardNow, setRewardNow] = useState<boolean>(false);
  const [category, setCategory] = useState<number>();
  const [loading, setLoading] = useState<boolean>(false);
  const [dappList, setDappList] = useState<any>([]);
  const [pageTotal, setPageTotal] = useState<number>(0);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const fetchNetworkData = async () => {
    try {
      const resultNetwork = await get(`${QUEST_PATH}/api/network/list`);
      const data = resultNetwork.data || [];
      data.unshift(AllNetworks);
      setNetworkList(data);
    } catch (error) {
      console.error('Error fetching resultNetwork data:', error);
    }
  };

  const fetchDappList = async (page: number) => {
    setPageIndex(page);
    try {
      setLoading(true);
      const params = new URLSearchParams(searchParams);
      params.set('tbd_token', 'false');
      params.set('is_favorite', 'false');
      params.set('page_size', PageSize + '');
      params.set('page', page + '');
      if (network > -1) {
        params.set('network_ids', network);
      }
      if (category) {
        params.set('category_ids', category + '');
      }
      const resultNativeToken = await get(
        `${QUEST_PATH}/api/dapp/filter_list?${params.toString()}`,
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
          const curr = networkList.find((_it: any) => _it.chain_id === it.chain_id);
          curr && dapp.networks.push({ ...curr, chainId: curr.chain_id });
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

  const { run: getDappList } = useDebounceFn(fetchDappList, { wait: 500 });

  useEffect(() => {
    fetchNetworkData();
  }, []);

  useEffect(() => {
    getDappList(1);
  }, [network, sort, rewardNow, category, networkList]);

  return (
    <StyledContainer>
      <AllDappsTitle
        onCategory={setCategory}
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
          <Selector
            list={networkList}
            value={network}
            onSelect={setNetwork}
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
          <Selector
            list={SortList}
            value={sort}
            onSelect={setSort}
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
            />
          </StyledSearch>
        </StyledFilters>
        <StyledDappList>
          {
            dappList.map((dapp: any, idx: number) => (
              <DappCard
                key={idx}
                name={dapp.name}
                logo={dapp.logo}
                description={dapp.description}
                categories={dapp.categories}
                networks={dapp.networks}
                badges={[
                  { icon: '/images/alldapps/icon-exchange.svg', iconSize: 17, value: '$23.56k' },
                  { icon: '/images/alldapps/icon-fire.svg', iconSize: 17, value: '1,235' },
                  { icon: '/images/alldapps/icon-mode.svg', iconSize: 24 },
                  { icon: '/images/alldapps/icon-dapdap-point.svg', iconSize: 24 },
                ]}
              />
            ))
          }
        </StyledDappList>
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
