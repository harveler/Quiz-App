import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { QuizService } from './quiz.service';
import { IQuestion } from '../models/questionmodel';
import { of } from 'rxjs';

describe('QuizService', () => {

  const testData: IQuestion[] = [
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
    'getEasyQuestions should return collection of data',
    fakeAsync(
      inject(
        [QuizService, HttpTestingController],
        (quizService: QuizService, backend: HttpTestingController) => {

          // Set up
          const responseObject = testData;
          let response = null;
          // End Setup

          quizService.getEasyQuestions().subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => { }
          );

          const requestWrapper = backend.expectOne({ url: 'api/Quiz/GetEasyQuestions' });
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('GET');
          expect(response).toEqual(responseObject);
        }
      )
    )
  );

  it(
    'getMediumQuestions should return collection of data',
    fakeAsync(
      inject(
        [QuizService, HttpTestingController],
        (quizService: QuizService, backend: HttpTestingController) => {

          // Set up
          const responseObject = testData;
          let response = null;
          // End Setup

          quizService.getMediumQuestions().subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => { }
          );

          const requestWrapper = backend.expectOne({ url: 'api/Quiz/GetMediumQuestions' });
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('GET');
          expect(response).toEqual(responseObject);
        }
      )
    )
  );

  it(
    'getHardQuestions should return collection of data',
    fakeAsync(
      inject(
        [QuizService, HttpTestingController],
        (quizService: QuizService, backend: HttpTestingController) => {

          // Set up
          const responseObject = testData;
          let response = null;
          let status = null;
          // End Setup

          quizService.getHardQuestions().subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
              status = receivedResponse.status;
            },
            (error: any) => { }
          );

          const requestWrapper = backend.expectOne({ url: 'api/Quiz/GetHardQuestions' });
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('GET');
          expect(response).toEqual(responseObject);
        }
      )
    )
  );

  it(
    'getEayQuestions should return null if the request returns null',
    fakeAsync(
      inject(
        [QuizService, HttpTestingController],
        (quizService: QuizService, backend: HttpTestingController) => {

          // Set up
          const responseObject = null;
          let response = null;
          // End Setup

          quizService.getEasyQuestions().subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => { }
          );

          const requestWrapper = backend.expectOne({ url: 'api/Quiz/GetEasyQuestions' });
          requestWrapper.flush(responseObject);

          tick();

          expect(requestWrapper.request.method).toEqual('GET');
          expect(response).toBeNull();
        }
      )
    )
  );
});
