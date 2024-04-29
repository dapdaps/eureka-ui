import styled from 'styled-components';

import Arrow from '../Arrow'

const Wapper = styled.div`
    min-height: 145px;
    border-radius: 12px;
    border: 1px solid rgba(55, 58, 83, 1);
`
const Header = styled.div`
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    border-bottom: 1px solid rgba(55, 58, 83, 1);
`
const ChainWapper = styled.div`
    display: flex;
    align-items: center;
`
const ChainName = styled.div`
    font-size: 16px;
    font-weight: 700;
    color: #fff;
`
const ChainTrigger = styled.div`
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(46, 49, 66, 1);
    border: 1px solid rgba(55, 58, 83, 1);
    border-radius: 8px;
    margin-left: 15px;
    gap: 10px;
    padding: 0 5px;
    cursor: pointer;
`
const ChainGroupImg = styled.img`
    width: 22px;
    height: 22px;
`

const ChainGroupName = styled.div`
    font-size: 16px;
    font-weight: 500;
    line-height: 19.2px;
    color: #fff;
`

const AddressWapper = styled.div`
    font-size: 16px;
    font-weight: 400;
    line-height: 19.2px;
    color: rgba(151, 154, 190, 1);
`

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 12px 16px;
`

const AmountWapper = styled.div`
    flex: 1;
`

const AmountInput = styled.input`
    width: 100%;
    display: block;
    color: rgba(255, 255, 255, 1);
    font-size: 26px;
    font-weight: 500;
    line-height: 31.2px;
    &::placeholder {
        color: rgba(151, 154, 190, 1);
    }
`

const PriceWapper = styled.div`
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    color: rgba(151, 154, 190, 1);
    margin-top: 10px;
    padding-left: 3px;
`

const TokenWapper = styled.div`

`

const TokenTrigger = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    padding: 0 10px;
    gap: 10px;
    border-radius: 8px;
    border: 1px solid rgba(55, 58, 83, 1);
    background-color: rgba(46, 49, 66, 1);
    cursor: pointer;
`

const TokenGroupImg = styled.div`
    position: relative;
    width: 22px;
    height: 22px;
    .token {
       display: block;
       width: 100%;
       height: 100%;
    }
    .chain {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 10px;
        height: 10px;
    }
`

const TokenGroupName = styled.div`
    color: #fff;
`

const BalanceWapper = styled.div`
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    color: rgba(151, 154, 190, 1);
    text-align: right;
    margin-top: 10px;
    .num {
        text-decoration: underline;
        cursor: pointer;
    }
`

export default function ChainTokenAmount() {
    return <Wapper>
        <Header>
            <ChainWapper>
                <ChainName>From</ChainName>
                <ChainTrigger>
                    <ChainGroupImg src="https://ipfs.near.social/ipfs/bafkreiashn3iawpvw66ejmyo3asdn4m5x25haijwyhubxjuzw7g7c7qq7a"/>
                    <ChainGroupName>Ethereum</ChainGroupName>
                    <Arrow />
                </ChainTrigger>
            </ChainWapper>
            <AddressWapper>0xc25...9210d</AddressWapper>
        </Header>
        <Content>
            <AmountWapper>
                <AmountInput placeholder='0' />
                <PriceWapper>$-</PriceWapper>
            </AmountWapper>
            <TokenWapper>
                <TokenTrigger>
                    <TokenGroupImg>
                        <img className='token' src="https://ipfs.near.social/ipfs/bafkreiashn3iawpvw66ejmyo3asdn4m5x25haijwyhubxjuzw7g7c7qq7a"/>
                        <img className='chain' src="https://ipfs.near.social/ipfs/bafkreiashn3iawpvw66ejmyo3asdn4m5x25haijwyhubxjuzw7g7c7qq7a"/>
                    </TokenGroupImg>
                    <TokenGroupName>ETH</TokenGroupName>
                    <Arrow />
                </TokenTrigger>
                <BalanceWapper>
                    <span>balance: </span>
                    <span className='num'>123.23</span>
                </BalanceWapper>
            </TokenWapper>
        </Content>
    </Wapper>
}