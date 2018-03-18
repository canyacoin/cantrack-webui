import { Component, OnInit, ViewChild, ComponentFactory, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {

  @ViewChild("taskList", { read: ViewContainerRef }) container

  taskRef: ComponentRef<any>

  tasks = {}

  prevTaskIndex = 0

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.createTask();
  }

  createTask() {
    // this.container.clear();

    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(TaskComponent);

    this.taskRef = this.container.createComponent(factory);

    this.taskRef.instance.taskList = this;

    this.taskRef.instance.id = this.prevTaskIndex;

    this.taskRef.location.nativeElement.querySelector('textarea').focus();

    this.tasks[this.prevTaskIndex] = this.taskRef;

    this.prevTaskIndex++;

    // this.taskRef.instance.output.subscribe(event => console.log(event));
  }

  removeTask(id: number) {
    this.tasks[id].destroy();
  }

}










