import { Injectable } from '@angular/core';
import { PreviewService } from './preview.service';
import { TimerService } from './timer.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

const CANTRACK_JSON_ID = 'CANTRACK';
const CANTRACK_CONTRACT_ADDRESS = '0x872d443291bad3ea04bddfed97fdd57cf76a4329';

declare var window: any;

@Injectable()
export class EthereumService {

  CanTrackContractInterface: any

  CanTrackContract: any

  web3Provider: any


  ETHAddress: string

  contractAddress: string

  contractData: any


  beforePublishing: Subject<any> = new Subject<any>()

  onPublishing: Subject<any> = new Subject<any>()

  afterPublishing: Subject<any> = new Subject<any>()

  isConfirmedTxn: boolean = false

  cantrackURL: string = 'http://localhost:4200/contract'

  constructor(
    private globalTimer: TimerService,
    private previewService: PreviewService,
    private http: HttpClient) {

    this.contractAddress = CANTRACK_CONTRACT_ADDRESS;

    previewService.isOn.subscribe(previewServiceIsOn => {
      if (previewServiceIsOn && !this.CanTrackContractInterface) {
        this.getContractInterface().subscribe(data => {
          this.CanTrackContractInterface = data;
        }, error => console.log(error));

      }

      if (previewServiceIsOn && !this.web3Provider) {
        this.setWeb3Provider();
      }
    });
  }

  getContractInterface(): Observable<any> {
    return this.http.get('assets/contracts/CanTrack.json');
  }

  setWeb3Provider() {
    if (typeof window.web3 !== 'undefined') {
      this.web3Provider = new window.Web3(window.web3.currentProvider);
      this.ETHAddress = this.web3Provider.eth.accounts[0];
    } else {
      // TODO: handle lack of Web3 provider
    }
  }

  setContract() {
    let contract = this.web3Provider.eth.contract(this.CanTrackContractInterface.abi);

    this.CanTrackContract = contract.at(CANTRACK_CONTRACT_ADDRESS);

    // console.log(this.CanTrackContract);
  }

  onBeforePublish() {
    if (!this.CanTrackContract) {
      this.setContract();
    }

    // TODO recheck that web3 provider is logged in

    this.beforePublishing.next({isModalOpen: true});


    let globalTimer = JSON.parse(localStorage[this.globalTimer.localStorageName]);

    let tasks = JSON.parse(localStorage['taskList']).tasks;

    this.contractData = {
      id: CANTRACK_JSON_ID,
      globalTimer: this.filterEmptyGlobalTimerRanges(globalTimer),
      taskList: this.filterEmptyTasksRanges(tasks)
    }
  }

  onPublish() {
    let txOptions = {
      from: this.web3Provider.eth.accounts[0],
      to: CANTRACK_CONTRACT_ADDRESS,
      gas: 6000000,
      gasPrice: 21
    };

    this.CanTrackContract.ShortLink({}).watch((error, result) => {
      if (error) {
        console.log(error);
        // TODO: handle event error
      }

      console.log(this.isConfirmedTxn);
      if (this.isConfirmedTxn) {
        this.afterPublishing.next({
          txn: {
            code: result.args.code,
            hash: result.transactionHash,
            blockNumber: result.blockNumber,
            blockHash: result.blockHash,
          },
          isTxnComplete: true,
          hasError: false
        });
      }

      console.log(result);
    });

    this.onPublishing.next({isProviderOpen: true});

    this.CanTrackContract.addData(
      JSON.stringify(this.contractData),
      txOptions,
      (error, result) => {
        if (error) {
          console.log(error);
          // TODO: handle txn error
          this.onPublishing.next({
            isProviderOpen: false,
            hasError: true,
          });
        }

        this.isConfirmedTxn = true;
        this.onPublishing.next({
          isProviderOpen: false,
          hasError: false,
        });

        console.log(result);
    });
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
