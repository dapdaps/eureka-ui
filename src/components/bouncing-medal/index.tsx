import {
  Engine,
  Render,
  Bodies,
  Composite,
  Runner,
  Mouse,
  MouseConstraint, Events, Body,
} from 'matter-js';
import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

const BouncingMedal = (props: BouncingMedalsProps) => {
  const { width, height, style, delay = 900, medals = [] } = props;

  const DPR = window.devicePixelRatio || 2;
  const canvasRef = useRef<any>();

  const create = async () => {
    if (!canvasRef.current) return;
    canvasRef.current.innerHTML = '';
    const engine = Engine.create();
    const render = Render.create({
      element: canvasRef.current,
      engine,
      options: {
        width,
        height,
        pixelRatio: DPR,
        wireframes: false,
        background: 'unset',
      },
    });
    const medalImages = medals.map((it) => loadMedal(it.icon));
    const images: string[] = await Promise.all(medalImages);
    const medalList = medals.map((m, idx) => Bodies.rectangle(m.x, m.y, m.width, m.height, {
      restitution: 0.8,
      density: m.density || 0.001,
      render: {
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 0,
        sprite: {
          texture: images[idx],
          xScale: 1 / DPR,
          yScale: 1 / DPR,
        },
      },
    }));
    const borders = [
      // top
      Bodies.rectangle(width / 2, 0, width, 2, { isStatic: true, render: { visible: false } }),
      // bot
      Bodies.rectangle(width / 2, height, width, 2, { isStatic: true, render: { visible: false } }),
      // left
      Bodies.rectangle(0, height / 2, 2, height, { isStatic: true, render: { visible: false } }),
      // right
      Bodies.rectangle(width, height / 2, 2, height, { isStatic: true, render: { visible: false } }),
    ];
    // const mouse = Mouse.create(render.canvas);
    // const mouseConstraint = MouseConstraint.create(engine, {
    //   mouse: mouse,
    //   constraint: {
    //     stiffness: 0.2,
    //     render: {
    //       visible: false,
    //     },
    //   },
    // });
    Composite.add(engine.world, [
      ...medalList,
      ...borders,
      // mouseConstraint
    ]);

    // const offset = 20;
    // Events.on(mouseConstraint, 'mousemove', function(event) {
    //   for (const medal of medalList) {
    //     console.log(medal);
    //     if (medal.position.x < offset) {
    //       Body.setPosition(medal, { x: offset, y: medal.position.y });
    //     }
    //     if (medal.position.x > width - offset) {
    //       Body.setPosition(medal, { x: width - offset, y: medal.position.y });
    //     }
    //     if (medal.position.y < offset) {
    //       Body.setPosition(medal, { y: offset, x: medal.position.x });
    //     }
    //     if (medal.position.y > height - offset) {
    //       Body.setPosition(medal, { y: height, x: medal.position.x });
    //     }
    //   }
    // });

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);
  };

  useEffect(() => {
    const timer = setTimeout(create, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [medals]);

  return (
    <StyledCanvas
      ref={canvasRef}
      style={{
        width,
        height,
        ...style,
      }}
    />
  );
};

export default BouncingMedal;

const StyledCanvas = styled.div`
  z-index: 10;

  > canvas {
    width: 100%;
    height: 100%;
  }
`;

const loadMedal = (src: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve(img.src);
    };
    img.onerror = () => {
      resolve(src);
    };
  });
};

interface BouncingMedalsProps {
  medals: BouncingMedalItem[];
  width: number;
  height: number;
  delay?: number;
  style?: React.CSSProperties;

  // onClick?(medal: BouncingMedalItem): void;
}

export interface BouncingMedalItem {
  key: number;
  icon: string;
  width: number;
  height: number;
  name?: string;
  // The initial x-axis position, note that it must be within the canvas range.
  // Minimum value is: 0, maximum value is: width - medal width
  x: number;
  // Initial y-axis position, minimum value is 0, maximum must not exceed the bottom of the canvas
  // Maximum value is: height - medal height
  y: number;
  // Control the mass of the object. The higher the density, the heavier the object. The default value of density is 0.001
  density?: number;
}
