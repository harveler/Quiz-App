import { IQuestion } from '../Models/questionmodel';
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

  getEasyQuestions(): Observable<IQuestion[]> {
    const url = this.endpoint + 'GetEasyQuestions';
    return this.http.get<IQuestion[]>(url, httpOptions);
  }

  getMediumQuestions(): Observable<IQuestion[]> {
    const url = this.endpoint + 'GetMediumQuestions';
    return this.http.get<IQuestion[]>(url, httpOptions);
  }

  getHardQuestions(): Observable<IQuestion[]> {
    const url = this.endpoint + 'GetHardQuestions';
    return this.http.get<IQuestion[]>(url, httpOptions);
  }
}
