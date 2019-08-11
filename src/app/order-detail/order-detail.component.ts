import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../order.type';
import { OrderService } from '../order.service';

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

  constructor(private route: ActivatedRoute, private api: OrderService) { }

  ngOnInit() {
    this.getOrderDetails(this.route.snapshot.params.id);
  }

  getOrderDetails(id) {
    this.api.getOrder(id)
      .subscribe(data => {
        this.order = data;
        console.log(this.order);
        this.isLoadingResults = false;
      });
  }

  cancelOrder(orderId) {
    this.api.cancelOrder(orderId).subscribe(data => {
      console.log('received sdata', data);
    }, error => {
      console.log('receved eror', error);
      if (error && error.error) { this.errorMsg = error.error.message; }
    });
  }
}
