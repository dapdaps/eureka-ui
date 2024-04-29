import { ethers, Contract, Signer } from 'ethers'
import Big from 'big.js'

import { ERC20ABI } from './ERC20'


export default async function approve(tokenAddress: string, amount: Big, spender: string, signer: Signer) {
    const account = await signer.getAddress()
    const tokenContract = new Contract(
        tokenAddress,
        ERC20ABI,
        signer,
    )

    const allowAmount: Big = await tokenContract.allowance(account, spender)
    if (allowAmount.lt(amount.toString())) {
        const x = await tokenContract.approve(spender, amount.toString())
        await x.wait()
    }

    return true
}