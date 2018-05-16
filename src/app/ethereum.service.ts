import { Injectable } from '@angular/core';
import { PreviewService } from './preview.service';
import { TimerService } from './timer.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

declare let require: any;
declare var window: any;

let Web3 = require('web3');
let ethers = require('ethers');
let contract = require('truffle-contract');

const CANTRACK_JSON_ID = 'CANTRACK';

@Injectable()
export class EthereumService {

  CanTrackContractInterface: any

  CanTrackContract: any

  web3: any


  ETHAddress: string

  contractAddress: string = '0xa104c23dc7ea588d733dcacdb7d931c462fceeb2'

  contractData: any


  onInit: Subject<any> = new Subject<any>()


  beforePublishing: Subject<any> = new Subject<any>()

  onPublishing: Subject<any> = new Subject<any>()

  afterPublishing: Subject<any> = new Subject<any>()

  isConfirmedTxn: boolean = false

  cantrackURL: string = 'https://cantrack.io'

  networkURL: string = 'https://etherscan.io'

  constructor(
    private globalTimer: TimerService,
    private previewService: PreviewService,
    private http: HttpClient) {

    previewService.isOn.subscribe(previewServiceIsOn => {
      if (previewServiceIsOn && !this.CanTrackContractInterface) {
        this.getContractInterface().subscribe(data => {
          this.CanTrackContractInterface = data;
        }, error => console.log(error));

      }

      if (previewServiceIsOn && !this.web3) {
        this.setWeb3Provider();
      }
    });
  }

  init(canTrackCode?: string) {
    this.getContractInterface().subscribe(data => {
      this.CanTrackContractInterface = data;

      this.setWeb3Provider();

      this.setContract().then(() => {
        this.onInit.next(canTrackCode);
      });
    }, error => console.log(error));
  }

  getContractInterface(): Observable<any> {
    return this.http.get('assets/contracts/CanTrack.json');
  }

  setWeb3Provider() {
    this.web3 = new Web3(Web3.givenProvider);
    console.log(this.web3);
    this.web3.eth.getAccounts().then(accounts => {
      console.log(accounts);
      this.ETHAddress = accounts[0];
    });
  }

  setContract() {
    let c = contract({abi: this.CanTrackContractInterface.abi});

    c.setProvider(this.web3.currentProvider);
    return c.at(this.contractAddress).then(instance => {
      console.log(instance);
      this.CanTrackContract = instance;
    }).catch(error => console.log(error));
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
      from: this.ETHAddress,
      to: this.contractAddress,
      gas: 6000000,
      gasPrice: 21000000000,
    };

    let onShortLink = (error, result) => {
      if (error) {
        console.log(error);
        return;
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
          isProviderOpen: false,
          isTxnComplete: true,
          hasError: false,
          hasConfirmedTxn: true,
        });
      }

      console.log(result);
    };

    this.CanTrackContract.ShortLink().watch(onShortLink);

    this.onPublishing.next({isProviderOpen: true});


    this.CanTrackContract.addData.estimateGas(
      `0x${JSON.stringify(this.contractData)}`,
      txOptions).then(gas => {
        console.log(gas);
        txOptions.gas = gas;

        this.CanTrackContract.addData(
          JSON.stringify(this.contractData),
          txOptions).then(txn => {
            console.log(txn);
            this.isConfirmedTxn = true;
          }).catch(error => {
            console.log(error);
            this.onPublishing.next({
              isProviderOpen: false,
              hasError: true,
            });
          });

      }).catch(error => {
        console.log(error);
        this.onPublishing.next({
          isProviderOpen: false,
          hasError: true,
        });
      });

    console.log(this.contractData);
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
