import { Injectable } from '@angular/core';
import { Observable, of, switchMap, throwError } from 'rxjs';
import { Interest } from './models/interest';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/env';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getProperties(
    area: string,
    pricePerSqm: number,
    numOfBedrooms: number,
    percentageLower: number
  ): Observable<any[]> {
    let params = new HttpParams();
    if (area != null) params = params.append('area', area);
    if (numOfBedrooms != null)
      params = params.append('bedrooms', numOfBedrooms);
    if (pricePerSqm != null) params = params.append('priceM2', pricePerSqm);
    if (percentageLower != null)
      params = params.append('pctLower', percentageLower);
    return this.http.get<any[]>(this.apiUrl + '/properties', {
      params: params,
    });
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
