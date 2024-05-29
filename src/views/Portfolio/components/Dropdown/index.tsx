import React, { useEffect, useMemo, useRef, useState } from 'react';

import { StyledContainer } from '@/views/Portfolio/components/Dropdown/styles';

const Dropdown = (props: Props) => {
  const { className, style, list, onSelect, value } = props;

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
      <span>{dropdownShown}</span>
      <span className="arrow" style={{ transform: dropdownVisible ? 'rotate(180deg)' : 'rotate(0deg)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
          <path d="M1 1L6 5L11 1" stroke="#979ABE" stroke-width="1.6" stroke-linecap="round" />
        </svg>
      </span>
      <div className={`dropdown ${dropdownVisible ? 'visible' : ''}`}>
        <ul className="dropdown-list">
          {
            list.map((it, index) => (
              <li
                className={`dropdown-item ${value === it.value ? 'selected' : ''}`}
                key={it.key || it.value}
                onClick={() => handleDropdownSelect(it.value, it, index)}
                title={it.label as string}
              >
                {it.label}
              </li>
            ))
          }
        </ul>
      </div>
    </StyledContainer>
  );
};

export default Dropdown;

interface Props {
  list: List[];
  value: string | number;
  className?: string;
  style?: React.CSSProperties;

  onSelect(value: string | number, record: List, index: number): void;
}

interface List {
  key?: string | number;
  label: string | number;
  value: string | number;
}
