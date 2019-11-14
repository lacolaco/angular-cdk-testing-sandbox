import { createStore } from 'redux';
import { counterStore } from './counter.store';

export const store = createStore(counterStore.reducer);
