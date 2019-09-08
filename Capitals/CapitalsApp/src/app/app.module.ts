// modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
// components
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    MatButtonModule,
    BrowserModule,
    RouterModule.forRoot([
      { path: '**', component: QuizComponent, pathMatch: 'full' },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
