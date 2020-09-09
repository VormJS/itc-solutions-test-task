import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UIRoutingModule } from './ui-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './components/app.component';
import { HomeComponent } from './components/home/home.component';
import { PagesComponent } from './components/pages/pages.component';
import { TableComponent } from './components/table/table.component';
import { PlugComponent } from './components/plug/plug.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BooleanToEmojiPipe } from './helpers/boolean-to-emoji.pipe';
import { SexToEmojiPipe } from './helpers/sex-to-emoji.pipe';

import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};


import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MondayDateAdapter } from './helpers/monday-date-adapter';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PagesComponent,
    TableComponent,
    PlugComponent,
    SidenavComponent,
    BooleanToEmojiPipe,
    SexToEmojiPipe
  ],
  imports: [
    BrowserModule,
    UIRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    FormsModule
  ],
  providers: [
    { provide: DateAdapter, useClass: MondayDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
