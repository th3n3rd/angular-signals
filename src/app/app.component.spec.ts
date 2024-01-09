import { fakeAsync, flush } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { render, screen } from '@testing-library/angular';
describe('AppComponent', () => {

  it('initially greets a friend', async () => {
    await render(AppComponent);
    expect(screen.getByText('Hello Friend!')).toBeDefined();
  });

  it('eventually greets everybody else', fakeAsync(async () => {
    const { fixture } = await render(AppComponent);
    flush();
    fixture.detectChanges();
    expect(screen.getByText('Hello Everybody Else!')).toBeDefined();
  }));

  it('eventually greets everybody else (alternative #1)', fakeAsync(async () => {
    await render(AppComponent);
    flush();
    expect(await screen.findByText('Hello Everybody Else!', {}, { timeout: 2000 })).toBeDefined();
  }));

  it('eventually greets everybody else (alternative #2)', async () => {
    await render(AppComponent);
    expect(await screen.findByText('Hello Everybody Else!', {}, { timeout: 2000 })).toBeDefined();
  });
});
