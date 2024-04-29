import { useEffect, useState } from "react";

interface Result {
    apr: string | number
}

async function getApr(chainId: string) {
    const res = await fetch(`https://api.allorigins.win/get?url=https://stake.lido.fi/api/sma-steth-apr`, {
    }).then(res => res.json())

    if (res?.contents) {
        return Number(res.contents.replaceAll('"', ''))
    }

    return 0
}

export default function useRenzoDetail(chain: any): Result{
    const [apr, setApr] = useState(0)

    useEffect(() => {
        if (chain?.chainId) {
            getApr(chain.chainId).then(setApr)
        } else {
            setApr(0)
        }
    }, [chain])

    return {
        apr 
    }
}