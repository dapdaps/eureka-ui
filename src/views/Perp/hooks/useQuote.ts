import { get } from '@/utils/http';
import { useState } from 'react';
export default function useQuote() {
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<any>(null)

  const queryQuote = async function (params:any) {
    console.log('=params', params)
    const result = await get("https://backend-blast-perps.wasabi.xyz/api/quote", params)
    console.log('-result', result)
    setQuote(result)
  }
  return {
    loading,
    quote,
    queryQuote
  }
}