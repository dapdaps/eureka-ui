import styled from 'styled-components';

import Loading from '@/components/Icons/Loading';
import useConnectWallet from '@/hooks/useConnectWallet';

const StyledConnectWallet = styled.button`
  width: 164px;
  height: 46px;
  border-radius: 10px;
  background: #ebf479;
  padding: 0px 18px;
  color: #000;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export default function ConnectWallet(props?: Props) {
  const { style, className, loading } = props || {};
  const { onConnect } = useConnectWallet();
  return (
    <StyledConnectWallet
      style={style}
      className={className}
      onClick={() => {
        onConnect();
      }}
    >
      {loading && <Loading size={16} />}
      <span>Connect Wallet</span>
    </StyledConnectWallet>
  );
}

interface Props {
  style?: React.CSSProperties;
  className?: string;
  loading?: boolean;
}
