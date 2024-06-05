import { StyledClaimContainer, StyledContentClaim } from './styles';
import Loading from '@/components/Icons/Loading';

const ClaimButton = ({ count, onClaim = () => {}, loading }: any) => {

  const claimElement = (classname?: string) => (
    <StyledContentClaim className={classname} onClick={onClaim}>
      {
        loading ? <Loading size={20} /> : <>Claim <span className='claim-text'>{count}</span> PTS</>
      }
    </StyledContentClaim>
  );

  return <StyledClaimContainer>
    {
      claimElement('bottom')
    }
    {
      claimElement()
    }
  </StyledClaimContainer>
}

export default ClaimButton;