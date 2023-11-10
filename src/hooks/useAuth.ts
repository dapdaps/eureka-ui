import { useEthersProviderContext } from '@/data/web3';

const useAuth = () => {
  const { useConnectWallet } = useEthersProviderContext();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const logout = async () => {
    wallet && (await disconnect(wallet));
  };

  return { connect, disconnect, wallet, logout, connecting };
};

export default useAuth;
