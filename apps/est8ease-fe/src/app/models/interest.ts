export class Interest {
  _id: string | undefined;
  email: string;
  nameOfArea: string;
  maxPrice: number;
  minPrice: number;
  minSize: number;
  maxSize: number;
  bedrooms: number;
  active: boolean;
  extraDetails: object = {};
  createdAt: string;

  constructor(
    email: string,
    nameOfArea: string,
    maxPrice: number,
    minPrice: number,
    minSize: number,
    maxSize: number,
    bedrooms: number,
    extraDetails: object = {},
  ) {
    this.email = email;
    this.nameOfArea = nameOfArea;
    this.maxPrice = maxPrice;
    this.minSize = minSize;
    this.maxSize = maxSize;
    this.bedrooms = bedrooms;
    this.minPrice = minPrice;
    this.active = true;
    this.extraDetails = extraDetails;
    this.createdAt = new Date().toISOString();
  }

  toJsonBE() {
    const record: any = {
      email: this.email,
      name_of_area: this.nameOfArea,
      active: this.active,
      extra_details: this.extraDetails
    };

    if (this.maxPrice > 0) record.max_price = this.maxPrice;
    if (this.minSize > 0) record.min_size = this.minSize;
    if (this.maxSize > 0) record.max_size = this.maxSize;
    if (this.bedrooms >= 0) record.number_of_bedrooms = this.bedrooms;
    if (this.minPrice > 0) record.min_price = this.minPrice;

    return record;
  }

  static fromJsonBE(record: any) {
    const interest =  new Interest(
      record.email,
      record.name_of_area,
      record.max_price,
      record.min_price,
      record.min_size,
      record.max_size,
      record.number_of_bedrooms,
      record.extra_details,
    );
    interest._id = record._id;
    return interest;
  }
}
