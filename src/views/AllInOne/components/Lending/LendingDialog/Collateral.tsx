import Big from 'big.js';
import { useEffect, useMemo, useState } from 'react';

import Modal from '@/components/Modal';
import { VmComponent } from '@/components/vm/VmComponent';
import LendingArrowIcon from '@/views/AllInOne/components/Lending/LendingArrowIcon';
import LendingDialogButton from '@/views/AllInOne/components/Lending/LendingDialog/DialogButton';
import { formatBorrowLimit } from '@/views/AllInOne/components/Lending/LendingDialog/utils';

import {
  BottomBox,
  CollateralContent,
  CollateralToken,
  Label,
  Row,
  Token,
  TokenLogo,
  TokenSymbol,
  TopBox,
  Value,
  ValuesWrapper
} from './styles';

const Collateral = (props: Props) => {
  const { data, visible, account, addAction, toast, chainId, onSuccess, onClose } = props;

  const [updateHandler, setUpdateHandler] = useState<any>(Date.now());
  const [trade, setTrade] = useState<any>({});
  const [amount, setAmount] = useState<string>('');
  const [borrowLimit, setBorrowLimit] = useState<string>();
  const [buttonClickable, setButtonClickable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const tokenSymbol = useMemo(() => data?.underlyingToken?.symbol, [data]);

  useEffect(() => {
    if (!visible || !data) return;

    let borrowLimit = '' as any;
    const _borrowLimit = Big(data.totalCollateralUsd).minus(data.userTotalBorrowUsd);
    let buttonClickable = false;
    if (data.actionText === ActionType.Enable) {
      borrowLimit = _borrowLimit.add(
        Big(data.loanToValue / 100)
          .mul(data.userSupply || 0)
          .mul(data.underlyingPrice)
      );
      buttonClickable = true;
    }
    if (data.actionText === ActionType.Disabled) {
      borrowLimit = _borrowLimit.minus(
        Big(data.loanToValue / 100)
          .mul(data.userSupply || 0)
          .mul(data.underlyingPrice)
      );
      buttonClickable = Big(data.userTotalBorrowUsd).eq(0) ? true : !borrowLimit.lt(0);
    }
    setBorrowLimit(borrowLimit ? (!borrowLimit.gt(0) ? '0.00' : borrowLimit.toFixed(2)) : '');
    setButtonClickable(buttonClickable);
  }, [visible, data]);

  useEffect(() => {
    setUpdateHandler(Date.now());
  }, [data, amount, account]);

  return (
    <Modal
      display={visible}
      title="Collateral"
      width={400}
      onClose={onClose}
      content={
        <CollateralContent>
          <TopBox className="none-border">
            <CollateralToken>
              {data?.actionText === ActionType.Disabled ? 'Disabling' : 'Enabling'}
              <Token>
                <TokenLogo src={data?.underlyingToken.icon} />
                <TokenSymbol>{tokenSymbol}</TokenSymbol>
              </Token>
              as Collateral
            </CollateralToken>
          </TopBox>
          <BottomBox>
            <Row className="justfiy-start">
              <Label>Borrow Limit</Label>
              <ValuesWrapper>
                <Value className={!!borrowLimit ? 'range' : ''}>${formatBorrowLimit(2, '', data)}</Value>
                {!!borrowLimit && (
                  <>
                    <div className="mx_5">
                      <LendingArrowIcon color={'#979ABE'} className="mx_5" />
                    </div>
                    <Value>${Big(borrowLimit).toFixed(2)}</Value>
                  </>
                )}
              </ValuesWrapper>
            </Row>
            <LendingDialogButton
              disabled={!buttonClickable}
              actionText={data?.actionText}
              amount={amount}
              data={data}
              addAction={addAction}
              toast={toast}
              chainId={chainId}
              unsignedTx={trade.unsignedTx}
              loading={loading}
              gas={trade.gas}
              account={account}
              onApprovedSuccess={() => {}}
              onSuccess={() => {
                onSuccess?.(data);
              }}
            />
          </BottomBox>
          {data?.config?.handler && (
            <VmComponent
              src={data.config.handler}
              props={{
                update: updateHandler,
                data: data,
                amount: amount,
                account,
                onLoad: (_data: any) => {
                  console.log('%cCollateral-handler-onLoad--', 'background:red;color:white;', _data);
                  setTrade(_data);
                  setLoading(false);
                }
              }}
            />
          )}
        </CollateralContent>
      }
    />
  );
};

export default Collateral;

interface Props {
  visible: boolean;
  data: any;
  account: any;
  addAction: any;
  toast: any;
  chainId: any;
  onSuccess: any;

  onClose(): void;
}

export enum ActionType {
  Disabled = 'Disable as Collateral',
  Enable = 'Enable as Collateral'
}
