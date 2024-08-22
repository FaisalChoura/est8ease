import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Interest } from '../models/interest';
import { environment } from '../../environments/env';

@Injectable({
  providedIn: 'root',
})
export class InterestsService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  findInterestsByEmail(email: string): Observable<Interest[]> {
    const url = this.apiUrl + '/interests';
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.get<Interest[]>(url, {
      params,
    });
  }

  update(interest: Interest): Observable<Interest> {
    const url = this.apiUrl + '/interests/' + `${interest._id}`;
    return this.http.put<Interest>(url, interest);
  }
}
