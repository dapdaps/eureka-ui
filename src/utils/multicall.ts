import { Contract, utils } from 'ethers';

export const multicallv3 = async <T = any>({
  abi,
  calls,
  options,
  multiAddress,
  provider,
}: {
  abi: any[];
  calls: any[];
  options?: any;
  multiAddress: string;
  provider: any;
}): Promise<T> => {
  const { requireSuccess = true, ...overrides } = options || {};
  const multi = new Contract(
    multiAddress,
    [
      {
        inputs: [
          { internalType: 'bool', name: 'requireSuccess', type: 'bool' },
          {
            components: [
              { internalType: 'address', name: 'target', type: 'address' },
              { internalType: 'bytes', name: 'callData', type: 'bytes' },
            ],
            internalType: 'struct Multicall2.Call[]',
            name: 'calls',
            type: 'tuple[]',
          },
        ],
        name: 'tryAggregate',
        outputs: [
          {
            components: [
              { internalType: 'bool', name: 'success', type: 'bool' },
              { internalType: 'bytes', name: 'returnData', type: 'bytes' },
            ],
            internalType: 'struct Multicall2.Result[]',
            name: 'returnData',
            type: 'tuple[]',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    provider,
  );
  const itf = new utils.Interface(abi);

  const calldata = calls.map((call) => ({
    target: call.address.toLowerCase(),
    callData: itf.encodeFunctionData(call.name, call.params),
  }));

  const returnData = await multi?.callStatic.tryAggregate(requireSuccess, calldata, overrides);

  const res = returnData?.map((call: any, i: number) => {
    const [result, data] = call;
    return result && data !== '0x' ? itf.decodeFunctionResult(calls[i].name, data) : null;
  });

  return res as any;
};
