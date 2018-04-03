import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractDataWrapperComponent } from './contract-data-wrapper/contract-data-wrapper.component';
import { ContractDataService } from './contract-data.service';
import { HeaderComponent } from './header/header.component';
import { TaskComponent } from './task/task.component';
import { CustomPipesModule } from '../custom-pipes/custom-pipes.module';

@NgModule({
  imports: [
    CommonModule,
    CustomPipesModule
  ],
  providers: [
    ContractDataService
  ],
  declarations: [
    ContractDataWrapperComponent,
    HeaderComponent,
    TaskComponent
  ],
  entryComponents: [
    TaskComponent
  ],
  exports: [
    ContractDataWrapperComponent
  ]
})

export class ContractDataModule { }
