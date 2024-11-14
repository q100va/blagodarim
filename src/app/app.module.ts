import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { BrowserAnimationsModule }
    from "@angular/platform-browser/animations";

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { YoungerComponent } from './younger/younger.component';
import { OlderComponent } from './older/older.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    YoungerComponent,
    OlderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TabViewModule,
    ToggleButtonModule,
    BrowserAnimationsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
