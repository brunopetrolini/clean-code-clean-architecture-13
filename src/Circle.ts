export class Circle {
  constructor(readonly radius: number) {}

  public getArea(): number {
    return 2 * Math.PI * this.radius
  }
}
