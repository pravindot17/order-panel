import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../order.type';
import { OrderService } from '../order.service';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: Order = { name: '', email: '', address: '', products: [{ name: '', amount: 0 }] };
  isLoadingResults = true;
  displayedProductColumns: string[] = ['position', 'name', 'amount'];
  displayedHistoryColumns: string[] = ['state', 'createdAt'];
  errorMsg = '';

  constructor(private route: ActivatedRoute, private api: OrderService, private alert: AlertService) { }

  ngOnInit() {
    this.getOrderDetails(this.route.snapshot.params.id);
  }

  getOrderDetails(id) {
    this.api.getOrder(id)
      .subscribe(data => {
        this.order = data;
        this.isLoadingResults = false;
      }, err => {
        console.log('inside error', err);
        this.isLoadingResults = false;
        this.alert.error('Unable to fetch order details');
      });
  }

  cancelOrder(orderId) {
    this.api.cancelOrder(orderId).subscribe(data => {
      this.isLoadingResults = false;
      this.alert.error('Your order has been cancelled successfully');
    }, error => {
      this.isLoadingResults = false;
      if (error && error.error) { this.alert.error(error.error.message); }
    });
  }
}
