import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { EthereumService } from '../ethereum.service';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ContractDataService implements Resolve<any> {

  hasContract: Subject<any> = new Subject<any>()

  contractData: Subject<any> = new Subject<any>()

  contractSender: Subject<any> = new Subject<any>()

  constructor(
    private router: Router,
    private ethereumService: EthereumService) {

    ethereumService.onInit.subscribe(canTrackCode => {

      this.hasContract.next(true);

      ethereumService.CanTrackContract
        .getData(canTrackCode).then(res => {
          console.log(res);
          this.contractData.next(JSON.parse(res));
        }).catch(error => console.log(error));

      ethereumService.CanTrackContract
        .getSender(canTrackCode).then(res => {
          console.log(res);
          this.contractSender.next(res);
        }).catch(error => console.log(error));
    });
  }

  resolve(route: ActivatedRouteSnapshot) {
    let canTrackCode = route.paramMap.get('canTrackCode');

    console.log(canTrackCode);
    if (canTrackCode) {
      if (!this.ethereumService.CanTrackContractInterface ||
          !this.ethereumService.web3 ||
          !this.ethereumService.CanTrackContract) {

        this.ethereumService.init(canTrackCode);
      }
    } else {
      this.hasContract.next(false);
      return null;
    }
  }

}
