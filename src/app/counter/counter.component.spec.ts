import { ComponentHarness } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

class CounterTestHarness extends ComponentHarness {
  static hostSelector = 'app-counter';

  private getCountDisplay = this.locatorFor('.count');
  private getIncrementButton = this.locatorFor('button');

  async clickIncrementButton() {
    const button = await this.getIncrementButton();
    return button.click();
  }

  async getDisplayedCount() {
    const display = await this.getCountDisplay();
    return display.text();
  }
}


@Component({
  template: `<app-counter [count]="count"></app-counter>`
})
class TestComponent {
  count = 0;
}

// Harness for wrapper component
class TestComponentHarness extends ComponentHarness {
  static hostSelector = '';
  async getCounterComponent() {
    return this.locatorFor(CounterTestHarness)();
  }
}


describe('CounterComponent', () => {
  let harness: CounterTestHarness;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent, TestComponent]
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      TestComponentHarness,
    ).then(h => h.getCounterComponent());
  });

  it('should create harness', () => {
    expect(harness).toBeTruthy();
  });

  it('should increment count up on button click', async () => {
    const displayBeforeClick = await harness.getDisplayedCount();
    expect(displayBeforeClick).toBe('Count=0');
    await harness.clickIncrementButton();
    const displayAfterClick = await harness.getDisplayedCount();
    expect(displayAfterClick).toBe('Count=1');
  });

  it('should display the counter inputted.', async () => {
    fixture.componentInstance.count = 100;

    const display = await harness.getDisplayedCount();
    expect(display).toBe('Count=100');
  });
});
