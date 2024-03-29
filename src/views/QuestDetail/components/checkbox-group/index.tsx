import * as Checkbox from '@radix-ui/react-checkbox';
import { styled } from '@stitches/react';
import type { FC } from 'react';
import React, { useState } from 'react';

type OptionItem = { value: string | number; label: string; checked: boolean; type?: string };
interface IProps {
  order: number;
  outerSize: number;
  // innerSize: number;
  options: OptionItem[];
  onChange: any;
}

const Flex = styled('div', { display: 'flex', alignItems: 'center' });
const Wrap = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});
const StyledInput = styled('input', {
  flexGrow: 1,
  color: 'white',
  borderBottom: '1px solid white',
});
const Label = styled('label', {
  color: 'white',
  fontSize: 16,
  lineHeight: 1,
  paddingLeft: 10,
  fontFamily: 'Gantari',
  fontweight: 400,
});
const CheckIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="7" viewBox="0 0 10 7" fill="none">
    <path d="M1 3.5L3.66667 6L9 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
);
const MyCheckboxGroup: FC<IProps> = ({ order, outerSize, options, onChange }) => {
  const CheckboxRoot = styled(Checkbox.Root, {
    all: 'unset',
    backgroundColor: '#1E2028',
    width: outerSize,
    height: outerSize,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 2px 10px #000`,
    border: '1px solid #EBF479',
    // '&:hover': { backgroundColor: '#EBF479' },
    '&:focus': { boxShadow: `0 0 0 2px black` },
    '&[data-state="checked"]': {
      backgroundColor: '#EBF479',
    },
  });

  const CheckboxIndicator = styled(Checkbox.Indicator, {});

  const onCheckedChange = (checked: boolean, aIndex: number) => {
    onChange(order, aIndex, checked);
  };

  const onInputChange = (txt: string, aIndex: number) => {
    onChange(order, aIndex, true, txt);
  };
  return (
    <Wrap>
      {options.map((item, index) => (
        <Flex key={index}>
          <CheckboxRoot
            id={`c${index}`}
            checked={item.checked}
            onCheckedChange={(checked) => onCheckedChange(checked as boolean, index)}
          >
            <CheckboxIndicator>{CheckIcon}</CheckboxIndicator>
          </CheckboxRoot>
          <Label htmlFor={`c${index}`}>{item.label}</Label>
          {item?.type === 'others' && item.checked ? (
            <StyledInput
              type="text"
              maxLength={100}
              onChange={(e) => onInputChange(e.target.value, index)}
            ></StyledInput>
          ) : null}
        </Flex>
      ))}
    </Wrap>
  );
};

export default MyCheckboxGroup;
