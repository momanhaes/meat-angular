import {
  Component,
  Input,
  OnInit,
  ContentChild,
  AfterContentInit,
} from "@angular/core";
import { NgModel } from "@angular/forms";

@Component({
  selector: "mt-input-container",
  templateUrl: "./input.component.html",
})
export class InputComponent implements OnInit, AfterContentInit {
  public input: any;

  @Input() label: string;
  @Input() message: any;
  @Input() errorMessage: any;

  @ContentChild(NgModel) model: NgModel;

  constructor() {}

  get hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  get hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }

  ngOnInit() {}

  ngAfterContentInit() {
    this.input = this.model;

    if (this.input === undefined) {
      throw new Error(
        "Esse componente precisa ser usado com uma diretiva ngModel"
      );
    }
  }
}
