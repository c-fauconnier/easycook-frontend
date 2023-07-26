import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureElementComponent } from './lecture-element.component';

describe('LectureElementComponent', () => {
  let component: LectureElementComponent;
  let fixture: ComponentFixture<LectureElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LectureElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LectureElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
