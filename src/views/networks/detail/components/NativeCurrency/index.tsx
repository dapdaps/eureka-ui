import ArrowIcon from '@/components/Icons/ArrowIcon';
import { useMemo } from 'react';
import styled from 'styled-components';

const StyledNativeCurrency = styled.div`
  display: flex;
  align-items: center;
  column-gap: 6px;
  width: fit-content;

  .small-logo {
    width: 20px;
    height: 20px;
  }

  .empty-logo::before {
    display: block;
    content: '?';
    color: #979ABE;
    font-family: Gantari;
    font-size: 14px;
    font-weight: 400;
    text-align: center;
  }

  .currency-name-small {
    color: #FFF;
    font-family: Gantari;
    font-size: 16px;
    font-weight: 400;
  }

  .currency-name {
    color: #FFF;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 500;
  }

  &.currency-tag {
    border-radius: 34px;
    background: #21222B;
    padding: 4px 8px;
    cursor: pointer;
  }
`;

const StyledNativeCurrencyLogo = styled.div<{ url?: string }>`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${props => props.url ? `url(${props.url}) no-repeat center` : '#414461'};
  background-size: contain;
`;

const StyledArrow = styled.div`
  transform: rotate(-90deg);
  color: #979ABE;
`;

const NativeCurrency = (
  {
    tbdToken,
    nativeCurrency,
    className = '',
    isTag = false,
    onClick = () => {
    },
  }: Props) => {

  const mergedCurrency = useMemo<any>(() => {
    if (!nativeCurrency) return {};
    return JSON.parse(nativeCurrency);
  }, [nativeCurrency]);

  const isTBD = tbdToken === 'Y';
  const currencyName = isTBD ? 'TBD🔥' : (mergedCurrency?.symbol || '-');

  const onCurrency = () => {
    if (!isTag) {
      return;
    }
    typeof onClick === 'function' && onClick();
  };

  return (
    <StyledNativeCurrency className={`${isTag ? 'currency-tag' : ''} ${className}`} onClick={onCurrency}>
      {
        (
          isTag || (
            !isTag && mergedCurrency?.logo
          )
        ) && <StyledNativeCurrencyLogo
          url={mergedCurrency?.logo}
          className={`${isTag ? `small-logo` : ''} ${isTBD ? 'empty-logo' : ''}`}
        />
      }
      <div className={isTag ? 'currency-name-small' : 'currency-name'}>{currencyName.toUpperCase()}</div>
      {
        isTag && (
          <StyledArrow><ArrowIcon size={11} /></StyledArrow>
        )
      }
    </StyledNativeCurrency>
  );
};

export default NativeCurrency;

interface Props {
  tbdToken: string;
  nativeCurrency: string;
  className?: string;
  isTag?: boolean;
  onClick?: () => void;
}