import {Dialog, Content, Title, InputWarpper, Input, Empty, Header, Overlay, CurrencyList, CloseIcon} from './styles';
const CurrencySelectPopup = (props) => {


  const { title, tokens, account } = props;


  const handleSearch = (e) => {
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
            <CloseIcon onClick={props?.onClose}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 5L5.5 15M5.5 5L15.5 15" stroke="currentColor" stroke-width="1.66667"
                      stroke-linecap="round"
                      stroke-linejoin="round"></path>
              </svg>
            </CloseIcon>
          </Header>
          <InputWarpper>
            <Input
              placeholder="Search name or paste address"
              onChange={handleSearch}
            />
          </InputWarpper>
          <CurrencyList>
            <Empty>No token.</Empty>
          </CurrencyList>
        </Content>
      </Overlay>
    </Dialog>
  );
}

export default CurrencySelectPopup;