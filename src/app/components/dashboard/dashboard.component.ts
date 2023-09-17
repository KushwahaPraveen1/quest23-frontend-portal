import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import { QuestionsMiddleware } from '../../middlewares/questions';
import { Question } from '../../models/question';
import { TimerService } from '../../services/timer.service';
import { EventBusService } from '../../services/event-bus.service';
import { Broadcaster } from '../../utils/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  questions: Question[];
  hours: number;
  minutes: number;
  seconds: number;

  constructor(private questionMiddleware: QuestionsMiddleware,
              private timerService: TimerService,
              private broadcasterService: EventBusService) {


    this.broadcasterService.listen(Broadcaster.HOUR).subscribe(hrs => {
      this.hours = hrs;
    });
    this.broadcasterService.listen(Broadcaster.MINUTE).subscribe(min => {
      if (min < 10) {
        min = '0' + min;
      }
      this.minutes = min;
    });
    this.broadcasterService.listen(Broadcaster.SECONDS).subscribe(sec => {
      if (sec < 10) {
        sec = '0' + sec;
      }
      this.seconds = sec;
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    console.log(event);
  }

  @HostListener('window:beforeunload', ['$event'])
  onRefresh(event) {
    return 'Any string value here forces a dialog box to \n' +
      'appear before closing the window.';
  }

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    console.log('Processing beforeunload...', event);
    return confirm('Are you sure?');
  }

  ngOnInit() {
    this.questionMiddleware.fetchQuestions();
    this.questionMiddleware.getQuestions().subscribe((res: Question[]) => {
      console.log('[Dashboard questions]', res);
      this.questions = res;
    });
    this.timerService.initializeTimer();
  }

  scrollToSection(id: string) {
    if (!id) {
      return;
    }
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  ngOnDestroy() {
    this.timerService.dumpTimer();
  }
}
