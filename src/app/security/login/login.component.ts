import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "app/shared/messages/snackbar/notification.service";
import { LoginService } from "./login.service";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

@Component({
  selector: "mt-login",
  templateUrl: "./login.component.html",
  animations: [
    trigger("loginAppeard", [
      state(
        "ready",
        style({
          opacity: 1,
        })
      ),
      transition("void => ready", [
        style({ opacity: 0, transform: "translate(-30px, -10px)" }),
        animate("300ms 0s ease-in-out"),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public navigateTo: string;
  public loginState = "ready";

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control("", [Validators.required, Validators.email]),
      password: this.fb.control("", [Validators.required]),
    });

    this.navigateTo = this.activatedRoute.snapshot.params["to"] || btoa("/");
  }

  login() {
    this.loginService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (user) => this.notificationService.notify(`Bem-vindo, ${user.name}!`),
        (response) => this.notificationService.notify(response.error.message),
        () => {
          this.router.navigate([atob(this.navigateTo)]);
        }
      );
  }
}
