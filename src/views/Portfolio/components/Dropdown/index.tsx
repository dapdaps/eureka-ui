import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  StyledArrow,
  StyledContainer,
  StyledDropdown,
  StyledItem,
  StyledList,
  StyledShown,
} from '@/views/Portfolio/components/Dropdown/styles';

const Dropdown = (props: Props) => {
  const {
    className,
    style,
    list,
    onSelect,
    value,
    dropdownWidth = '100%',
    dropdownPlacement = 'right',
  } = props;

  const dropdownRef = useRef(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownSelect = (value: string | number, record: List, index: number) => {
    onSelect(value, record, index);
    setDropdownVisible(false);
  };

  const dropdownShown = useMemo(() => {
    return list.find((it) => it.value === value)?.label;
  }, [value]);

  useEffect(() => {
    const handleDropdownVisible = (e: any) => {
      if (!dropdownRef.current) return;
      if ((dropdownRef.current as HTMLElement).contains(e.target)) {
        return;
      }
      setDropdownVisible(false);
    };
    document.body.addEventListener('click', handleDropdownVisible);
    return () => {
      document.body.removeEventListener('click', handleDropdownVisible);
    };
  }, []);

  return (
    <StyledContainer className={className} style={style} onClick={handleDropdown} ref={dropdownRef}>
      <StyledShown>{dropdownShown}</StyledShown>
      <StyledArrow
        className="arrow"
        variants={{
          visible: {
            rotate: 180,
          },
          hidden: {
            rotate: 0,
          },
        }}
        initial="hidden"
        animate={dropdownVisible ? 'visible' : 'hidden'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
          <path d="M1 1L6 5L11 1" stroke="#979ABE" stroke-width="1.6" stroke-linecap="round" />
        </svg>
      </StyledArrow>
      <AnimatePresence>
        {
          dropdownVisible && (
            <StyledDropdown
              className="dropdown"
              placement={dropdownPlacement}
              style={{
                width: dropdownWidth,
              }}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                },
                hidden: {
                  opacity: 0,
                  y: -5,
                },
              }}
              initial="hidden"
              exit="hidden"
              animate="visible"
            >
              <StyledList className="dropdown-list">
                {
                  list.map((it, index) => (
                    <StyledItem
                      className={`dropdown-item ${value === it.value ? 'selected' : ''}`}
                      key={it.key || it.value}
                      onClick={() => handleDropdownSelect(it.value, it, index)}
                      title={it.label as string}
                    >
                      {it.label}
                      {
                        value === it.value && (
                          <svg
                            width="13"
                            height="10"
                            viewBox="0 0 13 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1 3.72727L5 8L12 1" stroke="#EBF479" strokeWidth="1" />
                          </svg>
                        )
                      }
                    </StyledItem>
                  ))
                }
              </StyledList>
            </StyledDropdown>
          )
        }
      </AnimatePresence>
    </StyledContainer>
  );
};

export default Dropdown;

interface Props {
  list: List[];
  value: string | number;
  className?: string;
  style?: React.CSSProperties;
  dropdownWidth?: string | number;
  dropdownPlacement?: 'left' | 'right';

  onSelect(value: string | number, record: List, index: number): void;
}

interface List {
  key?: string | number;
  label: string | number;
  value: string | number;
}
