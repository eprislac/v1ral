import { Injectable, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StateManagerService } from 'sassy-state-manager-ng2';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


export interface IHighScore {
  initials: string;
  score: number;
}

@Injectable()
export class ScoreService implements OnInit{
  public highScores;

  constructor(private stateManager: StateManagerService, private af: AngularFire) { 
    this.highScores = this.af.database.object('/scores')
    this.highScores.subscribe(data => {
      this.stateManager.setModel('highScores', data.data);
    });
  }

  ngOnInit() {
    
  }

  public fetchHighScoresModel() {
    return this.stateManager.getModel('highScores');
  }

  public compareHighScores() {
    return Observable
      .combineLatest(
        this.stateManager.getModel('game'),
        this.stateManager.getModel('highScores')
      )
  }

  public submitInitials(initials): void {
    let self = this;

    this.syncHighScores();

    this
      .compareHighScores()
      .take(1)
      .subscribe((combined) => {
        let gs = { initials: initials, score: combined[0].score }
        let hsa = combined[1];
        hsa
          .sort((a,b) => { return a.score - b.score })
          .pop();
        hsa.push(gs);

        let _updateHighScores = function(state) {
          state = hsa;
          return state;
        }

        this.stateManager.update('highScores')(_updateHighScores);
      });
  }

  public syncHighScores() {
    this
      .fetchHighScoresModel()
      .subscribe((data) => {
        return this.af.database.object('/scores').update({data});
      })
  }
}
