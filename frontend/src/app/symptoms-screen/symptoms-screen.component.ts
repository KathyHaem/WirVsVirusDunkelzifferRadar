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
      cough: new FormControl(),
      coughData: new FormGroup({
        coughDry: new FormControl(),
        coughProductive: new FormControl(),
        coughPainful: new FormControl()
      }),
      fever: new FormControl(),
      feverData: new FormGroup({
        feverSuspected: new FormControl(),
        feverConfirmed: new FormControl()
      }),
      nose: new FormControl(),
      pain: new FormControl(),
      painData: new FormGroup({
        painHead: new FormControl(),
        painLimbs: new FormControl()
      }),
      diarrhea: new FormControl(),
      throat: new FormControl(),
      dyspnea: new FormControl(),
      fatigue: new FormControl(),
    });
  }

  onSubmit(): void {
    this.responseCompilerService.addSymptomsScreenData(this.symptomsScreenForm.value);
    this.complete.emit(true);
  }
}
