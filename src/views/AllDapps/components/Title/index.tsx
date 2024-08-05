import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';

import { CategoryList, TitleDapp, TitleDappList } from '@/views/AllDapps/config';
import useCategoryDappList from '@/views/Quest/hooks/useCategoryDappList';
import useDappCategoriesSum from '@/views/AllDapps/hooks/useDappCategoriesSum';

import {
  StyledCategory,
  StyledCategoryItem,
  StyledHead,
  StyledTitle,
  StyledTitlePrimary,
  StyledTitleSub,
  StyledTitleText,
} from './styles';

const AllDappsTitle = React.forwardRef((props: Props, categoryRef: any) => {
  const {
    dappList,
    onCategory = () => {},
    activeCategory,
    categoryClassname = ''
  } = props;

  const { categories } = useCategoryDappList();

  const { loading , categoryMap } = useDappCategoriesSum();

  const categoryList = useMemo(() => {
    return Object.values(categories || {}).map((it: any) => {
      const curr = CategoryList.find((_it) => _it.key === it.id);
      return {
        ...curr,
        sum: curr ? (categoryMap[curr.name] ?? 0) : 0
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
        <div>
          {
            dappListShown.filter((it) => it.position === 'left').map((it) => (
              <Image
                key={it.key}
                src={it.logo}
                alt=""
                width={it.width}
                height={it.height}
                style={{
                  transform: `translate(${it.x}px, ${it.y}px)`,
                }}
              />
            ))
          }
        </div>
        <StyledTitleText>
          Discover&nbsp;
          <StyledTitlePrimary
            style={{
              color: currentCategory?.colorRgb ? `rgb(${currentCategory.colorRgb})` : '#EBF479',
            }}
          >
            {currentCategory? (currentCategory.sum || '') : '150+'} {currentCategory? currentCategory.label : 'dApps'}
          </StyledTitlePrimary>
        </StyledTitleText>
        <div>
          {
            dappListShown.filter((it) => it.position === 'right').map((it) => (
              <Image
                key={it.key}
                src={it.logo}
                alt=""
                width={it.width}
                height={it.height}
                style={{
                  transform: `translate(${it.x}px, ${it.y}px)`,
                }}
              />
            ))
          }
        </div>
      </StyledTitle>
      <StyledTitleSub>
        Discover the most popular
      </StyledTitleSub>
      <StyledCategory ref={categoryRef} className={categoryClassname}>
        {
          loading
            ? (new Array(7).fill('').map((_, index) => (
              <Skeleton key={index} width={130} height={46} />
          ))) : (
              categoryList.map((cate: any) => (
                <StyledCategoryItem
                  key={cate.key}
                  $colorRgb={cate.colorRgb}
                  className={currentCategory?.key === cate.key ? 'selected' : ''}
                  onClick={() => handleCurrentCategory(cate)}
                >
                  {cate.sum} {cate.label}
                </StyledCategoryItem>
              ))
            )
        }
      </StyledCategory>
    </StyledHead>
  );
})
export default AllDappsTitle;

export interface Props {
  // please enter 6 icons from left to right
  dappList: Dapp[];

  onCategory?(categoryId?: number): void;

  activeCategory?: any;

  categoryClassname?: string;
}

export interface Dapp {
  logo: string;
  width?: number;
  height?: number;
}
