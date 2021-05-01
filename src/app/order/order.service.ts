import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MEAT_API } from "app/app.api";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { LoginService } from "app/security/login/login.service";
import { Observable } from "rxjs/Observable";
import { Order } from "./order.model";
import "rxjs/add/operator/map";

@Injectable()
export class OrderService {
  constructor(
    private cartService: ShoppingCartService,
    private loginService: LoginService,
    private http: HttpClient
  ) {}

  cartItems(): CartItem[] {
    return this.cartService.items;
  }

  itemsValue(): number {
    return this.cartService.total();
  }

  increaseQty(item: CartItem) {
    this.cartService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.cartService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.cartService.removeItem(item);
  }

  clear() {
    this.cartService.clear();
  }

  checkOrder(order: Order): Observable<string> {
    let headers = new HttpHeaders();
    if (this.loginService.isLoggedIn()) {
      headers = headers.set(
        "Authorization",
        `Bearer ${this.loginService.user.accessToken}`
      );
    }

    return this.http
      .post<Order>(`${MEAT_API}/orders`, order, { headers: headers })
      .map((order) => order.id);
  }
}
