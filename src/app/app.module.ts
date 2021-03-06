import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SQLite } from '@ionic-native/sqlite/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DbService } from './services/db.service';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SQLite,DbService,LocalNotifications],
  bootstrap: [AppComponent],
})
export class AppModule {}
