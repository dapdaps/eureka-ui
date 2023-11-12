import { memo, useState, useEffect } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';
import { FeeAmount } from '@uniswap/v3-sdk';
import Big from 'big.js';

import usePoolActiveLiquidity from '../../hooks/usePoolActiveLiquidity';
import { ZOOM_LEVELS, ChartEntry } from '../../utils/chartMath';
import Loading from '@/components/Icons/Loading';

const StyledContainer = styled.div`
  margin-top: 40px;
`;
const StyledEmpty = styled.div` 
  margin-top: 80px;   
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  color: rgba(255, 255, 255, 0.6);
  height: 120px;
`
const StyledLoadingWrapper = styled.div`
    color: #fff;
    height: 200px;
    line-height: 200px;
    text-align: center;
`
const StyledCurrent = styled.div`
  display:flex;
  flex-direction:column;
  .small{
    font-size:14px;
    color:#8E8E8E;
  }
  .fold{
    font-size:20px;
    font-weight:bold;
    color:#fff;
  }
`
const xAccessor = (d: ChartEntry) => d.price0
const yAccessor = (d: ChartEntry) => d.activeLiquidity

const Chart = ({
 token0,
 token1,
 reverse,
 lowPrice,
 highPrice,
 setLowPrice,
 setHighPrice,
}: {
  reverse:boolean;
  lowPrice:string;
  highPrice:string;
  setLowPrice:Function;
  setHighPrice:Function;
  token0:any;
  token1:any;
}) => {
  const svgWidth = 560;
  const svgPadding = 50; // svg custom
  const axisHeight = 24; // custom
  const barHeight = 195; // custom fixed Bar
  const svgHeight = barHeight + axisHeight; // custom
  const barWidth = 22;
  const percentBoxWidth = 44;
  const percentToBarDistance = 6;
  const [left_coordinate, set_left_coordinate] = useState<any>();
  const [right_coordinate, set_right_coordinate] = useState<any>();
  const poolChartData = usePoolActiveLiquidity(reverse) as any;
  useEffect(() => {
    if (poolChartData?.current) {
      set_left_coordinate(lowPrice);
      set_right_coordinate(highPrice);
      drawInitChart(lowPrice, highPrice);
    }
  }, [poolChartData?.current]);
  useEffect(() => {
    set_left_coordinate(lowPrice);
  }, [lowPrice])
  useEffect(() => {
    set_right_coordinate(highPrice)
  }, [highPrice]);
  useEffect(() => {
    if (!poolChartData || left_coordinate == undefined || right_coordinate == undefined) return;
    drawLeftBar();
    drawRightBar();
    drawSection();
    setLowPrice && setLowPrice(left_coordinate);
    setHighPrice && setHighPrice(right_coordinate);
  }, [left_coordinate, right_coordinate, poolChartData?.current]);

  if (!poolChartData) return <StyledLoadingWrapper>
                               <Loading size={30} />
                            </StyledLoadingWrapper>
  // if (!poolChartData) return <StyledEmpty>
  //                             <EmptyIcon />
  //                             <span>Your position will appear here.</span>
  //                           </StyledEmpty>;

  const { data: series = [], current: current_price, fee } = poolChartData;
  
  const zoomLevels = ZOOM_LEVELS[fee as FeeAmount];
  const axis = [current_price * zoomLevels.initialMin, current_price * zoomLevels.initialMax];
  const liquidityRange = [0, d3.max(series, yAccessor)] as number[];

  const xScale = d3
    .scaleLinear()
    .domain(axis as number[])
    .range([0, svgWidth - svgPadding * 2]);

  const yScale = d3
    .scaleLinear()
    .domain(liquidityRange)
    .range([barHeight, 0]);

  function drawInitChart(initialMin?:string, initialMax?:string) {
    // 创建横坐标轴
    drawBottomAxis();
    // 创建流动性分布图
    drawLiquidityArea();
    // 创建左拖拽Bar
    drawInitLeftBar(initialMin);
    // 创建右拖拽Bar
    drawInitRightBar(initialMax);
    // 创建当前价格Line
    drawCurrentPriceLine();
  }
  function drawBottomAxis() {
    const axisBottom = d3.axisBottom(xScale).tickSize(0).tickPadding(10) as any;
    d3.select('.axis').call(axisBottom).selectAll('text').attr('fill', '#8E8E8E');
    d3.select('.axis').select('.domain').attr('stroke', 'transparent');
  }
  function drawLiquidityArea() {
    const areaGenerator = d3.area().curve(d3.curveStepAfter).
    x((d: unknown) => xScale(xAccessor(d as ChartEntry))).
    y1((d: unknown) => yScale(yAccessor(d as ChartEntry))).
    y0(yScale(0));

    const pathData = areaGenerator(series.filter((d: ChartEntry) => {
      const value = xScale(xAccessor(d))
      return value > 0 && value <= (svgWidth - svgPadding * 2);
    }) as Iterable<[number, number]>);
    d3.select('.liquidity').attr('d', pathData);
  }
  function drawInitLeftBar(initialMin?:string) {
    const dragEvent = d3.drag().on('drag', (e) => {
      const bar_right_x = d3.select('.rightBar').attr('transform').split(',')[0].slice(10);
      // if (e.x >= bar_right_x || e.x + barWidth / 2 <= 0) return;
      if (e.x + barWidth / 2 <= 0) return;
      set_left_coordinate(xScale.invert(e.x + 7));
    }) as any;
    set_left_coordinate(initialMin);
    d3.select('.leftBar').call(dragEvent);
  }
  function drawInitRightBar(initialMax?:string) {
    const dragEvent = d3.drag().on('drag', (e) => {
      const bar_left_x = d3.select('.leftBar').attr('transform').split(',')[0].slice(10);
      // if (e.x <= bar_left_x || e.x >= svgWidth - svgPadding * 2) return;
      if (e.x >= svgWidth - svgPadding * 2) return;
      set_right_coordinate(xScale.invert(e.x + 11));
    }) as any;
    set_right_coordinate(initialMax);
    d3.select('.rightBar').call(dragEvent);
  }
  function drawLeftBar() {
    d3.select('.leftBar').attr(
      'transform',
      `translate(${xScale(+left_coordinate) - 7}, ${svgHeight - barHeight - axisHeight})`,
    );
    d3.select('.leftPercent').attr('transform', `translate(-${percentBoxWidth + percentToBarDistance}, 0)`);
  }
  function drawRightBar() {
    d3.select('.rightBar').attr(
      'transform',
      `translate(${xScale(+right_coordinate) - 11}, ${svgHeight - barHeight - axisHeight})`,
    );
    d3.select('.rightPercent').attr('transform', `translate(${barWidth + percentToBarDistance}, 0)`);
  }
  function drawSection() {
    const x1 = d3.select('.leftBar').attr('transform').split(',')[0].slice(10);
    const x2 = d3.select('.rightBar').attr('transform').split(',')[0].slice(10);
    const width = Number(x2) - Number(x1);
    const rect_x = Number(x1) + barWidth / 2;
    const rect_y = svgHeight - barHeight - axisHeight;
    d3.select('.section').attr('height', '195').attr('width', width).attr('x', rect_x).attr('y', rect_y);
    d3.select('.leftPercent text').text(getPercent(left_coordinate) + '%');
    d3.select('.rightPercent text').text(getPercent(right_coordinate) + '%');
  }
  function getPercent(newPrice:number) {
    let movePercent;
    const price = current_price;
    if (+price > +newPrice) {
      movePercent = -Big(1)
        .minus(Big(newPrice).div(price))
        .mul(100)
        .toFixed(0, 1);
    } else {
      movePercent = Big(newPrice).div(price).minus(1).mul(100).toFixed(0, 1);
    }
    return movePercent;
  }
  function drawCurrentPriceLine() {
    const current_x = xScale(current_price);
    d3.select('.current')
      .attr('x1', current_x)
      .attr('y1', svgHeight - barHeight - axisHeight)
      .attr('x2', current_x)
      .attr('y2', svgHeight - axisHeight);
  }
  return (
    <StyledContainer>
      <StyledCurrent>
         <span className='small'>Current price</span>
         <span className='fold'>{poolChartData?.current}</span>
         <span className='small'>{token1?.symbol} per {token0?.symbol}</span>
      </StyledCurrent>
      <svg width={svgWidth} height={svgHeight}>
        <defs>
          <linearGradient id="paint0_linear_7_2204" x1="0" y1="194" x2="600" y2="194" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="white" stop-opacity="0.1" />
            <stop offset="1" stopColor="#3E5BF2" stop-opacity="0.1" />
          </linearGradient>
        </defs>
        <g className="container" transform={`translate(${svgPadding}, 0)`}>
          {/* 横坐标轴 */}
          <g className="axis" transform={`translate(0, ${svgHeight - axisHeight})`}></g>
          {/* 流动性分布图 */}
          <path className="liquidity" fill="rgba(98, 221, 255, 0.5)"></path>
          {/* 创建两根Bar之间的区域 */}
          <rect className="section" fill="url(#paint0_linear_7_2204)"></rect>
          {/* 当前价格 */}
          <line className="current" stroke="#ffffff" strokeWidth="1"></line>
          {/* 左拖拽Bar */}
          <g className="leftBar" style={{ cursor: 'ew-resize' }}>
            <svg width="22" height="195" viewBox="0 0 22 195" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="195" fill="transparent" />
              <rect x="7" width="4" height="195" fill="#D9D9D9" />
              <path d="M0 4C0 1.79086 1.79086 0 4 0H11V20H4C1.79086 20 0 18.2091 0 16V4Z" fill="#D9D9D9" />
              <line x1="4.5" y1="5" x2="4.5" y2="14" stroke="white" />
              <line x1="7.5" y1="5" x2="7.5" y2="14" stroke="white" />
            </svg>

            <g className="leftPercent">
              <rect width="44" height="24" rx="6" fill="#262626"></rect>
              <text fontSize="12" x="22" y="12" fill="white" textAnchor="middle" dominantBaseline="middle">
                -0.1%
              </text>
            </g>
          </g>
          {/* 右拖拽Bar */}
          <g className="rightBar" style={{ cursor: 'ew-resize' }}>
            <svg width="22" height="195" viewBox="0 0 22 195" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="195" fill="transparent" />
              <path d="M22 4C22 1.79086 20.2091 0 18 0H11V20H18C20.2091 20 22 18.2091 22 16V4Z" fill="#4B68FF" />
              <rect x="11" width="4" height="195" fill="#4B68FF" />
              <line x1="15.5" y1="5" x2="15.5" y2="14" stroke="white" />
              <line x1="18.5" y1="5" x2="18.5" y2="14" stroke="white" />
            </svg>
            <g className="rightPercent">
              <rect width="44" height="24" rx="6" fill="#262626"></rect>
              <text fontSize="12" x="22" y="12" fill="white" textAnchor="middle" dominantBaseline="middle">
                0.1%
              </text>
            </g>
          </g>
        </g>
      </svg>
    </StyledContainer>
  );
};
const EmptyIcon = () => {
  return (
    <svg width="42" height="34" viewBox="0 0 42 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 17L8.08994 3.65422C8.95763 2.02092 10.656 1 12.5055 1H29.4945C31.344 1 33.0424 2.02093 33.9101 3.65422L41 17M1 17V29C1 31.2091 2.79086 33 5 33H37C39.2091 33 41 31.2091 41 29V17M1 17H13L17 23H25L28.5 17H41"
        stroke="currentColor"
        strokeWidth="2"
        stroke-linejoin="round"
      />
    </svg>
  );
};
export default memo(Chart);
