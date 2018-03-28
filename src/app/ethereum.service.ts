import { Injectable } from '@angular/core';
import { PreviewService } from './preview.service';
import { TimerService } from './timer.service';

@Injectable()
export class EthereumService {

  constructor(
    private globalTimer: TimerService,
    private previewService: PreviewService) {



  }

  onPublish() {
    let globalTimer = JSON.parse(localStorage[this.globalTimer.localStorageName]);

    let tasks = JSON.parse(localStorage['taskList']).tasks;

    let contractData = {
      globalTimer: this.filterEmptyGlobalTimerRanges(globalTimer),
      taskList: this.filterEmptyTasksRanges(tasks)
    }

    console.log(JSON.stringify(contractData));
  }

  filterEmptyGlobalTimerRanges({counter, createdAt, dates}) {
    Object.keys(dates).forEach(key => {
      let date = dates[key];

      let filteredDate = date.filter(hour => {
        return hour.ranges.length > 0;
      });

      dates[key] = filteredDate;
    });

    return {counter, createdAt, dates};
  }

  filterEmptyTasksRanges(tasks) {
    let filteredTasks = {};

    Object.keys(tasks).forEach(key => {
      let task = tasks[key];

      if (task.ranges.length > 0) {
        filteredTasks[key] = task;
      }
    });

    return filteredTasks;
  }

}
