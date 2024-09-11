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
`;

const Description = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 32px;
`;

const AlertModal = (props: any) => {
  const { config, onRequestClose, theme, from } = props;
  const Right = () => (
    <img
      style={{ marginBottom: '12px' }}
      src={`${config.ipfsPrefix}/bafkreigjsujyien6eb5ml3hmfigwwcgkse3emc2e6fkdhwzjp7yw7zue3u`}
      width={80}
      height={80}
    />
  );
  return (
    <BaseModal title={props.title} onRequestClose={onRequestClose} from={from}>
      <AlertModalContainer>
        <Right />
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
