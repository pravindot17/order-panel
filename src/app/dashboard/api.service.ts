import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getOrderStatus() {
    return this.http.get(`${environment.orderAPI}/health`)
      .pipe(
        map(res => res)
      );
  }

  getPaymentStatus() {
    return this.http.get(`${environment.paymentAPI}/health`)
      .pipe(
        map(res => res)
      );
  }
}
