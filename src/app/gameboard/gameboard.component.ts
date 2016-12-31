import { Component, OnInit } from '@angular/core';
import { StateManagerService } from 'sassy-state-manager-ng2';
import { GameService } from '../game.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
  providers: [ GameService ]
})
export class GameboardComponent implements OnInit {

  constructor(private game: GameService) { }

  ngOnInit() {
  }

}
