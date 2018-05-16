import { Component, OnInit } from '@angular/core';
declare var createCards: any;
@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
       createCards('CanTrack');
  }

}
