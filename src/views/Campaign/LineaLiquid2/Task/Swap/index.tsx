import Modal from '@/components/Modal';
import dappConfig from '@/config/dapp';
import { basic, networks } from '@/config/swap/dapps/nile';
import { linea } from '@/config/tokens/linea';
import useAccount from '@/hooks/useAccount';
import Panel from '@/modules/swap/Panel';

import { StyledTitle } from './styles';

export default function SwapModal({ show, onClose }: any) {
  const { account, chainId } = useAccount();
  return (
    <Modal
      display={!!show}
      width={500}
      onClose={onClose}
      title={
        <StyledTitle>
          <div>Swap ${show === 1 ? 'ZERO' : 'Nile'}</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="93" height="20" viewBox="0 0 93 20" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.26505 2.88379L11.9855 0L14.706 2.88379L11.9855 5.76758L9.26505 2.88379ZM0 3.03964L2.898 5.97627C5.46068 8.5731 8.35812 10.77 11.5034 12.5011L11.5046 12.5018L11.5058 12.5024C11.9025 12.7216 12.3117 12.9369 12.7323 13.1475C15.2394 14.4049 17.8688 15.3607 20.5714 15.9988V6.61013H24V17.5286H22.3914L22.0051 20.0001C18.2881 19.3454 14.6745 18.1467 11.2677 16.4383C10.8089 16.2084 10.3609 15.9728 9.92389 15.7313C7.62842 14.4679 5.45386 12.9771 3.42857 11.2806V17.5286H0V3.03964Z"
              fill="#B8F2FA"
            />
            <path
              d="M84.8359 17.7776V5.27832H92.8671V7.24276H87.1085V10.5361H92.5204V12.5005H87.1085V15.7939H92.8671V17.7776H84.8359Z"
              fill="#B8F2FA"
            />
            <path d="M71.257 5.27832V15.7939H76.3992V17.7776H68.9844V5.27832H71.257Z" fill="#B8F2FA" />
            <path d="M56.7578 17.7776V5.27832H59.0304V17.7776H56.7578Z" fill="#B8F2FA" />
            <path
              d="M36.5625 5.27832H39.0469L44.7284 14.1954H44.5551V5.27832H46.8277V17.7776H44.5166L38.4692 8.32128H38.8351V17.7776H36.5625V5.27832Z"
              fill="#B8F2FA"
            />
          </svg>
        </StyledTitle>
      }
      content={
        <Panel
          style={{ border: 'none', paddingBottom: '0px' }}
          account={account}
          currentChain={{
            chain_id: 59144,
            logo: 'https://assets.dapdap.net/images/linea-chainicon.png',
            name: 'Linea'
          }}
          chainId="59144"
          isChainSupported={chainId === 59144}
          localConfig={{ basic, networks, theme: dappConfig['nile'].theme, type: dappConfig['nile'].type }}
          defaultOutputToken={show === 1 ? linea['zero'] : linea['nile']}
          outputTokenSelectable={false}
          onSuccess={onClose}
        />
      }
    />
  );
}
