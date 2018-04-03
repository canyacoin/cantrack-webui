import { Component, Input } from '@angular/core';
import { ContractDataService } from './contract-data/contract-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  @Input() projectName: string = 'Click to edit this project name'

  isContractViewMode: boolean = false

  constructor(private contractDataService: ContractDataService) {
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
}
