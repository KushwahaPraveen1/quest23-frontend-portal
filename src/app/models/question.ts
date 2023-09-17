export interface Question {
  _id: string;
  // options: string[];
  category: Category;
  // question: string;
  question_id: number;
  description: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

export enum Category {
  C = 'c',
  HTML_CSS = 'html/css',
  APTITUDE = 'aptitude',
  SQL = 'sql',
  ALGORITHM = 'algorithm'
}
