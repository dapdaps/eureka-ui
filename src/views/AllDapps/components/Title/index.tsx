import React, { useEffect, useMemo, useState } from 'react';
import Logo from './Logo';

import { CategoryList, TitleDapp, TitleDappList } from '@/views/AllDapps/config';
import useCategoryDappList from '@/views/Quest/hooks/useCategoryDappList';
import useDappCategoriesSum from '@/views/AllDapps/hooks/useDappCategoriesSum';

import {
  StyledHead,
  StyledTitle,
  StyledTitlePrimary,
  StyledTitleSub,
  StyledTitleText,
} from './styles';
import { random } from 'lodash';
import CategoryFilter from '@/views/AllDapps/components/Title/CategoryFilter';

const AllDappsTitle = (props: Props) => {
  const {
    dappList,
    onCategory = () => {
    },
    activeCategory,
    categoryClassname = '',
    animation = {},
    categoryRef
  } = props;

  const { categories } = useCategoryDappList();

  const { loading, categoryMap } = useDappCategoriesSum();

  const categoryList = useMemo(() => {
    return Object.values(categories || {}).map((it: any) => {
      const curr = CategoryList.find((_it) => _it.key === it.id);
      return {
        ...curr,
        sum: curr ? (categoryMap[curr.name] ?? 0) : 0,
      };
    });
  }, [categories, CategoryList, categoryMap]);

  const dappListShown = useMemo(() => {
    if (!dappList) return [];
    const result: TitleDapp[] = [];
    dappList.forEach((dapp, idx) => {
      const position = TitleDappList[idx];
      if (!position) return;
      result.push({
        ...position,
        logo: dapp.logo,
        width: dapp.width || position.width,
        height: dapp.height || position.height,
        rotate: random(-45, 45),
      });
    });
    return result;
  }, [dappList]);

  useEffect(() => {
    if (activeCategory) {
      const curr = categoryList.find((_it) => _it.key == activeCategory);
      setCurrentCategory({ key: activeCategory, ...curr });
    }
  }, [activeCategory]);

  const [currentCategory, setCurrentCategory] = useState<any>();
  const handleCurrentCategory = (category: any) => {
    if (category.key === currentCategory?.key) {
      setCurrentCategory(undefined);
      onCategory(undefined);
      return;
    }
    setCurrentCategory(category);
    onCategory(category.key);
  };

  return (
    <StyledHead>
      <StyledTitle>
        <Logo dappList={dappListShown} position="left" />
        <StyledTitleText>
          Discover&nbsp;
          <StyledTitlePrimary
            style={{
              color: currentCategory?.colorRgb ? `rgb(${currentCategory.colorRgb})` : '#EBF479',
            }}
          >
            {currentCategory ? (currentCategory.sum || '') : '150+'} {currentCategory ? currentCategory.label : 'dApps'}
          </StyledTitlePrimary>
        </StyledTitleText>
        <Logo dappList={dappListShown} position="right" />
      </StyledTitle>
      <StyledTitleSub>
        Discover the most popular
      </StyledTitleSub>

      <CategoryFilter
        ref={categoryRef}
        animation={animation}
        classname={categoryClassname}
        categoryList={categoryList}
        loading={loading}
        currentCategory={currentCategory}
        onSelect={handleCurrentCategory}
      />
    </StyledHead>
  );
};
export default AllDappsTitle;

export interface Props {
  // please enter 6 icons from left to right
  dappList: Dapp[];

  onCategory?(categoryId?: number): void;

  activeCategory?: any;

  categoryClassname?: string;
  animation?: any;
  categoryRef?: any;
}

export interface Dapp {
  logo: string;
  width?: number;
  height?: number;
}
