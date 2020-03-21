import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { WelcomeScreenComponent } from './welcome-screen/welcome-screen.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ApiModule } from "@wirvsvirus/api-client-lib";

@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    WelcomeScreenComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    // TODO WTF?
    //ApiModule.forRoot(Identity)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
