export class Property {
  id: string;
  price: number;
  address: string;
  priceM2: number;
  bedrooms: number;
  bathrooms: number;
  url: string;
  sourceId: string;
  size: number;
  source: string;
  nameOfArea: string;

  constructor(data: any) {
    this.id = data.id;
    this.price = data.price;
    this.address = data.address;
    this.priceM2 = data.price_m2;
    this.bedrooms = data.bedrooms;
    this.bathrooms = data.bathrooms;
    this.url = data.url;
    this.sourceId = data.sourceId;
    this.size = data.size;
    this.source = data.source;
    this.nameOfArea = data.name_of_area;
  }
}
