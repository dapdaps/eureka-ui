import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';

import Spinner from '@/components/Spinner';
import useCampaignList from '@/views/Quest/hooks/useCampaignList';

import useQuestList from '../bns/hooks/useQuestList';
import Common from './common';
import PreviousOrders from './components/PreviousOrders';
import Quests from './components/Quests';
import SelectTokens from './components/SelectTokens';
import SwapPanel from './components/SwapPanel';
import useExchange from './hooks/useExchange';
import useNetworksAndTokens from './hooks/useNetworksAndTokens';
import usePrices from './hooks/usePrices';
import useQuote from './hooks/useQuote';
import useTrade from './hooks/useTrade';

let openType: 'from' | 'to' = 'from';
export default function ShuShView() {
  const [anonymous, setAnonymous] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { loading: campaignLoading, campaigns } = useCampaignList();
  const { loading, networks, tokens } = useNetworksAndTokens();
  const [questId, setQuestId] = useState('');
  const { loading: questingLoading, questList } = useQuestList(questId);

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
  }, [quoteAmount, direction, from, to, anonymous]);

  useEffect(() => {
    if (!Array.isArray(campaigns) || campaigns.length < 1) return;

    const _questId = campaigns.find((item: any) => item.category === 'Shush')?.id;

    setQuestId(_questId);
  }, [campaigns]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <Common anonymous={anonymous} from="index">
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
          handleTokenSelect={(type: 'from' | 'to') => {
            openType = type;
            setShowModal(true);
          }}
          handleAmountChange={handleAmountChange}
          handleRefresh={() => {
            if (quoteAmount && Number(quoteAmount) && direction) quote();
          }}
          handleSwap={handleSwap}
          handleExchange={handleTokenExchange}
        />
        <PreviousOrders tokens={tokens} />

        {/* <Quests questList={questList} loading={questingLoading} /> */}

        <SelectTokens
          display={showModal}
          networks={networks}
          tokens={tokens}
          tokenId={openType === 'from' ? from : to}
          onClose={() => {
            setShowModal(false);
          }}
          onSelectToken={(token: any) => {
            handleTokenChange(openType, token.id);
            setShowModal(false);
          }}
        />
      </Common>
    </>
  );
}
