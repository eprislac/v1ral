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
  public highScoresList: FirebaseListObservable<any[]>;
  public highScoresObject;

  constructor(private stateManager: StateManagerService, private af: AngularFire) {
    
    this.highScoresObject = this.af.database.object('/scores')
    this.highScoresList = this.af.database.list('/scores', {query: {orderByChild: 'score'}});
    this.highScoresList.subscribe(data => {
      this.stateManager
        .setModel('highScores', 
          data
            .map((item) =>{return {initials: item.initials, score: item.score}})
            .sort((a,b) => {return b.score - a.score}));
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

    this
      .compareHighScores()
      .take(1)
      .subscribe((combined) => {
        let gs = { initials: initials, score: combined[0].score }
        let hsa: Array<any> = [gs]
          .concat(combined[1])
          .sort((a,b) => {return a.score - b.score})
          .slice(1)
          .sort((a,b) => {return b.score - a.score});
        self.highScoresObject.set(hsa);
        self.highScoresList = self.af.database.list('/scores', {query: {orderByChild: 'score'}});
      });
  }
}
