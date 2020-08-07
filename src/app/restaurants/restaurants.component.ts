import { Component, OnInit } from "@angular/core";
import { Restaurant } from "./restaurant/restaurants.model";
import { RestaurantsService } from "./restaurant/restaurant.service";

@Component({
  selector: "mt-restaurants",
  templateUrl: "./restaurants.component.html",
})
export class RestaurantsComponent implements OnInit {
  restaurants: Restaurant[];

  constructor(private restaurantService: RestaurantsService) {}

  ngOnInit() {
    this.restaurantService
      .restaurants()
      .subscribe((restaurants) => (this.restaurants = restaurants));
  }
}
