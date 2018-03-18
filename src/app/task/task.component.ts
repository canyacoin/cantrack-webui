import { Component, OnInit, Input, ViewChild, ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { TimerService } from '../timer.service';
import { SubTaskComponent } from '../sub-task/sub-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

  @ViewChild("subTask", { read: ViewContainerRef }) container

  @Input() localTimer: TimerService

  subTaskRef: ComponentRef<any>

  taskList: any

  description: string

  time: number

  subTasks = []

  constructor(
    public globalTimer: TimerService,
    private resolver: ComponentFactoryResolver) {
    this.localTimer = new TimerService;
    this.localTimer.counter.isLocalTimer = true;
    this.globalTimer.addLocalTimer(this.localTimer);
  }

  ngOnInit() {}

  createSubTask() {
    // this.container.clear();

    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(SubTaskComponent);

    this.subTaskRef = this.container.createComponent(factory);

    // this.subTaskRef.instance.taskList = this;

    // this.taskRef.instance.output.subscribe(event => console.log(event));
  }

  onEnter(e) {
    console.log(e);
    this.taskList.createTask();
  }

  onTab(e) {
    console.log(e);
    this.createSubTask();
  }

}
