import { Component, OnInit } from '@angular/core';
import { QuestionsMiddleware } from '../../middlewares/questions';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.css']
})
export class BootstrapComponent implements OnInit {
  isLoading: boolean;

  constructor(private questionsMiddleware: QuestionsMiddleware) {
  }

  ngOnInit(): void {
    this.questionsMiddleware.getIsQuestionsLoading().subscribe(loading => this.isLoading = loading);
    this.questionsMiddleware.fetchQuestions();
  }
}
