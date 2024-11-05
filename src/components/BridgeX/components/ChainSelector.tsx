import Big from 'big.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { ArrowDown, ArrowUp } from './Arrows';

const ChainListModal = styled.div`
  width: 100%;
  position: absolute;
  left: 0;
  top: 102%;
  background: #2e3142;
  border-radius: 12px;
  padding: 12px 0;
  z-index: 21;
  max-height: 500px;
  overflow: auto;
`;

const ChainRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  height: 42px;
  padding: 0 12px;
  &:hover {
    background: #676d93;
  }
`;

const ChainItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 35px;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #2e3142;
  flex: 1;
  padding: 0 6px;
  cursor: pointer;
  position: relative;
`;

const ItemGroup = styled.div`
  display: flex;
`;

const ChainIcon = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 8px;
`;
const ChainName = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
  color: #fff;
  margin-left: 7px;
`;

export default function ChainSelector({
  chain,
  chainList,
  disabledChain,
  onChainChange,
  unaAvailableChain,
  containerDom
}: any) {
  const [modalShow, setModalShow] = useState(false);
  const domRef = useRef<any>(null);

  const docClick = useCallback((e: any) => {
    const isChild = domRef.current?.contains(e.target);
    if (!isChild) {
      setModalShow(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', docClick, false);
    if (containerDom.current) {
      containerDom.current.addEventListener('click', docClick, false);
    }

    return () => {
      document.removeEventListener('click', docClick);
      if (containerDom.current) {
        containerDom.current.removeEventListener('click', docClick);
      }
    };
  }, []);

  return (
    <ChainItem
      ref={domRef}
      onClick={(e) => {
        if (!disabledChain) {
          setModalShow(!modalShow);
        }
      }}
      style={{ background: disabledChain ? 'none' : '#2e3142', borderWidth: disabledChain ? '0' : '1px' }}
    >
      <ItemGroup>
        <ChainIcon src={chain?.icon} />
        <ChainName>{chain?.chainName}</ChainName>
      </ItemGroup>
      {!disabledChain && <ArrowDown />}
      {modalShow ? (
        <ChainListModal
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {chainList.map((chain: any) => {
            if (chain === unaAvailableChain) {
              return;
            }

            return (
              <ChainRow
                key={chain.chainId}
                onClick={() => {
                  onChainChange(chain);
                  setModalShow(false);
                }}
              >
                <ChainIcon src={chain.icon} />
                <ChainName>{chain.chainName}</ChainName>
              </ChainRow>
            );
          })}
        </ChainListModal>
      ) : null}
    </ChainItem>
  );
}
