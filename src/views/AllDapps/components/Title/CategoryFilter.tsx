import { StyledCategory, StyledCategoryItem } from '@/views/AllDapps/components/Title/styles';
import Skeleton from 'react-loading-skeleton';
import React from 'react';

const CategoryFilter = React.forwardRef((props: Props, ref: any) => {
  const {
    bp,
    loading = false,
    classname = '',
    categoryList,
    currentCategory = {},
    onSelect = () => {},
    size = 'large',
    animation = {}
  } = props;

  const onCategoryClick = (cate: CategoryItem) => {
      if (cate.sum < 1) {
        return;
      }
      onSelect(cate);
    }


  return (
    <StyledCategory
      className={classname}
      ref={ref}
      {...animation}
    >
      {
        loading
          ? (new Array(7).fill('').map((_, index) => (
            <Skeleton key={index} className={`skeleton-${size}`} />
          ))) : (
            categoryList.map((cate: any) => (
              <StyledCategoryItem
                key={cate.key}
                $disabled={cate.sum < 1}
                $colorRgb={cate.colorRgb}
                className={`category-${size} ${ currentCategory?.key === cate.key ? 'selected' : '' }`}
                data-bp={bp}
                onClick={() => onCategoryClick(cate)}
              >
                {cate.sum} {cate.label}
              </StyledCategoryItem>
            ))
          )
      }
    </StyledCategory>
  );
});

export default CategoryFilter;

interface Props {
  bp?: string;
  size?: 'small' | 'large';
  classname?: string;
  loading?: boolean;
  categoryList: CategoryItem[];
  currentCategory?: Record<string, any>;
  animation?: any;

  onSelect?: (cate?: CategoryItem) => void;
}

interface CategoryItem {
    key?: number,
    label?: string,
    sum: any,
    name?: string;
    colorRgb?: string;
}