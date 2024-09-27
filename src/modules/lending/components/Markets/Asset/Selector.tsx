import Big from 'big.js';

import Modal from '@/components/Modal';
import {
  StyledIcon,
  StyledList,
  StyledListBalance,
  StyledListItem,
  StyledListToken
} from '@/modules/lending/components/Markets/Asset/styles';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';

const LendingTokenList = (props: any) => {
  const { list, onSelect } = props;

  return (
    <StyledList>
      {list.map((t: any, idx: number) => (
        <StyledListItem key={idx} onClick={() => onSelect(t)}>
          <StyledListToken>
            <StyledIcon src={t.icon} alt="" />
            <div className="token-name-wrapper">
              <div className="token-name">{t.name}</div>
              <div className="token-symbol">{t.symbol}</div>
            </div>
          </StyledListToken>
          <StyledListBalance>
            <div className="balance" title={t.balance || '0'}>
              {Big(t.balance || '0').toFixed(4, 0)}
            </div>
            <div className="balance-usd">
              {formateValueWithThousandSeparatorAndFont(Big(t.balance || 0).times(t.price || 1), 2, true, {
                prefix: '$'
              })}
            </div>
          </StyledListBalance>
        </StyledListItem>
      ))}
    </StyledList>
  );
};

const LendingTokenSelector = (props: Props) => {
  const { visible, list, onClose, onSelect } = props;

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Modal
      title="Select a token"
      display={visible}
      showHeader
      width={460}
      onClose={handleClose}
      content={<LendingTokenList list={list} onSelect={onSelect} />}
    />
  );
};

export default LendingTokenSelector;

interface Props {
  visible?: boolean;
  list?: any;

  onClose?(): void;

  onSelect?(token: any): void;
}
