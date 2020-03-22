import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {Gender} from "../response-data/FormResponse"
import {ResponseCompilerService} from "../response-data/ResponseCompilerService";

@Component({
  selector: 'app-corona-screen',
  templateUrl: './corona-screen.component.html',
  styleUrls: ['./corona-screen.component.css']
})
export class CoronaScreenComponent implements OnInit {
  public isYesCollapsed: boolean =true;
  public isPositiveCollapsed: boolean =true;

  public coronaScreenForm: FormGroup;

  @Output() complete: EventEmitter<boolean> = new EventEmitter<boolean>();

   constructor(private responseCompilerService: ResponseCompilerService) {
  }

  ngOnInit(): void {
    this.coronaScreenForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      coronaTested: new FormControl(),
      positiveTest: new FormControl(),
      testDate: new FormControl()
    });
  }

  onSubmit(): void {
    // todo validation?
    this.responseCompilerService.addCoronaScreenData(this.coronaScreenForm.value);
    this.complete.emit(true);
  }

}
