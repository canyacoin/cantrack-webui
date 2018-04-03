import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractDataWrapperComponent } from './contract-data-wrapper/contract-data-wrapper.component';
import { ContractDataService } from './contract-data.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ContractDataService
  ],
  declarations: [ContractDataWrapperComponent],
  exports: [
    ContractDataWrapperComponent
  ]
})

export class ContractDataModule { }
