import { ChangeDetectionStrategy, Component, Input, ɵdetectChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {

  @Input()
  count = 0;

  countUp() {
    this.count++;
    ɵdetectChanges(this);
  }
}
