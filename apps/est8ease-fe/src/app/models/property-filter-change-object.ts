type BRs = 'oneBR' | 'twoBR' | 'threeBR' | 'studio';

export class PropertyFilterChangeObject {
  maxPrice: number;
  minPrice: number;
  estimatedSize: number;
  bedrooms: BRs;
  area: string;
  email: string;
  constructor(
  ) {
    this.email = "";
    this.area = "";
    this.maxPrice = 0;
    this.estimatedSize = 0;
    this.bedrooms = 'oneBR';
    this.minPrice = 0;
  }
}
