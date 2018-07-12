import { Component, Input } from '@angular/core';
import { ContractDataService } from './contract-data/contract-data.service';
import { PreviewService } from './preview.service';

declare var BancorConvertWidget: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @Input() projectName: string = 'Click to edit this project name'

  isContractViewMode: boolean = false

  constructor(
    private contractDataService: ContractDataService,
    public previewService: PreviewService) {

    this.projectName = localStorage.getItem('projectName') ?
                        localStorage.getItem('projectName') :
                        this.projectName;

    contractDataService.hasContract.subscribe(hasContract => {
      this.isContractViewMode = hasContract;
    });
  }

  onKeyUp(e) {
    localStorage.setItem('projectName', e.target.value);
  }

  ngAfterViewInit() {
    BancorConvertWidget.init({
      'type': '1',
      'baseCurrencyId': '5a6f61ece3de16000123763a',
      'pairCurrencyId': '5937d635231e97001f744267',
      'primaryColor': '#00BFFF',
      'primaryColorHover': '55DAFB'
    });
  }
}
