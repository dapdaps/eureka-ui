import { memo, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import Empty from '@/components/Empty';
import { useDebounceFn } from 'ahooks';
import { get } from '@/utils/http';
import { QUEST_PATH } from '@/config/quest';
import { IdToPath } from '@/config/all-in-one/chains';
import ResultItem from './ResultItem';
import { StyledSearchResults, StyleTop } from './styles';

import Search from './Search';
import RecentSearch from './RecentSearch';
import Popular from './Popular';
import Chain from './Chain';
import Campaign from './Campaign';
import Medal from './Medal';




const DropdownSearchResultPanel = ({ searchText, show }: any) => {
  const router = useRouter();

  const [searchResults, setSearchResults] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [searchContent, setSearchContent] = useState('');


  const { run: handleSearch } = useDebounceFn(
    async () => {
      if (!searchText) return;
      setLoading(true);
      setSearchResults({});
      try {
        const result = await get(`${QUEST_PATH}/api/search?content=${searchText}`);
        setSearchResults(result.data);
        setLoading(false);
        setEmpty(
          result.data.dapps?.length === 0 && result.data.networks?.length === 0 && result.data.quests?.length === 0,
        );
      } catch (error) {
        console.error('Error fetching search data:', error);
        setLoading(false);
      }
    },
    {
      wait: 500,
    },
  );

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  return (
    <StyledSearchResults>
      {empty && !loading ? (
        <Empty size={42} tips="No related dApps, Blockchains, or Quest found" />
      ) : (
        <>
          <StyleTop>
            <Search />
            <RecentSearch />
          </StyleTop>

          <Popular />

          <ResultItem
            title="Dapp"
            loading={loading}
            items={searchResults?.dapps}
            onClick={(item: any) => {
              router.push(`/dapps-details?dapp_id=${item.id}`);
              setSearchContent('');
            }}
          />

          <Chain />
          <Campaign />
          <Medal />
          {/* <ResultItem
            title="Blockchain"
            loading={loading}
            items={searchResults?.networks}
            onClick={(item: any) => {
              router.push(`/network/${IdToPath[item.id]}`);
              setSearchContent('');
            }}
          />
          <ResultItem
            title="Quest"
            loading={loading}
            items={searchResults?.quests}
            onClick={(item: any) => {
              router.push(`/quest/detail?id=${item.id}`);
              setSearchContent('');
            }}
          /> */}
        </>
      )}
    </StyledSearchResults>
  );
};

export default memo(DropdownSearchResultPanel);
