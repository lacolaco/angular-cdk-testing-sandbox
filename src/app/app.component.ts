import { Component } from '@angular/core';
import { store } from './store/store';
import { counterStore } from './store/counter.store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  count = 0;

  ngOnInit() {
    store.subscribe(() => {
      const { count } = store.getState();
      this.count = count;
    })
  }

  onCountUp() {
    store.dispatch(counterStore.actions.increment());
  }
}
