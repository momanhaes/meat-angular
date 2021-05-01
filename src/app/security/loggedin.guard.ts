import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
} from "@angular/router";
import { LoginService } from "./login/login.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {
  constructor(private LoginService: LoginService) {}

  checkAuthentication(path: string): boolean {
    const loggedIn = this.LoginService.isLoggedIn();
    if (!loggedIn) this.LoginService.handleLogin(`/${path}`);
    return loggedIn;
  }

  canLoad(route: Route): boolean {
    return this.checkAuthentication(route.path);
  }

  canActivate(
    activatedRoute: ActivatedRouteSnapshot,
    routerState: RouterStateSnapshot
  ): boolean {
    return this.checkAuthentication(activatedRoute.routeConfig.path);
  }
}
