// modules
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatRadioModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule,  } from '@angular/router';

// components
import { AppComponent } from './app.component';
import { DummyComponent } from './testing/mock.components.specs';
import { QuestionsAnswersComponent } from './components/questions-answers/questions-answers.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ScoreCardComponent } from './components/score-card/score-card.component';

// services
import { QuizService } from './services/quiz.service';

// pipes
import { ShufflePipe } from './pipes/shuffle.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DummyComponent,
    QuestionsAnswersComponent,
    QuizComponent,
    ScoreCardComponent,
    ShufflePipe,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
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
