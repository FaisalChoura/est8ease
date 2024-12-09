import { HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';

export class FiltersPayload {
  bedrooms: number[];
  area: string;
  extraDetails: Map<string, boolean>;
  minSize: number;

  constructor(bedrooms: number[], area: string, extraDetails: Map<string, boolean>, minSize: number) {
    this.bedrooms = bedrooms;
    this.area = area;
    this.extraDetails = extraDetails;
    this.minSize = minSize
  }

  toHttpParams(): HttpParams {
    let params = new HttpParams();
    if (this.area) params = params.append('area', this.area);
    if (this.minSize) params = params.append('minSize', this.minSize.toString());
    if (this.bedrooms) {
      for( const bedroom of this.bedrooms) {
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

  toQueryParams(): Params {
    const params: Params = {};
    if (this.area)  params['area'] =  this.area;
    if (this.bedrooms) params['bedrooms'] = this.bedrooms
    if (this.minSize) params['minSize'] = this.minSize.toString();
    if (this.extraDetails) {
      this.extraDetails.forEach((value, key) => {
        params[key] =  value ? 'true' : 'false';
      });
    }
    return params;
  }

}
