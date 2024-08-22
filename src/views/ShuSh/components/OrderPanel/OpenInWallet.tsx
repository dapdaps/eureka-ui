import { memo } from 'react';

import useOpenInWallet from '../../hooks/useOpenInWallet';
import { StyledOpenInWallet } from './styles';

const OpenInWallet = ({ order, tokens, onSuccess }: any) => {
  const { showButton, handleInWallet } = useOpenInWallet(order, tokens, onSuccess);
  return showButton ? <StyledOpenInWallet onClick={handleInWallet}>Open in wallet</StyledOpenInWallet> : '';
};

export default memo(OpenInWallet);
