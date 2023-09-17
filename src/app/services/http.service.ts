import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Constants } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private readonly BASE_URL = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  get(endPoint: string, data?: any): Observable<any> {
    const url = this.BASE_URL + endPoint;
    const options = {
      params: data,
      headers: this.getHeaders()
    };
    return this.http.get(url, options);
  }

  post(endPoint: string, body?: any): Observable<any> {
    const url = this.BASE_URL + endPoint;
    return this.http.post(url, body, {
      headers: this.getHeaders()
    });
  }

  put(endPoint: string, body?: any): Observable<any> {
    const url = this.BASE_URL + endPoint;
    return this.http.put(url, body, {
      headers: this.getHeaders()
    });
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(Constants.AUTH_TOKEN)}`
    });
  }
}
