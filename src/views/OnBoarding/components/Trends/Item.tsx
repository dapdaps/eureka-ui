import { memo } from 'react';

import useDappOpen from '@/hooks/useDappOpen';

import { DAPP_LOGO } from '../../config';
import { formatTitle } from '../../helpers';
import { StyledItem, StyledItemBox, StyledItemImg, StyledItemImgBox,StyledLabel, StyledValue } from './styles';

const Item = (props: any) => {
  const { dapp_id, total_execution, bgColor, dapp_logo, template } = props;
  const { open } = useDappOpen();

  return (
    <StyledItem
      onClick={() => {
        open({
          dapp: {
            id: dapp_id,
          },
          from: 'alldapps',
        });
      }}
      data-bp="100131-004"
    >
      <div className="item-title">{formatTitle(props)}</div>
      <StyledItemBox>
        <StyledLabel>Total Execution</StyledLabel>
        <StyledValue>{total_execution}</StyledValue>
      </StyledItemBox>
      <StyledItemBox style={{ marginTop: '12px' }}>
        <StyledItemImgBox style={{ background: bgColor }}>
          <StyledItemImg src={DAPP_LOGO[template] || dapp_logo} alt="" />
        </StyledItemImgBox>
        <StyledLabel>{template}</StyledLabel>
      </StyledItemBox>
    </StyledItem>
  );
};

export default memo(Item);
