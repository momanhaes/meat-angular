import {
  Component,
  Input,
  OnInit,
  ContentChild,
  AfterContentInit,
} from "@angular/core";
import { NgModel, FormControlName } from "@angular/forms";

@Component({
  selector: "mt-input-container",
  templateUrl: "./input.component.html",
})
export class InputComponent implements OnInit, AfterContentInit {
  public input: any;

  @Input() label: string;
  @Input() message: any;
  @Input() errorMessage: any;
  @Input() showTip = true;

  @ContentChild(NgModel) model: NgModel;
  @ContentChild(FormControlName) control: FormControlName;

  constructor() { }

  get hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  get hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }

  ngOnInit() { }

  ngAfterContentInit() {
    this.input = this.model || this.control;

    if (this.input === undefined) {
      throw new Error(
        "Esse componente precisa ser usado com uma diretiva ngModel ou formControlName"
      );
    }
  }
}
