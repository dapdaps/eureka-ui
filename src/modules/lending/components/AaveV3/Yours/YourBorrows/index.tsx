import { styled } from 'styled-components';

import { useMultiState } from '@/modules/lending/hooks';

import CardEmpty from '../../Cards/CardEmpty';
import CardsTable from '../../Cards/CardsTable';
import RepayModal from '../../Modal/Repay';
import PrimaryButton from '../../PrimaryButton';
import TokenWrapper from '../../TokenWrapper';
import { unifyNumber } from '../../utils';

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const CenterItem = styled.div`
  display: flex;
  align-items: center;
`;

const PrimaryTxt = styled.div`
  color: var(--agg-primary-color, #fff);
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
`;
const SubText = styled.div`
  color: #6f6f6f;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

const YourBorrows = (props: any) => {
  const {
    config,
    yourBorrows,
    showRepayModal,
    setShowRepayModal,
    healthFactor,
    theme,
  } = props;

  console.log('yourBorrows', yourBorrows);

  const [state, updateState] = useMultiState<any>({
    data: undefined,
  });
  
  const RepayButton = ({ data }: any) => (
    <PrimaryButton
      config={config}
      theme={theme}
        onClick={() => {
          updateState({ data });
          setShowRepayModal(true);
        }}
    >Repay</PrimaryButton>
  );
  return (
    <>
      {!yourBorrows || yourBorrows.length === 0 ? (
        <CardEmpty>Nothing borrowed yet</CardEmpty>
      ) : (
        <>
          <CardsTable
            headers={['Asset', 'Debt', 'APY', '']}
            data={yourBorrows.map((row: any, idx: any) => {
              return [
                <TokenWrapper key={idx}>
                  <img width={64} height={64} src={row?.icon} />
                  <CenterItem>
                    <PrimaryTxt>{row.symbol}</PrimaryTxt>
                  </CenterItem>
                </TokenWrapper>,
                <div key={idx}>
                    <PrimaryTxt>{unifyNumber(row.debt)}</PrimaryTxt>
                    <SubText>$ {unifyNumber(row.debtInUSD)}</SubText>
                  </div>,
                  `${(Number(row.borrowAPY) * 100).toFixed(2)} %`,
                  <ButtonGroup key={idx}>
                    <RepayButton data={{ ...row }} />
                  </ButtonGroup>,
                ];
              })}
          />
        </>
      )}
      {showRepayModal && (
        <RepayModal
          onRequestClose={() => setShowRepayModal(false)}
          data={ { ...state.data, healthFactor }}
          onlyOneBorrow={yourBorrows.length === 1}
          {...props}
        />
      )}
    </>
  );
};

export default YourBorrows;
