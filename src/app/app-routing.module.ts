import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContractDataWrapperComponent } from './contract-data/contract-data-wrapper/contract-data-wrapper.component';

const routes: Routes = [
  { path: 'contract/:canTrackCode', component: ContractDataWrapperComponent }
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
