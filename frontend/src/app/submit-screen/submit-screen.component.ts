import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ResponseCompilerService} from "../response-data/ResponseCompilerService";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-submit-screen',
  templateUrl: './submit-screen.component.html',
  styleUrls: ['./submit-screen.component.css']
})
export class SubmitScreenComponent implements OnInit {

  @Output() complete: EventEmitter<boolean> = new EventEmitter<boolean>();
  submitForm: FormGroup;

  constructor(private responseCompilerService: ResponseCompilerService) {
  }

  ngOnInit(): void {
    this.submitForm = this.createFormGroup();
  }

  onSubmit(): void {
    this.responseCompilerService.submitData();
    this.complete.emit(true);
  }

  private createFormGroup(): FormGroup {
    return new FormGroup({});
  }
}
