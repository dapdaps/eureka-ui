import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { useEffect, useMemo, useState } from 'react';

import MendiFinanceConfig from '@/config/lending/dapps/mendi-finance';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';
import LendingDialogButton from '@/modules/lending/components/Button';
import ModalFoot from '@/views/Campaign/LineaLiquid/components/ModalFoot';
import SwitchTabs from '@/views/Campaign/LineaLiquid/components/SwitchTabs';
import TokenCapsule from '@/views/Campaign/LineaLiquid/components/TokenCapsule';
import TokenInput from '@/views/Campaign/LineaLiquid/components/TokenInput';

import { StyledAction, StyledContainer, StyledSummary, StyledTokenList } from './styles';

const { basic, networks } = MendiFinanceConfig;

// Linea
const CHAIN_ID = 59144;

const TABS = [
  { value: 'Deposit', label: 'Supply' },
  { value: 'Borrow', label: 'Borrow' }
];

const MendiFinanceNetworkConfig = networks[CHAIN_ID];

const MendiFinanceMarketsSymbols = ['meWETH', 'meUSDT', 'meUSDC'];
const MendiFinanceMarkets: any = {};
Object.values(MendiFinanceNetworkConfig.markets).forEach((market) => {
  if (!MendiFinanceMarketsSymbols.includes(market.symbol)) return;
  MendiFinanceMarkets[market.address] = market;
});
const MendiFinanceMarketsList = Object.values(MendiFinanceMarkets);

const Mendi = (props: Props) => {
  const {} = props;

  const toast = useToast();
  const { addAction } = useAddAction('dapp');
  const { account } = useAccount();

  const balance = '0';

  const [currentTab, setCurrentTab] = useState(TABS[0].value);
  const [currentToken, setCurrentToken] = useState<any>(MendiFinanceMarketsList[0]);
  const [amount, setAmount] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [txData, setTxData] = useState<any>();
  const [isMax, setIsMax] = useState(false);

  const { run: debouncedGetTrade, cancel: cancelGetTrade } = useDebounceFn(
    () => {
      setLoading(true);
    },
    { wait: 500 }
  );

  const handleCurrentTab = (_currentTab: string) => {
    setCurrentTab(_currentTab);
  };

  const handleCurrentToken = (address: string) => {
    setCurrentToken(MendiFinanceMarkets[address]);
  };

  useEffect(() => {
    if (!amount || Big(amount).lte(0)) {
      setDisabled(true);
      return;
    }
    if (Big(amount).gt(balance)) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [amount, balance]);

  return (
    <StyledContainer>
      <SwitchTabs tabs={TABS} current={currentTab} onChange={handleCurrentTab} />
      <StyledTokenList>
        {MendiFinanceMarketsList.map((market: any) => (
          <TokenCapsule
            key={market.address}
            address={market.address}
            selected={currentToken.address}
            symbol={market.underlyingToken.symbol}
            icon={market.underlyingToken.icon}
            apy="0"
            onClick={handleCurrentToken}
          />
        ))}
      </StyledTokenList>
      <TokenInput
        style={{
          marginTop: 21
        }}
        amount={amount}
        balance={balance}
        setIsMax={setIsMax}
        setLoading={setLoading}
        debouncedGetTrade={debouncedGetTrade}
        cancelGetTrade={cancelGetTrade}
        onAmountChange={(_amount) => {
          setAmount(_amount);
        }}
        token={currentToken.underlyingToken}
        price={1}
        rule="1 ticket $25"
      />
      <StyledSummary>
        <li className="item">
          <span className="label">Collateral Factor</span>
          <span className="value">85.00%</span>
        </li>
        <li className="item">
          <span className="label">Net Supply APY</span>
          <span className="value">85.00%</span>
        </li>
        <li className="item">
          <span className="label">Your Borrow Limit</span>
          <span className="value">85.00%</span>
        </li>
        <li className="item">
          <span className="label">Borrow Limit Used</span>
          <span className="value success">0.00%</span>
        </li>
      </StyledSummary>
      <StyledAction>
        <LendingDialogButton
          disabled={disabled}
          loading={loading}
          actionText={currentTab}
          amount={amount}
          data={{ ...currentToken, config: { ...basic, ...MendiFinanceNetworkConfig } }}
          chainId={CHAIN_ID}
          toast={toast}
          addAction={addAction}
          unsignedTx={txData?.unsignedTx}
          gas={txData?.gas}
          account={account as string}
          onSuccess={() => {}}
          onApprovedSuccess={() => {}}
          onLoad={() => {}}
        />
      </StyledAction>
      <ModalFoot href="/dapp/mendi-finance">Mendi finance</ModalFoot>
    </StyledContainer>
  );
};

export default Mendi;

interface Props {}
