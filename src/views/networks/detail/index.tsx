import { memo, useMemo, useEffect, useState } from 'react';
import chainsConfig, { PathToId } from '@/config/all-in-one/chains';
import useReport from '@/views/Landing/hooks/useReport';
import useDetail from './hooks/useDetail';

import Top from './components/Top';
import QuickOnboarding from './components/QuickOnboarding';
import DappList from '@/views/AllDapps/components/DappList';
import { CategoryList } from '@/views/AllDapps/config';
import useCategoryDappList from '@/views/Quest/hooks/useCategoryDappList';

import {
  StyledContainer,
  DappTitle,
  StyledCategory,
  StyledCategoryItem,
  StyledDetail,
  StyledRecordContainer,
  StyledRelatedOdyssey,
} from './styles';
import DetailTabs from '@/views/Dapp/components/DappDetail/DetailTabs/index';
import RelativeOdyssey from '@/views/Dapp/components/DappDetail/RelativeOdyssey';
import Medal from '@/views/Dapp/components/DappDetail/Medal/index';
import { useChainDapps } from './hooks/useChainDapps';
import { Category } from '@/hooks/useAirdrop';

const medalList: any = [
  {
    label: 'Mode Trader',
    percent: 1,
    logo: ''
  },
  {
    label: 'Mode Voyager',
    percent: 0.8,
    logo: ''
  }
];

const ChainDetail = ({ path }: any) => {

  const { detail } = useDetail(PathToId[path]);

  const { handleReport } = useReport();

  const currentChain = useMemo(() => {
    return chainsConfig[path];
  }, [path]);

  useEffect(() => {
    if ([4, 6].includes(Number(PathToId[path]))) {
      handleReport(`network/${path}`);
    }
  }, [path]);

  const { categories } = useCategoryDappList();

  const categoryList = useMemo(() => {
    return Object.values(categories || {}).map((it: any) => {
      const curr = CategoryList.find((_it) => _it.key === it.id);
      return {
        ...curr,
      };
    });
  }, [categories, CategoryList]);

  const [category, setCategory] = useState<number | string>();
  const [currentCategory, setCurrentCategory] = useState<any>();
  const handleCurrentCategory = (category: any) => {
    setCategory(category.key);
    if (category.key === currentCategory?.key) {
      setCategory(undefined);
      setCurrentCategory(undefined);
      return;
    }
    setCurrentCategory(category);
  };

  const {
    loading,
    fetchDappList,
    dappList,
    pageTotal,
    pageIndex,
    total,
    pageSize,
    onPage
  } = useChainDapps(detail?.chain_id, category);


  return (
    <StyledContainer>
      <Top chain={{ ...currentChain, ...detail }} />
      <QuickOnboarding path={path} chain={{ ...currentChain }} />

      <StyledDetail>
        <StyledRecordContainer>
          <DetailTabs
            {...detail}
            overviewTitle={detail?.name ? `Introducing ${detail.name}` : ''}
            overviewShadow={{icon: currentChain?.bgIcon, color: currentChain?.selectBgColor}}
            category={Category.network}
            loading={loading}
          />
        </StyledRecordContainer>
        <StyledRelatedOdyssey>
          <Medal medalList={medalList}/>
          <RelativeOdyssey title='Campaign and Rewards'/>
        </StyledRelatedOdyssey>
      </StyledDetail>

      <DappTitle>
        <span className="highlight">{total}</span> dApps on Mode
      </DappTitle>
      <StyledCategory>
        {categoryList.map((cate: any) => (
          <StyledCategoryItem
            key={cate.key}
            $colorRgb={cate.colorRgb}
            className={currentCategory?.key === cate.key ? 'selected' : ''}
            onClick={() => handleCurrentCategory(cate)}
          >
            {cate.value} {cate.label}
          </StyledCategoryItem>
        ))}
      </StyledCategory>
      <DappList
        style={{
          width: '1247px',
          margin: '30px auto 0',
        }}
        loading={loading}
        dappList={dappList}
        pageTotal={pageTotal}
        pageIndex={pageIndex}
        fetchDappList={fetchDappList}
        bp={{ detail: '10011-001', dapp: '10011-002' }}
        loadingLength={pageSize}
        loadFromApi={false}
        onPage={onPage}
      />
    </StyledContainer>
  );
};

export default memo(ChainDetail);
