import {
  StyledWalletContainer,
  StyledWalletTable,
  StyledWalletTableItem,
  StyledTableItemTxt,
  StyledTokenIcon
} from './styles';

const TABLE_HEAD = [
  {
    key: 'token',
    title: 'Token',
  },  {
    key: 'price',
    title: 'Price',
  },  {
    key: 'amount',
    title: 'Amount',
  },  {
    key: 'usd',
    title: 'USD Value',
  },

]
const Wallet = ({ loading, list }: any) => {

  return <StyledWalletContainer>
    <StyledWalletTable>
      <StyledWalletTableItem>
        {
          TABLE_HEAD.map(t => (
            <StyledTableItemTxt key={t.key}>{t.title}</StyledTableItemTxt>
          ))
        }
      </StyledWalletTableItem>
      {
        new Array(10).fill(1).map((_, i) =>(
          <StyledWalletTableItem key={i}>
              <StyledTableItemTxt>
                <StyledTokenIcon>
                  <div className='token'></div>
                </StyledTokenIcon>
                eth
              </StyledTableItemTxt>
              <StyledTableItemTxt>2</StyledTableItemTxt>
              <StyledTableItemTxt>3</StyledTableItemTxt>
              <StyledTableItemTxt>4</StyledTableItemTxt>
          </StyledWalletTableItem>
        ))
      }
    </StyledWalletTable>
  </StyledWalletContainer>
}


export default Wallet;