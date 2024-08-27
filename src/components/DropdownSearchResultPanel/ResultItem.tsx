import { memo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import {
  LoadingWrapper,
  StyledMore,
  StyledResultItem,
  StyledResultItemContainer,
  StyledResultItemImg,
  StyledResultItemTitle,
  StyledResultTitle,
  StyleView,
} from './styles';

const ResultItem = ({ title, loading, items, onClick }: any) => {
  const [showAll, setShowAll] = useState(false);
  if (!items || !items.length) return null;
  return (
    <StyledResultItemContainer>
      <StyledResultTitle>
        <div>{title}</div>
      </StyledResultTitle>
      {loading ? (
        <LoadingWrapper className="flex-align">
          <Skeleton width="30px" height="30px" containerClassName="skeleton" />
          <Skeleton width="216px" height="18px" containerClassName="skeleton" />
        </LoadingWrapper>
      ) : (
        <>
          {(showAll ? items : items.slice(0, 5)).map((item: any, index: number) => (
            <StyledResultItem
              key={item.name + index}
              onClick={() => {
                onClick(item);
              }}
              data-bp="3001-005"
            >
              <StyledResultItemImg src={item.logo} alt="" />
              <StyledResultItemTitle>{item.name}</StyledResultItemTitle>
            </StyledResultItem>
          ))}
          {items.length > 5 && (
            <StyleView onClick={() => setShowAll(!showAll)}>
              <div>{showAll ? 'Hide' : 'Show'} all</div>
            </StyleView>
          )}
        </>
      )}
    </StyledResultItemContainer>
  );
};

export default memo(ResultItem);
