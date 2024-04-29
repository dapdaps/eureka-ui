  
  const ConnectWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 320px;
    height: 55px;
    background-color: #ebf479;
    border-radius: 10px;
    margin: 30px auto;
    .connect-button {
    background-color: var(--button-color);
    width: 100%;
    max-width: 488px;
    height: 60px;
    border-radius: 10px;
    color: #000;
    border: none;
    font-size: 18px;
    font-weight: 700;
    &:active {
      background-color: var(--button-color);
    }
    &:focus-visible {
      box-shadow: none;
    }
  }
  `;
  
  return (
    <ConnectWrapper>
        <Web3Connect className="connect-button" connectLabel="Connect Wallet" />
    </ConnectWrapper>
  );