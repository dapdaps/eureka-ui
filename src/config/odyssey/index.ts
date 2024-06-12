import mainnet from './mainnet';
import testnet from './testnet';

export default process.env.NEXT_PUBLIC_API === 'https://api.dapdap.net' ? mainnet : testnet;
