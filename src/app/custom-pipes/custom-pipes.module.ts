import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatesDifferencePipe } from '../dates-difference.pipe';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    DatesDifferencePipe
  ],
  exports: [
    DatesDifferencePipe
  ]
})

export class CustomPipesModule { }
