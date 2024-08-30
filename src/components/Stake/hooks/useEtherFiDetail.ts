import { useEffect, useState } from "react";

interface Result {
    apr: string | number
}

async function getApr(chainId: string) {
    const res = await fetch(`/api/sma-steth-apr`, {
    }).then(res => res.json())

    if (res?.data) {
        return Number(res.data.smaApr)
    }

    return 0
}

export default function useEtherFiDetail(chain: any): Result{
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