import { useCallback } from 'react';

import Loading from '@/components/Icons/Loading';
import chains from '@/config/chains';
import { formateValue, formateValueWithThousandSeparator } from '@/utils/formate';
import { getChainLogo, getTokenLogo } from '@/views/Portfolio/helpers';

import {
  StyledLoading,
  StyledTableItemTxt,
  StyledTokenIcon,
  StyledTokenIconImg,
  StyledWalletContainer,
  StyledWalletTable,
  StyledWalletTableItem,
} from './styles';
import { NoDataLayout } from '@/views/Portfolio/components/NoDataLayout';

const TABLE_HEAD = [
  {
    key: 'token',
    title: 'Token',
  }, {
    key: 'price',
    title: 'Price',
  }, {
    key: 'amount',
    title: 'Amount',
  }, {
    key: 'usd',
    title: 'USD Value',
  },
];
const Wallet = ({ loading, tokens }: any) => {

  const getChain = useCallback((chainId: number) => {
    return chains[chainId];
  }, []);

  return (
    <StyledWalletContainer>
      {
        loading ? (
          <StyledLoading height="100px">
            <Loading size={22} />
          </StyledLoading>
        ) : (
          <StyledWalletTable>
            <StyledWalletTableItem>
              {
                TABLE_HEAD.map(t => (
                  <StyledTableItemTxt key={t.key}>{t.title}</StyledTableItemTxt>
                ))
              }
            </StyledWalletTableItem>
            {
              tokens.length ? tokens.map((token: any) => (
                <StyledWalletTableItem key={token.id}>
                  <StyledTableItemTxt>
                    <StyledTokenIcon>
                      <StyledTokenIconImg src={getTokenLogo(token.symbol)} />
                      <div className="chain-logo">
                        <img src={getChainLogo(getChain(token.chain_id).chainName)} alt="" />
                      </div>
                    </StyledTokenIcon>
                    {token.symbol}
                  </StyledTableItemTxt>
                  <StyledTableItemTxt>
                    {formateValue(token.price, 2)}
                  </StyledTableItemTxt>
                  <StyledTableItemTxt>
                    {formateValue(token.amount, 4)}
                  </StyledTableItemTxt>
                  <StyledTableItemTxt>
                    ${formateValueWithThousandSeparator(token.usd, 4)}
                  </StyledTableItemTxt>
                </StyledWalletTableItem>
              )) : (
                <NoDataLayout />
              )
            }
          </StyledWalletTable>
        )
      }
    </StyledWalletContainer>
  );
};

export default Wallet;