import { memo, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import chainsConfig, { PathToId } from '@/config/all-in-one/chains';
import { Category } from '@/hooks/useAirdrop';
import DappList from '@/views/AllDapps/components/DappList';
import CategoryFilter from '@/views/AllDapps/components/Title/CategoryFilter';
import { CategoryList } from '@/views/AllDapps/config';
import DetailTabs from '@/views/Dapp/components/DappDetail/DetailTabs/index';
import Medal from '@/views/Dapp/components/DappDetail/Medal/index';
import RelativeOdyssey from '@/views/Dapp/components/DappDetail/RelativeOdyssey';
import useReport from '@/views/Landing/hooks/useReport';
import useCategoryDappList from '@/views/Quest/hooks/useCategoryDappList';

import QuickOnboarding from './components/QuickOnboarding';
import Top from './components/Top';
import { useChainDapps } from './hooks/useChainDapps';
import useDetail from './hooks/useDetail';
import {
  DappTitle,
  StyledContainer,
  StyledDetail,
  StyledRecordContainer,
  StyledRelatedOdyssey,
} from './styles';


const StyleImageMedals = styled.img`
  margin-top: 51px;
  width: 500px;
  height: 220px;
`

const ChainDetail = ({ path }: any) => {

  const { detail, loading: detailLoading } = useDetail(PathToId[path]);

  const { handleReport } = useReport();

  const currentChain = useMemo(() => {
    return chainsConfig[path];
  }, [path]);

  useEffect(() => {
    if ([4, 6].includes(Number(PathToId[path]))) {
      handleReport(`network/${path}`);
    }
  }, [path]);

  const [category, setCategory] = useState<number | string>();
  const [currentCategory, setCurrentCategory] = useState<any>();

  const { categories } = useCategoryDappList();
  const {
    loading,
    fetchDappList,
    dappList,
    pageTotal,
    pageIndex,
    total,
    pageSize,
    onPage,
    allDappListTotal,
  } = useChainDapps(detail?.chain_id, category);

  const categoryList = useMemo(() => {
    return Object.values(categories || {}).map((it: any) => {
      const curr = CategoryList.find((_it) => _it.key === it.id);
      const dappCount = allDappListTotal.filter((__it: any) => __it.category_ids.includes(it.id)).length;
      return {
        ...curr,
        sum: dappCount,
      };
    });
  }, [categories, CategoryList, allDappListTotal]);

  const handleCurrentCategory = (category: any) => {
    setCategory(category.key);
    if (category.key === currentCategory?.key) {
      setCategory(undefined);
      setCurrentCategory(undefined);
      return;
    }
    setCurrentCategory(category);
  };

  return (
    <StyledContainer>
      <Top chain={{ ...currentChain, ...detail }} loading={detailLoading} />
      <QuickOnboarding chain={{ ...currentChain }} />

      <StyledDetail>
        <StyledRecordContainer>
          <DetailTabs
            {...detail}
            overviewTitle={detail?.name ? `Introducing ${detail?.name}` : ''}
            overviewShadow={{ icon: currentChain?.bgIcon, color: currentChain?.selectBgColor }}
            category={Category.network}
            loading={detailLoading}
          />
        </StyledRecordContainer>
        <StyledRelatedOdyssey>
          <StyleImageMedals src="/images/medals/coming-soon-medal.png" alt="medals" />
          {/* <Medal id={detail?.chain_id} type={Category.chain} /> */}
          <RelativeOdyssey
            title="Campaign and Rewards"
            networkId={detail?.id}
            chainId={detail?.chain_id}
          />
        </StyledRelatedOdyssey>
      </StyledDetail>

      <DappTitle>
        <span className="highlight">{total}</span> dApps on {detail?.name}
      </DappTitle>
      <CategoryFilter
        classname='category-filter'
        size={'small'}
        categoryList={categoryList}
        currentCategory={currentCategory}
        onSelect={handleCurrentCategory}
      />
      <DappList
        style={{
          margin: '30px auto 0',
        }}
        loading={loading}
        dappList={dappList}
        pageTotal={pageTotal}
        pageIndex={pageIndex}
        fetchDappList={fetchDappList}
        bp={{ detail: '', dapp: '1006-002-010' }}
        loadingLength={pageSize}
        loadFromApi={false}
        onPage={onPage}
      />
    </StyledContainer>
  );
};

export default memo(ChainDetail);
