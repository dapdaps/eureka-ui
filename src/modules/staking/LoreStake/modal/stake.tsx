import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import Modal from '@/components/Modal';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';

import LoreAbi from '../abi/lore.json';
import ReliquaryAbi from '../abi/reliquary.json';
import Button from './button';

const Content = ({ config, nftIndex, onSuccess }: any) => {
  const { dexConfig } = config;
  const [amount, setAmount] = useState<any>('');
  const { provider, account } = useAccount();
  const [walletBalance, setWalletBalance] = useState<any>('');
  const [allowance, setAllowance] = useState<any>('');
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

  const getWalletBalance = async () => {
    const contract = new ethers.Contract(dexConfig.loreAddress, LoreAbi, provider);
    try {
      const balance = await contract.balanceOf(account);
      setWalletBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.log(error, 'getWalletBalance: error');
    }
  };

  const getAllowance = async () => {
    const contract = new ethers.Contract(dexConfig.loreAddress, LoreAbi, provider);
    try {
      const allowance = await contract.allowance(account, dexConfig.reliquaryAddress);
      setAllowance(ethers.utils.formatEther(allowance));
    } catch (error) {
      console.log(error, 'getAllowance: error');
    }
  };

  useEffect(() => {
    if (!account) return;
    getWalletBalance();
    getAllowance();
  }, [account, provider, updater]);

  const handleStake = async () => {
    if (!account || !provider) return;
    setLoading(true);
    const contract = new ethers.Contract(dexConfig.reliquaryAddress, ReliquaryAbi, provider.getSigner());
    const relicData = await contract.balanceOf(account);

    try {
      if (relicData.toNumber() === 0) {
        const tx = await contract.createRelicAndDeposit(account, 0, ethers.utils.parseEther(amount));
        await tx.wait();
      }
      const tx = await contract.deposit(ethers.utils.parseEther(amount), nftIndex, ethers.constants.AddressZero);
      const receipt = await tx.wait();

      toast.success('Stake successfully');
      setUpdater(updater + 1);
      onSuccess?.();

      addAction({
        type: 'Staking',
        fromChainId: loreToken.chainId,
        toChainId: loreToken.chainId,
        token: loreToken,
        amount: amount,
        template: 'Lore Stake',
        add: false,
        status: 1,
        action: 'Staking',
        transactionHash: receipt.transactionHash,
        sub_type: 'Stake'
      });
    } catch (error: any) {
      toast.fail(error.message);
      console.log(error, 'handleStake: error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="mb-6">
        <h2 className="text-center text-lg font-medium mb-2">How much do you want to stake?</h2>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-white">Wallet Balance</span>
          <span className="font-medium">{parseFloat(walletBalance || 0).toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-white">Allowance</span>
          <span className="font-medium">{parseFloat(allowance || 0).toFixed(2)}</span>
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
            onClick={() => setAmount(walletBalance?.toString())}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#b8c0ff] text-sm px-2 py-1 rounded"
          >
            MAX
          </button>
        </div>

        <Button
          dappChainId={config.chainId}
          amount={amount}
          tokenBalance={walletBalance}
          spender={dexConfig.reliquaryAddress}
          loading={loading}
          token={{
            address: dexConfig.loreAddress,
            decimals: 8,
            symbol: 'LORE',
            chainId: config.chainId
          }}
          onClick={handleStake}
          onRefresh={() => getAllowance()}
        >
          Stake
        </Button>
      </div>
    </div>
  );
};

const StakeModal = ({ onClose, config, nftIndex, onSuccess }: any) => {
  return (
    <Modal
      display={true}
      title={'Stake into LORE Staking'}
      onClose={onClose}
      portal={true}
      width={500}
      headerStyle={{ padding: '26px 20px 0' }}
      titleStyle={{ fonwWeight: 'bold', fontSize: '22px' }}
      content={<Content config={config} nftIndex={nftIndex} onSuccess={onSuccess} />}
    />
  );
};

export default StakeModal;
