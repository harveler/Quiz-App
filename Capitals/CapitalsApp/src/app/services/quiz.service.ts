import { IQuestion } from '../models/questionmodel';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  endpoint = 'api/Quiz/';

  constructor(private http: HttpClient) { }

  getQuestions(difficulty: number): Observable<IQuestion[]> {
    const url = this.endpoint + `GetQuestions/${difficulty}`;
    return this.http.get<IQuestion[]>(url, httpOptions);
  }
}
