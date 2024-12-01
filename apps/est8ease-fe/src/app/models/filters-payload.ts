import { HttpParams } from '@angular/common/http';

export class FiltersPayload {
  bedrooms: number[];
  area: string;
  extraDetails: Map<string, boolean>;

  constructor(bedrooms: number[], area: string, extraDetails: Map<string, boolean>) {
    this.bedrooms = bedrooms;
    this.area = area;
    this.extraDetails = extraDetails;
  }

  toHttpParams(): HttpParams {
    let params = new HttpParams();
    if (this.area) params = params.append('area', this.area);
    if (this.bedrooms) {
      for( const bedroom in this.bedrooms) {
        params = params.append('bedrooms', bedroom.toString());
      }
    }
    if (this.extraDetails) {
      this.extraDetails.forEach((value, key) => {
        params = params.append(key, value ? 'true' : 'false');
      });
    }
    return params;
  }
}
