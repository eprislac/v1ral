import { Component, OnInit } from '@angular/core';
import { StateManagerService } from 'sassy-state-manager-ng2';

@Component({
  selector: 'app-score-counter',
  templateUrl: './score-counter.component.html',
  styleUrls: ['./score-counter.component.scss']
})
export class ScoreCounterComponent implements OnInit {
  score: Number;
  levelScore: Number;

  constructor(private stateManager: StateManagerService) { }

  ngOnInit() {
    this
      .stateManager
      .getModel('game')
      .subscribe((data) => {
        this.score = data.score;
        this.levelScore = data.levelScore;
      });
  }

}
