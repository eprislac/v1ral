import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StateManagerService } from 'sassy-state-manager-ng2';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


export interface IHighScore {
  initials: string;
  score: number;
}

@Injectable()
export class ScoreService {
  public highScores;

  constructor(private StateManagerService: StateManagerService, private af: AngularFire) { 
    this.highScores = this.af.database.object('/scores')
    this.highScores.subscribe(data => {
      this.StateManagerService.setModel('highScores', JSON.parse(data.$value));
    });
  }

  public fetchHighScoresModel() {
    return this.StateManagerService.getModel('highScores');
  }

}
