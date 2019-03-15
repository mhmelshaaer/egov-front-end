//Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//External Modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//App Modules
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './modules/auth/auth.module';
import { SystemPanelModule } from './modules/system-panel/system-panel.module';

//Components
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    AuthModule,
    SystemPanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
