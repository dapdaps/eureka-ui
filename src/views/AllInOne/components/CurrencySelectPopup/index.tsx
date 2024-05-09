import { ChangeEvent } from 'react';
import {Dialog, Content, Title, InputWarpper, Input, Empty, Header, Overlay, CurrencyList, CurrencyRow, CurrencyAmount, CurrencyIcon, CurrencyLabel, CurrencyName, CurrencySymbol } from './styles';
import CloseIcon from '@/views/AllInOne/components/Trade/CloseIcon';
type Props = {
  // title: string;
  // tokens: Record<string, any>[];
  // account: string;
  display: boolean;
  onClose: () => void;
}
const CurrencySelectPopup = (props: Props) => {
  // const { title, tokens, account } = props;

  const currency = {
    icon: '',
    symbol: 'ETH',
    name: 'eth'
  }

const balanceFormated = () => {
    // if (!currency.address) return "-";
    // if (!currency.balanceLoaded) return "Loading";
    // if (currency.balance === "0" || Big(currency.balance).eq(0)) return "0";
    // if (Big(currency.balance).lt(0.0001)) return "<0.0001";
    // return Big(currency.balance).toFixed(4);
  return '-';
  }
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    // State.update({
    //   tokens: e.target.value
    //     ? props.tokens.filter((token) => {
    //       return (
    //         token.address === e.target.value ||
    //         token.name.toLowerCase().includes(e.target.value?.toLowerCase()) ||
    //         token.symbol.toLowerCase().includes(e.target.value?.toLowerCase())
    //       );
    //     })
    //     : props.tokens,
    // });
  };
  return (
    <Dialog className={props.display ? 'display' : ''}>
      <Overlay
        onClick={() => {
          props.onClose();
        }}
      >
        <Content
          onClick={(ev) => {
            ev.stopPropagation();
          }}
        >
          <Header>
            <Title>Select a token</Title>
            <CloseIcon onClose={props.onClose} size={18}/>
          </Header>
          <InputWarpper>
            <Input
              placeholder="Search name or paste address"
              onChange={handleSearch}
            />
          </InputWarpper>
          <CurrencyList>
            <CurrencyRow>
              <CurrencyLabel>
                <CurrencyIcon src={currency.icon} />
                <div>
                  <CurrencySymbol>{currency.symbol}</CurrencySymbol>
                  <CurrencyName>{currency.name}</CurrencyName>
                </div>
              </CurrencyLabel>
              <CurrencyAmount>{balanceFormated()}</CurrencyAmount>
            </CurrencyRow>
            <Empty>No token.</Empty>
          </CurrencyList>
        </Content>
      </Overlay>
    </Dialog>
  );
}

export default CurrencySelectPopup;