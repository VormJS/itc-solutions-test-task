import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { PagesComponent } from './components/pages/pages.component';
import { TableComponent } from './components/table/table.component';
import { PlugComponent } from './components/plug/plug.component';
import { UIRoutingModule } from './ui-routing.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PagesComponent,
    TableComponent,
    PlugComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    UIRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
