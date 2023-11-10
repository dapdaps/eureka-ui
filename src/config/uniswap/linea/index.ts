import testnet from './testnet';
import mainnet from './mainnet';

const IS_DEV = false;

export default IS_DEV ? testnet : mainnet;
