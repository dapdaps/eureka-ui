import { styled } from 'styled-components';

import { formateValueWithThousandSeparator } from '@/utils/formate';
import DAppIconWithChain from '@/views/Portfolio/components/Protocol/DAppIconWithChain';

export const StyledContainer = styled.div`
  width: 158px;
  height: 60px;
  flex-shrink: 0;
  flex-grow: 0;
  border-radius: 8px;
  border: 1px solid #282A3C;
  background: #1B1D25;
  color: #FFF;
  font-size: 14px;
  line-height: 17px;
  font-style: normal;
  font-weight: 500;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding: 10px;
  transition: all .3s linear;
  cursor: pointer;
  
  &:hover {
    background: #262836;
  }
  
  .usd {
    font-size: 16px;
    line-height: 20px;
    font-style: normal;
    font-weight: 500;
    margin-top: 3px;
  }
`;

export const StyledContent = styled.div`
`;

const DAppCard = (props: any) => {
  const { dapp } = props;

  return (
    <StyledContainer>
      <DAppIconWithChain
        size="32px"
        icon={dapp.icon}
        chainIcon={undefined}
      />
      <StyledContent>
        <div className="name">{dapp.name}</div>
        <div className="usd">
          ${formateValueWithThousandSeparator(dapp.usd, 2)}
        </div>
      </StyledContent>
    </StyledContainer>
  );
};

export default DAppCard;
