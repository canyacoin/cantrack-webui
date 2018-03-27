import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


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
import { DatesDifferencePipe } from './dates-difference.pipe';


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
    DatesDifferencePipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    TimerService,
    PreviewService
  ],
  bootstrap: [AppComponent],
  entryComponents: [TaskComponent, SubTaskComponent]
})
export class AppModule { }
