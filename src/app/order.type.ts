export class Order {
  orderId?: string;
  name: string;
  email: string;
  address: string;
  products: [{
    name: string,
    amount: number
  }];
}
