// modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatRadioModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule,  } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// components
import { AppComponent } from './app.component';
import { QuestionsAnswersComponent } from './components/questions-answers/questions-answers.component';
import { QuizComponent } from './components/quiz/quiz.component';

// services
import { QuizService } from './services/quiz.service';

// pipes
import { ShufflePipe } from './pipes/shuffle.pipe';
import { ScoreCardComponent } from './components/score-card/score-card.component';
import { DummyComponent } from './testing/mock.components.specs';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsAnswersComponent,
    QuizComponent,
    ShufflePipe,
    DummyComponent,
    ScoreCardComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    MatButtonModule,
    MatRadioModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: 'quiz', component: QuizComponent, pathMatch: 'full' },
      { path: 'questions', component: QuestionsAnswersComponent },
      { path: 'score', component: ScoreCardComponent, pathMatch: 'full' },
      { path: '**', component: QuizComponent, pathMatch: 'full' },
    ])
  ],
  providers: [
    QuizService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
