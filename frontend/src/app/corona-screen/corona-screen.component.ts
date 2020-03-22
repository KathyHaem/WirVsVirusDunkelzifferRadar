import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Gender} from "../response-data/FormResponse"

@Component({
  selector: 'app-corona-screen',
  templateUrl: './corona-screen.component.html',
  styleUrls: ['./corona-screen.component.css']
})
export class CoronaScreenComponent implements OnInit {
  public isYesCollapsed: boolean =true;
  public isPositiveCollapsed: boolean =true;
  public coronaTested: boolean = true;
  public positiveTest: boolean = true;

  public coronaScreenForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.coronaScreenForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      coronaTestedForm: new FormControl(),
      yesData: new FormGroup({
         positiveTestForm: new FormControl(),
         positiveData: new FormGroup({
           coronaDateForm: new FormControl(),
      }),
      })
    });
  }

  public nextScreen(): void {

  }

  onSubmit() {

  }

  setCoronaTested(coronaTested: boolean) {
    this.coronaTested = coronaTested;
  }

  setPositiveTest(positiveTest: boolean) {
    this.positiveTest = positiveTest;
  }
}
