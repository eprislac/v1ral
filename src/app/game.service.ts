import { Injectable, OnInit } from '@angular/core';
import { StateManagerService } from 'sassy-state-manager-ng2'



interface ILevel {
  levelNum: number;
  numColors: number
  numTurns: number;
  levelScore: number;
}

export const LEVELS: Array<ILevel> = [
  { 
    levelNum: 1,
    numColors: 3,
    numTurns: 50,
    levelScore: 0
  },
  {
    levelNum: 2,
    numColors: 3,
    numTurns: 45,
    levelScore: 0
  },
  {
    levelNum: 3,
    numColors: 3,
    numTurns: 40,
    levelScore: 0
  },
  { 
    levelNum: 4,
    numColors: 3,
    numTurns: 35,
    levelScore: 0
  },
  {
    levelNum: 5,
    numColors: 3,
    numTurns: 30,
    levelScore: 0
  },
  { 
    levelNum: 6,
    numColors: 4,
    numTurns: 50,
    levelScore: 0
  },
  {
    levelNum: 7,
    numColors: 4,
    numTurns: 45,
    levelScore: 0
  },
  {
    levelNum: 8,
    numColors: 4,
    numTurns: 40,
    levelScore: 0
  },
  { 
    levelNum: 9,
    numColors: 4,
    numTurns: 35,
    levelScore: 0
  },
  {
    levelNum: 10,
    numColors: 4,
    numTurns: 30,
    levelScore: 0
  },
  { 
    levelNum: 11,
    numColors: 5,
    numTurns: 50,
    levelScore: 0
  },
  {
    levelNum: 12,
    numColors: 5,
    numTurns: 45,
    levelScore: 0
  },
  {
    levelNum: 13,
    numColors: 5,
    numTurns: 40,
    levelScore: 0
  },
  { 
    levelNum: 14,
    numColors: 5,
    numTurns: 35,
    levelScore: 0
  },
  {
    levelNum: 15,
    numColors: 5,
    numTurns: 30,
    levelScore: 0
  }
]

@Injectable()
export class GameService {
  constructor(private stateManager: StateManagerService) { 
    let game = this.newGame();
    this.setNewGameModel(game);
  }
  
  private newGame(): Object {
    let game: any = Object(LEVELS[0]);
    game.score = 0;
    return game;
  }

  private setNewGameModel(game:Object) {
    this.stateManager.setModel('game', game);
  }

  public updateGame(numCaptured: number) {
    let self = this;
    self
      .stateManager
      .getModel('game')
      .take(1)
      .subscribe((data) => {
        let multiplier: number;
        let _updateGame = function(state) {
          state = Object.assign({}, data);
          if (numCaptured > 9) { multiplier = 2; }
          else if (numCaptured > 19) { multiplier = 3; }
          else if (numCaptured > 29) { multiplier = 4; }
          else { multiplier = 1; }

          state.levelScore = data.levelScore + ((numCaptured * 10) * multiplier);
          state.numTurns = data.numTurns - 1;
          if (state.numTurns === 0) {
            this.gameOver();
          }
          return state; 
        }
        return this.stateManager.update('game')(_updateGame);
      });
    
  }

  public advanceLevel() {
    let self = this;
    self
      .stateManager
      .getModel('game')
      .take(1)
      .subscribe((data) => {
        if (data.levelNum === 15) { return self.gameOver(); }
        else {
          let newLevel = Object(LEVELS[data.levelNum]);
          newLevel.score = data.score + data.levelScore + 1;
          let  _advanceLevel = function(state) {
            state = newLevel;
            return state;
          }
          self.stateManager.update('game')(_advanceLevel);
        }
      });
  }

  gameOver() {
    alert('Game Over')
  }

}
