import * as RadioGroup from '@radix-ui/react-radio-group';
import { styled } from '@stitches/react';
import type { FC } from 'react';
import React, { useState } from 'react';

type OptionItem = { value: string | number; label: string };
interface IProps {
  order: number;
  outerSize: number;
  innerSize: number;
  options: OptionItem[];
  onChange: any;
}

const Flex = styled('div', { display: 'flex', alignItems: 'center' });

const Label = styled('label', {
  color: 'white',
  fontSize: 16,
  lineHeight: 1,
  paddingLeft: 10,
  fontFamily: 'Gantari',
  fontweight: 400,
});

const MyRadioGroup: FC<IProps> = ({ order, outerSize = 25, innerSize = 11, options, onChange }) => {
  const RadioGroupRoot = styled(RadioGroup.Root, {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  });

  const RadioGroupItem = styled(RadioGroup.Item, {
    all: 'unset',
    backgroundColor: '#1E2028',
    width: outerSize,
    height: outerSize,
    borderRadius: '100%',
    boxShadow: `0 2px 10px #000`,
    border: '1px solid #EBF479',

    // '&:hover': { backgroundColor: '#EBF479' },
    '&:focus': { boxShadow: `0 0 0 2px black` },
  });

  const RadioGroupIndicator = styled(RadioGroup.Indicator, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    '&::after': {
      content: '""',
      display: 'block',
      width: innerSize,
      height: innerSize,
      borderRadius: '50%',
      backgroundColor: '#EBF479',
    },
  });
  const [value, setValue] = useState<string>('');
  const onValueChange = (v: string) => {
    setValue(v);
    onChange(order, v);
  };

  return (
    <RadioGroupRoot value={value} onValueChange={onValueChange}>
      {options.map((item, index) => (
        <Flex key={index}>
          <RadioGroupItem value={item.value as string} id={`r${order}${index}`}>
            <RadioGroupIndicator />
          </RadioGroupItem>
          <Label htmlFor={`r${order}${index}`}>{item.label}</Label>
        </Flex>
      ))}
    </RadioGroupRoot>
  );
};

export default MyRadioGroup;
