import { styled } from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  background: rgba(0, 0, 0, 0.73);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 20px;
`;

const ModalContainer = styled.div`
  width: 334px;
  background: var(--agg-secondary-color, #262836);
  border-radius: 16px;
  color: var(--agg-primary-color, white);
`;

const Title = styled.div`
  padding: 29px 14px 20px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;

const ModalBody = styled.div`
  padding: 0 33px 10px;
`;

const ReloadModal = (props: any) => {
  return (
    <ModalWrapper>
      <ModalContainer>
        <Title>{props.title}</Title>
        <ModalBody>{props.children}</ModalBody>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default ReloadModal;
