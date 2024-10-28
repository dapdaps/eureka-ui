import { ethers } from 'ethers';
import { useState } from 'react';

import Modal from '@/components/Modal';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';

import { ActionType } from '..';
import ReliquaryAbi from '../abi/reliquary.json';
import StabilityPoolAbi from '../abi/stabilityPool.json';
import Button from './button';

const Content = ({ config, loreDetail, nftIndex, onSuccess, actionType }: any) => {
  const { dexConfig } = config;
  const [amount, setAmount] = useState<any>('');
  const { provider, account } = useAccount();
  const [loading, setLoading] = useState(false);
  const [updater, setUpdater] = useState(0);

  const toast = useToast();

  const { addAction } = useAddAction('dapp');

  const loreToken = {
    address: dexConfig.loreAddress,
    decimals: 18,
    symbol: 'LORE',
    chainId: config.chainId
  };
  const loreUSDToken = {
    address: dexConfig.loreUSDAddress,
    decimals: 18,
    symbol: 'LORE-USD',
    name: 'loreUSD',
    chainId: config.chainId
  };

  const handleWithDraw = async () => {
    if (!account || !provider) return;

    const address = actionType === ActionType.STAKE ? dexConfig.reliquaryAddress : dexConfig.stabilityPoolAddress;
    const abi = actionType === ActionType.STAKE ? ReliquaryAbi : StabilityPoolAbi;

    const contract = new ethers.Contract(address, abi, provider.getSigner());

    try {
      setLoading(true);
      const tx =
        actionType === ActionType.STAKE
          ? await contract.withdraw(ethers.utils.parseEther(amount), nftIndex, account)
          : await contract.withdrawFromSP(ethers.utils.parseEther(amount));
      const receipt = await tx.wait();
      toast.success('Withdraw successful');
      onSuccess();
      setUpdater(updater + 1);

      addAction({
        type: 'Staking',
        fromChainId: loreToken.chainId,
        toChainId: loreToken.chainId,
        token: actionType === ActionType.STAKE ? loreToken : loreUSDToken,
        amount: amount,
        template: 'Lore Stake',
        add: false,
        status: 1,
        action: 'Withdraw',
        transactionHash: receipt.transactionHash,
        sub_type: 'Stake'
      });
    } catch (error: any) {
      console.log(error, 'handleWithDraw: error');
      toast.fail(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!loreDetail) return null;
  return (
    <div className="p-6 text-white">
      <div className="mb-6">
        <h2 className="text-center text-lg font-medium mb-2">How much do you want to withdraw?</h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-white">Your staked amount</span>
          <span className="font-medium">{parseFloat(loreDetail.stakeAmount).toFixed(2)}</span>
        </div>

        <div className="relative">
          <input
            value={amount}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) return;
              setAmount(e.target.value);
            }}
            className="w-full px-4 py-2 bg-gray-100 rounded-lg pr-16 text-black"
            placeholder="0.0"
          />
          <button
            onClick={() => setAmount(loreDetail.stakeAmount)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#b8c0ff] text-sm px-2 py-1 rounded"
          >
            MAX
          </button>
        </div>

        <Button
          dappChainId={config.chainId}
          amount={amount}
          tokenBalance={loreDetail.stakeAmount}
          loading={loading}
          token={{
            address: dexConfig.loreAddress,
            decimals: 18,
            symbol: 'LORE',
            chainId: config.chainId
          }}
          onClick={handleWithDraw}
        >
          Withdraw
        </Button>
      </div>
    </div>
  );
};

const WithdrawModal = ({ onClose, config, nftIndex, onSuccess, loreDetail, actionType }: any) => {
  return (
    <Modal
      display={true}
      title={'Withdraw from LORE Staking'}
      onClose={onClose}
      portal={true}
      width={500}
      headerStyle={{ padding: '26px 20px 0' }}
      titleStyle={{ fonwWeight: 'bold', fontSize: '22px' }}
      content={
        <Content
          config={config}
          nftIndex={nftIndex}
          onSuccess={onSuccess}
          loreDetail={loreDetail}
          actionType={actionType}
        />
      }
    />
  );
};

export default WithdrawModal;
