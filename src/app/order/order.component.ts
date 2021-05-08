import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { RadioOption } from "app/shared/radio/radio-option.model";
import { Order, OrderItem } from "./order.model";
import { OrderService } from "./order.service";
import { EMAIL_PATTERN, NUMBER_PATTERN } from "app/shared/patterns";
import { tap } from "rxjs/operators";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from "@angular/forms";

@Component({
  selector: "mt-order",
  templateUrl: "./order.component.html",
})
export class OrderComponent implements OnInit {
  public orderForm: FormGroup;
  public delivery: number = 8;
  public orderID: string;

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

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.orderForm = new FormGroup(
      {
        name: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
        ]),
        email: new FormControl("", [
          Validators.required,
          Validators.pattern(EMAIL_PATTERN),
        ]),
        emailConfirmation: new FormControl("", [
          Validators.required,
          Validators.pattern(EMAIL_PATTERN),
        ]),
        address: new FormControl("", [
          Validators.required,
          Validators.minLength(3),
        ]),
        number: new FormControl("", [
          Validators.required,
          Validators.pattern(NUMBER_PATTERN),
        ]),
        optionalAddress: new FormControl(""),
        paymentOption: new FormControl("", [Validators.required]),
      },
      { validators: [OrderComponent.equalsTo], updateOn: "blur" }
    );
  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get("email");
    const emailConfirmation = group.get("emailConfirmation");

    if (!email || !emailConfirmation) {
      return undefined;
    }

    if (email.value !== emailConfirmation.value) {
      return {
        emailsNotMatch: true,
      };
    }
    return undefined;
  }

  isOrderCompleted() {
    return this.orderID !== undefined;
  }

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
    this.orderService
      .checkOrder(order)
      .pipe(
        tap((orderID: string) => {
          this.orderID = orderID;
        })
      )
      .subscribe((orderId: string) => {
        this.router.navigate(["/order-summary"]);
        this.orderService.clear();
      });
  }
}
