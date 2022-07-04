export interface IQuiz {
  value: string;
  isCorrect: boolean;
}

export enum EFallacyType {
  bias = 'bias',
  fallacy = 'fallacy',
  gedankenexperiment = 'gedankenexperiment',
}

export interface IBlogEntry {
  type: EFallacyType;
  title: string;
  description: string;
  examples?: string[];
  date: string;
  quiz?: IQuiz[];
}

