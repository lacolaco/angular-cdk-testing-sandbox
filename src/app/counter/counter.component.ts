import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {

  @Input()
  count = 0;

  @Output()
  countUp = new EventEmitter<void>();
}
