import styled from "styled-components";

import Modal from "@/components/Modal";

const StyledModalTitle = styled.div`
  font-weight: 700;
`;

const StyledModalBody = styled.div`
  padding: 37px 30px 40px 30px;
`;

const StyledBodyItem = styled.div`
  border-radius: 12px;
  background: rgba(0,0,0,0.2);
  padding: 18px 21px;
  display: flex;
  column-gap: 20px;
  justify-content: space-between;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const StyledLabel = styled.div`
  color: #979ABE;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 400;
`;

const StyledValue = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 600;
`;

const StyledLink = styled.a`
  text-decoration: underline;
  color: #ffffff;
`;

const StyledModal = styled.div`
  .add-modal-overlay {
    backdrop-filter: blur(5px);
  }
  .add-modal {
    background: #18191E;
    border: 1px solid #202329;
    backdrop-filter: blur(10px);
  }
`;

const ChainList = [
  {
    key: 'rpc',
    label: 'RPC URL'
  },
  {
    key: 'chainId',
    label: 'Chain ID'
  },
  {
    key: 'symbol',
    label: 'Currency symbol'
  },
  {
    key: 'explorerUrl',
    label: 'Block explorer URL'
  },
];

const AddMetaMaskModal = (props: any) => {

  const {
    display = false,
    onClose = () => {},
    chainName = ''
  } = props;

  return (
    <StyledModal>
      <Modal
        width={562}
        title={<StyledModalTitle>Add {chainName} to MetaMask</StyledModalTitle>}
        display={display}
        onClose={onClose}
        overlayClassName='add-modal-overlay'
        className='add-modal'
        content={<StyledModalBody>
          {
            ChainList.map((item) => (<StyledBodyItem key={item.key}>
              <StyledLabel>{item.label}:</StyledLabel>
              {
                item.key === 'explorerUrl'
                  ? props[item.key] && (<StyledLink href={props[item.key]} target='_blank'>{props[item.key]}</StyledLink>)
                  : (<StyledValue>{props[item.key] ?? '-'}</StyledValue>)
              }
            </StyledBodyItem>))
          }
        </StyledModalBody>}
      />
    </StyledModal>
  );
};

export default AddMetaMaskModal;