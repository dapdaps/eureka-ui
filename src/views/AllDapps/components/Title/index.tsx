import {
  StyledCategory,
  StyledCategoryItem,
  StyledHead,
  StyledTitle,
  StyledTitlePrimary,
  StyledTitleSub,
  StyledTitleText,
} from './styles';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { CategoryList, TitleDapp, TitleDappList } from '@/views/AllDapps/config';
import useCategoryDappList from '@/views/Quest/hooks/useCategoryDappList';

const AllDappsTitle = (props: Props) => {
  const {
    dappList,
    onCategory = () => {},
    activeCategory
  } = props;

  const { categories } = useCategoryDappList();

  const categoryList = useMemo(() => {
    return Object.values(categories || {}).map((it: any) => {
      const curr = CategoryList.find((_it) => _it.key === it.id);
      return {
        ...curr,
      };
    });
  }, [categories, CategoryList]);

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
    console.log(activeCategory);
    if (activeCategory) {
      setCurrentCategory({key: activeCategory})
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
          Discover <StyledTitlePrimary>150+ dApps</StyledTitlePrimary>
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
      <StyledCategory>
        {
          categoryList.map((cate: any) => (
            <StyledCategoryItem
              key={cate.key}
              $colorRgb={cate.colorRgb}
              className={currentCategory?.key === cate.key ? 'selected' : ''}
              onClick={() => handleCurrentCategory(cate)}
            >
              {cate.value} {cate.label}
            </StyledCategoryItem>
          ))
        }
      </StyledCategory>
    </StyledHead>
  );
};

export default AllDappsTitle;

export interface Props {
  // please enter 6 icons from left to right
  dappList: Dapp[];

  onCategory?(categoryId?: number): void;

  activeCategory?: any;
}

export interface Dapp {
  logo: string;
  width?: number;
  height?: number;
}
