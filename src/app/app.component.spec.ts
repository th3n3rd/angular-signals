import { TestBed, fakeAsync, flush } from '@angular/core/testing';
import { AppComponent } from './app.component';

const { configureTestingModule, createComponent } = TestBed;

describe('AppComponent', () => {

  beforeEach(async () => {
    await configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('initially greets a friend', () => {
    const fixture = createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Hello Friend!');
  });

  it('eventually greets everybody else', fakeAsync(() => {
    const fixture = createComponent(AppComponent);
    flush();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Hello Everybody Else!');
  }));
});
