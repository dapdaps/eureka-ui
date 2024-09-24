import Big from 'big.js';

const checkGas = ({ rawBalance, gasPrice, gasLimit, value }: any) => {
  const _balance = Big(rawBalance).add(value || 0);
  const gas = Big(gasLimit).mul(gasPrice);

  return {
    isGasEnough: _balance.gt(gas),
    gas: gas.toString()
  };
};

export default checkGas;
