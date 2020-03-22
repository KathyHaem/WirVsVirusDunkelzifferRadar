import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TestComponentComponent} from './test-component/test-component.component';
import {WelcomeScreenComponent} from './welcome-screen/welcome-screen.component';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {ApiModule} from "../api";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonsModule, BsDropdownModule} from "ngx-bootstrap";
import {ProgressbarModule} from "ngx-bootstrap/progressbar";

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    WelcomeScreenComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    ApiModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonsModule,
    ProgressbarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
