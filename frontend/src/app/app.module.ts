import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {TestComponentComponent} from './test-component/test-component.component';
import {WelcomeScreenComponent} from './welcome-screen/welcome-screen.component';
import {SymptomsScreenComponent} from './symptoms-screen/symptoms-screen.component';
import {CoronaScreenComponent} from './corona-screen/corona-screen.component';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {ApiModule, QuestionnaireService, VisualizationService} from "../api";
import {HttpClientModule} from "@angular/common/http";
import {MapComponent} from './map/map.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonsModule, BsDropdownModule, BsDropdownDirective} from "ngx-bootstrap";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    WelcomeScreenComponent,
    SymptomsScreenComponent,
    CoronaScreenComponent,
    ProgressBarComponent,
    MapComponent,
    QuestionnaireComponent,
    SymptomsScreenComponent,
  ],
  imports: [
    BrowserModule,
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
