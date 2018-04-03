import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contract-data-wrapper',
  templateUrl: './contract-data-wrapper.component.html',
  styleUrls: ['./contract-data-wrapper.component.css']
})
export class ContractDataWrapperComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const canTrackCode = this.route.snapshot.paramMap.get('canTrackCode');

    console.log(canTrackCode);
  }

}
