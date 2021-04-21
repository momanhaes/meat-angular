import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { RadioOption } from "app/shared/radio/radio-option.model";
import { Order, OrderItem } from "./order.model";
import { OrderService } from "./order.service";

@Component({
  selector: "mt-order",
  templateUrl: "./order.component.html",
})
export class OrderComponent implements OnInit {
  // Valor do frete mockado
  public delivery: number = 8;

  public paymentOptions: RadioOption[] = [
    {
      label: "Dinheiro",
      value: "MON",
    },
    {
      label: "Cartão de Débito",
      value: "DEB",
    },
    {
      label: "Cartão Refeição",
      value: "REF",
    },
  ];

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit() {}

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.orderService.remove(item);
  }

  checkOrder(order: Order, validated: boolean) {
    if (!validated) {
      return;
    }

    order.orderItems = this.cartItems().map(
      (item: CartItem) => new OrderItem(item.quantity, item.menuItem.id)
    );
    this.orderService.checkOrder(order).subscribe((orderId: string) => {
      this.router.navigate(["/order-summary"]);
      this.orderService.clear();
    });
  }
}
