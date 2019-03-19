//Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

//External Modules
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//App Modules
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './modules/auth/auth.module';
import { SystemPanelModule } from './modules/system-panel/system-panel.module';

//App Services
import { TransactionsService } from './shared/transactions-service/transactions.service';
import { DocumentsService } from './shared/documents-service/documents.service';
import { FeesService } from './shared/fees-service/fees.service';

//Components
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    FontAwesomeModule,
    AuthModule,
    SystemPanelModule
  ],
  providers: [
    FeesService,
    DocumentsService,
    TransactionsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
