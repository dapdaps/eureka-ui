import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import ArrowIcon from '@/components/Icons/ArrowIcon';
import Modal from '@/components/Modal';
import type { QuestDapp } from '@/hooks/useAirdrop';

const StyledModalTitle = styled.div`
  font-weight: 700;
`;

const StyledModalBody = styled.div`
  padding: 24px 30px 63px 30px;
`;

const StyledDesc = styled.div`
  color: #979ABE;
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5;
  margin-bottom: 24px;
`;

const StyledBodyItem = styled.div`
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.2);
  padding: 18px 21px;
  display: flex;
  column-gap: 20px;
  justify-content: space-between;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const StyledItemInfo = styled.div`
  display: flex;
  align-items: center;
  column-gap: 11px;
`;

const StyledDappLogo = styled.div<{ url?: string }>`
  width: 26px;
  height: 26px;
  border-radius: 6px;
  border: 1px #202329;
  background: ${props => props.url ? `url(${props.url}) center no-repeat` : 'unset'};
  background-size: contain;
  flex-shrink: 0;
`;

const StyledDappName = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
`;

const StyledArrow = styled.div`
  opacity: 0.8;
  transform: rotate(-90deg);
  color: #ffffff;
`;

const StyledModal = styled.div`
  .interact-modal-overlay {
    backdrop-filter: blur(5px);
  }

  .interact-modal {
    background: #18191E;
    border: 1px solid #202329;
    backdrop-filter: blur(10px);
  }
`;

const InteractDAppsModal = (props: Props) => {
  const {
    display,
    chainName,
    dapps,
    description,
    onClose = () => {
    },
  } = props;

  const router = useRouter();
  const pathname = usePathname();

  const onDappClick = (item: QuestDapp) => {
    const dappRoute = `/${item.route}`;
    if (pathname === dappRoute) {
      router.replace(dappRoute);
    } else {
      router.push(dappRoute);
    }
  };

  return (
    <StyledModal>
      <Modal
        width={562}
        display={display}
        onClose={onClose}
        overlayClassName="interact-modal-overlay"
        className="interact-modal"
        title={<StyledModalTitle>Interact with {chainName} DApps</StyledModalTitle>}
        content={
          <StyledModalBody>
            <StyledDesc>
              {
                description ?
                  description :
                  `Here are the top dApps in ${chainName} ranked by total value locked (TVL). Try to perform transactions consistently every week as frequency of smart contract interaction is an important criterion to qualify for the airdrop:`
              }
            </StyledDesc>
            {
              dapps.map((item, index) => (
                <StyledBodyItem key={index} onClick={() => onDappClick(item)}>
                  <StyledItemInfo>
                    <StyledDappLogo url={item.logo} />
                    <StyledDappName>{item.name}</StyledDappName>
                  </StyledItemInfo>
                  <StyledArrow>
                    <ArrowIcon size={11} />
                  </StyledArrow>
                </StyledBodyItem>
              ))
            }
          </StyledModalBody>
        }
      />
    </StyledModal>
  );
};


export default InteractDAppsModal;

interface Props {
  display: boolean;
  chainName: string;
  dapps: QuestDapp[];
  description: string;

  onClose?(): void;
}