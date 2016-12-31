import { Component, OnInit, Input } from '@angular/core';
import { StateManagerService } from 'sassy-state-manager-ng2';
import { GameService } from '../game.service';

@Component({
  selector: 'app-control-button',
  templateUrl: './control-button.component.html',
  styleUrls: ['./control-button.component.scss']
})

export class ControlButtonComponent implements OnInit {
  @Input()
  controlClass: string;
  @Input()
  capturedColor: string;

  controlMethods: Object = {
    'dark-blue': this.changeColor,
    'dark-red': this.changeColor,
    'goldenrod': this.changeColor,
    'dark-green': this.changeColor,
    'purple': this.changeColor,
    'restart-level': this.advanceLevel,
    'quit': this.quit
  }

  constructor(private stateManager: StateManagerService, private game: GameService) { }

  ngOnInit() { }

  clickHandler() {
    return this.controlMethods[this.controlClass](this);
  }

  changeColor(instance) {
    let self = instance;
    let numCaptured: number = 0;

    self.capturedColor = self.controlClass;

    self
      .stateManager
      .getModel('gameGrid')
      .take(1)
      .subscribe((data) => {
        let changes = data
          .filter(cell => cell.captured)
          .map((cell) => { 
            cell.colorClass = self.controlClass
            return cell;
          });

        let _changeColor = function(state) {
          return state.map((cell) => {
            let changedCell = changes.filter(cCell => cCell.index === cell.index)[0];
            if (typeof changedCell !== 'undefined') {
              return changedCell.index === cell.index ? changedCell : cell; 
            } else {
              return cell;
            }
          })
          .map((cell) => {
            if((!cell.captured) && (cell.colorClass === self.capturedColor)) {
              let n: number = cell.y + 1;
              let s: number = cell.y - 1;
              let e: number = cell.x + 1;
              let w: number = cell.x - 1;
              let x: number = cell.x;
              let y: number = cell.y;
              let xNeighbors: Array<number> = [e, w].filter(num => num > -1);
              let yNeighbors: Array<number> = [n, s].filter(num => num > -1);
              let capturedState: boolean;
              capturedState = state
                .filter((nCell) => {
                  return (nCell.x === x && yNeighbors.includes(nCell.y)) ||
                    (nCell.y === y && xNeighbors.includes(nCell.x));
                })
                .some((nCell) => {
                        return (nCell.captured) && 
                               (nCell.colorClass === self.capturedColor)}
                     )
              numCaptured = capturedState ? ++numCaptured : numCaptured
              cell.captured = capturedState;
              return cell;
            } else {
              return cell;
            }
          });
        }
        self.stateManager.update('gameGrid')(_changeColor);
        instance.game.updateGame(numCaptured);
      })
      
  }

  checkCaptured(cell, instance) {

  }

  advanceLevel(instance) {
    instance.game.advanceLevel();
  }

  restartLevel(instance) {
    console.log('restart level');
  }

  quit(instance) {
    console.log('quit')
  }



}
