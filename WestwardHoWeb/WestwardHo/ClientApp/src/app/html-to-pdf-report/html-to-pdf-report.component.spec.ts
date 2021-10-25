import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HtmlToPDFReportComponent } from './html-to-pdf-report.component';

describe('HtmlToPDFReportComponent', () => {
  let component: HtmlToPDFReportComponent;
  let fixture: ComponentFixture<HtmlToPDFReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HtmlToPDFReportComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlToPDFReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
