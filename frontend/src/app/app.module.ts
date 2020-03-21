import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ApiModule } from "../api";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonsModule} from "ngx-bootstrap";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { MapComponent } from './map/map.component';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    WelcomeScreenComponent,
    ProgressBarComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    ApiModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonsModule,
    ProgressbarModule.forRoot(),
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
