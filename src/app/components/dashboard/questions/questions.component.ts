import { Component, Input, OnInit } from '@angular/core';
import { Category, Question } from '../../../models/question';
import { Answer } from '../../../models/answer';
import { QuestionsMiddleware } from '../../../middlewares/questions';
import { Constants } from '../../../utils/constants';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  cLanguage: Question[] = [];
  sql: Question[] = [];
  aptitude: Question[] = [];
  htmlCss: Question[] = [];
  answer: Answer[];
  userId: string;

  @Input() set questions(questions: Question[]) {
    questions.forEach(q => {
      switch (q.category) {
        case Category.HTML_CSS:
          this.htmlCss.push(q);
          break;
        case Category.C:
          this.cLanguage.push(q);
          break;
        case Category.SQL:
          this.sql.push(q);
          break;
        case Category.APTITUDE:
          this.aptitude.push(q);
          break;
      }
    });
    this.questionsMiddleware.initializeAnswers([...this.cLanguage, ...this.aptitude, ...this.htmlCss, ...this.sql]);
  }


  constructor(private questionsMiddleware: QuestionsMiddleware) {
  }

  ngOnInit() {
    this.userId = localStorage.getItem(Constants.USER_ID);
  }

  radioChanged(event) {
    console.log(event.target);
    const a: Answer = {
      question: event.target.name.toString(),
      answer: event.target.value.toString(),
      user: this.userId
    };
    console.log(a);
    this.questionsMiddleware.updateAnswer(a);
  }

  clearResponse(id: string) {
    const a: Answer = {
      question: id.toString(),
      answer: null,
      user: this.userId
    };
    console.log(a);
    this.questionsMiddleware.updateAnswer(a);
  }
}
