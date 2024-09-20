// @ts-nocheck
import { ethers } from 'ethers';
import { useEffect } from 'react';
const AllowanceABI = ['function allowance(address owner, address spender) external view returns (uint256)'];
export function useAllowance(props) {
  const { tokenAddress, owner, spender, provider, decimals, updateAllowance } = props;
  function getAllowance(_tokenAddress, _owner, _spender) {
    const TokenContract = new ethers.Contract(_tokenAddress, AllowanceABI, provider);
    TokenContract.allowance(_owner, _spender)
      .then((allowanceRaw) => {
        console.info(`get ${_tokenAddress} allowance:`, allowanceRaw.toString());

        //for use: ethers.utils.formatUnits(allowanceRaw,decimals)
        updateAllowance(allowanceRaw);
      })
      .catch((e) => {
        console.log('getAllowance_error', e);
      });
  }

  useEffect(() => {
    if (tokenAddress && owner && spender) {
      getAllowance(tokenAddress, owner, spender);
    }
  }, [tokenAddress, owner, spender]);
}
