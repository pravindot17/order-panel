import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {

  orderForm: FormGroup;
  name = '';
  email = '';
  address = '';
  products = [];
  isLoadingResults = false;

  staticProducts = [
    { name: 'Kingston 32 Gb Pendrive', amount: 450 },
    { name: 'FlyBot Truly Wireless', amount: 2750 },
    { name: 'Sony XB450 Headphone', amount: 1500 },
    { name: 'Lenovo G40 laptop', amount: 27000 },
    { name: 'Timex S90', amount: 1750 },
  ];

  constructor(private router: Router, private api: OrderService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      address: [null, Validators.required],
      products: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addOrder(form)
      .subscribe(res => {
        const id = res.orderId;
        this.isLoadingResults = false;
        this.router.navigate(['/order-details', id]);
      }, (err) => {
        console.log('Failed adding order', err);
        this.isLoadingResults = false;
      });
  }
}
