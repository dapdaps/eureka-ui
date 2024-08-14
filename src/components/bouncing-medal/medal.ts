import { Vector } from './vector';

export class Medal {
  constructor(
    context: CanvasRenderingContext2D,
    key: number,
    img: any,
    x: number,
    y: number,
    vx: number,
    vy: number,
    dpr: number,
    mass?: number,
    cor?: number,
    size?: number,
  ) {
    this.context = context;
    this.key = key;
    this.img = img;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size || 90;
    this.dpr = dpr || 2;
    this.colliding = false;
    this.mass = mass || 1;
    if (cor && cor > 0 && cor <= 1) {
      this.cor = cor;
    } else {
      this.cor = 1;
    }
    this.angle = 0;
  }

  private readonly gravity = 980;
  public readonly radiusOffset = 20;
  private img: any;
  private context: CanvasRenderingContext2D;
  public key: number;
  public x: number;
  public y: number;
  public vx: number;
  public vy: number;
  public size: number;
  public dpr: number;
  public colliding: boolean;
  public mass: number;
  public cor: number;
  public angle: number;

  public draw() {
    this.context.save();
    this.context.translate(this.x + this.getSize / 2, this.y + this.getSize / 2);
    this.context.rotate(this.angle * Math.PI / 180);
    this.context.translate(-(this.x + this.getSize / 2), -(this.y + this.getSize / 2));
    this.context.drawImage(this.img, this.x, this.y, this.getSize, this.getSize);
    this.context.restore();
  }

  public update(seconds: number) {
    this.vy += this.gravity * seconds;

    // Prevent endless oscillation
    if (Math.abs(this.vx) >= 40) {
      this.x += this.vx * seconds;
    }
    this.y += this.vy * seconds;
  }

  private isCircleCollided(another: Medal) {
    const squareDistance = Math.pow(this.x - another.x, 2) + Math.pow(this.y - another.y, 2);
    const squareRadius = Math.pow(this.getRadius - this.radiusOffset + another.getRadius - another.radiusOffset, 2);
    return squareDistance <= squareRadius;
  }

  public checkCollideWith(another: Medal) {
    if (this.isCircleCollided(another)) {
      this.colliding = true;
      another.colliding = true;
      this.changeVelocityAndDirection(another);
    }
  }

  public get getRadius() {
    return this.size * this.dpr / 2;
  }

  public get getSize() {
    return this.size * this.dpr;
  }

  public changeVelocityAndDirection(another: Medal) {
    const cor = Math.min(this.cor, another.cor);
    const velocity1 = new Vector(this.vx, this.vy);
    const velocity2 = new Vector(another.vx, another.vy);
    const vNorm = new Vector(this.x - another.x, this.y - another.y);
    const unitVNorm = vNorm.normalize();
    const unitVTan = new Vector(-unitVNorm.y, unitVNorm.x);
    const v1n = velocity1.dot(unitVNorm);
    const v1t = velocity1.dot(unitVTan);
    const v2n = velocity2.dot(unitVNorm);
    const v2t = velocity2.dot(unitVTan);
    const v1nAfter =
      (this.mass * v1n + another.mass * v2n + cor * another.mass * (v2n - v1n)) /
      (this.mass + another.mass);
    const v2nAfter =
      (this.mass * v1n + another.mass * v2n + cor * this.mass * (v1n - v2n)) /
      (this.mass + another.mass);
    if (v1nAfter < v2nAfter) {
      return;
    }
    const v1VectorNorm = unitVNorm.multiply(v1nAfter);
    const v1VectorTan = unitVTan.multiply(v1t);
    const v2VectorNorm = unitVNorm.multiply(v2nAfter);
    const v2VectorTan = unitVTan.multiply(v2t);

    // console.log('v1nAfter: %o', v1nAfter);
    // console.log('%cv2nAfter: %o', 'background:red;color:white;',v2nAfter);
    // console.log('v1VectorNorm: %o', v1VectorNorm);
    // console.log('v1VectorTan: %o', v1VectorTan);
    // console.log('v2VectorNorm: %o', v2VectorNorm);
    // console.log('v2VectorTan: %o', v2VectorTan);

    const velocity1After = v1VectorNorm.add(v1VectorTan);
    const velocity2After = v2VectorNorm.add(v2VectorTan);
    this.vx = velocity1After.x;
    this.vy = velocity1After.y;
    another.vx = velocity2After.x;
    another.vy = velocity2After.y;

    this.angle += -1;
    another.angle += 1;
  }
}
