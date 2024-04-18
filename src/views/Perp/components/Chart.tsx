import { format } from 'date-fns';
import { createChart } from 'lightweight-charts';
import { useEffect, useRef, useState } from "react";
import styled from 'styled-components';

const StyledResolutions = styled.div`
  position: absolute;
  left: 0;
  top: -7px;
  z-index: 99;
  display: flex;
  align-items: center;
  gap: 8px;
`
const StyledResolution = styled.div`
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid #373A53;
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
  &.active {
    background: #2E3142;
  }
`
const Chart = function ({
  chartData,
  resolution,
  onClickResolution
}: any) {
  const resolutions = [{
    label: "1m",
    value: "1"
  }, {
    label: "5m",
    value: "5"
  }, {
    label: "15m",
    value: "15"
  }, {
    label: "30m",
    value: "30"
  }, {
    label: "1h",
    value: "60"
  }, {
    label: "4h",
    value: "240"
  }, {
    label: "D",
    value: "1D"
  }]
  // const [resolutionIndex, setResolutionIndex] = useState(2)
  const domRef = useRef<any>(null)
  const chartRef = useRef<any>(null)

  const init = function () {
    const chartOptions: any = {
      grid: {
        vertLines: {
          visible: false
        },
        horzLines: {
          visible: false
        }
      },
      layout: {
        textColor: '#FFF',
        background: {
          type: 'solid', color: '#181a1d'
        }
      },
      timeScale: {
        timeVisible: true
      },
      localization: {
        timeFormatter(time: any) {
          return format(time * 1000, "dd MMM’yy HH:mm")
        },
      }
    };
    chartRef.current = createChart(domRef.current, chartOptions);
  }
  const clear = function () {
    if (chartRef.current) {
      chartRef.current.remove()
      chartRef.current = null
    }
  }
  const draw = function (data: any) {
    clear()
    init()
    const candlestickSeries = chartRef.current.addCandlestickSeries({
      upColor: '#ff6c66',
      downColor: '#96e563',
      borderVisible: false,
      wickUpColor: '#ff6c66',
      wickDownColor: '#96e563'
    });
    candlestickSeries.setData(data);
    chartRef.current.timeScale().fitContent();
  }

  const handleClickResolution = function (index: number) {
    onClickResolution && onClickResolution(resolutions[index])
  }


  useEffect(() => {
    chartData && draw(chartData)
  }, [chartData])

  return (
    <div style={{
      position: "relative"
    }}>
      <StyledResolutions>
        {
          resolutions.map((item, index) => (
            <StyledResolution className={item.value === resolution ? "active" : ""} key={index} onClick={() => handleClickResolution(index)}>{item.label}</StyledResolution>
          ))
        }
      </StyledResolutions>
      <div style={{ height: 486, }} ref={domRef} />
    </div>
  )
}
export default Chart