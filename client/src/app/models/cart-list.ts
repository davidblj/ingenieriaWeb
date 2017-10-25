export class CartList {
  user: Object;
  content: Object;

  constructor(cart: Object) {
    this.content = cart;
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }
}
