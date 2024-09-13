// @ts-nocheck
import { memo } from 'react';
import styled from 'styled-components';

import Markets from './Markets';
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  &.layer {
    &.isDapps {
      align-items: flex-start;
    }
  }
`;
const StyledTipsAndPoolsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const StyledTips = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StyledTipsFirstTxt = styled.div`
  color: #000;
  font-family: 'Inter Tight';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const StyledTipsSecondTxt = styled.div`
  color: #6f6f6f;
  font-family: 'Inter Tight';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Pools = styled.div`
  margin-right: 16px;
  display: flex;
  padding: 4px;
  border: 1px solid #373a53;
  border-radius: 8px;
  background: var(--agg-secondary-color, rgba(33, 35, 48, 0.5));
  &.layer {
    border-radius: 22px;
  }
`;
const Pool = styled.div`
  cursor: pointer;
  color: var(--agg-primary-color, #fff);
  font-size: 14px;
  line-height: 1em;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid transparent;
  &.active {
    border-color: #373a53;
    background: #32364b;
  }
  &.layer {
    border-radius: 22px;
    display: flex;
    align-items: center;
    padding: 0 26px;
    height: 44px;
    font-family: 'Inter Tight';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border: none;
    &.active {
      color: #fff;
      background: #000;
    }
  }
`;
const StyledSearchAndChainsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  &.layer {
    justify-content: flex-end;
    gap: 10px;
    &.isDapps {
      flex-direction: column;
      align-items: flex-end;
      gap: 20px;
    }
  }
`;
const Search = styled.div`
  position: relative;
  width: 276px;
  height: 40px;
  padding-left: 40px;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: var(--agg-secondary-color, rgba(33, 35, 48, 0.5));
`;
const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  width: 100%;
  height: 100%;
  color: var(--agg-primary-color, #fff);
  font-size: 14px;
`;
const SvgIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &.icon-search {
    position: absolute;
    left: 12px;
    top: 12px;
  }
`;
const ChainsOrMarketsWrapper = styled.div`
  /* flex: 1; */
  display: flex;
  justify-content: flex-end;
`;
const Chains = styled.div`
  display: flex;
  padding: 4px;
  border: 1px solid #373a53;
  border-radius: 8px;
  background: var(--agg-secondary-color, rgba(33, 35, 48, 0.5));
`;
const Chain = styled.div`
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid transparent;
  img {
    width: 24px;
  }
  &.active {
    border-color: #373a53;
    background: #32364b;
  }
`;
const StyledLayerCurrentChain = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 35px 0 12px;
  height: 40px;
  border-radius: 30px;
  border: 1px solid #000;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  cursor: pointer;
  img {
    width: 26px;
  }
  span {
    color: #000;
    font-family: 'Inter Tight';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
  svg {
    position: absolute;
    right: 13px;
    top: 50%;
    transform: translateY(-50%);
  }
`;
const StyledLayerChainsWrap = styled.div`
  display: none;
  position: absolute;
  left: -11px;
  bottom: 0;
  padding-top: 8px;
  transform: translateY(100%);
`;
const StyledLayerChains = styled.div`
  padding: 5px 0;
  width: 228px;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  background: #fff;
  box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.3);
`;
const StyledLayerChainsContainer = styled.div`
  position: relative;
  &:hover {
    ${StyledLayerChainsWrap} {
      display: flex;
      flex-direction: column;
    }
  }
`;
const StyledLayerChain = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  position: relative;
  height: 45px;
  padding-left: 20px;
  cursor: pointer;
  &:hover {
    background: #f2f2f2;
    backdrop-filter: blur(10px);
  }
  img {
    width: 20px;
  }
  span {
    color: #000;
    font-family: 'Inter Tight';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; /* 16px */
  }
  svg {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const SearchIcon = (
  <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7.01829" cy="7.01829" r="6.01829" stroke="#979ABE" strokeWidth="2" />
    <rect
      x="14.9141"
      y="9.64941"
      width="6.141"
      height="2.63186"
      rx="1.31593"
      transform="rotate(30 14.9141 9.64941)"
      fill="#979ABE"
    />
  </svg>
);
export default memo(function Filter(props: any) {
  const {
    from = '',
    isDapps,
    markets,
    currentMarket,
    token,
    chains,
    categoryIndex,
    chainIndex,
    onSearchInput,
    onChangeCategoryIndex,
    onChangeChainIndex,
    onChangeMarket
  } = props;
  const currentChain = chains ? chains[chainIndex] : null;
  return (
    <Wrapper className={[from, isDapps ? 'isDapps' : ''].join(' ')}>
      <StyledTipsAndPoolsContainer>
        <Pools className={[from].join(' ')}>
          <Pool
            className={[from, categoryIndex === 0 ? 'active' : ''].join(' ')}
            onClick={() => onChangeCategoryIndex(0)}
          >
            All pools
          </Pool>
          <Pool
            className={[from, categoryIndex === 1 ? 'active' : ''].join(' ')}
            onClick={() => onChangeCategoryIndex(1)}
          >
            Your pools
          </Pool>
        </Pools>
      </StyledTipsAndPoolsContainer>
      <StyledSearchAndChainsContainer className={[from, isDapps ? 'isDapps' : ''].join(' ')}>
        <Search>
          <SvgIcon className="icon-search">{SearchIcon}</SvgIcon>
          <Input placeholder="search by token" onInput={(event) => onSearchInput(event)} />
        </Search>
        <ChainsOrMarketsWrapper className={[from, isDapps ? 'isDapps' : ''].join(' ')}>
          {isDapps ? (
            <Markets
              {...{
                from,
                markets,
                currentMarket,
                onChangeMarket
              }}
            />
          ) : from === 'layer' ? (
            <StyledLayerChainsContainer>
              <StyledLayerCurrentChain>
                <img src={currentChain?.logo} alt={currentChain?.name} />
                <span>{currentChain?.name}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                  <path d="M1 1L6 5L11 1" stroke="black" stroke-width="2" stroke-linecap="round" />
                </svg>
              </StyledLayerCurrentChain>
              <StyledLayerChainsWrap>
                <StyledLayerChains>
                  {chains &&
                    chains.map((chain: any, index: number) => {
                      return (
                        <StyledLayerChain
                          key={index}
                          className={index === chainIndex ? 'active' : ''}
                          onClick={() => onChangeChainIndex(index)}
                        >
                          <img src={chain.logo} alt={chain.name} />
                          <span>{chain?.name}</span>
                          {currentChain.id === chain.id && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="10"
                              viewBox="0 0 13 10"
                              fill="none"
                            >
                              <path d="M1 3.72727L5 8L12 1" stroke="black" stroke-width="2" />
                            </svg>
                          )}
                        </StyledLayerChain>
                      );
                    })}
                </StyledLayerChains>
              </StyledLayerChainsWrap>
            </StyledLayerChainsContainer>
          ) : (
            <Chains>
              {chains &&
                chains.map((chain: any, index: number) => {
                  return (
                    <Chain
                      key={index}
                      className={index === chainIndex ? 'active' : ''}
                      onClick={() => onChangeChainIndex(index)}
                    >
                      <img src={chain.logo} alt={chain.name} />
                    </Chain>
                  );
                })}
            </Chains>
          )}
        </ChainsOrMarketsWrapper>
      </StyledSearchAndChainsContainer>
    </Wrapper>
  );
});
