import { Injectable } from '@angular/core';
import { Click } from '../models/click';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClicksService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  create(click: Click): Observable<Click> {
    const url = this.apiUrl + '/clicks';
    console.log(click);
    return this.http.post<Click>(url, click);
  }
}
