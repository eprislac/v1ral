import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../score.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.scss']
})

export class HighScoresComponent implements OnInit {
  scores: Observable<any>;
  constructor(private scoreService: ScoreService) { }

  ngOnInit() {
    let self = this;
    this
      .scoreService
      .fetchHighScoresModel()
      .subscribe(data => {
        return self.scores = data
      })
  }

}
