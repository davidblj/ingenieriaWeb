export class CartList {
  user: Object;
  content: Object;
  deliveryFlag: boolean;

  constructor(cart: any) {    
    this.content = cart;
    this.deliveryFlag = cart.delivery;
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
}
