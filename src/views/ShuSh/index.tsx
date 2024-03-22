import { useEffect, useState } from 'react';
import SwapPanel from './components/SwapPanel';
import PreviousOrders from './components/PreviousOrders';
import SelectTokens from './components/SelectTokens';
import Spinner from '@/components/Spinner';
import Common from './common';
import useTrade from './hooks/useTrade';
import usePrices from './hooks/usePrices';
import useQuote from './hooks/useQuote';
import useNetworksAndTokens from './hooks/useNetworksAndTokens';
import useExchange from './hooks/useExchange';
import { useDebounceFn } from 'ahooks';

export default function ShuShView() {
  const [anonymous, setAnonymous] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [openTokenId, setOpenTokenId] = useState('');
  const { loading, networks, tokens } = useNetworksAndTokens();
  const {
    from,
    to,
    fromAmount,
    toAmount,
    quoteAmount,
    address,
    direction,
    isAddressCorrect,
    setFromAmount,
    setToAmount,
    handleAddressChange,
    handleTokenChange,
    handleAmountChange,
    handleTokenExchange,
  } = useTrade({
    tokens,
  });
  const { prices } = usePrices();
  const { loading: qutoing, queryQuote } = useQuote((result: any) => {
    if (result.direction === 'from') {
      setToAmount(result.amountOut);
    } else {
      setFromAmount(result.amountIn);
    }
  });
  const { run: quote } = useDebounceFn(
    () => {
      if (direction === 'from') {
        setToAmount('');
      } else {
        setFromAmount('');
      }
      queryQuote({ from, to, amount: quoteAmount, direction, anonymous });
    },
    { wait: 500 },
  );
  const { loading: creating, queryTrade } = useExchange();

  const handleSwap = () => {
    queryTrade({ from, to, amount: quoteAmount, direction, anonymous, addressTo: address });
  };

  useEffect(() => {
    if (quoteAmount && Number(quoteAmount) && direction) quote();
  }, [quoteAmount, direction, from, to]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Common anonymous={anonymous}>
        <SwapPanel
          from={from}
          to={to}
          fromAmount={fromAmount}
          toAmount={toAmount}
          tokens={tokens}
          prices={prices}
          anonymous={anonymous}
          address={address}
          qutoing={qutoing}
          creating={creating}
          isAddressCorrect={isAddressCorrect}
          setAnonymous={setAnonymous}
          handleAddressChange={handleAddressChange}
          handleTokenSelect={(tokenId: string) => {
            setOpenTokenId(tokenId);
            setShowModal(true);
          }}
          handleAmountChange={handleAmountChange}
          handleRefresh={quote}
          handleSwap={handleSwap}
          handleExchange={handleTokenExchange}
        />
        <PreviousOrders tokens={tokens} />
        <SelectTokens
          display={showModal}
          networks={networks}
          tokens={tokens}
          tokenId={openTokenId}
          onClose={() => {
            setShowModal(false);
          }}
          onSelectToken={(token: any) => {
            handleTokenChange(openTokenId === from ? 'from' : 'to', token.id);
            setShowModal(false);
          }}
        />
      </Common>
    </>
  );
}
