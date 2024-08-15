import React, { memo } from 'react';
import { styled } from 'styled-components';
import { Medal } from './medal';
import { isEqualWith, random } from 'lodash';

const StyledCanvas = styled.canvas`
  z-index: 10;
`;

class BouncingMedals extends React.Component<BouncingMedalsProps, any> {
  constructor(props: BouncingMedalsProps) {
    super(props);

    const { width, height } = this.props;
    this.width = width;
    this.height = height;
    this.DPR = window.devicePixelRatio || 2;
  }

  private canvasRef = React.createRef<HTMLCanvasElement>();
  protected medals: Medal[] = [];
  private startTime: number = 0;
  private timer: any = 0;
  private animation: number = 0;
  private readonly corX = 0.3;
  private readonly corY = 0.7;
  private readonly width: number;
  private readonly height: number;
  private readonly DPR: number;

  private detectCollision() {
    this.medals.forEach((medal: Medal) => (medal.colliding = false));
    for (let i = 0; i < this.medals.length; i++) {
      for (let j = i + 1; j < this.medals.length; j++) {
        this.medals[i].checkCollideWith(this.medals[j]);
      }
    }
  }

  private detectEdgeCollision() {
    this.medals.forEach((circle) => {
      if (circle.x < 0 - circle.radiusOffset) {
        circle.vx = -circle.vx * this.corX;
        circle.x = 0 - circle.radiusOffset;
      } else if (circle.x > this.width * this.DPR - circle.getSize + circle.radiusOffset) {
        circle.vx = -circle.vx * this.corX;
        circle.x = this.width * this.DPR - circle.getSize + circle.radiusOffset;
      }

      if (circle.y < 0 - circle.radiusOffset) {
        circle.vy = -circle.vy * this.corY;
        circle.y = 0 - circle.radiusOffset;
      } else if (circle.y > this.height * this.DPR - circle.getSize + circle.radiusOffset) {
        circle.vy = -circle.vy * this.corY;
        circle.y = this.height * this.DPR - circle.getSize + circle.radiusOffset;
      }
    });
  }

  private process = (now: number) => {
    const next = () => {
      this.startTime = now;
      this.animation = window.requestAnimationFrame(this.process);
    };

    if (!this.canvasRef.current || !this.medals.length) {
      next();
      return;
    }
    const ctx = this.canvasRef.current.getContext('2d');
    if (!ctx) {
      next();
      return;
    }

    let _startTime = this.startTime;
    if (!this.startTime) {
      _startTime = now;
    }

    let seconds = (now - _startTime) / 1000;

    // Do not replay animation when the browser tab is switched away
    if (seconds > 1) {
      next();
      return;
    }

    for (let i = 0; i < this.medals.length; i++) {
      this.medals[i].update(seconds);
    }

    this.detectEdgeCollision();
    this.detectCollision();

    ctx.clearRect(0, 0, this.width * this.DPR, this.height * this.DPR);

    for (let i = 0; i < this.medals.length; i++) {
      this.medals[i].draw();
    }
    next();
  };

  private getMouseMedal = (e: MouseEvent) => {
    if (!this.canvasRef.current) return null;
    const rect = this.canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) * this.DPR;
    const y = (e.clientY - rect.top) * this.DPR;

    for (const medal of this.medals) {
      if (
        x > medal.x &&
        x < medal.x + medal.size * medal.dpr &&
        y > medal.y &&
        y < medal.y + medal.size * medal.dpr
      ) {
        return medal;
      }
    }
    return null;
  };

  private onHover = (e: MouseEvent) => {
    const current = this.getMouseMedal(e);

    if (!current) return;

    // move by cursor
    // medal.x = x - medal.size * medal.dpr / 2;
    // medal.y = y - medal.size * medal.dpr / 2;
    current.y -= 1;
  };

  private onClick = (e: MouseEvent) => {
    const current = this.getMouseMedal(e);

    if (!current || !this.props.onClick) return;

    this.props.onClick(current);
  };

  private init() {
    if (!this.canvasRef.current) return;
    const ctx = this.canvasRef.current.getContext('2d');
    if (!ctx) return;
    const { medals, delay = 1000 } = this.props;
    this.timer = setTimeout(async () => {
      const medalImages = medals.map((it) => loadMedal(it.icon));
      const images = await Promise.all(medalImages);
      const _medals = [];
      for (let i = 0; i < medals.length; i++) {
        const medal = medals[i];
        _medals.push(new Medal(
          ctx,
          medal.key,
          images[i],
          medal.x,
          medal.y ?? -30,
          medal.vx ?? 0,
          medal.vy ?? random(-this.height, this.height),
          this.DPR,
          medal.mass ?? 30,
          0.7,
        ));
      }
      this.medals = _medals;

      this.animation = window.requestAnimationFrame(this.process);
    }, delay);
    this.canvasRef.current.addEventListener('mousemove', this.onHover);
    this.canvasRef.current.addEventListener('click', this.onClick);
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps: Readonly<BouncingMedalsProps>, prevState: Readonly<any>, snapshot?: any) {
    const prevIcons = prevProps.medals.map((it) => it.icon);
    const currIcons = this.props.medals.map((it) => it.icon);
    if (isEqualWith(prevIcons, currIcons)) {
      return;
    }
    this.init();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    window.cancelAnimationFrame(this.animation);
    this.canvasRef.current?.removeEventListener('mousemove', this.onHover);
    this.canvasRef.current?.removeEventListener('click', this.onClick);
  }

  render() {
    return (
      <StyledCanvas
        ref={this.canvasRef}
        style={{
          width: this.width,
          height: this.height,
          ...this.props.styles,
        }}
        width={this.width * this.DPR}
        height={this.height * this.DPR}
      />
    );
  }
}

export default memo(BouncingMedals);

const loadMedal = (src: string) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      resolve(img);
    };
  });
};

interface BouncingMedalsProps {
  medals: {
    key: number;
    icon: string;
    name?: string;
    x: number;
    y?: number;
    vx?: number;
    vy?: number;
    mass?: number;
  }[];
  delay?: number;
  width: number;
  height: number;
  styles?: React.CSSProperties;

  onClick?(medal: Medal): void;
}
