import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Question } from '../models/questionmodel';
import { QuizService } from './quiz.service';
import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';

describe('QuizService', () => {
  const difficulty = 1;

  const testData: Question[] = [
    {
      countryName: 'Berzerkistan',
      options: [{
        capitalName: 'Bmzklfrpz City',
        firstOption: 'Ragpo',
        secondOption: 'Raza',
        thirdOption: 'Citate Di Ravello'
      }],
    },
    {
      countryName: 'Glovania',
      options: [{
        capitalName: 'Ragpo',
        firstOption: 'Bmzklfrpz City',
        secondOption: 'Raza',
        thirdOption: 'Citate Di Ravello'
      }],
    },
    {
      countryName: 'Medici',
      options: [{
        capitalName: 'Citate Di Ravello',
        firstOption: 'Bmzklfrpz City',
        secondOption: 'Raza',
        thirdOption: 'Ragpo'
      }],
    }
  ];

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    }));

  it('should be created', () => {
    const service: QuizService = TestBed.get(QuizService);
    expect(service).toBeTruthy();
  });

  it(
    'getQuestions should return collection of data',
    fakeAsync(
      inject(
        [QuizService, HttpTestingController],
        (quizService: QuizService, backend: HttpTestingController) => {

          // arrange
          const responseObject = testData;
          let response = null;

          // act
          quizService.getQuestions(difficulty).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => { }
          );
          const requestWrapper = backend.expectOne({ url: `api/Quiz/GetQuestions/${difficulty}` });
          requestWrapper.flush(responseObject);
          tick();

          // assert
          expect(requestWrapper.request.method).toEqual('GET');
          expect(response).toEqual(responseObject);
        }
      )
    )
  );

  it(
    'getQuestions should return null if the request returns null',
    fakeAsync(
      inject(
        [QuizService, HttpTestingController],
        (quizService: QuizService, backend: HttpTestingController) => {

          // arrange
          const responseObject = null;
          let response = null;

          // act
          quizService.getQuestions(difficulty).subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => { }
          );
          const requestWrapper = backend.expectOne({ url: `api/Quiz/GetQuestions/${difficulty}` });
          requestWrapper.flush(responseObject);
          tick();

          // assert
          expect(requestWrapper.request.method).toEqual('GET');
          expect(response).toBeNull();
        }
      )
    )
  );
});
