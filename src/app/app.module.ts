import { CoreModule } from './core.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import { AppComponent } from './app.component'; 
import { SharedModule } from './shared/shared.module';
import * as fromApp from './store/app.reducer';

@NgModule({
  declarations: [

    AppComponent,
    HeaderComponent,
  ],


  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, 
    SharedModule,
    CoreModule,
    StoreModule.forRoot(fromApp.appReduser)
  ],

  bootstrap: [AppComponent],
 // providers: [LoggingService]
})
export class AppModule { }
