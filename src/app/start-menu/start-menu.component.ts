import { Component, OnInit} from '@angular/core';
import { MenuButtonComponent } from '../menu-button';

interface IButtonOptions {
  text: string;
  url: string;
}

const OPTIONS: Array<IButtonOptions> = [
  {
    text: 'New Game', 
    url: 'new-game'
  },
  {
    text: 'High Scores',
    url: 'high-scores'
  }
];

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.scss']
})

export class StartMenuComponent implements OnInit {
  model: Array<IButtonOptions> = OPTIONS;

  constructor() { }

  ngOnInit() {
    
  }

}


