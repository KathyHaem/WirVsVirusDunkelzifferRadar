import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ResponseCompilerService} from "../response-data/ResponseCompilerService";

@Component({
  selector: 'app-symptoms-screen',
  templateUrl: './symptoms-screen.component.html',
  styleUrls: ['./symptoms-screen.component.css']
})
export class SymptomsScreenComponent implements OnInit {
  public isCoughCollapsed = true;
  public isFeverCollapsed = true;
  public isPainCollapsed = true;

  public symptomsScreenForm: FormGroup;

  @Output() complete: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private responseCompilerService: ResponseCompilerService) {
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

  onSubmit(): void {
    this.responseCompilerService.addSymptomsScreenData(this.symptomsScreenForm.value);
    this.complete.emit(true);
  }
}
