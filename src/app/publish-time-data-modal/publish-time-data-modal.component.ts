import { Component, OnInit, NgZone } from '@angular/core';
import { EthereumService } from '../ethereum.service';

@Component({
  selector: 'app-publish-time-data-modal',
  templateUrl: './publish-time-data-modal.component.html',
  styleUrls: ['./publish-time-data-modal.component.css']
})

export class PublishTimeDataModalComponent implements OnInit {

  isPublishing: boolean = false

  hasConfirmedTxn: boolean = false

  isProviderOpen: boolean = false

  isTxnComplete: boolean = false

  hasError: boolean = false

  txn: any

  constructor(public ethereumService: EthereumService, public zone: NgZone) {
    this.ethereumService.beforePublishing.subscribe(beforePublishing => {
      this.isPublishing = beforePublishing.isModalOpen;
    });

    this.ethereumService.onPublishing.subscribe(onPublishing => {
      this.isProviderOpen = onPublishing.isProviderOpen;
      this.hasConfirmedTxn = true;
      this.hasError = onPublishing.hasError;
    });

    this.ethereumService.afterPublishing.subscribe(afterPublishing => {
      this.isProviderOpen = false;
      this.hasConfirmedTxn = false;
      this.hasError = afterPublishing.hasError;
      this.txn = afterPublishing.txn;
      this.isTxnComplete = afterPublishing.isTxnComplete;

      this.zone.run(() => console.log('ran'));
    });
  }

  ngOnInit() {
  }


}
