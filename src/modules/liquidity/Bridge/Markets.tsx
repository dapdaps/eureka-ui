import { memo } from "react"
import styled from "styled-components"
const Markets = styled.div`
  /* width: 388px; */
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 10px;
  &.layer {
    gap: 0;
    height: 40px;
    border-radius: 20px;
    border: 1px solid #000;
    overflow: hidden;
  }
`
const Market = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  width: 60px;
  height: 54px;
  cursor: pointer;
  border: 1px solid #373A53;
  background-color: rgba(33, 35, 48, 0.5);
  border-radius: 8px;
  img {
    width: 24px;
  }
  span {
    max-width: 54px;
    color: #979ABE;
    font-family: Gantari;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &.active {
    background-color: #32364B;
    span {
      color: #FFF;
    }
  }

  &.layer {
    flex-direction: row;
    width: auto;
    height: auto;
    padding: 10px 15px;
    gap: 5px;
    background-color: unset;
    border: unset;
    border-radius: unset;
    img {
      width: 20px;
    }
    span {
      max-width: auto;
      color: #000;
      font-family: "Inter Tight";
      font-size: 12px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }
    &.active {
      background: #000;
      span {
        color: #FFF;
      }
    }
  }
`
export default memo(function Markets(props: any) {
  const {
    from,
    markets,
    currentMarket,
    onChangeMarket
  } = props
  return (
    <Markets className={from}>
      {
        markets && markets.map((market: any, index: number) => {
          const targetObject = from === 'layer' ? market?.basic : market
          return (
            // @ts-ignore
            <Market key={index} className={[from, currentMarket?.name === targetObject?.name ? 'active' : '']} onClick={() => onChangeMarket && onChangeMarket(market)}>
              <img src={targetObject.icon} alt={targetObject?.name} />
              <span>{targetObject.name}</span>
            </Market>
          )
        })
      }
    </Markets>
  )
})
