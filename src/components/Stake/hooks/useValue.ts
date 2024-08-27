import { useEffect, useState } from "react";

import { balanceFormated } from '@/utils/balance';

interface Request{
    prices: any;
    amount: number | string | undefined;
    symbol: string;
}

export default function useValue({
    prices,
    amount,
    symbol
}: Request) {
    const [value, setValue] = useState('$~')

    useEffect(() => {
        if (prices && amount && symbol && prices[symbol]) {
            const _value = Number(amount) * Number(prices[symbol])
            setValue(`$${balanceFormated(_value, 2)}`)
        } else {
            setValue(`$~`)
        }

    }, [prices, amount, symbol])

    return {
        value
    }
}