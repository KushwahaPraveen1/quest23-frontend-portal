import { Component, OnInit } from '@angular/core';
import {QuestionsMiddleware} from '../../middlewares/questions';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {

  constructor(private questionMiddleware: QuestionsMiddleware) { }

  ngOnInit() {
    this.questionMiddleware.getQuestions().subscribe((res) => {
      if (!res || res.length === 0) {
        this.questionMiddleware.fetchQuestions();
      }
    });
  }
}
