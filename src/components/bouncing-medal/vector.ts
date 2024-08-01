export class Vector {
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public x: number;
  public y: number;

  add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  substract(v: Vector) {
    return new Vector(this.x - v.x, this.y - v.y);
  }

  multiply(s: number) {
    return new Vector(this.x * s, this.y * s);
  }

  dot(v: Vector) {
    return this.x * v.x + this.y * v.y;
  }

  normalize() {
    let distance = Math.sqrt(this.x * this.x + this.y * this.y);
    return new Vector(this.x / distance, this.y / distance);
  }
}
