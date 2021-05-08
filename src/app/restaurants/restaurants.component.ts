import { Component, OnInit } from "@angular/core";
import { Restaurant } from "./restaurant/restaurants.model";
import { RestaurantsService } from "./restaurants.service";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { from } from "rxjs";
import {
  switchMap,
  debounceTime,
  distinctUntilChanged,
  catchError,
} from "rxjs/operators";

@Component({
  selector: "mt-restaurants",
  templateUrl: "./restaurants.component.html",
  animations: [
    trigger("toggleSearch", [
      state(
        "hidden",
        style({
          opacity: 0,
          "max-height": "0px",
        })
      ),
      state(
        "visible",
        style({
          opacity: 1,
          "max-height": "70px",
          "margin-top": "20px",
        })
      ),
      transition("* => *", animate("250ms 0s ease-in-out")),
    ]),
  ],
})
export class RestaurantsComponent implements OnInit {
  public restaurants: Restaurant[];
  public searchBarState = "hidden";
  public searchForm: FormGroup;
  public searchControl: FormControl;

  constructor(
    private restaurantService: RestaurantsService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.searchControl = this.fb.control("");
    this.searchForm = this.fb.group({
      searchControl: this.searchControl,
    });

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((searchTerm) =>
          this.restaurantService
            .restaurants(searchTerm)
            .pipe(catchError((error) => from([])))
        )
      )
      .subscribe((restaurants) => (this.restaurants = restaurants));

    this.restaurantService
      .restaurants()
      .subscribe((restaurants) => (this.restaurants = restaurants));
  }

  toggleSearch() {
    this.searchBarState =
      this.searchBarState === "hidden" ? "visible" : "hidden";
  }
}
