import { styled } from 'styled-components';


const TabContainer = styled.div`
  background: var(--agg-secondary-color, #212233);
  color: var(--agg-primary-color, #fff);
  border: 1px solid #212233;
  display: flex;
  width: 244px;
  height: 52px;
  border-radius: 28px;
  align-items: center;
  padding: 0 4px;
`;

const TabItem = styled.div<{ selected: boolean, disabled?: boolean,  }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  border-radius: 28px;
  ${(props) => props.selected && 'color: white;background: var(--agg-primary-color,#000);'}
  ${(props) =>
    props.disabled &&
    `
    opacity: 0.3;
    cursor: not-allowed;
  `}

  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`;

const TabSwitcher = (props: any) => {
const { select, setSelect, theme, from } = props;

  return (
    <TabContainer>
      {from === 'layer' ? (
        <>
          <TabItem selected={select === 'MARKET'} onClick={() => setSelect('MARKET')} style={theme ? theme : {}}>
            Market
          </TabItem>
          <TabItem selected={select === 'YOURS'} onClick={() => setSelect('YOURS')} style={theme ? theme : {}}>
            Yours
          </TabItem>
        </>
      ) : (
        <>
          <TabItem selected={select === 'MARKET'} onClick={() => setSelect('MARKET')} style={theme ? theme : {}}>
            Market
          </TabItem>
          <TabItem selected={select === 'YOURS'} onClick={() => setSelect('YOURS')} style={theme ? theme : {}}>
            Yours
          </TabItem>
        </>
      )}
    </TabContainer>
  );
};

export default TabSwitcher;
