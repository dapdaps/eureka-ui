import { Contract } from 'ethers';
import config from '@/config/uniswap/linea/index';
import nftAbi from '../abi/nftAbi';

const STARTS_WITH = 'data:application/json;base64,';

export async function getTokenURI(tokenId: string, provider: any) {
  const NftContract = new Contract(config.contracts.nftAddress, nftAbi, provider);
  const tokenURI = await NftContract.tokenURI(tokenId);
  return JSON.parse(atob(tokenURI.slice(STARTS_WITH.length)));
}
