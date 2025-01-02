export class CreateInterestDto {
  email: string;
  min_price: number;
  max_price: number;
  number_of_bedrooms: number;
  min_size: number;
  max_size: number;
  name_of_area: string;
  active: boolean;
  extra_details: object;
}
