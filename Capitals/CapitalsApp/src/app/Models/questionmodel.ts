export interface Question {
    countryName: string;
    options: QuestionOptions[];
}

export interface QuestionOptions {
    capitalName: string;
    firstOption: string;
    secondOption: string;
    thirdOption: string;
}
