import Big from 'big.js';
import { utils } from 'ethers';

const checkGas = ({ rawBalance, gasPrice, gasLimit, value }: any) => {
  const _gasLimit = typeof gasLimit === 'string' ? Number(gasLimit) : gasLimit;
  const _balance = Big(utils.formatEther(rawBalance)).add(value || 0);
  const gas = Big(_gasLimit).mul(gasPrice);

  return {
    isGasEnough: _balance.lt(gas),
    gas
  };
};

export default checkGas;
