import { Component, OnInit } from '@angular/core';
import { StateManagerService } from 'sassy-state-manager-ng2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'V1r@L';

  constructor(private stateManager: StateManagerService) { }

  ngOnInit() {
    this.stateManager.createModel('highScores');
    this.stateManager.setModel('highScores', []);
    this.stateManager.createModel('game');
    this.stateManager.setModel('game', {});
    this.stateManager.createModel('gameGrid');
    this.stateManager.setModel('gameGrid',[]);
    this.stateManager.createModel('gameControls');
    this.stateManager.setModel('gameControls', []);
  }
}
