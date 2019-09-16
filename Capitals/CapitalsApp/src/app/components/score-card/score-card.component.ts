import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit, OnDestroy {
  yourScore: string;
  score: number;

  subscription: Subscription;
  faGlobe = faGlobe;

  good = 'You know what you\'re doing!';
  average = 'You don\'t know everything but you know a lot!';
  bad = 'Oh boy. World capitals are not your strength but you can get better!';

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(
        (params) => {
          if (params === null) {
            this.yourScore = 'Oops, looks like you got here by accident. Take the quiz by clicking the button below.';
          } else if (params.score >= 0 && params.score <= 12) {
            this.score = params.score;
            this.yourScore = 'Your score is: ' + params.score.toString();
          } else {
            this.yourScore = 'Sorry. Something went wrong. Please click the button below to retake the test.';
          }
        },
        (error) => console.error('oops, an error!', error));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
