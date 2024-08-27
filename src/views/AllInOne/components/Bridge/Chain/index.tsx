import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";

import ArrowIcon from "@/components/Icons/ArrowIcon";
import popupsData from "@/config/all-in-one/chains";
import {
  StyledSelector,
  StyledSelectorContainer,
  StyledSelectorIcon,
  StyledSelectorPopup
} from "@/views/AllInOne/components/Bridge/styles";
import SelectedCheck from "@/views/AllInOne/components/SelectedCheck";

const ChainSelector = (props: ChainSelectorProps) => {
  const {
    chainId,
    styles,
    popupStyles,
    disabled,
    onSelect = () => {
    }
  } = props;

  const popupRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  const chainList: Chain[] = Object.values(popupsData);
  const chain = useMemo(() => {
    if (!chainId) {
      onSelect(chainList[0].chainId, chainList[0]);
      return chainList[0];
    }
    return chainList.find((it) => it.chainId === chainId);
  }, [chainId, chainList]);

  const handleOpen = () => {
    if (disabled) return;
    setVisible(true);
  };

  const handleSelect = (_chainId: number, chainItem: Chain) => {
    onSelect(_chainId, chainItem);
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
        <StyledSelectorIcon color={chain?.bgColor}>
          <Image className="icon" src={chain?.icon ?? ""} alt={chain?.title ?? ""} width={14} height={14} />
        </StyledSelectorIcon>
        <div className="name">{chain?.title}</div>
        <div className="arrow">
          <ArrowIcon size={10} />
        </div>
      </StyledSelector>
      {
        visible && (
          <StyledSelectorPopup style={popupStyles} ref={popupRef}>
            {
              chainList.map((item) => (
                <div
                  className={`popup-item ${item.chainId === chain?.chainId ? "selected" : ""}`}
                  key={item.chainId}
                  onClick={() => handleSelect(item.chainId, item)}
                >
                  <StyledSelectorIcon color={item.bgColor}>
                    <Image className="icon" src={item.icon} alt={item.title} width={14} height={14} />
                  </StyledSelectorIcon>
                  <div className="name">{item.title}</div>
                  {
                    item.chainId === chain?.chainId && (
                      <div className="selected-check">
                        <SelectedCheck />
                      </div>
                    )
                  }
                </div>
              ))
            }
          </StyledSelectorPopup>
        )
      }
    </StyledSelectorContainer>
  );
};

export interface ChainSelectorProps {
  chainId?: number;
  popupStyles?: React.CSSProperties;
  styles?: React.CSSProperties;
  disabled?: boolean;

  onSelect?(chainId: number, chain: Chain): void;
}

export interface Chain {
  title: string;
  path: string;
  icon: string;
  bgColor: string;
  selectBgColor: string;
  chainId: number;
  rpcUrls: string[];
  menuConfig: any;
  defaultTab?: any;
  bgIcon?: string;
}

export default ChainSelector;
