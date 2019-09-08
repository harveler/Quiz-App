// modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule,  } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule, MatRadioModule } from '@angular/material';
// components
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionsAnswersComponent } from './questions-answers/questions-answers.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuestionsAnswersComponent,
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    MatRadioModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: '**', component: QuizComponent, pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
