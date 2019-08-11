import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order.type';
import { MatTableDataSource } from '@angular/material';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'name', 'email', 'orderState', 'createdAt'];
  dataSource = new MatTableDataSource();
  isLoadingResults = true;

  constructor(private order: OrderService, private alert: AlertService) { }

  ngOnInit() {
    this.order.getOrders()
      .subscribe(res => {
        this.dataSource = new MatTableDataSource<Order>(res);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.alert.error('Unable to fetch orders list');
        this.isLoadingResults = false;
      });
  }
}
