import { Component, OnInit } from '@angular/core';
import { StateManagerService } from 'sassy-state-manager-ng2'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss']
})

export class GameControlsComponent implements OnInit {
  controls: Array<string>
  capturedColor: string

  constructor(private stateManager: StateManagerService) { }
  
  ngOnInit() {
    this.watchLevelColors();
    this.watchGameControls();
  }

  watchLevelColors() {
    let self = this;
    self.controls = [];

    return Observable
      .combineLatest(
        self.stateManager.getModel('game'),
        self.stateManager.getModel('gameGrid')
      )
      .subscribe((combined) => {
        let _controls = [];
        let game = combined[0];
        let gameGrid = combined[1];
        self.capturedColor = gameGrid[0].colorClass;

        gameGrid.map((cell) => {
          if(_controls.indexOf(cell.colorClass) === -1) {
            _controls.push(cell.colorClass);
          }
        });
        
        _controls.push('restart-level');
        _controls.push('quit');

        let _updateGameControls = function(state) {
          state = _controls;
          return state;
        }
        self.stateManager.update('gameControls')(_updateGameControls);
      });
  }

  watchGameControls() {
    this
      .stateManager
      .getModel('gameControls')
      .subscribe((data) => {
        this.controls = data
      });
  }

}
