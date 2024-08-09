export class Interest {
  _id: string | undefined;
  email: string;
  nameOfArea: string;
  maxPrice: number;
  minPrice: number;
  size: number;
  bedrooms: number;
  active: boolean;
  constructor(
    email: string,
    nameOfArea: string,
    maxPrice: number,
    size: number,
    bedrooms: number,
    minPrice: number
  ) {
    this.email = email;
    this.nameOfArea = nameOfArea;
    this.maxPrice = maxPrice;
    this.size = size;
    this.bedrooms = bedrooms;
    this.minPrice = minPrice;
    this.active = true;
  }

  toJsonBE() {
    return {
      email: this.email,
      name_of_area: this.nameOfArea,
      max_price: this.maxPrice,
      size: this.size,
      number_of_bedrooms: this.bedrooms,
      min_price: this.minPrice,
      active: this.active,
    };
  }
}
