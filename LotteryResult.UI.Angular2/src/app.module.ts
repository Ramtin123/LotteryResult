import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LotterResultComponent }   from './LotterResult.Component';
import {HttpModule, JsonpModule,} from '@angular/http';

@NgModule({
  imports:      [ BrowserModule,HttpModule,JsonpModule ],
  declarations: [ LotterResultComponent ],
  bootstrap:    [ LotterResultComponent ]
})
export class AppModule { }
