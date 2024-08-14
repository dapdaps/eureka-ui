import Dropdown, { DropdownProps } from './index';
import React, { useEffect, useState } from 'react';
import {
  StyledPopupItem,
  StyledPopupItemCheck,
  StyledPopupItemInner,
  StyledPopupList,
} from '@/components/Dropdown/styles';

// a simple dropdown selector for common
const Selector = (props: SelectorProps) => {
  const {
    list,
    value,
    iconCheck = true,
    itemClassName,
    listClassName,
    itemStyle,
    itemValueKey = 'value',
    itemLabelKey = 'label',
    listStyle,
    onSelect,
    renderItem,
    renderChildren,
    className,
    ...restProps
  } = props;

  const [selected, setSelected] = useState<Item>();

  const handleSelect = (item: Item, index: number) => {
    onSelect && onSelect(item[itemValueKey], item, index);
    setSelected(item);
  };

  useEffect(() => {
    const curr = list.find((it) => it[itemValueKey] === value);
    setSelected(curr);
  }, [value, list]);

  return (
    <Dropdown
      clickPopupClose
      clickTriggerClose
      {...restProps}
      popup={(
        <StyledPopupList className={listClassName} style={listStyle}>
          {
            list.map((item, idx) => (
              <StyledPopupItem
                key={item.key || item[itemValueKey] || idx}
                className={itemClassName}
                style={itemStyle}
                title={!renderItem ? item[itemLabelKey] : ''}
                onClick={() => handleSelect(item, idx)}
              >
                <StyledPopupItemInner>
                  {renderItem ? renderItem(item, idx) : item[itemLabelKey]}
                </StyledPopupItemInner>
                {
                  (iconCheck && selected?.[itemValueKey] === item[itemValueKey]) && (
                    <StyledPopupItemCheck>
                      {/*<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                      {/*  <circle cx="3" cy="3" r="3" fill="#EBF479" />*/}
                      {/*</svg>*/}
                    </StyledPopupItemCheck>
                  )
                }
              </StyledPopupItem>
            ))
          }
        </StyledPopupList>
      )}
      className={`dropdown-selector ${className}`}
    >
      {renderChildren ? renderChildren(value, selected) : selected?.[itemLabelKey]}
    </Dropdown>
  );
};

export default Selector;

export type Value = string | number;

export interface SelectorProps extends Omit<DropdownProps, 'popup' | 'children'> {
  list: Item[];
  value?: Value;
  iconCheck?: boolean;
  itemClassName?: string;
  itemStyle?: React.CSSProperties;
  itemValueKey?: string;
  itemLabelKey?: string;
  listClassName?: string;
  listStyle?: React.CSSProperties;

  onSelect?(value: Value, item: Item, index: number): void;

  renderItem?(item: Item, index: number): JSX.Element | Value;

  renderChildren?(value?: Value, selected?: Item): JSX.Element | Value;
}

export interface Item {
  label: string;
  key?: Value;
  value: Value;
  [k: string | number]: any;
}
