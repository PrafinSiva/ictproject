import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live-score',
  templateUrl: './live-score.component.html',
  styleUrls: ['./live-score.component.css']
})
export class LiveScoreComponent implements OnInit {
  enterValue="";
  newBatsman="";

  onAddBatsman(){
    this.newBatsman=this.enterValue;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
