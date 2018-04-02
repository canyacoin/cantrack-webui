import { Injectable } from '@angular/core';
import { PreviewService } from './preview.service';
import { TimerService } from './timer.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const CANTRACK_JSON_ID = 'CANTRACK';
const CANTRACK_CONTRACT_ADDRESS = '0x5276bf77cd5befbf6e8a3d4625e01ee8ed889937';

declare var window: any;

@Injectable()
export class EthereumService {

  CanTrackContractInterface: any

  CanTrackContract: any

  web3Provider: any

  constructor(
    private globalTimer: TimerService,
    private previewService: PreviewService,
    private http: HttpClient) {

    previewService.isOn.subscribe(previewServiceIsOn => {
      if (previewServiceIsOn && !this.CanTrackContractInterface) {
        this.getContractInterface().subscribe(data => {
          console.log(data);
          this.CanTrackContractInterface = data;
        }, error => console.log(error));
      }
    });
  }

  getContractInterface(): Observable<any> {
    return this.http.get('assets/contracts/CanTrack.json');
  }

  setWeb3Provider() {
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = new window.Web3(window.web3.currentProvider);
    } else {
      // TODO: handle lack of Web3 provider
    }
  }

  setContract() {
    let contract = this.web3Provider.eth.contract(this.CanTrackContractInterface.abi);

    this.CanTrackContract = contract.at(CANTRACK_CONTRACT_ADDRESS);

    console.log(this.CanTrackContract);
  }

  onPublish() {
    if (!this.web3Provider) {
      this.setWeb3Provider();
    }

    if (!this.CanTrackContract) {
      this.setContract();
    }


    let globalTimer = JSON.parse(localStorage[this.globalTimer.localStorageName]);

    let tasks = JSON.parse(localStorage['taskList']).tasks;

    let contractData = {
      id: CANTRACK_JSON_ID,
      globalTimer: this.filterEmptyGlobalTimerRanges(globalTimer),
      taskList: this.filterEmptyTasksRanges(tasks)
    }

    let txOptions = {
      from: this.web3Provider.eth.accounts[0],
      to: CANTRACK_CONTRACT_ADDRESS,
      gas: 6000000,
      gasPrice: 21
    };

    console.log(txOptions);

    this.CanTrackContract.ShortLink({}).watch((error, result) => {
      if (error) console.log(error);

      console.log(result);
    });

    this.CanTrackContract.addData(
      JSON.stringify(contractData),
      txOptions,
      (error, result) => {
        if (error) console.log(error);

        console.log(result);
    });


    // console.log(JSON.stringify(contractData));
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
