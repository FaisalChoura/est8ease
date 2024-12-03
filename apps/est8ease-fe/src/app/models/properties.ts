import { Property } from './property';

export class Properties {
  list: Property[]; // List of properties
  count: number; // Total number of properties
  averagePricePerSqm = 0;

  private totalPrice = 0; // Total price of all properties
  private totalArea = 0; // Total area of all properties

  constructor(properties: Property[]) {
    this.list = properties;
    this.count = properties.length;
    this.calculateAveragePricePerSqm();
  }

  private calculateAveragePricePerSqm(): void {
    this.list.forEach((property) => {
      this.totalPrice += property.price;
      this.totalArea += property.size;
    });

    this.averagePricePerSqm = this.totalPrice / this.totalArea;
  }
}
