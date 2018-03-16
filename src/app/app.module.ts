import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TimerComponent } from './timer/timer.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task/task.component';
import { SubTaskComponent } from './sub-task/sub-task.component';
import { TimerService } from './timer.service';
import { TimerTriggerComponent } from './timer-trigger/timer-trigger.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TimerComponent,
    TaskListComponent,
    TaskComponent,
    SubTaskComponent,
    TimerTriggerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
