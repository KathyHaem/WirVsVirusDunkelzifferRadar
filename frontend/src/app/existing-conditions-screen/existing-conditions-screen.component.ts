import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ResponseCompilerService} from "../response-data/ResponseCompilerService";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-existing-conditions-screen',
  templateUrl: './existing-conditions-screen.component.html',
  styleUrls: ['./existing-conditions-screen.component.css']
})
export class ExistingConditionsScreenComponent implements OnInit {

  @Output() complete: EventEmitter<boolean> = new EventEmitter<boolean>();
  public conditionsForm: FormGroup;

  constructor(private responseCompilerService: ResponseCompilerService) {
  }

  ngOnInit(): void {
    this.conditionsForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      asthma: new FormControl(),
      allergies: new FormControl(),
      hypertension: new FormControl(),
      diabetes: new FormControl(),
      other: new FormControl()
    });
  }

  onSubmit(): void {
    this.responseCompilerService.addConditionsScreenData(this.conditionsForm.value);
    this.complete.emit(true);
  }
}
