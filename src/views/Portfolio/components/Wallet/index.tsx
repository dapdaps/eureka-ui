import { AnimatePresence } from 'framer-motion';
import React from 'react';

import { container } from '@/components/animation';
import Loading from '@/components/Icons/Loading';
import {
  formateValue,
  formateValueWithThousandSeparatorAndFont,
} from '@/utils/formate';
import { NoDataLayout } from '@/views/Portfolio/components/NoDataLayout';
import { getTokenLogo } from '@/views/Portfolio/helpers';

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

  return (
    <AnimatePresence mode="wait">
      <StyledWalletContainer {...container}>
        {
          loading ? (
            <StyledLoading height="100px">
              <Loading size={22} />
            </StyledLoading>
          ) : (
            tokens.length ? (
              <StyledWalletTable>
                <StyledWalletTableItem className="portfolio-table-head">
                  {
                    TABLE_HEAD.map(t => (
                      <StyledTableItemTxt key={t.key}>{t.title}</StyledTableItemTxt>
                    ))
                  }
                </StyledWalletTableItem>
                {
                  tokens.length ? tokens.filter((token: any) => filterFunc(token)).map((token: any) => (
                    <StyledWalletTableItem className="portfolio-table-body" key={token.id}>
                      <StyledTableItemTxt>
                        <StyledTokenIcon>
                          <StyledTokenIconImg src={getTokenLogo(token.symbol)} />
                          <div className="chain-logo">
                            <img src={token.chainLogo} alt="" />
                          </div>
                        </StyledTokenIcon>
                        {token.symbol}
                      </StyledTableItemTxt>
                      <StyledTableItemTxt>
                        {formateValueWithThousandSeparatorAndFont(token.price, 2, true, { prefix: '$' })}
                      </StyledTableItemTxt>
                      <StyledTableItemTxt>
                        {formateValue(token.amount, 4)}
                      </StyledTableItemTxt>
                      <StyledTableItemTxt>
                        {
                          formateValueWithThousandSeparatorAndFont(token.usd, 4, true, { prefix: '$' })
                        }
                      </StyledTableItemTxt>
                    </StyledWalletTableItem>
                  )) : (
                    <NoDataLayout />
                  )
                }
              </StyledWalletTable>
            ) : (
              <NoDataLayout />
            )
          )
        }
      </StyledWalletContainer>
    </AnimatePresence>
  );
};

export default Wallet;