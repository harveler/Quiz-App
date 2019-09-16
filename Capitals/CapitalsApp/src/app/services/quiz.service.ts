import { catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Question } from '../models/questionmodel';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  endpoint = 'api/Quiz/';

  constructor(private http: HttpClient) { }

  getQuestions(difficulty: number): Observable<Question[]> {
    const url = this.endpoint + `GetQuestions/${difficulty}`;
    return this.http.get<Question[]>(url, httpOptions)
    .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    const errorMessage = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return throwError(error);
  }
}
