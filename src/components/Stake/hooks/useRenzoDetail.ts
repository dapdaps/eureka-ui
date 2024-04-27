import { useEffect, useState } from "react";

interface Result {
    apr: string | number
}

async function getApr(chainId: string) {
    const res = await fetch(`/renzo/api/stats?chainId=${chainId}`).then(res => res.json())
    if (res?.success) {
        return res.data.apr.data
    }
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