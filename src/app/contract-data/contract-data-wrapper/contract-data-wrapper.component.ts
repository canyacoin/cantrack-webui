import { Component,
         OnInit,
         ViewChild,
         ComponentFactory,
         ComponentRef,
         ComponentFactoryResolver,
         ViewContainerRef,
         NgZone } from '@angular/core';
import { ContractDataService } from '../contract-data.service';
import { EthereumService } from '../../ethereum.service';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-contract-data-wrapper',
  templateUrl: './contract-data-wrapper.component.html',
  styleUrls: ['./contract-data-wrapper.component.css']
})

export class ContractDataWrapperComponent implements OnInit {

  @ViewChild("taskList", { read: ViewContainerRef }) tasksContainer

  taskRef: ComponentRef<any>

  globalCounter: any

  contractSender: string

  constructor(
    private resolver: ComponentFactoryResolver,
    private contractDataService: ContractDataService,
    public ethereumService: EthereumService) {

    contractDataService.contractData.subscribe(data => {
      console.log(data);
      this.globalCounter = this.renderGlobalTime(data.globalTimer.counter);
      Object.keys(data.taskList)
        .forEach(key => this.loadTask(data.taskList[key]));
    });

    contractDataService.contractSender.subscribe(address => {
      console.log(address);
      this.contractSender = address;
    });

  }

  ngOnInit() {

  }

  renderGlobalTime(counter) {
    return `<div class="col"><h5>${ counter.days }</h5><small>Days</small></div>
              <div class="col"><h5>${ counter.hours }</h5><small>Hours</small></div>
              <div class="col"><h5>${ counter.minutes }</h5><small>Minutes</small></div>
              <div class="col"><h5>${ counter.seconds }</h5><small>Seconds</small></div>`;
  }

  loadTask(task: any) {
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(TaskComponent);

    this.taskRef = this.tasksContainer.createComponent(factory);

    this.taskRef.location.nativeElement.classList.add('col-12');

    this.taskRef.location.nativeElement.id = `task-${task.id}`;

    this.taskRef.instance.id = task.id;

    this.taskRef.instance.description = task.description;

    this.taskRef.instance.color = task.color;

    this.taskRef.instance.ranges = task.ranges;

    this.taskRef.changeDetectorRef.detectChanges();
  }

}
