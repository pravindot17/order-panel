export class Order {
  name: string;
  email: string;
  address: string;
  products: [{
    name: string,
    amount: number
  }];
}
