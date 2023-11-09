import { useState, useRef } from 'react';
import styled from 'styled-components';

const NFTGrid = styled.div`
  display: grid;
  grid-template: 'overlap';
  min-height: 537px;
  width: 311px;
`;

const NFTCanvas = styled.canvas`
  grid-area: overlap;
`;
const NFTImage = styled.img<{ height: number }>`
  grid-area: overlap;
  height: 537px;
  width: 311px;
  z-index: 1;
`;

function getSnapshot(src: HTMLImageElement, canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');

  if (context) {
    // src may be hidden and not have the target dimensions
    const width = 311;
    const height = 537;

    // Ensure crispness at high DPIs
    canvas.width = width * devicePixelRatio;
    canvas.height = height * devicePixelRatio;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    context.scale(devicePixelRatio, devicePixelRatio);

    context.clearRect(0, 0, width, height);
    context.drawImage(src, 0, 0, width, height);
  }
}

export default function NFT({ image, height: targetHeight }: { image: string; height: number }) {
  const [animate, setAnimate] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <NFTGrid
      onMouseEnter={() => {
        setAnimate(true);
      }}
      onMouseLeave={() => {
        // snapshot the current frame so the transition to the canvas is smooth
        if (imageRef.current && canvasRef.current) {
          getSnapshot(imageRef.current, canvasRef.current);
        }
        setAnimate(false);
      }}
    >
      <NFTCanvas ref={canvasRef} />
      <NFTImage
        ref={imageRef}
        src={image}
        hidden={!animate}
        height={targetHeight}
        onLoad={() => {
          // snapshot for the canvas
          if (imageRef.current && canvasRef.current) {
            getSnapshot(imageRef.current, canvasRef.current);
          }
        }}
      />
    </NFTGrid>
  );
}
