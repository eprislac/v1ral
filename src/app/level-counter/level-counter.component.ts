import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StateManagerService } from 'sassy-state-manager-ng2';

@Component({
  selector: 'app-level-counter',
  templateUrl: './level-counter.component.html',
  styleUrls: ['./level-counter.component.scss']
})

export class LevelCounterComponent implements OnInit {
  level: Number

  constructor(private stateManager: StateManagerService) { }

  ngOnInit() {
    this
      .stateManager
      .getModel('game')
      .subscribe((data) => {
        this.level = data.levelNum;
      });
  }

}
