import Loading from '@/components/Icons/Loading';

import { Container, SwitchButton, Wrapper } from './styles';

const ChainWarningBox = (props: Props) => {
  const { chain, theme } = props;

  const handleSwitchChain = () => {
    if (props.onSwitchChain) {
      props.onSwitchChain({
        chainId: `0x${Number(chain.chain_id).toString(16)}`
      });
    } else {
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${Number(chain.chain_id).toString(16)}` }]
      });
    }
  };

  return (
    <Container
      style={{
        top: props.top || '0px'
      }}
    >
      <Wrapper>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <img src={chain.logo} alt="" style={{ width: '26px', height: '26px' }} />
          <div style={{ fontSize: '18px', fontWeight: 500 }}>{chain.name}</div>
        </div>
        <div style={{ marginTop: '17px' }}>Please connect to {chain.name}</div>
        <SwitchButton onClick={() => handleSwitchChain()} style={theme ? theme : {}}>
          {props.switchingChain ? <Loading size={16} /> : 'Switch Network'}
        </SwitchButton>
      </Wrapper>
    </Container>
  );
};

export default ChainWarningBox;

export interface Props {
  chain: any;
  theme: any;
  top?: string | number;
  switchingChain?: boolean;

  onSwitchChain?(params: { chainId: string }): void;
}
