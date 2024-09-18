import useSwitchChain from '@/hooks/useSwitchChain';
import ModuleLoading from '@/modules/components/Loading';
import { StyledButton, StyledContainer, StyledNotes } from '@/modules/lending/AllInOne/SwitchChain/styles';

const AllInOneSwitchChain = (props: Props) => {
  const { currentChain } = props;

  const { switching, switchChain } = useSwitchChain();

  const handleSwitchChain = async () => {
    if (switching) return;
    await switchChain({ chainId: currentChain.chain_id });
  };

  return (
    <StyledContainer>
      <StyledNotes>To proceed, kindly switch to {currentChain?.name} Chain.</StyledNotes>
      <StyledButton onClick={handleSwitchChain} className={switching ? 'loading' : ''}>
        {switching && <ModuleLoading size={16} className="all-in-one-lending-switch-chain-loading" />}
        <span>Switch to {currentChain?.name} Chain</span>
      </StyledButton>
    </StyledContainer>
  );
};

export default AllInOneSwitchChain;

interface Props {
  currentChain: any;
}
