import React, { useEffect, useMemo, useState } from 'react';
import Logo from './Logo';

import { CategoryList, TitleDapp, TitleDappList } from '@/views/AllDapps/config';
import useCategoryDappList from '@/views/Quest/hooks/useCategoryDappList';
import useDappCategoriesSum from '@/views/AllDapps/hooks/useDappCategoriesSum';
import Counter from './Counter';

import {
  StyledHead,
  StyledTitle,
  StyledTitlePrimary,
  StyledTitleSub,
  StyledTitleText,
} from './styles';
import Big from 'big.js';
import CategoryFilter from '@/views/AllDapps/components/Title/CategoryFilter';

const AllDappsTitle = (props: Props) => {
  const {
    bp,
    dappList,
    onCategory = () => {
    },
    activeCategory,
    categoryClassname = '',
    animation = {},
    categoryRef,
  } = props;

  const { categories } = useCategoryDappList();

  const { loading, categoryMap } = useDappCategoriesSum();

  const [dappListShown, setDappListShown] = useState<any>([]);
  const [dappListShownLeft, setDappListShownLeft] = useState<any>([]);
  const [dappListShownRight, setDappListShownRight] = useState<any>([]);

  const categoryList = useMemo(() => {
    return Object.values(categories || {}).map((it: any) => {
      const curr = CategoryList.find((_it) => _it.key === it.id);
      return {
        ...curr,
        sum: curr ? (categoryMap[curr.name] ?? 0) : 0,
      };
    });
  }, [categories, CategoryList, categoryMap]);

  useEffect(() => {
    if (activeCategory) {
      const curr = categoryList.find((_it) => _it.key == activeCategory);
      setCurrentCategory({ key: activeCategory, ...curr });
    }
  }, [activeCategory, categoryList]);

  const [currentCategory, setCurrentCategory] = useState<any>();
  const handleCurrentCategory = (category: any) => {
    setDappListShownLeft([]);
    setDappListShownRight([]);

    if (category.key === currentCategory?.key) {
      setCurrentCategory(undefined);
      onCategory(undefined);
      return;
    }
    setCurrentCategory(category);
    onCategory(category.key);
  };

  const totalDapps = useMemo(() => {
    if (!categoryList || !categoryList.length) return 0;
    let _total: any = Big(0);
    for (const cate of categoryList) {
      _total = Big(_total).plus(cate.sum);
    }
    _total = _total.div(10).toFixed(0, 0);
    return Big(_total).times(10).toNumber();
  }, [categoryList]);

  useEffect(() => {
    if (!dappList) {
      setDappListShownLeft([]);
      setDappListShownRight([]);
      return;
    }
    const result: TitleDapp[] = [];
    dappList.forEach((dapp, idx) => {
      const position = TitleDappList[idx];
      if (!position) return;
      let x = position.x;
      let y = position.y;
      if (dappList.length <= 4) {
        if (position.position === 'left') {
          x = x + 100;
        } else {
          x = x - 100;
        }
      }
      if (dappList.length <= 2) {
        y = y - 50;
        if (position.position === 'left') {
          x = x + 100;
        } else {
          x = x - 100;
        }
      }
      if (dappList.length === 1) {
        x = x + 330;
        y = y - 80;
      }

      result.push({
        ...position,
        key: '' + currentCategory?.label + idx,
        x,
        y,
        logo: dapp.logo,
        width: dapp.width || position.width,
        height: dapp.height || position.height,
        rotate: position.rotate || 0,
      });
    });
    setDappListShownLeft(result.filter((it) => it.position === 'left'));
    setDappListShownRight(result.filter((it) => it.position === 'right'));
  }, [dappList]);

  return (
    <StyledHead>
      <StyledTitle>
        <Logo key="left" dappList={dappListShownLeft} position="left" />
        <StyledTitleText>
          Discover&nbsp;
          <StyledTitlePrimary
            style={{
              color: currentCategory?.colorRgb ? `rgb(${currentCategory.colorRgb})` : '#EBF479',
            }}
          >
            <span>
              {currentCategory ? (
                <Counter
                  from={1}
                  to={+currentCategory.sum || 0}
                />
              ) : (
                <Counter
                  from={1}
                  to={totalDapps}
                  formatter={(value) => {
                    return Big(value).gt(10) ? `${Big(value).div(10).toFixed(0, 0)}0+` : Big(value).toFixed(0, 0);
                  }}
                />
              )}
            </span>
            &nbsp;
            <span>{currentCategory ? currentCategory.label : 'dApps'}</span>
          </StyledTitlePrimary>
        </StyledTitleText>
        <Logo key="right" dappList={dappListShownRight} position="right" />
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
        bp={bp}
      />
    </StyledHead>
  );
};
export default AllDappsTitle;

export interface Props {
  // please enter 6 icons from left to right
  bp?: string;
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
