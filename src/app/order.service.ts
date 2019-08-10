import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Order } from './order.type';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.orderAPI}/order`)
      .pipe(
        tap(orders => console.log('fetched orders', orders)),
        catchError(this.handleError('getOrders', []))
      );
  }

  getOrder(id): Observable<Order> {
    return this.http.get<Order>(`${environment.orderAPI}/order/${id}`)
      .pipe(
        tap(order => console.log('fetched order', order)),
        catchError(this.handleError('getOrder', null))
      );
  }

  addOrder(orderData): Observable<Order> {
    console.log('payload', JSON.stringify(orderData));

    return this.http.post<Order>(`${environment.orderAPI}/order`, orderData, httpOptions).pipe(
      tap((order: Order) => console.log(`added order is ${order}`)),
      catchError(this.handleError<Order>('addJob'))
    );
  }
}
