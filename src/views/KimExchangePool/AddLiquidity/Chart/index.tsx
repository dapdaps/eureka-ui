import Big from 'big.js';
import * as d3 from 'd3';
import _ from 'lodash';
import React, { memo, useCallback, useEffect, useState } from 'react';

import TokenSwitcher from '@/views/Pool/components/TokenSwitcher';

import FEES from './config';
import { StyledContainer, StyledSubtitle,StyledTop } from './styles';

/**
 * params: current, lowerTick, highTick, fee, pairs
 * @returns
 */
function Chart({
  currentPrice,
  fee,
  lowerPrice,
  highPrice,
  onPriceChange,
  token0,
  token1,
  reverse,
  onExchangeTokens,
}: any) {
  // const { data, loading } = useChartData();
  const svgWidth = 512;
  const svgHeight = 204;
  const svgPadding = 20;
  const axisHeight = 24;
  const contentHeight = 180;
  const barHalfWidth = 11;
  const [zoom, setZoom] = useState<d3.ZoomTransform | null>();
  const [leftIsZero, setLeftIsZero] = useState<boolean>(false);
  const [rightIsZero, setRightIsZero] = useState<boolean>(false);
  const domain = [currentPrice * FEES[fee].initialMin, currentPrice * FEES[fee].initialMax];
  const scaleExtent = [FEES[fee].zoomMin, FEES[fee].zoomMax] as [number, number];
  const scaleX = d3
    .scaleLinear()
    .domain(domain)
    .range([0, svgWidth - svgPadding * 2]);

  const zoomEvent = d3
    .zoom()
    .scaleExtent(scaleExtent)
    .extent([
      [0, 0],
      [svgWidth, svgHeight],
    ])
    .on('zoom', (e) => {
      const transform = e.transform;
      setZoom(transform);
    }) as any;
  const _debounceUpdatePrice = useCallback(
    _.debounce((price, type) => {
      onPriceChange && onPriceChange(type, price);
    }, 500),
    [],
  );
  useEffect(() => {
    if (zoom && scaleX) {
      const newScaleX = zoom.rescaleX(scaleX);
      scaleX.domain(newScaleX.domain());
    }
  }, [zoom, scaleX]);
  useEffect(() => {
    drawChart();
  }, [zoom]);

  useEffect(() => {
    const x = scaleX(lowerPrice);
    drawLeftPart(x);
  }, [lowerPrice]);

  useEffect(() => {
    const x = scaleX(highPrice);
    drawRightPart(x);
  }, [highPrice]);

  function drawChart() {
    drawBottomAxis();
    // drawLiquidityArea();
    drawLeftBar();
    drawRightBar();
    drawCurrentPriceLine();
    drawSection();
  }
  function drawBottomAxis() {
    const axis = d3.axisBottom(scaleX) as any;
    axis.ticks(6).tickSize(0).tickPadding(10);
    d3.select('.axis').select('.domain').attr('stroke', '#618aa4');
    d3.select('.axis').selectAll('text').attr('fill', '#8E8E8E');
    d3.select('.axis').call(axis);
  }

  function drawLeftBar() {
    const dragEvent = d3.drag().on('drag', (e) => {
      const x_new = e.x - barHalfWidth;
      if (scaleX.invert(e.x) <= 0) {
        setLeftIsZero(true);
        _debounceUpdatePrice(0, 'lower');
      } else {
        setLeftIsZero(false);
      }
      if (e.x - barHalfWidth <= 0 || e.x >= svgWidth - svgPadding * 2 || scaleX.invert(e.x) < 0) return;
      d3.select('.leftBar').attr('transform', `translate(${x_new}, 0)`);
      d3.select('.leftPercent text').text(getPercent(scaleX.invert(e.x), 'left') + '%');
      if (e.x < 40) {
        d3.select('.leftPercent').attr('transform', 'translate(16, 0)');
      } else {
        d3.select('.leftPercent').attr('transform', 'translate(-50, 0)');
      }
      drawSection();
      _debounceUpdatePrice(Math.max(scaleX.invert(e.x), 0), 'lower');
    }) as any;
    d3.select('.leftBar').call(dragEvent);
    d3.select('.leftPercent').attr('transform', 'translate(-50, 0)');
    d3.select('.leftBar').attr('transform', `translate(${scaleX(lowerPrice) - barHalfWidth}, 0)`);
    d3.select('.leftPercent text').text(getPercent(lowerPrice, 'left') + '%');
  }
  function drawLeftPart(coordinate: number) {
    d3.select('.leftBar').attr('transform', `translate(${coordinate - barHalfWidth}, 0)`);
    const p = scaleX.invert(coordinate);
    d3.select('.leftPercent text').text(getPercent(p, 'left') + '%');
    drawSection();
  }
  function drawRightPart(coordinate: number) {
    d3.select('.rightBar').attr('transform', `translate(${coordinate - barHalfWidth}, 0)`);
    const p = scaleX.invert(coordinate);
    d3.select('.rightPercent text').text(getPercent(p, 'right') + '%');
    drawSection();
  }
  function drawRightBar() {
    const dragEvent = d3.drag().on('drag', (e) => {
      const x_new = e.x - barHalfWidth;
      if (scaleX.invert(e.x) <= 0) {
        setRightIsZero(true);
        _debounceUpdatePrice(0, 'upper');
      } else {
        setRightIsZero(false);
      }
      if (e.x >= svgWidth - svgPadding * 2 || e.x - barHalfWidth <= 0 || scaleX.invert(e.x) < 0) return;

      d3.select('.rightBar').attr('transform', `translate(${x_new}, 0)`);
      d3.select('.rightPercent text').text(getPercent(scaleX.invert(e.x), 'right') + '%');
      if (svgWidth - e.x < 80) {
        d3.select('.rightPercent').attr('transform', 'translate(-40, 0)');
      } else {
        d3.select('.rightPercent').attr('transform', 'translate(28, 0)');
      }
      drawSection();
      _debounceUpdatePrice(Math.max(scaleX.invert(e.x), 0), 'upper');
    }) as any;
    d3.select('.rightBar').call(dragEvent);
    d3.select('.rightPercent').attr('transform', 'translate(28, 0)');
    d3.select('.rightBar').attr('transform', `translate(${scaleX(highPrice) - barHalfWidth}, 0)`);
    d3.select('.rightPercent text').text(getPercent(highPrice, 'right') + '%');
  }
  function drawCurrentPriceLine() {
    const current_x = scaleX(currentPrice);
    d3.select('.current').attr('x1', current_x).attr('y1', 0).attr('x2', current_x).attr('y2', contentHeight);
  }
  function drawSection() {
    const x1 = d3.select('.leftBar').attr('transform')?.split(',')?.[0]?.slice(10) || 0;
    const x2 = d3.select('.rightBar').attr('transform')?.split(',')?.[0]?.slice(10) || 0;
    const width = Number(x2) - Number(x1) + 1;
    if (width > 0) {
      d3.select('.section')
        .attr('width', width)
        .attr('height', contentHeight)
        .attr('fill', 'url(#paint0_linear_699_9607)')
        .attr('opacity', 1)
        .attr('x', +x1 + barHalfWidth)
        .attr('opacity', '0.3');
    } else {
      d3.select('.section').attr('opacity', 0);
    }
  }
  function zoomIn() {
    d3.select('.zoomRef').transition().call(zoomEvent.scaleBy, 1.5);
  }
  function zoomOut() {
    d3.select('.zoomRef').transition().call(zoomEvent.scaleBy, 0.75);
  }
  function getPercent(newPrice: number, type: string) {
    let movePercent;
    const price = currentPrice;
    if (+price > +newPrice) {
      movePercent = -Big(1).minus(Big(newPrice).div(price)).mul(100).toFixed(2, 1);
    } else {
      movePercent = Big(newPrice).div(price).minus(1).mul(100).toFixed(2, 1);
    }
    if ((type == 'left' && leftIsZero) || (type == 'right' && rightIsZero)) {
      return -100;
    }
    return movePercent;
  }
  return (
    <StyledContainer>
      <StyledTop>
        <StyledSubtitle>Set Price Range</StyledSubtitle>
        {token0 && token1 && (
          <TokenSwitcher token0={token0} token1={token1} reverse={!reverse} onExchangeTokens={onExchangeTokens} />
        )}
      </StyledTop>
      <svg width={svgWidth} height={svgHeight} className="svgContainer">
        <defs>
          <linearGradient
            id="paint0_linear_699_9607"
            x1="0"
            y1="180"
            x2={svgWidth}
            y2="180"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="#3E5BF2" />
          </linearGradient>
        </defs>
        <g className="zoomRef"></g>
        <g className="container" transform={`translate(${svgPadding}, 0)`}>
          <g className="axis" transform={`translate(0,${svgHeight - axisHeight})`}></g>
          <line className="current" stroke="#8D8D8D" />
          <rect className="section"></rect>
          <path className="liquidity" fill="rgba(98, 221, 255, 0.5)"></path>
          <g className="leftBar" style={{ cursor: 'ew-resize' }}>
            <svg width="22" height="180" viewBox="0 0 22 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="180" fill="transparent" />
              <rect x="7" width="4" height="180" fill="#D9D9D9" />
              <path d="M0 4C0 1.79086 1.79086 0 4 0H11V20H4C1.79086 20 0 18.2091 0 16V4Z" fill="#D9D9D9" />
              <line x1="4.5" y1="5" x2="4.5" y2="14" stroke="white" />
              <line x1="7.5" y1="5" x2="7.5" y2="14" stroke="white" />
            </svg>
            <g className="leftPercent">
              <rect width="44" height="24" rx="6" fill="#262626"></rect>
              <text fontSize="12" x="22" y="12" fill="white" textAnchor="middle" dominantBaseline="middle"></text>
            </g>
          </g>
          <g className="rightBar" style={{ cursor: 'ew-resize' }}>
            <svg width="22" height="180" viewBox="0 0 22 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="22" height="180" fill="transparent" />
              <path d="M22 4C22 1.79086 20.2091 0 18 0H11V20H18C20.2091 20 22 18.2091 22 16V4Z" fill="#EE8282" />
              <rect x="11" width="4" height="180" fill="#EE8282" />
              <line x1="15.5" y1="5" x2="15.5" y2="14" stroke="white" />
              <line x1="18.5" y1="5" x2="18.5" y2="14" stroke="white" />
            </svg>
            <g className="rightPercent">
              <rect width="44" height="24" rx="6" fill="#262626"></rect>
              <text fontSize="12" x="22" y="12" fill="white" textAnchor="middle" dominantBaseline="middle"></text>
            </g>
          </g>
        </g>
      </svg>
    </StyledContainer>
  );
}

export default memo(Chart);
