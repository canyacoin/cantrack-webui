import { Component,
         OnInit,
         ViewChild,
         ComponentFactory,
         ComponentRef,
         ComponentFactoryResolver,
         ViewContainerRef,
         NgZone } from '@angular/core';
import { ContractDataService } from '../contract-data.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-contract-data-wrapper',
  templateUrl: './contract-data-wrapper.component.html',
  styleUrls: ['./contract-data-wrapper.component.css']
})

export class ContractDataWrapperComponent implements OnInit {

  @ViewChild("taskList", { read: ViewContainerRef }) container

  taskRef: ComponentRef<any>

  constructor(
    private resolver: ComponentFactoryResolver,
    private contractDataService: ContractDataService) {

    contractDataService.contractData.subscribe(data => {
      console.log(data);
      Object.keys(data.taskList)
        .forEach(key => this.loadTask(data.taskList[key]));
    });

    contractDataService.contractSender.subscribe(address => {
      console.log(address);
    });

  }

  ngOnInit() {

  }

  loadTask(task: any) {
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(TaskComponent);

    this.taskRef = this.container.createComponent(factory);

    this.taskRef.location.nativeElement.classList.add('col-12');

    this.taskRef.location.nativeElement.id = `task-${task.id}`;

    this.taskRef.instance.id = task.id;

    this.taskRef.instance.description = task.description;

    this.taskRef.instance.color = task.color;

    this.taskRef.instance.ranges = task.ranges;

    this.taskRef.changeDetectorRef.detectChanges();
  }

}
