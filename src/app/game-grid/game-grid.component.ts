import { Component, OnInit } from '@angular/core';
import { StateManagerService } from 'sassy-state-manager-ng2';
import { GameService, LEVELS } from '../game.service';
import { ColorsService } from '../colors.service';

interface IGridCell {
  x: number;
  y: number;
  colorClass: string;
  captured: boolean;
  index: number;
}

@Component({
  selector: 'app-game-grid',
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.scss'],
  providers: [ColorsService]
})

export class GameGridComponent implements OnInit {
  gameGrid: Array<IGridCell> = [];
  gameOver: boolean = false;
  initialCell: IGridCell;
  constructor(private stateManager: StateManagerService, 
              private colors: ColorsService,
              private game: GameService) { }

  ngOnInit() {
    this
      .stateManager
      .getModel('game')
      .subscribe((data) => {
        let level = LEVELS[data.levelNum - 1];
        this.gameOver = data.gameOver;
        
        if(level === data) {
          this.createGrid(data.numColors);
        }
      });
    
    this.watchGrid();
  }

  createGrid(numColors: number) {
    let self = this;
    let grid: Array<IGridCell> = [];
    let x: number = 0;
    let i: number = 0;
    
    while (x < 20) {
      let y: number = 0;
      while(y < 20) {
        let cell: IGridCell = {
          x: x,
          y: y,
          colorClass: (x === 0 && y === 0) ? 'init' : self.colors.randomColor(numColors - 1),
          captured: (x === 0 && y === 0),
          index: i
        }
        grid.push(cell);
        y ++;
        i ++;
      }
      x ++;
    }
    let _createGrid = function(state) {
      state = grid;
      return state;
    }
    self.stateManager.update('gameGrid')(_createGrid);  
  }
  
  watchGrid() {
    this
      .stateManager
      .getModel('gameGrid')
      .subscribe( data => {
        this.gameGrid = data;
        let numberUncaptured: number = data
          .filter( cell => !cell.captured )
          .length
        if(numberUncaptured === 0) {
          this.game.advanceLevel();
        }
      } );
  }
}
