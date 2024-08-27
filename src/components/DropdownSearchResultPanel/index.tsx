import { useDebounceFn } from 'ahooks';
import { useRouter } from 'next/router';
import { memo, useEffect, useMemo, useRef,useState } from 'react';
import styled from 'styled-components';

import { IdToPath } from '@/config/all-in-one/chains';
import { QUEST_PATH } from '@/config/quest';
import useDappOpen from '@/hooks/useDappOpen';
import { get } from '@/utils/http';

import Campaign from './Campaign';
import Chain from './Chain';
// import Medal from './Medal';
import useDefaultSearch from './hooks/useDefaultSearch';
import { useRecentStore } from './hooks/useRecentStore';
import Popular, { PopularType } from './Popular';
import RecentSearch from './RecentSearch';
import ResultItem from './ResultItem';
import Search from './Search';
import { StyledSearchResults, StyleTop } from './styles';

const StyleEmpty = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  gap: 30px;
  span {
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    text-align: left;
  }
`;

const Empty = () => (
  <StyleEmpty>
    <span>No dApps found.</span>
    <span>No chains found.</span>
    <span>No campaign found.</span>
    <span>No medals found.</span>
  </StyleEmpty>
);

const DropdownSearchResultPanel = ({ setShowSearch }: { setShowSearch: (show: boolean) => void }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [searchContent, setSearchContent] = useState<any>();
  const [searchResult, setSearchResult] = useState<any>();
  const ref = useRef<HTMLDivElement>(null);
  const { setSearch, addRecentSearch } = useRecentStore()
  const { open } = useDappOpen();

  const { loading: defaultSearchLoading, defaultNetworks, defaultDapps, defaultOdysseys } = useDefaultSearch();
  const { run: handleSearch } = useDebounceFn(
    async () => {
      if (!searchContent) {
        setSearchResult('');
        return;
      }
      try {
        setLoading(true);
        const result = await get(`${QUEST_PATH}/api/search?content=${searchContent}`);
        setSearchResult(result.data);
        setEmpty(
          result.data.dapps?.length === 0 && result.data.networks?.length === 0 && result.data.odysseys?.length === 0,
        );
      } catch (error) {
        console.error('Error fetching search data:', error);
        setEmpty(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
    {
      wait: 500,
    },
  );

  const shouldRenderPopular = useMemo(() => {
    const { dapps, networks, odysseys } = searchResult || {};
    if (!searchContent) return true;
    return !(dapps?.length > 0 || networks?.length > 0 || odysseys?.length > 0);
  }, [searchResult, searchContent]);

  useEffect(() => {
    handleSearch();
  }, [searchContent]);


  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShowSearch(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRecent = (recent: string) => {
    setSearchContent(recent);
    setSearch(recent)
    addRecentSearch(recent)
  }

  const onDappCardClick = (dapp: any) => {
    open({ dapp, from: 'alldapps' });
  };

  return (
    <StyledSearchResults ref={ref}>
      <StyleTop>
        <Search onSearch={(query) => {
          if (!query) {
            setSearchResult('');
            setEmpty(false);
          }
          setSearchContent(query.trim())
        }} />
        {!searchContent && <RecentSearch onClick={(recent) => handleRecent(recent)}/>}
      </StyleTop>
      {empty && !loading ? (
        <Empty />
      ) : (
        <>
          {shouldRenderPopular && (
            <>
              <Popular
                loading={defaultSearchLoading}
                data={defaultNetworks}
                title={PopularType.Chains}
                onClick={() => setShowSearch(false)}
              />
              <Popular
                loading={defaultSearchLoading}
                data={defaultDapps}
                title={PopularType.dApps}
                onClick={() => setShowSearch(false)}
                sx={{ marginTop: '10px' }}
              />
            </>
          )}
          <ResultItem
            title="Dapp"
            loading={loading}
            items={searchResult?.dapps}
            onClick={(item: any) => {
              onDappCardClick(item)
              setSearchResult('');
              setShowSearch(false)
            }}
          />
          <Chain
            loading={loading}
            data={searchResult?.networks}
            onClick={(item: any) => {
              router.prefetch(`/network/${IdToPath[item.id]}`);
              router.push(`/network/${IdToPath[item.id]}`);
              setSearchResult('');
              setShowSearch(false)
            }}
          />
          <Campaign data={shouldRenderPopular ? defaultOdysseys : searchResult?.odysseys} loading={searchContent ? loading : defaultSearchLoading} onClick={() => setShowSearch(false)} />

          {/* Todo: hide Medal  */}
          {/* <Medal /> */}
        </>
      )}
    </StyledSearchResults>
  );
};

export default memo(DropdownSearchResultPanel);
