import { AnimatePresence,motion } from 'framer-motion';
import styled from "styled-components";

import { useRecentStore } from "./hooks/useRecentStore";

const StyleRecent = styled.div`
  margin-top: 20px;
  .gird {
    display: flex;
    align-items: center;
    flex-flow: wrap row;
    gap: 10px;
    .item {
      background: #21222B;
      border-radius: 6px;
      padding: 10px 18px;
      font-size: 14px;
      line-height: 14px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      &:hover {
        background: rgba(32, 34, 47, 0.6);
      }
    }
  }
` 

const StyleTitle = styled.div`
    font-size: 14px;
    line-height: 14px;
    font-weight: 500;
    margin-bottom: 16px;
    color: #979ABE;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .clean {
        font-size: 12px;
        line-height: 12px;
        font-weight: 400;
        color: #979ABE;
        cursor: pointer;
        &:hover {
            color: #fff;
        }
    }
`

const RecentSearch = ({
  onClick
}: {
  onClick: (item: string) => void;
}) => {

  const { recentSearches, clearRecentSearches } = useRecentStore();

  const truncateText = (text: string, maxLength = 20) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  };
  

  if (recentSearches.length === 0) return null;
    return (
        <StyleRecent>
        <StyleTitle>
            <span className='title'>Recent Searches</span>
            <span className="clean" onClick={clearRecentSearches}>Clean</span>
        </StyleTitle>
        <div className='gird'>
        <AnimatePresence>
          {
            recentSearches.map((item) => (
              <motion.div
                className='item'
                key={item}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.4 } }}
                title={item}
                onClick={() => onClick(item)}
              >
                {truncateText(item, 20)}
              </motion.div>
            ))
          }
          </AnimatePresence>
        </div>
      </StyleRecent>
    )
}
export default RecentSearch;