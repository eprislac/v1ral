import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-initials-form',
  templateUrl: './initials-form.component.html',
  styleUrls: ['./initials-form.component.scss']
})
export class InitialsFormComponent implements OnInit {
  public initials: string;
  submitted: boolean = false;

  constructor(private scores: ScoreService) { }

  ngOnInit() {
  }

  submitInitials() {
    this.scores.submitInitials(this.initials);
    this.submitted = true;
  }

}
