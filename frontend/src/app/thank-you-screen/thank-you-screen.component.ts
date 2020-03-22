import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-thank-you-screen',
  templateUrl: './thank-you-screen.component.html',
  styleUrls: ['./thank-you-screen.component.css']
})
export class ThankYouScreenComponent implements OnInit {

  @Output() complete: EventEmitter<boolean> = new EventEmitter<boolean>();
  submitForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.submitForm = this.createFormGroup();
  }

  onSubmit(): void {
    this.complete.emit(true);
  }

  private createFormGroup(): FormGroup {
    return new FormGroup({});
  }

}
