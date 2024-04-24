import useAccount from '@/hooks/useAccount';
import { usePriceStore } from '@/stores/price';
import {
  StyledContainer,
  StyledFlex,
  StyledSvg
} from "@/styled/styles";
import Big from 'big.js';
import { ethers } from 'ethers';
import _ from 'lodash';
import { useEffect, useMemo, useState } from "react";
import Chart from "./components/Chart";
import Range from "./components/Range";
import useChartData from './hooks/wasabi/useChartData';
import useMarkets from "./hooks/wasabi/useMarkets";
import useQuote from './hooks/wasabi/useQuote';
import {
  StyledCircleImage,
  StyledGantariFont,
  StyledLongOrShortButton,
  StyledMarket,
  StyledNumberInput,
  StyledOperationButton,
  StyledSwitchButton
} from "./styles";
const SynFuturesView = function () {
  const { chainId } = useAccount();
  const price = usePriceStore((store) => store.price);
  const {
    loading,
    markets,
    queryMarkets
  } = useMarkets()
  const {
    loading: chartDataLoading,
    chartData,
    queryChartData
  } = useChartData()
  const {
    loading: quoteLoading,
    quote,
    queryQuote
  } = useQuote()


  const [tokenSymbol, setTokenSymbol] = useState("USDB")
  const [showMarkets, setShowMarkets] = useState(false)
  const [resolution, setResolution] = useState("15")
  // const [outputAmount, setOutputAmount] = useState("")

  const currentMarket = useMemo(() => {
    const index = markets.findIndex((market: any) => market?.data?.token?.symbol === tokenSymbol)
    return markets[index]
  }, [markets, tokenSymbol])

  const outputAmount = useMemo(() => {
    if (quote && currentMarket) {
      if (currentMarket.token0 === "ETH") {
        return ethers.utils.formatUnits(quote.outputSizeInETH, 18)
      } else {
        return ethers.utils.formatUnits(quote.outputSize, 18)
      }
    } else {
      return ""
    }
  }, [quote, currentMarket])

  const COLUMN_LIST = [{
    key: "time",
    width: "15%",
    label: "Time"
  }, {
    key: "time",
    width: "15%",
    label: "Position"
  }, {
    key: "time",
    width: "15%",
    label: "PnL"
  }, {
    key: "time",
    width: "10%",
    label: "Size"
  }, {
    key: "time",
    width: "15%",
    label: "Entry Price"
  }, {
    key: "time",
    width: "15%",
    label: "Index Price"
  }, {
    key: "time",
    width: "15%",
    label: "Liq.Price"
  },]

  const formatPercentage = function (value: any) {
    return Big(value).toFixed(2) + '%'
  }
  const formatFiat = (value: any) => {
    const number = Number(value).toLocaleString("en", {
      currency: "USD",
      style: "currency",
      compactDisplay: "short",
      notation: "compact",
      maximumFractionDigits: 2,
    });
    return number;
  };
  const renderPrice = (market: any) => {
    if (market?.token1 === "USDB") {
      console.log('=price', price)
      return (
        <StyledGantariFont
          color={market?.data?.tokenStats?.oneDayChange > 0 ? "#81ED70" : "#FF547D"}
          fontSize="24px"
          fontWeight="600"
        >{"$" + Big(price[market?.token0] ?? 0).div(price[market?.token1]).toFixed(2)}</StyledGantariFont>
      )
    } else {
      const price = market?.data?.tokenStats?.price
      const scientific = Big(price).toExponential(3)
      const parts = scientific.split('e')
      const initialBase = parseFloat(parts[0])
      const initialExponent = parseInt(parts[1])
      if (initialExponent < 0) {
        const base = initialBase > 1 ? (initialBase / 10) : initialBase
        const exponent = initialBase > 1 ? parseInt(parts[1]) - 1 : parseInt(parts[1])
        return (
          <StyledFlex>
            <StyledSvg style={{
              color: market?.data?.tokenStats?.oneDayChange > 0 ? "#81ED70" : "#FF547D"
            }}>
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="12" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
            </StyledSvg>
            <StyledFlex>
              <StyledGantariFont
                color={market?.data?.tokenStats?.oneDayChange > 0 ? "#81ED70" : "#FF547D"}
                fontSize="24px"
                fontWeight="600"
              >{base.toFixed(3)}</StyledGantariFont>
              <StyledGantariFont
                color={market?.data?.tokenStats?.oneDayChange > 0 ? "#81ED70" : "#FF547D"}
                fontSize="18px"
                fontWeight="600"
              >×10<span style={{ fontSize: 12, verticalAlign: "text-top" }}>{exponent}</span></StyledGantariFont>
            </StyledFlex>
          </StyledFlex>
        )
      } else {
        return (
          <StyledFlex>
            <StyledSvg style={{
              color: market?.data?.tokenStats?.oneDayChange > 0 ? "#81ED70" : "#FF547D"
            }}>
              <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="12" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
            </StyledSvg>
            <StyledFlex>
              <StyledGantariFont
                color={market?.data?.tokenStats?.oneDayChange > 0 ? "#81ED70" : "#FF547D"}
                fontSize="24px"
                fontWeight="600"
              >{initialBase.toFixed(3)}</StyledGantariFont>
            </StyledFlex>
          </StyledFlex>
        )
      }
    }
  }
  const handleQueryMarkets = function () {
    queryMarkets()
  }
  const handleQueryChartData = function () {
    const to = Math.ceil(Date.now() / 1000)
    const from = to - 60 * 60 * 24
    queryChartData({
      "symbol": currentMarket?.data?.token?.pairAddress + ":" + chainId,
      "resolution": resolution,
      "from": from,
      "to": to,
      "currencyCode": "TOKEN",
      "statsType": "UNFILTERED",
      "quoteToken": "token1",
      "removeLeadingNullValues": true
    })
  }
  const handleClickResolution = function (data: any) {
    setResolution(data.value)
  }
  const handleClickMarket = function (market: any) {
    setTokenSymbol(market?.data?.token?.symbol)
    setShowMarkets(false)
  }
  const handleTokenChange = _.debounce(function (number) {
    const token = currentMarket.data.token
    queryQuote({
      tokenAddress: token.mainnetAddress,
      side: "LONG",
      downPayment: ethers.utils.parseUnits(number, token.decimals).toString(),
      leverage: token.maxLeverage,
      maxSlippage: 100
    })
  }, 1500)

  useEffect(() => {
    if (currentMarket && chainId) {
      handleQueryChartData()
    }
  }, [currentMarket, chainId, resolution])


  useEffect(() => {
    handleQueryMarkets()
  }, [])

  return currentMarket && (
    <StyledContainer>
      <StyledFlex
        gap="40px"
        alignItems="flex-start"
        style={{
          width: 1244,
          margin: '30px auto 0'
        }}
      >
        <StyledContainer style={{ flex: 1 }}>
          <StyledFlex gap="26px">
            <StyledContainer style={{ position: "relative", minWidth: 355 }}>
              <StyledFlex gap="30px">
                <StyledFlex
                  gap="10px"
                  style={{ cursor: 'pointer' }}
                  onClick={() => setShowMarkets(true)}
                >
                  <StyledFlex>
                    <StyledCircleImage size="32px" src={currentMarket?.data?.token?.imageUrl} />
                    {/* <StyledCircleImage size="32px" /> */}
                  </StyledFlex>
                  <StyledGantariFont
                    color="#FFF"
                    fontSize="24px"
                    fontFamily="Gantari"
                    fontWeight="600"
                  >{currentMarket?.token0}/{currentMarket?.token1}</StyledGantariFont>
                  <StyledSvg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
                      <path d="M1 1L6 5L11 1" stroke="#979ABE" stroke-width="2" stroke-linecap="round" />
                    </svg>
                  </StyledSvg>
                </StyledFlex>
                {
                  price && renderPrice(currentMarket)
                }
              </StyledFlex>
              {
                showMarkets && (
                  <StyledContainer style={{
                    position: "absolute",
                    zIndex: 999,
                    left: "-10px",
                    right: "-10px",
                    bottom: "-10px",
                    transform: "translateY(100%)",
                    borderRadius: "6px",
                    border: "1px solid #373A53",
                    background: "#262836",
                    boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)"
                  }}>
                    {
                      markets.map((market: any, index: number) => {
                        return (
                          <StyledMarket key={index} onClick={() => handleClickMarket(market)}>
                            <StyledFlex gap="10px">
                              <StyledFlex>
                                <StyledCircleImage src={market?.data?.token?.imageUrl} />
                                {/* <StyledCircleImage /> */}
                              </StyledFlex>
                              <StyledGantariFont
                                color="#FFF"
                                fontSize="14px"
                              >{market?.token0} / {market?.token1}</StyledGantariFont>
                            </StyledFlex>
                            <StyledFlex gap="12px">
                              {renderPrice(market)}
                              <StyledGantariFont
                                color={market?.data?.tokenStats?.oneDayChange > 0 ? "#81ED70" : "#FF547D"}
                                fontSize="14px"
                              >{formatPercentage(market?.data?.tokenStats?.oneDayChange ?? 0)}</StyledGantariFont>
                            </StyledFlex>
                          </StyledMarket>
                        )
                      })
                    }
                  </StyledContainer>
                )
              }

            </StyledContainer>
            <StyledFlex flexDirection="column" alignItems="flex-start">
              <StyledGantariFont color="#979ABE" fontSize="12px">24h +/-</StyledGantariFont>
              <StyledGantariFont
                color={currentMarket?.data?.tokenStats?.oneDayChange > 0 ? "#81ED70" : "#FF547D"}
                fontSize="12px"
              >{formatPercentage(currentMarket?.data?.tokenStats?.oneDayChange ?? 0)}</StyledGantariFont>
            </StyledFlex>
            <StyledFlex flexDirection="column" alignItems="flex-start">
              <StyledGantariFont color="#979ABE" fontSize="12px">24h Volume</StyledGantariFont>
              <StyledGantariFont color="#979ABE" fontSize="12px">{formatFiat(currentMarket?.data?.tokenStats?.oneDayVolumeUsd)}</StyledGantariFont>
            </StyledFlex>
          </StyledFlex>
          <StyledContainer style={{ marginTop: 40, marginBottom: 30 }}>
            <Chart chartData={chartData} resolution={resolution} onClickResolution={handleClickResolution} />
          </StyledContainer>
          <StyledContainer>
            <StyledFlex gap="22px">
              <StyledSwitchButton className="active">Positions</StyledSwitchButton>
              <StyledSwitchButton>History</StyledSwitchButton>
            </StyledFlex>
            <StyledFlex style={{
              marginTop: 21,
              marginBottom: 18
            }}>
              {
                COLUMN_LIST.map((column, index) => {
                  return <StyledGantariFont
                    key={index}
                    color="#979ABE"
                    fontSize="14px"
                    style={{ width: column.width }}
                  >{column.label}</StyledGantariFont>
                })
              }
            </StyledFlex>
            <StyledFlex>
            </StyledFlex>
          </StyledContainer>
        </StyledContainer>
        <StyledContainer style={{ width: 430 }}>
          <StyledContainer style={{
            // height: 514,
            position: "relative",
            borderRadius: 16,
            border: "1px solid #373A53",
            background: "#262836",
            padding: "37px 20px 20px"
          }}>
            <StyledContainer style={{
              position: "absolute",
              right: 20,
              top: 46
            }}>
              <StyledSvg style={{ cursor: "pointer" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                  <path d="M7.17184 0.222355C7.42364 0.0766877 7.70926 0 8 0C8.29074 0 8.57637 0.0766877 8.82816 0.222355L15.1718 3.89274C15.4236 4.03841 15.6327 4.24792 15.7781 4.50021C15.9235 4.75251 16 5.0387 16 5.33003V12.67C16 12.9613 15.9235 13.2475 15.7781 13.4998C15.6327 13.7521 15.4236 13.9616 15.1718 14.1073L8.82816 17.7776C8.57637 17.9233 8.29074 18 8 18C7.70926 18 7.42364 17.9233 7.17184 17.7776L0.828158 14.1073C0.576372 13.9616 0.367286 13.7521 0.221915 13.4998C0.0765431 13.2475 7.38473e-06 12.9613 0 12.67V5.33003C7.38473e-06 5.0387 0.0765431 4.75251 0.221915 4.50021C0.367286 4.24792 0.576372 4.03841 0.828158 3.89274L7.17184 0.222355ZM8 1.65964L1.65632 5.33003V12.67L8 16.3404L14.3437 12.67V5.33003L8 1.65964ZM8 5.68064C8.87856 5.68064 9.72115 6.03035 10.3424 6.65286C10.9636 7.27536 11.3126 8.11965 11.3126 9C11.3126 9.88035 10.9636 10.7246 10.3424 11.3471C9.72115 11.9696 8.87856 12.3194 8 12.3194C7.12144 12.3194 6.27886 11.9696 5.65762 11.3471C5.03638 10.7246 4.68737 9.88035 4.68737 9C4.68737 8.11965 5.03638 7.27536 5.65762 6.65286C6.27886 6.03035 7.12144 5.68064 8 5.68064ZM8 7.34032C7.78249 7.34032 7.56711 7.38325 7.36616 7.46665C7.1652 7.55006 6.98261 7.67231 6.82881 7.82643C6.67501 7.98054 6.553 8.16351 6.46977 8.36487C6.38653 8.56623 6.34369 8.78205 6.34369 9C6.34369 9.21795 6.38653 9.43377 6.46977 9.63513C6.553 9.8365 6.67501 10.0195 6.82881 10.1736C6.98261 10.3277 7.1652 10.4499 7.36616 10.5333C7.56711 10.6168 7.78249 10.6597 8 10.6597C8.43928 10.6597 8.86057 10.4848 9.17119 10.1736C9.48181 9.86232 9.65631 9.44018 9.65631 9C9.65631 8.55983 9.48181 8.13768 9.17119 7.82643C8.86057 7.51518 8.43928 7.34032 8 7.34032Z" fill="#979ABE" />
                </svg>
              </StyledSvg>
              {/* <StyledContainer style={{
                position: "absolute",
                right: -10,
                bottom: -13,
                transform: "translateY(100%)",
                borderRadius: 8,
                border: "1px solid #454968",
                background: "#313447",
                padding: "13px 16px 20px"
              }}>
                <StyledGantariFont color="#FFF" style={{ marginBottom: 16 }}>Max. Slippage</StyledGantariFont>
                <StyledFlex gap="8px">
                  <StyldePercentageButton>
                    <StyledGantariFont color="#979ABE" fontSize="14px">0.1%</StyledGantariFont>
                  </StyldePercentageButton>
                  <StyldePercentageButton style={{
                    borderColor: "#979ABE",
                    backgroundColor: "#404560"
                  }}>
                    <StyledGantariFont color="#FFF" fontSize="14px">0.5%</StyledGantariFont>
                  </StyldePercentageButton>
                  <StyldePercentageButton>
                    <StyledGantariFont color="#979ABE" fontSize="14px">1%</StyledGantariFont>
                  </StyldePercentageButton>

                  <StyldePercentageButton style={{
                    width: 85
                  }}>
                    <StyldePercentageInput placeholder="Custom" />
                    <StyledGantariFont color="#FFF" fontSize="14px">%</StyledGantariFont>
                  </StyldePercentageButton>
                </StyledFlex>
              </StyledContainer> */}
            </StyledContainer>
            <StyledFlex justifyContent="center" gap="11px">
              <StyledSvg>
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                  <path d="M17.5 35C7.83502 35 0 27.165 0 17.5C0 7.83502 7.83502 0 17.5 0C27.165 0 35 7.83502 35 17.5C35 27.165 27.165 35 17.5 35Z" fill="#191919" />
                  <path d="M17.5006 33.125C8.87116 33.125 1.87561 26.1294 1.87561 17.5C1.87561 8.87055 8.87116 1.875 17.5006 1.875C26.1301 1.875 33.1256 8.87055 33.1256 17.5C33.1256 26.1294 26.1301 33.125 17.5006 33.125Z" fill="#F0F0F0" />
                  <path d="M17.5006 28.75C11.2874 28.75 6.25061 23.7132 6.25061 17.5C6.25061 11.2868 11.2874 6.25 17.5006 6.25C23.7138 6.25 28.7506 11.2868 28.7506 17.5C28.7506 23.7132 23.7138 28.75 17.5006 28.75Z" fill="#191919" />
                </svg>
              </StyledSvg>
              <StyledGantariFont
                color="#FFF"
                fontSize="20px"
                fontWeight="700"
              >Particle</StyledGantariFont>
            </StyledFlex>
            <StyledFlex gap="10px" style={{
              marginTop: 28,
              marginBottom: 17,
              borderRadius: 8,
              border: "1px solid #373A53",
              background: "#2E3142",
            }}>
              <StyledOperationButton theme="#81ED70" className="active">Long</StyledOperationButton>
              <StyledOperationButton theme="#FF547D">Short</StyledOperationButton>
            </StyledFlex>
            <StyledContainer style={{
              paddingTop: 12,
              paddingRight: 14,
              paddingBottom: 16,
              paddingLeft: 16,
              marginBottom: 14,
              borderRadius: 12,
              border: "1px solid #373A53",
              background: "#2E3142",
            }}>
              <StyledFlex justifyContent="space-between" style={{ marginBottom: 10 }}>
                <StyledGantariFont color="#979ABE" fontSize="14px">Pay</StyledGantariFont>
                {/* <StyledFlex gap="8px">
                  <StyledGantariFont color="#979ABE" fontSize="12px">balance:</StyledGantariFont>
                  <StyledGantariFont color="#979ABE" fontSize="12px" style={{ textDecoration: "underline" }}>1.23</StyledGantariFont>
                </StyledFlex> */}
              </StyledFlex>
              <StyledFlex justifyContent="space-between">
                <StyledNumberInput placeholder="0.0" type='number' onChange={(event) => handleTokenChange(event.target.value)} />
                <StyledGantariFont color="#979ABE" fontSize="18px">ETH</StyledGantariFont>
              </StyledFlex>
            </StyledContainer>
            <StyledContainer style={{
              paddingTop: 12,
              paddingRight: 14,
              paddingBottom: 16,
              paddingLeft: 16,
              borderRadius: 12,
              border: "1px solid #373A53",
              background: "#2E3142",
            }}>
              <StyledFlex justifyContent="space-between" style={{ marginBottom: 10 }}>
                <StyledGantariFont color="#979ABE" fontSize="14px">Long</StyledGantariFont>
                {/* <StyledFlex gap="8px">
                  <StyledGantariFont color="#979ABE" fontSize="12px">balance:</StyledGantariFont>
                  <StyledGantariFont color="#979ABE" fontSize="12px" style={{ textDecoration: "underline" }}>1.23</StyledGantariFont>
                </StyledFlex> */}
              </StyledFlex>
              <StyledFlex justifyContent="space-between">
                <StyledNumberInput value={outputAmount} placeholder="0.0" disabled />
                <StyledGantariFont color="#979ABE" fontSize="18px">{currentMarket.token0}</StyledGantariFont>
              </StyledFlex>
            </StyledContainer>

            <StyledFlex
              justifyContent="space-between"
              style={{ marginTop: 17, marginBottom: 17 }}
            >
              <StyledGantariFont color="#979ABE" fontSize="14px">Leverage</StyledGantariFont>
              <StyledFlex justifyContent="flex-end" style={{
                width: 72,
                height: 36,
                padding: "8px 12px 8px 0",
                borderRadius: 8,
                border: "1px solid #373A53",
                background: "#2E3142",
              }}>
                <StyledGantariFont color="#FFF">3x</StyledGantariFont>
              </StyledFlex>
            </StyledFlex>
            {/* <StyledRange type="range" /> */}
            <Range value={80} />
            <StyledLongOrShortButton>
              <StyledGantariFont fontSize="18px" fontWeight="600">Long WETH</StyledGantariFont>
            </StyledLongOrShortButton>
          </StyledContainer>
          <StyledContainer style={{
            padding: "14px 20px"
          }}>
            <StyledFlex
              justifyContent="space-between"
              style={{
                marginBottom: 10
              }}
            >
              <StyledGantariFont color="#979ABE" fontSize="14px">Current Price</StyledGantariFont>
              <StyledGantariFont color="#979ABE" fontSize="14px">3205.09 USDB / WETH</StyledGantariFont>
            </StyledFlex>
          </StyledContainer>
        </StyledContainer>
      </StyledFlex>
    </StyledContainer>
  )
}
export default SynFuturesView