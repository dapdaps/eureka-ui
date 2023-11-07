import testnet from './testnet';
import mainnet from './mainnet';

const IS_DEV = true;

export default IS_DEV ? testnet : mainnet;

export const DEFAULT_TOKEN_ICON =
  'https://ipfs.near.social/ipfs/bafkreigrjhg7cu6bceirvh3vuujt7pg7l5um3jeuemhd2ac3mmh3qjjwme';
