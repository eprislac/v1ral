import { Component, OnInit } from '@angular/core';
import { ScoreService, IHighScore } from '../score.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.scss']
})

export class HighScoresComponent implements OnInit {
  scores: Observable<any>;
  constructor(private scoreService: ScoreService) { }
  newHighScore: boolean = false;

  ngOnInit() {
    let self = this;
    this
      .scoreService
      .fetchHighScoresModel()
      .subscribe(data => {
        return self.scores = data
      });
    this
      .scoreService
      .compareHighScores()
      .subscribe((combined) => {
        let score: IHighScore = { initials: '', score: combined[0].score};
        let scoresObjectArr: Array<any> = combined[1];
        let isNewHigh: boolean = scoresObjectArr.filter(s => s.score < score.score).length > 0;
        
        if(isNewHigh) {
          return this.newHighScore = true;
        }
      })
  }
}
