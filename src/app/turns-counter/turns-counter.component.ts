import { Component, OnInit } from '@angular/core';
import { StateManagerService } from 'sassy-state-manager-ng2';

@Component({
  selector: 'app-turns-counter',
  templateUrl: './turns-counter.component.html',
  styleUrls: ['./turns-counter.component.scss']
})
export class TurnsCounterComponent implements OnInit {

  numTurns: Number;

  constructor(private stateManager: StateManagerService) { }

  ngOnInit() {
    this
      .stateManager
      .getModel('game')
      .subscribe((data) => {
        this.numTurns = data.numTurns;
      });
  }

}
