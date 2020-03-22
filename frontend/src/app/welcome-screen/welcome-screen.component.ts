import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Gender} from "../response-data/FormResponse"
import {ResponseCompilerService} from "../response-data/ResponseCompilerService";

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent implements OnInit {

  @Output() complete: EventEmitter<boolean> = new EventEmitter<boolean>();

  public genders = Object.values(Gender);

  public seenBefore: boolean = true;
  public welcomeScreenForm: FormGroup;

  constructor(private responseCompilerService: ResponseCompilerService) {
  }

  ngOnInit(): void {
    this.welcomeScreenForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      seenBefore: new FormControl(),
      personalData: new FormGroup({
        age: new FormControl(),
        gender: new FormControl(undefined),
        postcode: new FormControl()
      })
    });
  }

  onSubmit(): void {
    // todo validation?
    this.responseCompilerService.addWelcomeScreenData(this.welcomeScreenForm.value);
    this.complete.emit(true);
  }

  setSeenBefore(seenBefore: boolean) {
    this.seenBefore = seenBefore;
  }
}
