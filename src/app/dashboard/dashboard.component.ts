import { Component, OnInit } from '@angular/core';
import { map, startWith, mergeMap, catchError } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ApiService } from './api.service';
import { interval, empty } from 'rxjs';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loader = false;
  pollingData = { payment: false, order: false };
  errors;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ }) => {
      return [
        { title: 'Order Service', name: 'order', cols: 1, rows: 1 },
        { title: 'Payment Service ', name: 'payment', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService) { }

  ngOnInit() {
    this.pollOrderApi();
    this.pollPaymentApi();
  }

  private pollOrderApi() {
    interval(environment.pollingIntervalTime)
      .pipe(
        startWith(0),
        mergeMap(obs =>
          this.apiService.getOrderStatus().pipe(
            catchError((error) => {
              this.pollingData.order = false;
              return empty(); // or return of(error) and do sth about it in the subscribe body
            }),
          )
        ),
      ).subscribe(res => { this.pollingData.order = true; });
  }

  private pollPaymentApi() {
    interval(environment.pollingIntervalTime)
      .pipe(
        startWith(0),
        mergeMap(obs =>
          this.apiService.getPaymentStatus().pipe(
            catchError((error) => {
              this.pollingData.payment = false;
              return empty(); // or return of(error) and do sth about it in the subscribe body
            }),
          )
        ),
      ).subscribe(res => { this.pollingData.payment = true; });
  }

  getHealthSrc(health) {
    if (health) { return 'assets/images/activeHealth.png'; }
    return 'assets/images/inactiveHealth.png';
  }

  getHealthMessage(health) {
    if (health) { return 'It\'s Healthy!'; }
    return 'It\'s Unhealthy!';
  }
}
