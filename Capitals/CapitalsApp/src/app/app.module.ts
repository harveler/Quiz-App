// modules
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatRadioModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { RouterModule,  } from '@angular/router';
// components
import { AppComponent } from './app.component';
import { QuestionsAnswersComponent } from './components/questions-answers/questions-answers.component';
import { QuizComponent } from './components/quiz/quiz.component';
// services
import { QuizService } from './services/quiz.service';
import { HardQuestionsComponent } from './components/hard-questions/hard-questions.component';
import { EasyQuestionsComponent } from './components/easy-questions/easy-questions.component';
import { MediumQuestionsComponent } from './components/medium-questions/medium-questions.component';
// pipes
import { ShufflePipe } from './pipes/shuffle.pipe';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsAnswersComponent,
    QuizComponent,
    HardQuestionsComponent,
    EasyQuestionsComponent,
    MediumQuestionsComponent,
    ShufflePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatRadioModule,
    RouterModule.forRoot([
      { path: '', component: QuizComponent, pathMatch: 'full' },
      { path: 'easy', component: EasyQuestionsComponent, pathMatch: 'full' },
      { path: 'medium', component: MediumQuestionsComponent, pathMatch: 'full' },
      { path: 'hard', component: HardQuestionsComponent, pathMatch: 'full' },
      { path: '**', component: QuizComponent, pathMatch: 'full' },
    ])
  ],
  providers: [
    QuizService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
