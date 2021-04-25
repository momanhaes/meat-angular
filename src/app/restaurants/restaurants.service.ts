import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";
import { ErrorHandler } from "app/app.error.handler";
import { Restaurant } from "./restaurant/restaurants.model";
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { MEAT_API } from "app/app.api";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class RestaurantsService {
  constructor(private http: Http) {}

  restaurants(search?: string): Observable<Restaurant[]> {
    return this.http
      .get(`${MEAT_API}/restaurants`, { params: { q: search } })
      .map((response) => response.json())
      .catch(ErrorHandler.handleError);
  }

  restaurantsById(id: string): Observable<Restaurant> {
    return this.http
      .get(`${MEAT_API}/restaurants/${id}`)
      .map((response) => response.json())
      .catch(ErrorHandler.handleError);
  }

  reviewsOfRestaurant(id: string): Observable<any> {
    return this.http
      .get(`${MEAT_API}/restaurants/${id}/reviews`)
      .map((response) => response.json())
      .catch(ErrorHandler.handleError);
  }

  menuOfRestaurant(id: string): Observable<MenuItem[]> {
    return this.http
      .get(`${MEAT_API}/restaurants/${id}/menu`)
      .map((response) => response.json())
      .catch(ErrorHandler.handleError);
  }
}