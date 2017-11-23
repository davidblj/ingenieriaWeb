export class CartList {
  user: Object;
  content: Object;
  credentials: Object;
  deliveryFlag: boolean;

  constructor(cart: any, credentials?: Object) {
    this.content = cart;
    this.credentials = credentials;
    this.deliveryFlag = cart.delivery;
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
}
