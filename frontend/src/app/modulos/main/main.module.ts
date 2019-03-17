import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {MainComponent} from './main.component'
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
})
export class MainModule { }