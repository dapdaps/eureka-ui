import SwapModal from './swap';
import StakeModal from './stake';

export default function Modal(props: any) {
  const { actionType, ...rest } = props;
  if (actionType === 'swap') return <SwapModal {...rest} />;

  return <StakeModal {...props} />;
}
