import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Gender} from "../response-data/FormResponse"

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent implements OnInit {

  public genders = Object.values(Gender);

  public welcomeScreenForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.welcomeScreenForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      seenBefore: new FormControl(),
      personalData: new FormGroup({
        age: new FormControl(),
        gender: new FormControl(),
        postcode: new FormControl()
      })
    });
  }

  public nextScreen(): void {

  }

  onSubmit() {

  }
}
