import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap, throwError } from 'rxjs';
import { Interest } from './models/interest';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/env';
import { FiltersPayload } from './models/filters-payload';
import { Property } from './models/property';
import { Properties } from './models/properties';
import { ExtraDetails } from './models/extra-details';
import { PropertiesResponseInterface } from './models/properties-response.interface';

@Injectable({
  providedIn: 'root',
})
export class dbService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProperties(
    payload: FiltersPayload
  ): Observable<Properties> {
    return this.http
      .get<PropertiesResponseInterface>(this.apiUrl + '/properties', {
        params: payload.toHttpParams(),
      })
      .pipe(
        map((response) => {
          const properties = response.data.map((p) => {
            const property = new Property(p);
            property.score = ExtraDetails.getScore(property);
            // TODO does this make sense to be here ?
            property.scoreLevel = ExtraDetails.scoreLevel(property.score);
            return property;
          });
          return new Properties(properties, response.total, response.avgCostPerSqm);
        })
      );
  }

  addInterest(interest: Interest): Observable<any> {
    return this.checkIfInterestExists(interest).pipe(
      switchMap((exists) => {
        if (exists) {
          return throwError(() => new Error('Interest already exists'));
        } else {
          return this.http.post(
            this.apiUrl + '/interests',
            interest.toJsonBE()
          );
        }
      })
    );
  }

  private checkIfInterestExists(interest: Interest): Observable<boolean> {
    let params = new HttpParams();
    if (interest.email) params = params.append('email', interest.email);
    if (interest.bedrooms)
      params = params.append('numOfBedrooms', interest.bedrooms);
    if (interest.size) params = params.append('size', interest.size);
    if (interest.nameOfArea)
      params = params.append('nameOfArea', interest.nameOfArea);
    if (interest.maxPrice)
      params = params.append('maxPrice', interest.maxPrice);
    if (interest.minPrice)
      params = params.append('minPrice', interest.minPrice);
    return this.http
      .get<any[]>(this.apiUrl + '/interests', {
        params: params,
      })
      .pipe(
        switchMap((x) => {
          if (x.length > 0) return of(true);

          return of(false);
        })
      );
  }
}
