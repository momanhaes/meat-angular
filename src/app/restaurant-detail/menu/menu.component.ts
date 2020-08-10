import { Component, OnInit } from "@angular/core";
import { RestaurantsService } from "app/restaurants/restaurant/restaurant.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { MenuItem } from "../menu-item/menu-item.model";

@Component({
  selector: "mt-menu",
  templateUrl: "./menu.component.html",
})
export class MenuComponent implements OnInit {
  menu: Observable<MenuItem[]>;

  constructor(
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute
  ) {}

  addMenuItem(item: MenuItem) {
    console.log("item: ", item);
  }

  ngOnInit() {
    this.menu = this.restaurantsService.menuOfRestaurant(
      this.route.parent.snapshot.params["id"]
    );
  }
}
