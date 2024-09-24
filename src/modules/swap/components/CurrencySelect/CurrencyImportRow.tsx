import styled from 'styled-components';

const CurrencyRow = styled.div`
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: rgba(151, 154, 190, 0.1);
  }
  &.active {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const CurrencyLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const CurrencySymbol = styled.div`
  font-size: 18px;
  font-weight: 500px;
  color: var(--agg-text-color, #fff);
`;
const CurrencyName = styled.div`
  font-size: 14px;
  color: var(--agg-text-color, #fff);
  opacity: 0.5;
`;
const ImportButton = styled.button`
  border-radius: 6px;
  background: var(--agg-bg-color, #1b1e27);
  width: 103px;
  height: 36px;
  flex-shrink: 0;
  color: var(--agg-text-color, #fff);
  font-size: 16px;
  font-weight: 600;
  border: none;
`;

export default function CurrencyImportRow({ currency, disabled, onImport }: any) {
  return (
    <CurrencyRow
      style={{
        opacity: !disabled ? 1 : 0.6,
        cursor: !disabled ? 'pointer' : 'not-allowed'
      }}
    >
      <CurrencyLabel>
        <CurrencySymbol>{currency.symbol}</CurrencySymbol>
        <CurrencyName>{currency.name}</CurrencyName>
      </CurrencyLabel>
      <ImportButton
        onClick={() => {
          if (!disabled) onImport?.();
        }}
      >
        Import
      </ImportButton>
    </CurrencyRow>
  );
}
