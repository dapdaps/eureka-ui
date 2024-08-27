export default function useAddTokenToWallet() {
  const add = async (token: any) => {
    if (!window.ethereum) return { success: false, error: null };
    try {
      // wasAdded is a boolean. Like any RPC method, an error may be thrown.
      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20', // Initially only supports ERC20, but eventually more!
          options: {
            address: token.address, // The address that the token is at.
            symbol: token.symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals: token.decimals, // The number of decimals in the token
            image: token.icon, // A string url of the token logo
          },
        },
      });
      return { success: true, error: null };
    } catch (error) {
      console.log(error);
      return { success: false, error };
    }
  };
  return { add };
}
