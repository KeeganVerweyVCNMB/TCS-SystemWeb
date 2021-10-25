import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LogWaterComponent } from './log-water.component';

describe('LogWaterComponent', () => {
  let component: LogWaterComponent;
  let fixture: ComponentFixture<LogWaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogWaterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
