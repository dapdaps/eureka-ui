import React, { useEffect, useMemo, useRef, useState } from "react";

import useTokensAndChains from "@/components/Bridge/hooks/useTokensAndChains";
import type { Token } from "@/components/Bridge/types";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import type { ChainSelectorProps } from "@/views/AllInOne/components/Bridge/Chain";
import {
  StyledSelector,
  StyledSelectorContainer,
  StyledSelectorIcon,
  StyledSelectorPopup
} from "@/views/AllInOne/components/Bridge/styles";
import SelectedCheck from "@/views/AllInOne/components/SelectedCheck";

const TokenSelector = (props: TokenSelectorProps) => {
  const {
    poolId,
    chainId,
    styles,
    popupStyles,
    disabled,
    onSelect = () => {
    }
  } = props;

  const { tokens } = useTokensAndChains();

  const popupRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const currentTokenList = useMemo<Token[]>(() => {
    if (!tokens || !chainId) return [];
    return Object.values(tokens).filter((it) => it.chainId === chainId);
  }, [tokens, chainId]);

  const currentToken = useMemo(() => {
    if (!currentTokenList.length) {
      return null;
    }
    if (!poolId) {
      onSelect(currentTokenList[0].poolId as number, currentTokenList[0]);
      return currentTokenList[0];
    }
    return currentTokenList.find((it) => it.poolId === poolId);
  }, [poolId, currentTokenList]);

  const handleOpen = () => {
    if (disabled) return;
    setVisible(true);
  };

  const handleSelect = (_poolId: number, token: Token) => {
    onSelect(_poolId, token);
    setVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (ev: Event) => {
      if (popupRef.current && !popupRef.current.contains((ev.target as HTMLInputElement))) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <StyledSelectorContainer>
      <StyledSelector style={styles} onClick={handleOpen}>
        {
          currentToken && (
            <StyledSelectorIcon>
              <img className="icon" src={currentToken?.icon ?? ""} alt={currentToken?.name ?? ""} width={14} height={14} />
            </StyledSelectorIcon>
          )
        }
        <div className="name">{currentToken?.name ?? 'No Tokens'}</div>
        <div className="arrow">
          <ArrowIcon size={10} />
        </div>
      </StyledSelector>
      {
        visible && (
          <StyledSelectorPopup style={popupStyles} ref={popupRef}>
            {
              currentTokenList.length ? currentTokenList.map((item) => (
                <div
                  className={`popup-item ${item.poolId === currentToken?.poolId ? "selected" : ""}`}
                  key={item.poolId}
                  onClick={() => handleSelect(item.poolId as number, item)}
                >
                  <StyledSelectorIcon>
                    <img className="icon" src={item.icon} alt={item.name ?? ""} width={14} height={14} />
                  </StyledSelectorIcon>
                  <div className="name">{item.name}</div>
                  {
                    item.poolId === currentToken?.poolId && (
                      <div className="selected-check">
                        <SelectedCheck />
                      </div>
                    )
                  }
                </div>
              )) : (
                <div className="popup-item">No Tokens</div>
              )
            }
          </StyledSelectorPopup>
        )
      }
    </StyledSelectorContainer>
  );
};

export interface TokenSelectorProps extends Omit<ChainSelectorProps, 'onSelect'> {
  poolId?: number;

  onSelect?(poolId: number, token: Token): void;
}

export default TokenSelector;
