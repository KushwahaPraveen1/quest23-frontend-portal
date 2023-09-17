import {Injectable} from '@angular/core';
import {EventBusService} from './event-bus.service';
import {Broadcaster} from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private seconds = 59;
  private minutes = 44;
  private hours = 0;
  Timer;

  constructor(private eventBus: EventBusService) {
  }

  initializeTimer() {
    // .Timer(0, 1000).subscribe(
    //   (_) => {
    //     this.seconds--;
    //     if (this.seconds === -1) {
    //       this.seconds = 59;
    //       this.minutes--;
    //     }
    //     if (this.hours === 0 && this.minutes === -1) {
    //       this.eventBus.emit(Broadcaster.FINISH_TEST);
    //     }
    //     if (this.minutes === -1 && this.hours === 1) {
    //       this.hours--;
    //       this.seconds = 60;
    //       this.minutes = 59;
    //     }
    //     if (this.hours === 1 && this.minutes === 29 && this.seconds === 59) {
    //       this.eventBus.emit(Broadcaster.ENABLE_SUBMIT);
    //     }
    //     this.emitEvents();
    //   }
    // );

    this.Timer = setInterval(() => {
      this.seconds--;
      if (this.seconds === -1) {
        this.seconds = 59;
        this.minutes--;
      }
      if (this.minutes === -1) {
        this.eventBus.emit(Broadcaster.FINISH_TEST);
      }
      if (this.minutes === 14 && this.seconds === 59) {
        this.eventBus.emit(Broadcaster.ENABLE_SUBMIT);
      }
      this.emitEvents();
    }, 1000);
  }

  emitEvents() {
    this.eventBus.emit(Broadcaster.HOUR, this.hours);
    this.eventBus.emit(Broadcaster.MINUTE, this.minutes);
    this.eventBus.emit(Broadcaster.SECONDS, this.seconds);
  }

  dumpTimer() {
    // this.eventBus.emit(Broadcaster.DUMP_TIMER, true);
    clearInterval(this.Timer);
  }

}
