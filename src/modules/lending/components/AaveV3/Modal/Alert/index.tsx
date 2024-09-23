import IconDone from '@public/images/others/done.svg';
import { styled } from 'styled-components';

import PrimaryButton from '../../PrimaryButton';
import BaseModal from '../index';
const AlertModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  font-family: Montserrat;
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 32px;
  color: #fff;
  font-family: Montserrat;
`;

const AlertModal = (props: any) => {
  const { config, onRequestClose, theme, from } = props;
  return (
    <BaseModal title={props.title} onRequestClose={onRequestClose} from={from} config={config}>
      <AlertModalContainer>
        <IconDone style={{ marginBottom: '12px' }} height={80} width={80} />
        <Title>{props.title}</Title>
        <Description>{props.description}</Description>
        <PrimaryButton onClick={onRequestClose} config={config} theme={theme}>
          Ok, Close
        </PrimaryButton>
      </AlertModalContainer>
    </BaseModal>
  );
};

export default AlertModal;
