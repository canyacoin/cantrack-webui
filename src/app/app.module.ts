import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TimerComponent } from './timer/timer.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import { SubTaskComponent } from './sub-task/sub-task.component';
import { TimerService } from './timer.service';
import { TimerTriggerComponent } from './timer-trigger/timer-trigger.component';
import { TimelineSwitchComponent } from './timeline-switch/timeline-switch.component';
import { PreviewService } from './preview.service';
import { IdleTaskService } from './idle-task.service';
import { IdleTaskModalComponent } from './idle-task-modal/idle-task-modal.component';
import { EthereumService } from './ethereum.service';
import { PublishTimeDataModalComponent } from './publish-time-data-modal/publish-time-data-modal.component';
import { AppRoutingModule } from './/app-routing.module';

import { CustomPipesModule } from './custom-pipes/custom-pipes.module';
import { ContractDataModule } from './contract-data/contract-data.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TimerComponent,
    TaskListComponent,
    TaskComponent,
    SubTaskComponent,
    TimerTriggerComponent,
    TimelineSwitchComponent,
    IdleTaskModalComponent,
    PublishTimeDataModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ContractDataModule,
    CustomPipesModule
  ],
  exports: [],
  providers: [
    TimerService,
    PreviewService,
    IdleTaskService,
    EthereumService
  ],
  bootstrap: [AppComponent],
  entryComponents: [TaskComponent, SubTaskComponent]
})
export class AppModule { }
