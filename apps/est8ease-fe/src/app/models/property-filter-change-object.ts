export class PropertyFilterChangeObject {
  maxPrice: number;
  minPrice: number;
  estimatedSize: number;
  bedrooms: number;
  area: string;
  email: string;
  constructor(
  ) {
    this.email = "";
    this.area = "";
    this.maxPrice = 0;
    this.estimatedSize = 0;
    this.bedrooms = 0;
    this.minPrice = 0;
  }
}
