import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order.type';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  displayedColumns: string[] = ['orderId', 'name', 'email', 'orderState', 'createdAt'];
  dataSource = new MatTableDataSource();
  isLoadingResults = true;

  constructor(private order: OrderService) { }

  ngOnInit() {
    this.order.getOrders()
      .subscribe(res => {
        this.dataSource = new MatTableDataSource<Order>(res);
        console.log(this.dataSource);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
