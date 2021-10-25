import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewWaterComponent } from './view-water.component';

describe('ViewWaterComponent', () => {
  let component: ViewWaterComponent;
  let fixture: ComponentFixture<ViewWaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewWaterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
