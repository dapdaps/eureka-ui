import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useTokens({ tokens }: any) {
  const router = useRouter();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [quoteAmount, setQuoteAmount] = useState('');
  const [direction, setDirection] = useState('');
  const [address, setAddress] = useState('');
  const [isAddressCorrect, setIsAddressCorrect] = useState(true);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleTokenExchange = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('from');
    params.delete('to');
    params.set('from', to);
    params.set('to', from);
    setDirection('from');
    setQuoteAmount(fromAmount);
    router.replace(`${pathname}${!params.toString() ? '' : '?' + params.toString()}`, undefined, { scroll: false });
  };

  const handleTokenChange = (type: 'from' | 'to', id: string) => {
    const params = new URLSearchParams(searchParams);
    if (params.has(type)) {
      params.delete(type);
    }
    params.set(type, id);
    router.replace(`${pathname}${!params.toString() ? '' : '?' + params.toString()}`, undefined, { scroll: false });
  };

  const handleAmountChange = (type: 'from' | 'to', amount: string) => {
    if (type === 'from') {
      setFromAmount(amount);
    }
    if (type === 'to') {
      setToAmount(amount);
    }
    setQuoteAmount(amount);
    setDirection(type);
  };

  const handleAddressChange = (_address: string) => {
    setAddress(_address);
    if (!_address || !from) {
      setIsAddressCorrect(true);
      return;
    }
    const regexp = new RegExp(tokens[from].network.addressValidation);
    setIsAddressCorrect(regexp.test(_address));
  };

  useEffect(() => {
    const _from = router.query.from as string;
    const _to = router.query.to as string;
    setFrom((_from && tokens[_from]?.id) || 'ETH');
    setTo((_to && tokens[_to]?.id) || 'DAI');
  }, [router.query, tokens]);

  return {
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
    handleTokenChange,
    handleAmountChange,
    handleAddressChange,
    handleTokenExchange,
  };
}
