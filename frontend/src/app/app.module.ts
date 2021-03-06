import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {WelcomeScreenComponent} from './welcome-screen/welcome-screen.component';
import {SymptomsScreenComponent} from './symptoms-screen/symptoms-screen.component';
import {CoronaScreenComponent} from './corona-screen/corona-screen.component';
import {ExistingConditionsScreenComponent} from './existing-conditions-screen/existing-conditions-screen.component';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {ApiModule} from "../api";
import {HttpClientModule} from "@angular/common/http";
import {MapComponent} from './map/map.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BsDropdownModule, ButtonsModule} from "ngx-bootstrap";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import {QuestionnaireComponent} from './questionnaire/questionnaire.component';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { SubmitScreenComponent } from './submit-screen/submit-screen.component';
import { ThankYouScreenComponent } from './thank-you-screen/thank-you-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeScreenComponent,
    SymptomsScreenComponent,
    CoronaScreenComponent,
    ProgressBarComponent,
    MapComponent,
    QuestionnaireComponent,
    SymptomsScreenComponent,
    ExistingConditionsScreenComponent,
    SubmitScreenComponent,
    ThankYouScreenComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ApiModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule,
    ProgressbarModule.forRoot(),
    BsDropdownModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
