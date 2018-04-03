import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractDataWrapperComponent } from './contract-data-wrapper/contract-data-wrapper.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ContractDataWrapperComponent],
  exports: [
    ContractDataWrapperComponent
  ]
})
export class ContractDataModule { }
