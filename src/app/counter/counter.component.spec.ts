import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentHarness } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

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

describe('CounterComponent', () => {
  let harness: CounterTestHarness;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CounterComponent]
    }).compileComponents();
  }));

  beforeEach(async () => {
    const fixture = TestBed.createComponent(CounterComponent);
    harness = await TestbedHarnessEnvironment.harnessForFixture(
      fixture,
      CounterTestHarness
    );

    // Harness should run change detection and return promises to wait for stable.
    // So `detectChanges` is not needed.
    // fixture.detectChanges();
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
});
