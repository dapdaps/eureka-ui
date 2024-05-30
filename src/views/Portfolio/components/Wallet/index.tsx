import { AnimatePresence } from 'framer-motion';
import React, { useCallback } from 'react';

import { container } from '@/components/animation';
import Loading from '@/components/Icons/Loading';
import chains from '@/config/chains';
import { formateValue, formateValueWithThousandSeparator } from '@/utils/formate';
import { NoDataLayout } from '@/views/Portfolio/components/NoDataLayout';
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

const Wallet = ({ loading, tokens, filterFunc }: any) => {

  const getChain = useCallback((chainId: number) => {
    return chains[chainId];
  }, []);

  return (
    <AnimatePresence mode="wait">
      <StyledWalletContainer {...container}>
        {
          !loading && tokens.length && (
            <StyledWalletTable>
              <StyledWalletTableItem>
                {
                  TABLE_HEAD.map(t => (
                    <StyledTableItemTxt key={t.key}>{t.title}</StyledTableItemTxt>
                  ))
                }
              </StyledWalletTableItem>
              {
                tokens.length ? tokens.filter((token: any) => filterFunc(token)).map((token: any) => (
                  <StyledWalletTableItem key={token.id}>
                    <StyledTableItemTxt>
                      <StyledTokenIcon>
                        <StyledTokenIconImg src={getTokenLogo(token.symbol)} />
                        <div className="chain-logo">
                          <img src={getChainLogo(getChain(token.chain_id)?.chainName)} alt="" />
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
        {
          loading && (
            <StyledLoading height="100px">
              <Loading size={22} />
            </StyledLoading>
          )
        }
        {
          !loading && !tokens.length && (
            <NoDataLayout />
          )
        }
      </StyledWalletContainer>
    </AnimatePresence>
  );
};

export default Wallet;