import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Gender} from "../response-data/FormResponse"

@Component({
  selector: 'app-symptoms-screen',
  templateUrl: './symptoms-screen.component.html',
  styleUrls: ['./symptoms-screen.component.css']
})
export class SymptomsScreenComponent implements OnInit {
  public isCoughCollapsed=true;
  public isFeverCollapsed=true;
  public isPainCollapsed=true;
  public genders = Object.values(Gender);

  public symptomsScreenForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.symptomsScreenForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      coughForm: new FormControl(),
      coughData: new FormGroup({
         coughDryForm: new FormControl(),
         coughProductiveForm: new FormControl(),
         coughPainfulForm: new FormControl()
      }),
      feverForm: new FormControl(),
      feverData: new FormGroup({
         feverSuspectedForm: new FormControl(),
         feverConfirmedForm: new FormControl()
      }),
      noseForm: new FormControl(),
      painForm: new FormControl(),
      painData: new FormGroup({
         painHeadForm: new FormControl(),
         painLimbsForm: new FormControl()
      }),
      diarrheaForm: new FormControl(),
      throatForm: new FormControl(),
      dyspneaForm: new FormControl(),
      fatigueForm: new FormControl(),
    });
  }

  public nextScreen(): void {

  }

  onSubmit() {

  }
}
