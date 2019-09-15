import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit, OnDestroy {
  state$: Observable<object>;
  yourScore: string;
  score: number;
  good = 'You know what you\'re doing!';
  average = 'You don\'t know everything but you know a lot!';
  bad = 'Oh boy. World capitals are not your strength but you can get better!';
  subscription: Subscription;
  faGlobe = faGlobe;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(res => {
        if (res === null) {
          this.yourScore = 'Oops, looks like you got here by accident. Take the quiz by clicking the button below.';
        } else if (res.score >= 0 && res.score <= 12) {
          this.score = res.score;
          this.yourScore = 'Your score is: ' + res.score.toString();
        } else {
          this.yourScore = 'Sorry. Something went wrong. Please click the button below to retake the test.';
        }
      },
      (error) => console.log('error'));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
